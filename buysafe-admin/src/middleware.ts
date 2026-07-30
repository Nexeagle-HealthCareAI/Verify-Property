import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* ──────────────────────────────────────────
   In-memory rate limiter (use Upstash in prod)
   ────────────────────────────────────────── */
const rateLimitMap = new Map<string, { count: number; ts: number }>();

function rateLimit(ip: string, path: string, maxReq: number, windowMs: number): boolean {
  const key = `${ip}:${path}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.ts > windowMs) {
    rateLimitMap.set(key, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= maxReq) return false;
  entry.count++;
  return true;
}

/* Rate limit config per route prefix */
const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  "/api/leads":  { max: 10, windowMs: 60_000 },
  "/api/visits": { max: 5,  windowMs: 60_000 },
  "/api/auth":   { max: 5,  windowMs: 60_000 },
  "/api/pdf":    { max: 3,  windowMs: 60_000 },
};

/* ──────────────────────────────────────────
   CSP nonce generator
   ────────────────────────────────────────── */
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  /* ── Rate Limiting ── */
  for (const [route, cfg] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(route)) {
      const allowed = rateLimit(ip, route, cfg.max, cfg.windowMs);
      if (!allowed) {
        return new NextResponse(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "60",
            },
          }
        );
      }
      break;
    }
  }

  // Define paths that require authentication
  const protectedPaths = ["/dashboard", "/favourites", "/visits", "/profile", "/admin"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const adminToken = req.cookies.get("admin_token");
    // For now, any presence of admin_token allows access to all protected paths
    if (!adminToken) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  /* ── Security Headers + CSP ── */
  const nonce = generateNonce();
  const response = NextResponse.next();

  /* Content Security Policy */
  const isDev = process.env.NODE_ENV !== "production";
  const csp = [
    `default-src 'self'`,
    isDev ? `script-src 'self' 'unsafe-eval' 'unsafe-inline'` : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' data: blob: https://*.cloudinary.com https://images.unsplash.com https://*.openstreetmap.org https://tile.openstreetmap.org`,
    `connect-src 'self' https://api.buysafe.in`,
    `media-src 'self' blob:`,
    `frame-src 'none'`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-CSP-Nonce", nonce); // pass nonce to app

  /* Security Headers */
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self), payment=(), usb=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|icons/|screenshots/|sw.js|workbox-).*)",
  ],
};

import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
import { TopNav } from "@/components/layout/TopNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingActions } from "@/components/layout/FloatingActions";

// Lazy load non-critical components
const OfflineBanner    = dynamic(() => import("@/components/pwa/OfflineBanner"),    { ssr: false });
const PWAInstallPrompt = dynamic(() => import("@/components/pwa/InstallPrompt"),    { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://buysafe.in"),
  title: {
    default: "BuySafe Property — Verified Buyer's Agent in Kishanganj",
    template: "%s | BuySafe Property",
  },
  description:
    "Find verified properties in Kishanganj & Bihar with BuySafe Score™. Buyer-only representation, end-to-end assistance, and transparent property verification.",
  keywords: [
    "buyer's agent Kishanganj",
    "verified property Bihar",
    "property buy Kishanganj",
    "BuySafe property",
    "plot sale Kishanganj",
    "agricultural land Bihar",
  ],
  authors: [{ name: "BuySafe Property" }],
  creator: "BuySafe Property",
  publisher: "BuySafe Property",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://buysafe.in",
    siteName: "BuySafe Property",
    title: "BuySafe Property — Verified Buyer's Agent in Kishanganj",
    description:
      "Find verified properties in Kishanganj & Bihar with BuySafe Score™. Buyer-only representation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BuySafe Property — Verified Buyer's Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuySafe Property",
    description: "Kishanganj's trusted buyer-focused property platform.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a3180" },
    { media: "(prefers-color-scheme: dark)",  color: "#0d1f4a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical font */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
          as="style"
        />
      </head>
      <body>
        {/* Offline status banner (CSR only) */}
        <OfflineBanner />

        {/* Top navigation (desktop sidebar / mobile header) */}
        <TopNav />

        {/* Page content */}
        <main id="main-content" role="main">
          {children}
        </main>

        {/* Mobile bottom navigation */}
        <BottomNav />

        {/* Floating WhatsApp / Call / Visit buttons */}
        <FloatingActions />

        {/* PWA install prompt (Android-style) */}
        <PWAInstallPrompt />
      </body>
    </html>
  );
}

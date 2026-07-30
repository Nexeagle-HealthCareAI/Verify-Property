import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

// Lazy load non-critical components
import { PWAComponents } from "@/components/pwa/PWAComponents";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

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
  ],
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
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
          as="style"
        />
      </head>
      <body>
        <PWAComponents />
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BuySafe Property — Verified Buyer's Agent",
    short_name: "BuySafe",
    description:
      "Kishanganj's trusted buyer-focused property platform. Find verified properties with BuySafe Score™.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d1f4a",
    theme_color: "#1a3180",
    categories: ["real estate", "property", "home"],
    lang: "en",
    dir: "ltr",
    scope: "/",
    prefer_related_applications: false,
    icons: [
      { src: "/icons/icon-72.png",   sizes: "72x72",   type: "image/png", purpose: "any" },
      { src: "/icons/icon-96.png",   sizes: "96x96",   type: "image/png", purpose: "any" },
      { src: "/icons/icon-128.png",  sizes: "128x128", type: "image/png", purpose: "any" },
      { src: "/icons/icon-144.png",  sizes: "144x144", type: "image/png", purpose: "any" },
      { src: "/icons/icon-152.png",  sizes: "152x152", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192.png",  sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icons/icon-384.png",  sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png",  sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
    screenshots: [
      {
        src: "/screenshots/mobile-home.png",
        sizes: "390x844",
        type: "image/png",
        // @ts-ignore
        form_factor: "narrow",
        label: "BuySafe Home — Find Verified Properties",
      },
    ],
    shortcuts: [
      {
        name: "Search Properties",
        short_name: "Search",
        description: "Search verified properties in Kishanganj",
        url: "/properties",
        icons: [{ src: "/icons/shortcut-search.png", sizes: "96x96" }],
      },
      {
        name: "Book Site Visit",
        short_name: "Book Visit",
        description: "Book a property site visit",
        url: "/properties?action=book-visit",
        icons: [{ src: "/icons/shortcut-visit.png", sizes: "96x96" }],
      },
    ],
  };
}

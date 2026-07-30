import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "My Saved Properties — BuySafe Property",
  description: "View and manage your saved and shortlisted properties.",
  robots: { index: false, follow: false },
};

const FavouritesClient = dynamic(() => import("@/components/properties/FavouritesClient"), {
  ssr: false, // Favourites rely on localStorage which is browser-only
});

export default function FavouritesPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", minHeight: "100vh" }}>
      <FavouritesClient />
    </div>
  );
}

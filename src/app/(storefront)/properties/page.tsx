import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ListingsClient = dynamic(() => import("@/components/properties/ListingsClient"), {
  loading: () => <ListingsSkeleton />,
});

export const metadata: Metadata = {
  title: "Browse Verified Properties in Kishanganj, Bihar",
  description:
    "Search verified properties for buy, rent, and agricultural use in Kishanganj. Filter by BuySafe Score™, location, property type, and budget.",
};

function ListingsSkeleton() {
  return (
    <div style={{ padding: "var(--space-8) var(--space-4)" }}>
      <div className="skeleton" style={{ height: 60, borderRadius: "var(--radius-lg)", marginBottom: "var(--space-6)" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 340, borderRadius: "var(--radius-lg)" }} />
        ))}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Suspense fallback={<ListingsSkeleton />}>
        <ListingsClient />
      </Suspense>
    </div>
  );
}

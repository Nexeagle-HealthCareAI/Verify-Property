"use client";

import Link from "next/link";
import { useFavourites } from "@/lib/stores/propertyStore";
import { PropertyCard } from "@/components/property/PropertyCard";

export default function FavouritesClient() {
  const { favourites, removeFavourite, clearAll } = useFavourites();

  return (
    <div className="container" style={{ paddingBlock: "var(--space-8)" }}>
      {/* Header */}
      <div style={{ marginBottom: "var(--space-6)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <div className="section-tag">❤️ Saved</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "var(--text-2xl)" }}>
            My Favourites
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-2)" }}>
            Properties you&apos;ve shortlisted for later.
          </p>
        </div>
        
        {favourites.length > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "var(--space-16)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>🤍</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
            No Saved Properties
          </h3>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-5)" }}>
            Tap the heart icon on any property to save it here.
          </p>
          <Link href="/properties" className="btn btn-primary">
            Browse Properties
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--space-5)",
          }}
          role="list"
        >
          {favourites.map((property) => (
            <div key={property.id} role="listitem">
              <PropertyCard
                property={property}
                onSave={(id, saved) => {
                  if (!saved) removeFavourite(id);
                }}
                initialSaved={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

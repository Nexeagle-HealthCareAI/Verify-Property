"use client";

import { PropertyCard, type Property } from "@/components/property/PropertyCard";

// Mock data — replace with API call
const FEATURED: Property[] = [
  {
    id: "prop-001",
    slug: "3-bigha-residential-plot-khagra",
    title: "3 Bigha Residential Plot in Khagra — 20ft Road Access",
    type: "Residential",
    verificationLevel: "premium",
    buySafeScore: 88,
    buySafeScoreMax: 110,
    areaDisplay: "3 Bigha",
    locationDisplay: "Khagra, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&q=80",
    thumbnailBlur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBBEFEiExUf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGhEAAgMBAQAAAAAAAAAAAAAAAQIDEyEx/9oADAMBAAIRAxEAPwClAMvh5fE5OezmMuFvzxSvzxulx3e5JiF37QGlvX8dLkXtJT8d3XTiHwZl3e2lXk2Ja3vHlbgE3Vt7/9k=",
  },
  {
    id: "prop-002",
    slug: "commercial-shop-near-nh27",
    title: "Commercial Shop Space Near NH-27 — High Footfall Area",
    type: "Commercial",
    verificationLevel: "site_verified",
    buySafeScore: 72,
    buySafeScoreMax: 110,
    areaDisplay: "450 sq ft",
    locationDisplay: "Near NH-27, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1565515613-ef1e08b9a9a5?w=400&q=80",
  },
  {
    id: "prop-003",
    slug: "agricultural-land-terhagachh",
    title: "5 Bigha Agricultural Land — Riverfront — Terhagachh",
    type: "Agricultural",
    verificationLevel: "docs_verified",
    buySafeScore: 65,
    buySafeScoreMax: 110,
    areaDisplay: "5 Bigha",
    locationDisplay: "Terhagachh, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
  },
];

export default function FeaturedProperties() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "var(--space-5)",
      }}
      role="list"
      aria-label="Featured properties"
    >
      {FEATURED.map((property) => (
        <div key={property.id} role="listitem">
          <PropertyCard
            property={property}
            onSave={(id, saved) => {
              console.log(`Property ${id} saved: ${saved}`);
              // In production: update Zustand store
            }}
          />
        </div>
      ))}
    </div>
  );
}

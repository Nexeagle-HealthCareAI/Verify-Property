"use client";

import Link from "next/link";
import { PropertyCard, type Property } from "./PropertyCard";

const SIMILAR: Property[] = [
  {
    id: "prop-006",
    slug: "corner-plot-thakurganj",
    title: "Corner Residential Plot — East Facing — Thakurganj",
    type: "Residential",
    verificationLevel: "premium",
    buySafeScore: 92,
    buySafeScoreMax: 110,
    areaDisplay: "2 Bigha",
    locationDisplay: "Thakurganj, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
  },
  {
    id: "prop-004",
    slug: "rental-house-kochadhaman",
    title: "2BHK Rental House in Kochadhaman — Newly Built",
    type: "Rental",
    verificationLevel: "self_listed",
    buySafeScore: 45,
    buySafeScoreMax: 110,
    areaDisplay: "900 sq ft",
    locationDisplay: "Kochadhaman, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
];

export default function SimilarProperties({ currentSlug }: { currentSlug: string }) {
  const filtered = SIMILAR.filter((p) => p.slug !== currentSlug);

  return (
    <div className="scroll-x" style={{ gap: "var(--space-4)" }}>
      {filtered.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

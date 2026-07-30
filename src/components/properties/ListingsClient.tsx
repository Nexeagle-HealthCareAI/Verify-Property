"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, MapIcon, X } from "lucide-react";
import { PropertyCard, type Property } from "@/components/property/PropertyCard";

/* ── Mock data — replace with API call ── */
const ALL_PROPERTIES: Property[] = [
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
  {
    id: "prop-005",
    slug: "godown-warehouse-bahadurganj",
    title: "Large Godown for Rent — Bahadurganj Industrial Area",
    type: "Godown",
    verificationLevel: "site_verified",
    buySafeScore: 70,
    buySafeScoreMax: 110,
    areaDisplay: "3500 sq ft",
    locationDisplay: "Bahadurganj, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80",
  },
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
];

const CATEGORIES = ["All", "Residential", "Agricultural", "Commercial", "Godown", "Rental"];
const SORT_OPTIONS = [
  { value: "score-desc",  label: "BuySafe Score: High to Low" },
  { value: "score-asc",   label: "BuySafe Score: Low to High" },
  { value: "newest",      label: "Newest First" },
];

export default function ListingsClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("score-desc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [minScore, setMinScore] = useState(0);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  /* Read URL params */
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
  }, [searchParams]);

  /* Filter + Sort */
  const filtered = ALL_PROPERTIES
    .filter((p) => {
      if (activeCategory !== "All" && p.type !== activeCategory) return false;
      const pct = Math.round((p.buySafeScore / p.buySafeScoreMax) * 100);
      if (pct < minScore) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "score-desc") return b.buySafeScore - a.buySafeScore;
      if (sortBy === "score-asc")  return a.buySafeScore - b.buySafeScore;
      return 0;
    });

  const handleSave = useCallback((id: string, saved: boolean) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      saved ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
        padding: "var(--space-8) var(--space-4)",
        paddingTop: "calc(var(--nav-height-mobile) + var(--space-6))",
        color: "white",
      }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "var(--text-2xl)", marginBottom: "var(--space-2)" }}>
            Browse Verified Properties
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.75)", fontSize: "var(--text-sm)" }}>
            {filtered.length} properties found in Kishanganj
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-8)" }}>
        {/* Category chips + filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-5)", overflowX: "auto", paddingBottom: "var(--space-2)" }}>
          <div className="scroll-x" style={{ flex: 1, padding: 0 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`chip ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setFilterOpen(true)}
            aria-label="Open filters"
            style={{ flexShrink: 0 }}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Sort row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
            Showing <strong>{filtered.length}</strong> properties
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
            style={{ width: "auto", padding: "0.5rem var(--space-3)", fontSize: "var(--text-sm)" }}
            aria-label="Sort properties"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Property Grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--space-5)",
            }}
            role="list"
            aria-label="Property listings"
          >
            {filtered.map((property) => (
              <div key={property.id} role="listitem">
                <PropertyCard
                  property={property}
                  onSave={handleSave}
                  initialSaved={savedIds.has(property.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "var(--space-16)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>🔍</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
              No Properties Found
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-5)" }}>
              Try adjusting your filters or{" "}
              <a href="/properties?action=looking" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                tell us what you&apos;re looking for
              </a>.
            </p>
            <button className="btn btn-outline" onClick={() => { setActiveCategory("All"); setMinScore(0); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet */}
      {filterOpen && (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setFilterOpen(false)} aria-hidden="true" />
          <div role="dialog" aria-modal="true" aria-label="Property filters" className="bottom-sheet">
            <div className="bottom-sheet-handle" />
            <div style={{ padding: "0 var(--space-5) var(--space-5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-5)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>Filters</h3>
                <button
                  onClick={() => setFilterOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Minimum BuySafe Score */}
              <div className="form-group">
                <label className="input-label" htmlFor="min-score">
                  Minimum BuySafe Score™: <strong>{minScore}%</strong>
                </label>
                <input
                  id="min-score"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--color-primary)" }}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={minScore}
                />
              </div>

              <button
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: "var(--space-4)" }}
                onClick={() => setFilterOpen(false)}
              >
                Apply Filters ({filtered.length} results)
              </button>
              <button
                className="btn btn-ghost"
                style={{ width: "100%", justifyContent: "center", marginTop: "var(--space-2)" }}
                onClick={() => { setMinScore(0); setFilterOpen(false); }}
              >
                Reset All
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X, Star } from "lucide-react";
import { VerificationBadge } from "@/components/property/VerificationBadge";
import type { Property } from "@/components/property/PropertyCard";

/* Compare table rows */
interface CompareRow {
  label: string;
  values: (prop: Property) => string | React.ReactNode;
  highlight?: boolean;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-001",
    slug: "3-bigha-residential-plot-khagra",
    title: "3 Bigha Residential Plot — Khagra",
    type: "Residential",
    verificationLevel: "premium",
    buySafeScore: 88,
    buySafeScoreMax: 110,
    areaDisplay: "3 Bigha",
    locationDisplay: "Khagra, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=200&q=80",
  },
  {
    id: "prop-006",
    slug: "corner-plot-thakurganj",
    title: "Corner Plot — Thakurganj",
    type: "Residential",
    verificationLevel: "premium",
    buySafeScore: 92,
    buySafeScoreMax: 110,
    areaDisplay: "2 Bigha",
    locationDisplay: "Thakurganj, Kishanganj",
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=80",
  },
];

export default function CompareClient() {
  const [selected, setSelected] = useState<Property[]>(MOCK_PROPERTIES);

  const remove = (id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  const maxScore = Math.max(...selected.map((p) => p.buySafeScore));

  return (
    <div className="container" style={{ paddingBlock: "var(--space-8)" }}>
      {/* Header */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <div className="section-tag">⚖️ Side-by-Side</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "var(--text-2xl)" }}>
          Compare Properties
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-2)" }}>
          Compare up to 3 properties to make the best decision.
        </p>
      </div>

      {selected.length === 0 ? (
        <div style={{ textAlign: "center", padding: "var(--space-16)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>⚖️</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
            No Properties to Compare
          </h3>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-5)" }}>
            Add properties to compare by clicking &quot;Add to Compare&quot; on any listing.
          </p>
          <Link href="/properties" className="btn btn-primary">
            Browse Properties
          </Link>
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }} role="table" aria-label="Property comparison">
            <thead>
              <tr>
                <th
                  style={{
                    padding: "var(--space-4)",
                    textAlign: "left",
                    background: "var(--surface-bg)",
                    borderBottom: "1px solid var(--color-border)",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-muted)",
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                  }}
                  scope="col"
                >
                  Feature
                </th>
                {selected.map((prop) => (
                  <th
                    key={prop.id}
                    style={{
                      padding: "var(--space-4)",
                      textAlign: "left",
                      background: prop.buySafeScore === maxScore ? "hsl(220 85% 28% / 0.06)" : "var(--surface-card)",
                      borderBottom: "1px solid var(--color-border)",
                      borderLeft: "1px solid var(--color-border)",
                      minWidth: 200,
                    }}
                    scope="col"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-2)" }}>
                      <div>
                        {prop.buySafeScore === maxScore && (
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 4,
                            background: "hsl(38 95% 52% / 0.15)", color: "var(--color-accent-dark)",
                            borderRadius: "var(--radius-pill)", padding: "2px 8px",
                            fontSize: "10px", fontWeight: 700, marginBottom: "var(--space-2)",
                          }}>
                            <Star size={10} aria-hidden="true" /> Best Score
                          </span>
                        )}
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "var(--text-sm)", lineHeight: 1.3 }}>
                          {prop.title}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(prop.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", flexShrink: 0 }}
                        aria-label={`Remove ${prop.title} from comparison`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </th>
                ))}
                {/* Add property slot */}
                {selected.length < 3 && (
                  <th style={{
                    padding: "var(--space-4)",
                    textAlign: "center",
                    background: "var(--surface-bg)",
                    borderBottom: "1px solid var(--color-border)",
                    borderLeft: "1px solid var(--color-border)",
                    minWidth: 180,
                  }}>
                    <Link
                      href="/properties"
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: "var(--space-2)", color: "var(--color-primary)",
                        textDecoration: "none",
                      }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: "var(--radius-pill)",
                        border: "2px dashed var(--color-primary)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Plus size={18} />
                      </div>
                      <span style={{ fontSize: "var(--text-xs)", fontWeight: 600 }}>Add Property</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Location",        key: (p: Property) => p.locationDisplay },
                { label: "Area",            key: (p: Property) => p.areaDisplay },
                { label: "Property Type",   key: (p: Property) => p.type },
                {
                  label: "Verification",
                  key: (p: Property) => <VerificationBadge level={p.verificationLevel} size="sm" />,
                },
                {
                  label: "BuySafe Score™",
                  key: (p: Property) => (
                    <span style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "var(--text-lg)",
                      color: p.buySafeScore === maxScore ? "var(--color-success)" : "var(--color-text-primary)",
                    }}>
                      {p.buySafeScore}/{p.buySafeScoreMax}
                    </span>
                  ),
                },
              ].map(({ label, key }) => (
                <tr key={label} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{
                    padding: "var(--space-4)",
                    fontWeight: 500,
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    background: "var(--surface-bg)",
                    position: "sticky",
                    left: 0,
                    borderRight: "1px solid var(--color-border)",
                  }}>
                    {label}
                  </td>
                  {selected.map((prop) => (
                    <td
                      key={prop.id}
                      style={{
                        padding: "var(--space-4)",
                        fontSize: "var(--text-sm)",
                        borderLeft: "1px solid var(--color-border)",
                        background: prop.buySafeScore === maxScore ? "hsl(220 85% 28% / 0.03)" : "white",
                      }}
                    >
                      {key(prop)}
                    </td>
                  ))}
                  {selected.length < 3 && (
                    <td style={{ padding: "var(--space-4)", borderLeft: "1px solid var(--color-border)", background: "var(--surface-bg)" }} />
                  )}
                </tr>
              ))}

              {/* CTA row */}
              <tr>
                <td style={{ padding: "var(--space-4)", background: "var(--surface-bg)", position: "sticky", left: 0, borderRight: "1px solid var(--color-border)" }} />
                {selected.map((prop) => (
                  <td key={prop.id} style={{ padding: "var(--space-4)", borderLeft: "1px solid var(--color-border)", background: prop.buySafeScore === maxScore ? "hsl(220 85% 28% / 0.03)" : "white" }}>
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="btn btn-primary btn-sm"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      View Property
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

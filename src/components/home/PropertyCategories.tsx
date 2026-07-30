"use client";

import Link from "next/link";

const CATEGORIES = [
  { emoji: "🏡", label: "Residential",   href: "/properties?category=residential",  color: "hsl(220, 85%, 28%)" },
  { emoji: "🌾", label: "Agricultural",  href: "/properties?category=agricultural", color: "hsl(145, 60%, 38%)" },
  { emoji: "🏢", label: "Commercial",    href: "/properties?category=commercial",   color: "hsl(250, 70%, 58%)" },
  { emoji: "🏪", label: "Shops",         href: "/properties?category=shop",         color: "hsl(38, 95%, 45%)"  },
  { emoji: "🏬", label: "Godowns",       href: "/properties?category=godown",       color: "hsl(168, 60%, 38%)" },
  { emoji: "🏠", label: "Rental Houses", href: "/properties?type=rent",             color: "hsl(0, 68%, 48%)"   },
];

export function PropertyCategories() {
  return (
    <section className="section" style={{ background: "var(--surface-dark)", color: "white" }} aria-labelledby="categories-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ background: "hsl(38 95% 52% / 0.15)", color: "var(--color-accent-light)" }}>
            🏘️ Browse By Type
          </div>
          <h2 id="categories-heading" className="section-title" style={{ color: "white" }}>
            Property Categories
          </h2>
          <p className="section-desc" style={{ color: "hsl(0 0% 100% / 0.65)" }}>
            Find exactly what you&apos;re looking for across all property types in Kishanganj.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "var(--space-4)",
          }}
          role="list"
        >
          {CATEGORIES.map(({ emoji, label, href, color }, i) => (
            <Link
              key={label}
              href={href}
              role="listitem"
              style={{ textDecoration: "none" }}
              className="animate-fade-up"
              style={{
                textDecoration: "none",
                animationDelay: `${i * 60}ms`,
              } as React.CSSProperties}
            >
              <div
                style={{
                  background: "hsl(0 0% 100% / 0.06)",
                  border: "1px solid hsl(0 0% 100% / 0.10)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-5) var(--space-4)",
                  textAlign: "center",
                  transition: "background var(--transition-base), border-color var(--transition-base), transform var(--transition-base)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${color}22`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}80`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 100% / 0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 100% / 0.10)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-2)" }} aria-hidden="true">
                  {emoji}
                </div>
                <p style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  color: "white",
                }}>
                  {label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 3-col on tablet+ */}
        <style>{`
          @media (min-width: 640px) {
            #categories-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (min-width: 1024px) {
            #categories-grid { grid-template-columns: repeat(6, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

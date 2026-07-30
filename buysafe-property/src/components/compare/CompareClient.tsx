"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X, Star, ArrowRight, LayoutList, MapPin, Maximize, ShieldCheck, TrendingUp } from "lucide-react";
import { VerificationBadge } from "@/components/property/VerificationBadge";
import type { Property } from "@/components/property/PropertyCard";
import { motion, AnimatePresence } from "framer-motion";

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

  const maxScore = selected.length > 0 ? Math.max(...selected.map((p) => p.buySafeScore)) : 0;

  return (
    <div style={{ paddingBottom: "var(--space-16)" }}>
      {/* ── Header ── */}
      <section style={{
        background: "var(--color-primary-dark)",
        color: "white",
        padding: "calc(var(--space-12) + var(--space-4)) var(--space-4) var(--space-8)",
        textAlign: "center",
      }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "hsl(0 0% 100% / 0.1)", backdropFilter: "blur(8px)",
              padding: "6px 16px", borderRadius: "100px", fontSize: "12px",
              fontWeight: 600, color: "var(--color-accent-light)", marginBottom: "var(--space-4)"
            }}>
              ⚖️ Side-by-Side Analysis
            </div>
            
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "var(--space-2)" }}>
              Compare Properties
            </h1>
            <p style={{ color: "hsl(0 0% 100% / 0.7)", maxWidth: 600, margin: "0 auto", fontSize: "1.05rem" }}>
              Evaluate up to 3 properties objectively using our BuySafe Score™ and verified data points.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ marginTop: "-var(--space-4)", position: "relative", zIndex: 10 }}>
        {selected.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", padding: "var(--space-16)", background: "var(--surface-card)", borderRadius: "var(--radius-xl)", border: "1px dashed var(--color-border)", boxShadow: "var(--shadow-md)" }}
          >
            <div style={{ background: "var(--color-primary-light)", width: 80, height: 80, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginInline: "auto", marginBottom: "var(--space-6)" }}>
              <LayoutList size={32} color="white" />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--space-3)" }}>
              Your comparison list is empty
            </h3>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)", maxWidth: 400, marginInline: "auto" }}>
              Add properties to compare by clicking the &quot;Compare&quot; button on any listing page to see how they stack up.
            </p>
            <Link href="/properties" className="btn btn-primary" style={{ padding: "12px 32px", borderRadius: "100px" }}>
              Browse Properties <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ 
              background: "var(--surface-card)", borderRadius: "var(--radius-xl)", 
              border: "1px solid var(--color-border)", boxShadow: "var(--shadow-xl)",
              overflow: "hidden"
            }}
          >
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
                <thead>
                  <tr>
                    {/* Feature Label Header (Sticky Left) */}
                    <th style={{
                      padding: "var(--space-6)", textAlign: "left", background: "var(--surface-light)",
                      borderBottom: "2px solid var(--color-border)", position: "sticky", left: 0, zIndex: 2,
                      width: "200px"
                    }} />
                    
                    {/* Property Headers */}
                    <AnimatePresence>
                      {selected.map((prop) => {
                        const isBest = prop.buySafeScore === maxScore;
                        return (
                          <motion.th 
                            key={prop.id} layout initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }}
                            style={{
                              padding: "var(--space-6)", textAlign: "left", minWidth: 260,
                              background: isBest ? "hsl(38 100% 98%)" : "white",
                              borderBottom: "2px solid var(--color-border)", borderLeft: "1px solid var(--color-border)",
                              position: "relative", verticalAlign: "top"
                            }}
                          >
                            <button 
                              onClick={() => remove(prop.id)}
                              style={{ position: "absolute", top: 16, right: 16, background: "var(--surface-light)", border: "none", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-text-muted)" }}
                              aria-label="Remove property"
                            >
                              <X size={14} />
                            </button>
                            
                            {isBest && (
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--color-accent)", color: "var(--color-primary-dark)", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", marginBottom: "12px", boxShadow: "0 4px 10px hsl(38 96% 56% / 0.3)" }}>
                                <Star size={12} fill="currentColor" /> Highest Score
                              </div>
                            )}

                            <div style={{ width: "100%", height: 120, borderRadius: "12px", overflow: "hidden", marginBottom: "16px", background: "var(--surface-dark)", position: "relative" }}>
                              <img src={prop.thumbnail} alt={prop.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
                            </div>

                            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "8px", color: "var(--text-primary)" }}>
                              {prop.title}
                            </h3>
                            <Link href={`/properties/${prop.slug}`} style={{ color: "var(--color-primary)", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                              View Details &rarr;
                            </Link>
                          </motion.th>
                        );
                      })}
                    </AnimatePresence>

                    {/* Empty Slot */}
                    {selected.length < 3 && (
                      <th style={{
                        padding: "var(--space-6)", textAlign: "center", verticalAlign: "middle",
                        background: "var(--surface-light)", borderBottom: "2px solid var(--color-border)", borderLeft: "1px dashed var(--color-border)",
                        minWidth: 260
                      }}>
                        <Link href="/properties" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: "var(--color-text-muted)", textDecoration: "none" }}>
                          <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px dashed var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
                            <Plus size={24} />
                          </div>
                          <span style={{ fontSize: "14px", fontWeight: 600 }}>Add Property</span>
                        </Link>
                      </th>
                    )}
                  </tr>
                </thead>
                
                <tbody>
                  {[
                    { icon: <MapPin size={18} />, label: "Location", key: (p: Property) => p.locationDisplay },
                    { icon: <Maximize size={18} />, label: "Area", key: (p: Property) => p.areaDisplay },
                    { icon: <LayoutList size={18} />, label: "Property Type", key: (p: Property) => p.type },
                    { icon: <ShieldCheck size={18} />, label: "Verification", key: (p: Property) => <VerificationBadge level={p.verificationLevel} size="sm" /> },
                    { 
                      icon: <TrendingUp size={18} />, 
                      label: "BuySafe Score", 
                      key: (p: Property) => (
                        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                          <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, color: p.buySafeScore === maxScore ? "var(--color-success)" : "var(--color-text-primary)" }}>
                            {p.buySafeScore}
                          </span>
                          <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>/ {p.buySafeScoreMax}</span>
                        </div>
                      )
                    },
                  ].map((row, i) => (
                    <tr key={row.label} style={{ borderBottom: i === 4 ? "none" : "1px solid var(--color-border)" }}>
                      <td style={{
                        padding: "var(--space-5)", background: "var(--surface-light)", position: "sticky", left: 0, zIndex: 1,
                        borderRight: "1px solid var(--color-border)", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "14px",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ color: "var(--color-primary)", opacity: 0.7 }}>{row.icon}</div>
                          {row.label}
                        </div>
                      </td>
                      {selected.map((prop) => (
                        <td key={prop.id} style={{
                          padding: "var(--space-5)", borderLeft: "1px solid var(--color-border)",
                          background: prop.buySafeScore === maxScore ? "hsl(38 100% 98%)" : "white",
                          color: "var(--color-text-primary)", fontSize: "15px", fontWeight: 500
                        }}>
                          {row.key(prop)}
                        </td>
                      ))}
                      {selected.length < 3 && (
                        <td style={{ padding: "var(--space-5)", borderLeft: "1px dashed var(--color-border)", background: "var(--surface-light)" }} />
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

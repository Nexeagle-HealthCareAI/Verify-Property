"use client";

import Link from "next/link";
import { useFavourites } from "@/lib/stores/propertyStore";
import { PropertyCard } from "@/components/property/PropertyCard";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ArrowRight } from "lucide-react";

export default function FavouritesClient() {
  const { favourites, removeFavourite, clearAll } = useFavourites();

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
              ❤️ Your Shortlist
            </div>
            
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "var(--space-2)" }}>
              Saved Properties
            </h1>
            <p style={{ color: "hsl(0 0% 100% / 0.7)", maxWidth: 600, margin: "0 auto", fontSize: "1.05rem" }}>
              Keep track of the properties you love. Compare them or schedule a visit when you're ready.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ marginTop: "-var(--space-4)", position: "relative", zIndex: 10 }}>
        {favourites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", padding: "var(--space-16)", background: "var(--surface-card)", borderRadius: "var(--radius-xl)", border: "1px dashed var(--color-border)", boxShadow: "var(--shadow-md)" }}
          >
            <div style={{ background: "var(--color-primary-light)", width: 80, height: 80, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginInline: "auto", marginBottom: "var(--space-6)" }}>
              <Heart size={32} color="white" />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--space-3)" }}>
              No Saved Properties
            </h3>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)", maxWidth: 400, marginInline: "auto" }}>
              Tap the heart icon on any property to save it here for quick access later.
            </p>
            <Link href="/properties" className="btn btn-primary" style={{ padding: "12px 32px", borderRadius: "100px" }}>
              Browse Properties <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)", padding: "var(--space-4)", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
              <span style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>
                {favourites.length} {favourites.length === 1 ? "Property" : "Properties"} Saved
              </span>
              <button 
                onClick={clearAll}
                className="btn btn-ghost btn-sm" 
                style={{ color: "var(--color-danger)" }}
              >
                <Trash2 size={16} /> Clear All
              </button>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-6)" }} role="list">
              <AnimatePresence>
                {favourites.map((property, index) => (
                  <motion.div 
                    key={property.id} 
                    role="listitem"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PropertyCard
                      property={property}
                      onSave={(id, saved) => {
                        if (!saved) removeFavourite(id);
                      }}
                      initialSaved={true}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, FileCheck, Crown, ArrowRight, ShieldAlert } from "lucide-react";

const TIERS = [
  {
    tier: 1,
    title: "Self Listed",
    icon: <ShieldAlert className="tier-icon" size={28} color="#94a3b8" />,
    color: "#94a3b8",
    bg: "hsl(215 15% 95%)",
    desc: "Properties listed directly by sellers. Basic details are provided but not independently verified by BuySafe.",
    checks: ["Basic Property Details", "Seller Contact Info", "Approximate Location"],
  },
  {
    tier: 2,
    title: "Docs Verified",
    icon: <FileCheck className="tier-icon" size={28} color="#3b82f6" />,
    color: "#3b82f6",
    bg: "hsl(217 91% 95%)",
    desc: "Our legal team has reviewed the core property documents to ensure initial title clarity.",
    checks: ["Deed / Registry Copy", "Current Jamabandi (Mutation)", "Seller ID Match"],
  },
  {
    tier: 3,
    title: "Site Verified",
    icon: <ShieldCheck className="tier-icon" size={28} color="#10b981" />,
    color: "#10b981",
    bg: "hsl(160 84% 95%)",
    desc: "Our field team has physically visited the property to confirm its existence, condition, and boundaries.",
    checks: ["Physical Inspection", "Road Access Confirmed", "Live Photos & Video Taken"],
  },
  {
    tier: 4,
    title: "Premium Verified",
    icon: <Crown className="tier-icon" size={28} color="#f59e0b" />,
    color: "#f59e0b",
    bg: "hsl(43 96% 92%)",
    desc: "The ultimate peace of mind. Both documents and site are verified, plus deep legal checks including encumbrances.",
    checks: ["Docs & Site Verified", "Non-Encumbrance Certificate", "Court Dispute Check", "Boundary Measurement"],
  },
];

export default function VerifyPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* ── Hero ── */}
      <section style={{
        background: "var(--color-primary-dark)",
        color: "white",
        padding: "calc(var(--space-12) + var(--space-4)) var(--space-4)",
        textAlign: "center",
        borderBottom: "1px solid hsl(0 0% 100% / 0.1)",
      }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "hsl(0 0% 100% / 0.1)", backdropFilter: "blur(8px)",
              padding: "6px 16px", borderRadius: "100px", fontSize: "12px",
              fontWeight: 600, color: "var(--color-accent-light)", marginBottom: "var(--space-6)"
            }}>
              🔒 Trust & Safety Standards
            </div>
            
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "var(--space-4)" }}>
              We don't just list.<br />
              <span style={{ color: "var(--color-accent)" }}>We verify.</span>
            </h1>
            
            <p style={{ color: "hsl(0 0% 100% / 0.7)", maxWidth: 600, margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Understand our 4-tier verification process designed to protect buyers from fraud and hidden disputes in Kishanganj.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <div className="container" style={{ padding: "var(--space-12) var(--space-4)" }}>
        <div style={{ maxWidth: 800, marginInline: "auto", position: "relative" }}>
          
          {/* Vertical Line */}
          <div style={{ 
            position: "absolute", left: "28px", top: 0, bottom: 0, width: "2px", 
            background: "linear-gradient(to bottom, var(--color-border), transparent)" 
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
            {TIERS.map((t, index) => (
              <motion.div 
                key={t.tier} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ display: "flex", gap: "var(--space-6)", position: "relative" }}
              >
                {/* Node */}
                <div style={{ 
                  flexShrink: 0, width: 56, height: 56, borderRadius: "50%", 
                  background: t.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  border: `2px solid ${t.color}`, zIndex: 2, position: "relative",
                  boxShadow: `0 0 20px ${t.color}33`
                }}>
                  {t.icon}
                </div>

                {/* Content */}
                <div style={{ 
                  background: "var(--surface-card)", padding: "var(--space-6)", 
                  borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", 
                  boxShadow: "var(--shadow-md)", flex: 1
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-2)" }}>
                    <span style={{ color: t.color, fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Tier {t.tier}</span>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                      {t.title}
                    </h2>
                  </div>
                  
                  <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-5)", lineHeight: 1.6, fontSize: "15px" }}>
                    {t.desc}
                  </p>
                  
                  <div style={{ background: "var(--surface-light)", padding: "var(--space-4)", borderRadius: "var(--radius-lg)" }}>
                    <h4 style={{ fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "var(--space-3)", color: "var(--color-text-muted)" }}>Included Checks:</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                      {t.checks.map((check) => (
                        <div key={check} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "var(--color-text-primary)", fontWeight: 500 }}>
                          <CheckCircle2 size={16} color={t.color} style={{ flexShrink: 0, marginTop: 2 }} /> 
                          {check}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              marginTop: "var(--space-12)", textAlign: "center", padding: "var(--space-8)", 
              background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))", 
              borderRadius: "var(--radius-xl)", color: "white", boxShadow: "var(--shadow-xl)" 
            }}
          >
            <Crown size={40} color="var(--color-accent)" style={{ margin: "0 auto var(--space-4)" }} />
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "var(--space-3)" }}>
              Ready to find a safe property?
            </h3>
            <p style={{ color: "hsl(0 0% 100% / 0.8)", marginBottom: "var(--space-6)", fontSize: "1.1rem" }}>
              Browse our verified listings and look for the trust badges.
            </p>
            <Link href="/properties" className="btn btn-accent btn-lg" style={{ display: "inline-flex", boxShadow: "0 8px 32px hsl(38 96% 56% / 0.3)" }}>
              Browse Verified Properties <ArrowRight size={18} />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

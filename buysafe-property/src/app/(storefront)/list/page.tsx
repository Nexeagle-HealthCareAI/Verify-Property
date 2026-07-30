"use client";

import { motion } from "framer-motion";
import { EyeOff, BadgeIndianRupee, Sparkles, ShieldCheck } from "lucide-react";
import SellerForm from "./SellerForm";

const BENEFITS = [
  {
    icon: <BadgeIndianRupee size={24} color="var(--color-primary-dark)" />,
    title: "0% Brokerage",
    desc: "We don't charge you a single rupee. Our fees are paid entirely by the buyer.",
  },
  {
    icon: <EyeOff size={24} color="var(--color-primary-dark)" />,
    title: "Privacy First",
    desc: "Your asking price is never published publicly. We only reveal it to verified, serious buyers.",
  },
  {
    icon: <Sparkles size={24} color="var(--color-primary-dark)" />,
    title: "Qualified Buyers Only",
    desc: "Stop dealing with time-wasters. We filter and financially verify every buyer beforehand.",
  },
];

export default function ListPropertyPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* ── Split Layout ── */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - var(--nav-height-mobile))" }}>
        
        {/* Top: Mobile Hero / Left: Desktop Hero */}
        <section style={{
          background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))",
          color: "white",
          padding: "var(--space-12) var(--space-4)",
          textAlign: "center",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          zIndex: 2,
        }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ 
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "hsl(0 0% 100% / 0.15)", backdropFilter: "blur(8px)",
                padding: "6px 16px", borderRadius: "100px", fontSize: "12px",
                fontWeight: 600, color: "var(--color-accent-light)", marginBottom: "var(--space-6)"
              }}>
                📢 Sell Faster, Keep 100%
              </div>
              
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "var(--space-4)" }}>
                List your property.<br />
                <span style={{ color: "var(--color-accent)" }}>Zero broker fees.</span>
              </h1>
              
              <p style={{ color: "hsl(0 0% 100% / 0.8)", margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.6 }}>
                Join hundreds of sellers in Kishanganj who trust BuySafe to find verified buyers without paying a commission.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Container (Overlapping) */}
        <div className="container" style={{ marginTop: "-var(--space-8)", position: "relative", zIndex: 10, paddingBottom: "var(--space-12)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-8)", alignItems: "start" }}>
            
            {/* The Form Wizard */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <SellerForm />
            </motion.div>

            {/* The Benefits */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ padding: "var(--space-4)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-8)" }}>
                <ShieldCheck size={28} color="var(--color-primary)" />
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700 }}>The BuySafe Promise</h3>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                {BENEFITS.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px" }}>
                    <div style={{ 
                      flexShrink: 0, background: "var(--color-accent)", width: 48, height: 48, 
                      borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 8px 16px hsl(38 96% 56% / 0.2)"
                    }}>
                      {b.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px" }}>{b.title}</h4>
                      <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.5 }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserCheck, Shield, Search, Handshake, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

const SERVICES = [
  {
    icon: <Search size={28} color="var(--color-accent-light)" />,
    title: "Curated Property Hunting",
    desc: "We listen to your requirements and shortlist properties that actually match your needs and budget, saving you hours of frustrating site visits.",
  },
  {
    icon: <Shield size={28} color="var(--color-accent-light)" />,
    title: "Deep Legal & Site Verification",
    desc: "Our legal team checks the title deed, mutation records (Jamabandi), and court disputes. We physically inspect the property for hidden flaws.",
  },
  {
    icon: <Handshake size={28} color="var(--color-accent-light)" />,
    title: "Aggressive Negotiation",
    desc: "Because we represent YOU and not the seller, our sole goal is to get you the lowest possible price. We often save clients more than our fee.",
  },
  {
    icon: <UserCheck size={28} color="var(--color-accent-light)" />,
    title: "Registry & Mutation Concierge",
    desc: "We handle the end-to-end paperwork, from drafting the initial agreement to final registry and helping you apply for mutation.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

export default function BuyerAgentPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* ── Hero Concierge Style ── */}
      <section style={{
        position: "relative",
        background: "var(--color-primary-dark)",
        color: "white",
        padding: "calc(var(--space-12) + var(--space-4)) var(--space-4) var(--space-16)",
        overflow: "hidden",
      }}>
        {/* Subtle grid and gradient */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(hsl(0 0% 100% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "100vw", height: "50vh", background: "radial-gradient(ellipse, var(--color-primary) 0%, transparent 70%)",
          opacity: 0.8
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "hsl(38 95% 52% / 0.15)", border: "1px solid hsl(38 95% 52% / 0.3)",
              padding: "6px 16px", borderRadius: "100px", fontSize: "12px",
              fontWeight: 600, color: "var(--color-accent-light)", marginBottom: "var(--space-6)"
            }}>
              🤝 Exclusive Buyer Representation
            </div>
            
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: "var(--space-4)" }}>
              We work for you.<br />
              <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>Not the seller.</span>
            </h1>
            
            <p style={{ color: "hsl(0 0% 100% / 0.7)", maxWidth: 600, margin: "0 auto var(--space-8)", fontSize: "1.1rem", lineHeight: 1.6 }}>
              A traditional broker gets paid more when you pay more. A BuySafe Buyer's Agent protects your interests, verifies everything, and negotiates the lowest price.
            </p>
            
            <Link href="tel:+919876543210" className="btn btn-accent btn-lg" style={{ display: "inline-flex", boxShadow: "0 8px 32px hsl(38 96% 56% / 0.3)" }}>
              Hire Your Agent Today
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ position: "relative", zIndex: 10, marginTop: "-var(--space-8)", paddingBottom: "var(--space-16)" }}>
        
        {/* ── Comparison Matrix (Glassmorphic) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-16)" }}
        >
          {/* Traditional Broker */}
          <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", padding: "var(--space-8)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", borderTop: "4px solid var(--color-danger)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--space-6)", color: "var(--text-primary)" }}>Traditional Broker</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {[
                "Paid by the seller (conflict of interest)",
                "Tries to get the highest possible price",
                "Often hides property flaws to close the deal",
                "Does not perform deep legal verification",
                "Leaves you alone for the registry process"
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--color-text-muted)", fontSize: "15px", lineHeight: 1.5 }}>
                  <XCircle size={20} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: 2 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* BuySafe Agent */}
          <div style={{ background: "linear-gradient(145deg, var(--color-primary-dark), var(--color-primary))", borderRadius: "var(--radius-xl)", padding: "var(--space-8)", color: "white", boxShadow: "0 20px 40px hsl(220 80% 20% / 0.2)", borderTop: "4px solid var(--color-accent)", transform: "scale(1.02)", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-6)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700 }}>BuySafe Agent</h3>
              <div style={{ background: "var(--color-accent-light)", color: "var(--color-primary-dark)", fontSize: "10px", fontWeight: 800, padding: "4px 8px", borderRadius: "100px", textTransform: "uppercase" }}>Recommended</div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {[
                "Represents ONLY the buyer",
                "Negotiates aggressively for the lowest price",
                "Provides an honest 'Before You Buy' report",
                "Conducts 4-tier legal & physical verification",
                "End-to-end concierge for registry & mutation"
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "hsl(0 0% 100% / 0.9)", fontSize: "15px", lineHeight: 1.5 }}>
                  <CheckCircle2 size={20} color="var(--color-accent-light)" style={{ flexShrink: 0, marginTop: 2 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Services Staggered Grid ── */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "var(--space-4)" }}>
            End-to-End Concierge
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
            We handle the headaches so you can enjoy the excitement of buying your new property.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}
        >
          {SERVICES.map((s, i) => (
            <motion.div key={i} variants={itemVariants} style={{ background: "var(--surface-card)", padding: "var(--space-8)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", transition: "transform 0.3s ease", cursor: "default" }} whileHover={{ y: -5 }}>
              <div style={{ background: "var(--color-primary-dark)", width: 64, height: 64, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--space-6)", boxShadow: "0 10px 20px hsl(220 80% 20% / 0.1)" }}>
                {s.icon}
              </div>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "var(--space-3)" }}>{s.title}</h4>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { UserCheck, Shield, Search, Handshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Buyer's Agent Services — BuySafe Property",
  description: "Learn how a Buyer's Agent protects your interests, negotiates on your behalf, and handles all legal checks during a property purchase in Kishanganj.",
};

const SERVICES = [
  {
    icon: <Search size={32} color="var(--color-primary)" />,
    title: "1. Property Hunting",
    desc: "We listen to your requirements and shortlist properties that actually match your needs and budget, saving you time and frustration.",
  },
  {
    icon: <Shield size={32} color="var(--color-primary)" />,
    title: "2. Legal & Site Verification",
    desc: "Our legal team checks the title deed, mutation records (Jamabandi), and court disputes. We also physically inspect the property.",
  },
  {
    icon: <Handshake size={32} color="var(--color-primary)" />,
    title: "3. Negotiation",
    desc: "We negotiate the price on your behalf. Because we represent you (the buyer) and not the seller, our goal is to get you the lowest possible price.",
  },
  {
    icon: <UserCheck size={32} color="var(--color-primary)" />,
    title: "4. Registry & Mutation",
    desc: "We handle the end-to-end paperwork, from drafting the agreement to final registry and helping you apply for mutation.",
  },
];

export default function BuyerAgentPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))",
        color: "white",
        padding: "var(--space-12) var(--space-4)",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="section-tag" style={{ background: "hsl(38 95% 52% / 0.15)", color: "var(--color-accent-light)", marginInline: "auto" }}>
            🤝 100% Buyer Focused
          </div>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "var(--text-3xl)", marginTop: "var(--space-3)", marginBottom: "var(--space-3)",
          }}>
            What is a Buyer's Agent?
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.8)", maxWidth: 600, marginInline: "auto", fontSize: "var(--text-lg)" }}>
            Traditional brokers represent the seller to get the highest price. A Buyer's Agent represents YOU to get the best deal safely.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ maxWidth: 900, marginInline: "auto" }}>
          
          {/* Comparison */}
          <div style={{ marginBottom: "var(--space-12)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)" }}>
            <div className="card" style={{ padding: "var(--space-6)", borderTop: "4px solid var(--color-danger)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>Traditional Broker</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)", color: "var(--color-text-muted)" }}>
                <li>❌ Paid by the seller</li>
                <li>❌ Tries to get the highest price</li>
                <li>❌ Hides property flaws to close the deal</li>
                <li>❌ Doesn't verify legal documents</li>
              </ul>
            </div>
            
            <div className="card" style={{ padding: "var(--space-6)", borderTop: "4px solid var(--color-success)", background: "var(--color-primary-light)", color: "white" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>BuySafe Buyer's Agent</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)", color: "hsl(0 0% 100% / 0.9)" }}>
                <li>✅ Represents only the buyer</li>
                <li>✅ Negotiates for the lowest price</li>
                <li>✅ Provides the honest "Before You Buy" report</li>
                <li>✅ Conducts full legal & physical verification</li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", textAlign: "center", marginBottom: "var(--space-8)" }}>
            End-to-End Assistance
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--space-6)" }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: "var(--surface-light)", padding: "var(--space-6)", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
                <div style={{ background: "white", width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginInline: "auto", marginBottom: "var(--space-4)", boxShadow: "var(--shadow-sm)" }}>
                  {s.icon}
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>{s.title}</h4>
                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: "var(--space-12)", textAlign: "center", padding: "var(--space-8)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-xl)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-3)" }}>
              Hire a Buyer's Agent Today
            </h3>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}>
              Contact us for pricing details. We charge a flat transparent fee — no hidden commissions.
            </p>
            <Link href="tel:+919876543210" className="btn btn-primary">
              Call Us to Discuss
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

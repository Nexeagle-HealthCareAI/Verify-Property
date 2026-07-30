import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, FileCheck, Crown, ArrowRight } from "lucide-react";
import { VerificationTierDisplay } from "@/components/property/VerificationBadge";

export const metadata: Metadata = {
  title: "Property Verification — BuySafe Property",
  description: "Understand our 4-tier property verification process in Kishanganj. We verify legal documents, ownership, and physical sites so you can buy safely.",
};

const TIERS = [
  {
    tier: 1,
    title: "Self Listed",
    icon: <CheckCircle2 className="tier-icon" size={24} color="#666" />,
    desc: "Properties listed directly by sellers or agents. Basic details are provided but not yet independently verified by BuySafe.",
    checks: ["Basic Property Details", "Seller Contact Info", "Approximate Location"],
  },
  {
    tier: 2,
    title: "Docs Verified",
    icon: <FileCheck className="tier-icon" size={24} color="#3b82f6" />,
    desc: "Our legal team has reviewed the core property documents to ensure initial title clarity.",
    checks: ["Deed / Registry Copy", "Current Jamabandi (Mutation)", "Seller ID Match"],
  },
  {
    tier: 3,
    title: "Site Verified",
    icon: <ShieldCheck className="tier-icon" size={24} color="#10b981" />,
    desc: "Our field team has physically visited the property to confirm its existence, condition, and boundaries.",
    checks: ["Physical Inspection", "Road Access Confirmed", "Live Photos & Video Taken"],
  },
  {
    tier: 4,
    title: "Premium Verified",
    icon: <Crown className="tier-icon" size={24} color="#f59e0b" />,
    desc: "The ultimate peace of mind. Both documents and site are verified, plus deep legal checks including encumbrance certificates.",
    checks: ["Docs & Site Verified", "Non-Encumbrance Certificate", "Court Dispute Check", "Boundary Measurement"],
  },
];

export default function VerifyPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)" }}>
      {/* Hero */}
      <div style={{
        background: "var(--color-primary)",
        color: "white",
        padding: "var(--space-12) var(--space-4)",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="section-tag" style={{ background: "hsl(0 0% 100% / 0.15)", color: "white", marginInline: "auto" }}>
            🔒 Trust & Safety
          </div>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "var(--text-3xl)", marginTop: "var(--space-3)", marginBottom: "var(--space-3)",
          }}>
            Our 4-Tier Verification Process
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.8)", maxWidth: 600, marginInline: "auto", fontSize: "var(--text-lg)" }}>
            We don't just list properties; we verify them. Understand how we ensure the property you buy is legally safe and physically sound.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ maxWidth: 800, marginInline: "auto" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            {TIERS.map((t) => (
              <div key={t.tier} className="card" style={{ padding: "var(--space-6)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)", flexWrap: "wrap" }}>
                  <div style={{ flexShrink: 0, marginTop: 4 }}>
                    <VerificationTierDisplay tier={t.tier as any} />
                  </div>
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-2)" }}>
                      {t.title}
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)", lineHeight: 1.6 }}>
                      {t.desc}
                    </p>
                    <div style={{ background: "var(--surface-light)", padding: "var(--space-4)", borderRadius: "var(--radius-md)" }}>
                      <h4 style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "var(--space-3)", color: "var(--color-text)" }}>What this means:</h4>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                        {t.checks.map((check) => (
                          <li key={check} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                            <CheckCircle2 size={16} color="var(--color-success)" /> {check}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-12)", textAlign: "center", padding: "var(--space-8)", background: "var(--color-primary-light)", borderRadius: "var(--radius-xl)", color: "white" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-3)" }}>
              Ready to find a safe property?
            </h3>
            <p style={{ color: "hsl(0 0% 100% / 0.8)", marginBottom: "var(--space-6)" }}>
              Browse our verified listings and look for the shield badge.
            </p>
            <Link href="/properties" className="btn btn-secondary">
              Browse Verified Properties <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

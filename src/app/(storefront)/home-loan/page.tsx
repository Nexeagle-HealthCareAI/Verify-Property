import type { Metadata } from "next";
import { Landmark, FileSpreadsheet, Percent, Timer } from "lucide-react";
import LoanForm from "./LoanForm";

export const metadata: Metadata = {
  title: "Home Loan Assistance — BuySafe Property",
  description: "Get the best home loan rates in Kishanganj. We compare 15+ banks, handle your documentation, and ensure fast approval.",
};

const FEATURES = [
  {
    icon: <Percent size={28} color="var(--color-primary)" />,
    title: "Lowest Interest Rates",
    desc: "We negotiate with our partner banks (SBI, HDFC, ICICI, etc.) to get you the most competitive rates available.",
  },
  {
    icon: <FileSpreadsheet size={28} color="var(--color-primary)" />,
    title: "Zero Paperwork Hassle",
    desc: "Our team collects your documents from your doorstep and handles all bank follow-ups.",
  },
  {
    icon: <Timer size={28} color="var(--color-primary)" />,
    title: "Fast Disbursal",
    desc: "Because we pre-verify properties, banks process loans on BuySafe properties 40% faster.",
  },
];

export default function HomeLoanPage() {
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
            🏦 Financial Assistance
          </div>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "var(--text-3xl)", marginTop: "var(--space-3)", marginBottom: "var(--space-3)",
          }}>
            Hassle-Free Home Loans
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.8)", maxWidth: 600, marginInline: "auto", fontSize: "var(--text-lg)" }}>
            Don't let financing delay your dream home. We connect you with top banks and manage the entire process for free.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-8)" }}>
          
          {/* Left: Features */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-6)" }}>
              Why apply through us?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "var(--space-4)" }}>
                  <div style={{ flexShrink: 0, background: "var(--color-primary-light)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>{f.title}</h4>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-8)", padding: "var(--space-6)", border: "1px dashed var(--border-color)", borderRadius: "var(--radius-lg)", background: "var(--surface-light)" }}>
              <h4 style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontFamily: "var(--font-heading)", fontSize: "var(--text-base)", marginBottom: "var(--space-2)" }}>
                <Landmark size={20} color="var(--color-primary)" /> Partner Banks
              </h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                We work directly with SBI, HDFC Bank, ICICI Bank, Axis Bank, and LIC Housing Finance.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="card" style={{ padding: "var(--space-6)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>
              Check Loan Eligibility
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>
              Fill in your details below and our loan expert will contact you within 24 hours.
            </p>
            <LoanForm />
          </div>

        </div>
      </div>
    </div>
  );
}

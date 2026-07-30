import type { Metadata } from "next";
import { EyeOff, BadgeIndianRupee, Sparkles } from "lucide-react";
import SellerForm from "./SellerForm";

export const metadata: Metadata = {
  title: "List Your Property — BuySafe Property",
  description: "Sell your property faster with 0% broker fees. We protect your privacy by keeping your price hidden until we find a serious buyer.",
};

const BENEFITS = [
  {
    icon: <BadgeIndianRupee size={28} color="var(--color-primary)" />,
    title: "0% Brokerage",
    desc: "We don't charge you a single rupee. Our fees are paid by the buyer.",
  },
  {
    icon: <EyeOff size={28} color="var(--color-primary)" />,
    title: "Privacy First (Price on Request)",
    desc: "Your asking price is never published online. We only reveal it to verified, serious buyers.",
  },
  {
    icon: <Sparkles size={28} color="var(--color-primary)" />,
    title: "Qualified Buyers Only",
    desc: "Stop dealing with time-wasters. We filter and verify every buyer before they visit your property.",
  },
];

export default function ListPropertyPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)" }}>
      {/* Hero */}
      <div style={{
        background: "var(--surface-dark)",
        color: "white",
        padding: "var(--space-12) var(--space-4)",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="section-tag" style={{ background: "hsl(38 95% 52% / 0.15)", color: "var(--color-accent-light)", marginInline: "auto" }}>
            📢 For Sellers
          </div>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "var(--text-3xl)", marginTop: "var(--space-3)", marginBottom: "var(--space-3)",
          }}>
            Sell Faster. Zero Fees.
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.7)", maxWidth: 600, marginInline: "auto", fontSize: "var(--text-lg)" }}>
            List your property with BuySafe. We bring you verified buyers and handle the process, while protecting your privacy.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-8)" }}>
          
          {/* Left: Benefits */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-6)" }}>
              Why list with us?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {BENEFITS.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "var(--space-4)" }}>
                  <div style={{ flexShrink: 0, background: "var(--color-primary-light)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {b.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>{b.title}</h4>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="card" style={{ padding: "var(--space-6)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>
              Enter Property Details
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>
              Fill out this quick form. Our team will contact you to verify the details and activate your listing.
            </p>
            <SellerForm />
          </div>

        </div>
      </div>
    </div>
  );
}

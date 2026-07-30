"use client";

import { useState } from "react";
import { Search, MapPin, Banknote, Target } from "lucide-react";

export function PropertyWanted() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "property_wanted",
          area:    data.get("area"),
          budget:  data.get("budget"),
          purpose: data.get("purpose"),
          name:    data.get("name"),
          mobile:  data.get("mobile"),
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section"
      style={{ background: "var(--color-accent-light)" }}
      aria-labelledby="property-wanted-heading"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-8)",
            alignItems: "center",
          }}
        >
          {/* Left: copy */}
          <div>
            <div className="section-tag" style={{ background: "hsl(30 60% 12% / 0.12)", color: "hsl(30, 60%, 18%)" }}>
              🔍 Property Wanted
            </div>
            <h2
              id="property-wanted-heading"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "var(--text-3xl)",
                color: "hsl(30, 60%, 12%)",
                marginBottom: "var(--space-4)",
              }}
            >
              Tell Us What You&apos;re Looking For
            </h2>
            <p style={{ color: "hsl(30, 40%, 25%)", fontSize: "var(--text-base)", lineHeight: 1.7, marginBottom: "var(--space-5)" }}>
              Can&apos;t find the right property? Share your requirements and our BuySafe
              team will personally search for matching properties.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[
                { icon: MapPin,    text: "Tell us your preferred area" },
                { icon: Banknote,  text: "Share your budget range" },
                { icon: Target,    text: "We find matching verified properties" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                  <Icon size={18} color="hsl(30, 60%, 25%)" aria-hidden="true" />
                  <span style={{ fontSize: "var(--text-sm)", color: "hsl(30, 40%, 25%)", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-6)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "var(--space-6) 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>🎉</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
                  We&apos;re On It!
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                  Our team will contact you within 24 hours with matching property options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700,
                  fontSize: "var(--text-xl)", marginBottom: "var(--space-5)",
                }}>
                  I Am Looking for Property
                </h3>
                <div className="form-group">
                  <label className="input-label" htmlFor="wanted-name">Your Name *</label>
                  <input id="wanted-name" name="name" type="text" required className="input-field" placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label className="input-label" htmlFor="wanted-mobile">Mobile Number *</label>
                  <input id="wanted-mobile" name="mobile" type="tel" required pattern="[6-9]\d{9}" maxLength={10} className="input-field" placeholder="10-digit number" />
                </div>
                <div className="form-group">
                  <label className="input-label" htmlFor="wanted-area">Preferred Area</label>
                  <input id="wanted-area" name="area" type="text" className="input-field" placeholder="e.g. Kishanganj, Khagra, NH-27 area" />
                </div>
                <div className="form-group">
                  <label className="input-label" htmlFor="wanted-budget">Budget Range</label>
                  <select id="wanted-budget" name="budget" className="input-field">
                    <option value="">Select budget</option>
                    <option value="below-20l">Below ₹20 Lakh</option>
                    <option value="20-50l">₹20 – ₹50 Lakh</option>
                    <option value="50-100l">₹50 Lakh – ₹1 Crore</option>
                    <option value="above-1cr">Above ₹1 Crore</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label" htmlFor="wanted-purpose">Purpose *</label>
                  <select id="wanted-purpose" name="purpose" required className="input-field">
                    <option value="">Select purpose</option>
                    <option value="buy-residence">Buy for Residence</option>
                    <option value="buy-invest">Buy for Investment</option>
                    <option value="rent">Rent</option>
                    <option value="agricultural">Agricultural</option>
                    <option value="commercial">Commercial Use</option>
                  </select>
                </div>
                <button
                  type="submit"
                  id="property-wanted-submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={loading}
                >
                  <Search size={18} />
                  {loading ? "Sending..." : "Find My Property"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #wanted-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

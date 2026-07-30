"use client";

import { useState } from "react";
import { ListPlus, Clock, CheckCircle } from "lucide-react";

export default function SellerCTA() {
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
          type: "seller_listing",
          name:         data.get("name"),
          mobile:       data.get("mobile"),
          propertyType: data.get("propertyType"),
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
      style={{ background: "var(--color-primary-dark)", color: "white" }}
      aria-labelledby="seller-cta-heading"
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
            <div className="section-tag" style={{ background: "hsl(38 95% 52% / 0.15)", color: "var(--color-accent-light)" }}>
              📋 For Sellers
            </div>
            <h2
              id="seller-cta-heading"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "var(--text-3xl)",
                color: "white",
                marginBottom: "var(--space-4)",
              }}
            >
              List Your Property in{" "}
              <span style={{ color: "var(--color-accent-light)" }}>3 Minutes</span>
            </h2>
            <p style={{ color: "hsl(0 0% 100% / 0.70)", fontSize: "var(--text-base)", lineHeight: 1.7, marginBottom: "var(--space-6)" }}>
              Get your property in front of verified, serious buyers. Our team
              helps with BuySafe Score assessment and professional photos.
            </p>

            {/* Benefits */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[
                "Listed within 24 hours of submission",
                "Reach genuine, pre-qualified buyers",
                "No listing fee — we charge only on success",
                "Professional BuySafe Score assessment included",
              ].map((benefit) => (
                <div key={benefit} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
                  <CheckCircle size={18} color="var(--color-accent-light)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "var(--text-sm)", color: "hsl(0 0% 100% / 0.75)" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              background: "hsl(0 0% 100% / 0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid hsl(0 0% 100% / 0.15)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "var(--radius-md)",
                background: "hsl(38 95% 52% / 0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Clock size={20} color="var(--color-accent-light)" aria-hidden="true" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "white" }}>List in 3 Minutes</p>
                <p style={{ fontSize: "var(--text-xs)", color: "hsl(0 0% 100% / 0.55)" }}>Fastest listing in Kishanganj</p>
              </div>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "var(--space-6) 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "var(--space-3)" }}>✅</div>
                <p style={{ color: "white", fontWeight: 700, marginBottom: "var(--space-2)" }}>Listing Request Received!</p>
                <p style={{ color: "hsl(0 0% 100% / 0.60)", fontSize: "var(--text-sm)" }}>
                  Our team will call you within 2 hours to complete your listing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="input-label" htmlFor="seller-name" style={{ color: "hsl(0 0% 100% / 0.75)" }}>Your Name *</label>
                  <input id="seller-name" name="name" type="text" required className="input-field"
                    style={{ background: "hsl(0 0% 100% / 0.10)", borderColor: "hsl(0 0% 100% / 0.20)", color: "white" }}
                    placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label className="input-label" htmlFor="seller-mobile" style={{ color: "hsl(0 0% 100% / 0.75)" }}>Mobile Number *</label>
                  <input id="seller-mobile" name="mobile" type="tel" required pattern="[6-9]\d{9}" maxLength={10}
                    className="input-field"
                    style={{ background: "hsl(0 0% 100% / 0.10)", borderColor: "hsl(0 0% 100% / 0.20)", color: "white" }}
                    placeholder="10-digit number" />
                </div>
                <div className="form-group">
                  <label className="input-label" htmlFor="seller-type" style={{ color: "hsl(0 0% 100% / 0.75)" }}>Property Type *</label>
                  <select id="seller-type" name="propertyType" required className="input-field"
                    style={{ background: "hsl(220 85% 18%)", borderColor: "hsl(0 0% 100% / 0.20)", color: "white" }}>
                    <option value="">Select type</option>
                    <option value="residential">Residential Plot</option>
                    <option value="house">House / Building</option>
                    <option value="agricultural">Agricultural Land</option>
                    <option value="commercial">Commercial Property</option>
                    <option value="shop">Shop</option>
                    <option value="godown">Godown / Warehouse</option>
                  </select>
                </div>
                <button type="submit" id="seller-cta-submit" className="btn btn-accent btn-lg"
                  style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
                  <ListPlus size={18} />
                  {loading ? "Sending..." : "List Your Property Free"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

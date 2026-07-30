"use client";

import { BuySafeScore } from "@/components/property/BuySafeScore";

export default function ScoreExplainer() {
  return (
    <section
      className="section"
      style={{ background: "linear-gradient(135deg, hsl(220, 85%, 28%), hsl(240, 70%, 22%))", color: "white" }}
      aria-labelledby="score-explainer-heading"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-10)",
            alignItems: "center",
          }}
        >
          {/* Left: explanation */}
          <div>
            <div className="section-tag" style={{ background: "hsl(38 95% 52% / 0.15)", color: "var(--color-accent-light)" }}>
              ⭐ Our Signature Feature
            </div>
            <h2
              id="score-explainer-heading"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "var(--text-3xl)",
                color: "white",
                marginBottom: "var(--space-4)",
              }}
            >
              BuySafe Score™
            </h2>
            <p style={{ color: "hsl(0 0% 100% / 0.75)", fontSize: "var(--text-base)", lineHeight: 1.7, marginBottom: "var(--space-5)" }}>
              Every property on BuySafe receives a score out of 110 — based on 6 critical
              parameters assessed by our trained team. No other platform in Bihar presents
              property quality this transparently.
            </p>
            <p style={{ color: "hsl(0 0% 100% / 0.60)", fontSize: "var(--text-sm)", lineHeight: 1.7 }}>
              The higher the score, the more thoroughly we have verified the property across
              ownership documents, revenue records, road access, location potential, flood
              risk, and investment outlook.
            </p>
          </div>

          {/* Right: live score demo */}
          <div
            style={{
              background: "hsl(0 0% 100% / 0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid hsl(0 0% 100% / 0.15)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-6)",
            }}
          >
            <p style={{ fontSize: "var(--text-sm)", color: "hsl(0 0% 100% / 0.60)", marginBottom: "var(--space-4)" }}>
              Example Property — 3 Bigha Plot, Khagra
            </p>
            <div style={{ filter: "invert(1) hue-rotate(180deg)" }}>
              {/* Invert for dark background — shows white labels */}
            </div>
            <BuySafeScore
              total={88}
              maxTotal={110}
              dimensions={[
                { label: "Ownership Documents", score: 25, max: 25 },
                { label: "Revenue Records",     score: 20, max: 25 },
                { label: "Road & Accessibility",score: 18, max: 20 },
                { label: "Location Potential",  score: 15, max: 15 },
                { label: "Flood Risk",          score: 10, max: 10 },
                { label: "Investment Potential",score: 10, max: 15 },
              ]}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #score-grid { grid-template-columns: 1fr 1fr !important; }
        }
        /* Make score bars visible on dark bg */
        .score-bar-label { color: hsl(0 0% 100% / 0.80) !important; }
        .score-value { color: hsl(0 0% 100% / 0.60) !important; }
      `}</style>
    </section>
  );
}

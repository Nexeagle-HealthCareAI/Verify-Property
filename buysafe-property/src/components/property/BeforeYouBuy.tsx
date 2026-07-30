import { CheckCircle, AlertTriangle } from "lucide-react";

interface BeforeYouBuyProps {
  goodThings: string[];
  thingsToVerify: string[];
}

export function BeforeYouBuy({ goodThings, thingsToVerify }: BeforeYouBuyProps) {
  return (
    <section aria-labelledby="before-you-buy-heading">
      <div style={{ marginBottom: "var(--space-4)" }}>
        <div className="section-tag">📋 Transparency First</div>
        <h3
          id="before-you-buy-heading"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "var(--text-xl)",
            color: "var(--color-text-primary)",
          }}
        >
          Before You Buy™
        </h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          We believe in full transparency. Here&apos;s an honest assessment of this property.
        </p>
      </div>

      <div className="before-you-buy">
        {/* Good Things */}
        <div className="byb-good" role="region" aria-label="Good things about this property">
          <div style={{
            display: "flex", alignItems: "center", gap: "var(--space-2)",
            marginBottom: "var(--space-4)",
          }}>
            <CheckCircle size={20} color="var(--color-success)" aria-hidden="true" />
            <h4 style={{
              fontFamily: "var(--font-heading)", fontWeight: 600,
              fontSize: "var(--text-base)", color: "var(--color-success)",
            }}>
              Good Things
            </h4>
          </div>
          <ul role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {goodThings.map((item, i) => (
              <li key={i} className="byb-item" role="listitem">
                <CheckCircle
                  size={14}
                  color="var(--color-success)"
                  style={{ flexShrink: 0, marginTop: 2 }}
                  aria-hidden="true"
                />
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-primary)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Things to Verify */}
        <div className="byb-verify" role="region" aria-label="Things to verify before buying">
          <div style={{
            display: "flex", alignItems: "center", gap: "var(--space-2)",
            marginBottom: "var(--space-4)",
          }}>
            <AlertTriangle size={20} color="var(--color-warning)" aria-hidden="true" />
            <h4 style={{
              fontFamily: "var(--font-heading)", fontWeight: 600,
              fontSize: "var(--text-base)", color: "var(--color-warning)",
            }}>
              Things to Verify
            </h4>
          </div>
          <ul role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {thingsToVerify.map((item, i) => (
              <li key={i} className="byb-item" role="listitem">
                <AlertTriangle
                  size={14}
                  color="var(--color-warning)"
                  style={{ flexShrink: 0, marginTop: 2 }}
                  aria-hidden="true"
                />
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-primary)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{
        marginTop: "var(--space-3)", fontSize: "var(--text-xs)",
        color: "var(--color-text-muted)", fontStyle: "italic",
      }}>
        ℹ️ BuySafe believes in honest representation. We do not hide property limitations from buyers.
      </p>
    </section>
  );
}

import {
  ShieldCheck, FileCheck, MapPin, IndianRupee,
  BookOpen, Building2, CreditCard, Star,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Buyer Representation Only",
    desc: "We work exclusively for you — the buyer. No conflict of interest.",
    color: "var(--color-primary)",
  },
  {
    icon: Star,
    title: "Verified Listings",
    desc: "Every property carries a BuySafe Score™ from our team's inspection.",
    color: "var(--color-accent)",
  },
  {
    icon: FileCheck,
    title: "Property Verification",
    desc: "We check title documents, revenue records, and site boundaries.",
    color: "var(--badge-docs)",
  },
  {
    icon: IndianRupee,
    title: "Price Negotiation",
    desc: "Expert negotiation to get you the fairest market price.",
    color: "var(--color-success)",
  },
  {
    icon: Building2,
    title: "Registry Guidance",
    desc: "Full support through the property registration process.",
    color: "var(--badge-site)",
  },
  {
    icon: MapPin,
    title: "Mutation Support",
    desc: "We guide you through the mutation process post-purchase.",
    color: "var(--badge-self)",
  },
  {
    icon: CreditCard,
    title: "Home Loan Assistance",
    desc: "Connect with partner banks for the best home loan rates.",
    color: "var(--badge-premium)",
  },
];

export function WhyBuySafe() {
  return (
    <section className="section" aria-labelledby="why-buysafe-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">✅ Why Choose Us</div>
          <h2 id="why-buysafe-heading" className="section-title">
            Why Should You Trust BuySafe?
          </h2>
          <p className="section-desc">
            The only platform in Kishanganj built entirely around protecting the buyer.
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "var(--space-4)",
          }}
          role="list"
        >
          {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={title}
              className="card card-body animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
              role="listitem"
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: `${color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--space-3)",
                }}
                aria-hidden="true"
              >
                <Icon size={22} color={color} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "var(--text-base)",
                marginBottom: "var(--space-2)",
              }}>
                {title}
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

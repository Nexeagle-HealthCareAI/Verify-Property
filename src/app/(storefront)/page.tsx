import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyBuySafe } from "@/components/home/WhyBuySafe";
import { PropertyCategories } from "@/components/home/PropertyCategories";
import { VerificationTierDisplay } from "@/components/property/VerificationBadge";
import { PropertyWanted } from "@/components/home/PropertyWanted";

// Lazy load below-fold sections
const FeaturedProperties  = dynamic(() => import("@/components/home/FeaturedProperties"),  { loading: () => <SectionSkeleton /> });
const ScoreExplainer      = dynamic(() => import("@/components/home/ScoreExplainer"),       { loading: () => <SectionSkeleton /> });
const KnowledgePreview    = dynamic(() => import("@/components/home/KnowledgePreview"),     { loading: () => <SectionSkeleton /> });
const SellerCTA           = dynamic(() => import("@/components/home/SellerCTA"));

export const metadata: Metadata = {
  title: "BuySafe Property — Buy Verified Property in Kishanganj, Bihar",
  description:
    "Find verified properties in Kishanganj with BuySafe Score™. Buyer's agent, property verification, home loans, registry guidance. End-to-end buyer support.",
};

function SectionSkeleton() {
  return (
    <div style={{ padding: "var(--space-12) var(--space-4)" }}>
      <div className="skeleton" style={{ height: 32, width: "40%", margin: "0 auto var(--space-4)" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton" style={{ height: 280, borderRadius: "var(--radius-lg)" }} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── SECTION 1: Hero ── */}
      <HeroSection />

      {/* ── SECTION 2: Why BuySafe? ── */}
      <WhyBuySafe />

      {/* ── SECTION 3: Property Categories ── */}
      <PropertyCategories />

      {/* ── SECTION 4: Featured / Verified Properties (lazy) ── */}
      <section className="section" style={{ background: "var(--surface-bg)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">🏆 Hand-Picked</div>
            <h2 className="section-title">Featured Verified Properties</h2>
            <p className="section-desc">
              Every listing is assessed with our BuySafe Score™. See what&apos;s available today.
            </p>
          </div>
          <FeaturedProperties />
          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <Link href="/properties" className="btn btn-outline btn-lg">
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: BuySafe Score™ Explainer (lazy) ── */}
      <ScoreExplainer />

      {/* ── SECTION 6: Verification Tier Explainer ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-8)" }}>
            <div className="section-header" style={{ marginBottom: 0, textAlign: "left" }}>
              <div className="section-tag">🔒 Trust System</div>
              <h2 className="section-title" style={{ textAlign: "left" }}>
                Our 4-Tier Verification System
              </h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Every property on BuySafe is assessed at one of four verification levels.
                The higher the level, the more thoroughly we&apos;ve verified the property.
              </p>
            </div>
            <VerificationTierDisplay />
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Property Wanted ── */}
      <PropertyWanted />

      {/* ── SECTION 8: Knowledge Centre Preview (lazy) ── */}
      <section className="section" style={{ background: "var(--surface-bg)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">📚 BuySafe Learning Centre</div>
            <h2 className="section-title">Knowledge Centre</h2>
            <p className="section-desc">
              People trust education. Learn everything about buying property in Bihar —
              from registry to mutation.
            </p>
          </div>
          <KnowledgePreview />
          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <Link href="/knowledge" className="btn btn-ghost btn-lg">
              Explore All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: Seller CTA (lazy) ── */}
      <SellerCTA />
    </>
  );
}

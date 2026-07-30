import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Centre — BuySafe Learning Centre",
  description:
    "Learn everything about buying property in Bihar — from document verification to registry, mutation, home loans, and legal processes.",
};

const ARTICLES = [
  {
    id: "a1", slug: "how-to-check-property-documents-bihar",
    category: "Legal Guide", emoji: "📄",
    title: "How to Check Property Documents Before Buying in Bihar",
    excerpt: "Step-by-step guide to verifying title deeds, revenue records (jamabandi), and encumbrance certificates in Bihar.",
    readTime: "8 min", featured: true,
  },
  {
    id: "a2", slug: "understanding-mutation-bihar-property",
    category: "Mutation Guide", emoji: "🏛️",
    title: "Understanding Mutation After Property Purchase in Bihar",
    excerpt: "Why mutation matters, what documents you need, and the complete process — explained simply.",
    readTime: "6 min", featured: false,
  },
  {
    id: "a3", slug: "home-loan-tips-bihar-first-time-buyers",
    category: "Home Loan", emoji: "💰",
    title: "Home Loan Tips for First-Time Buyers in Kishanganj",
    excerpt: "Compare interest rates, understand eligibility, and avoid common mistakes when applying for a home loan.",
    readTime: "5 min", featured: false,
  },
  {
    id: "a4", slug: "understanding-buysafe-score",
    category: "BuySafe Score™", emoji: "⭐",
    title: "Understanding BuySafe Score™ — How We Rate Properties",
    excerpt: "A deep dive into our 6-dimension scoring methodology and what each parameter means for buyers.",
    readTime: "7 min", featured: false,
  },
  {
    id: "a5", slug: "registry-process-kishanganj-bihar",
    category: "Registry Guide", emoji: "📜",
    title: "Complete Registry Process for Property in Bihar",
    excerpt: "What to bring, how to calculate stamp duty, and what happens after registration.",
    readTime: "9 min", featured: false,
  },
  {
    id: "a6", slug: "agricultural-land-purchase-rules-bihar",
    category: "Agricultural", emoji: "🌾",
    title: "Rules for Buying Agricultural Land in Bihar — What to Know",
    excerpt: "Eligibility criteria, restrictions, and documentation needed to purchase agricultural land in Bihar.",
    readTime: "6 min", featured: false,
  },
];

const CATEGORIES = ["All", "Legal Guide", "Mutation Guide", "Home Loan", "BuySafe Score™", "Registry Guide", "Agricultural"];

export default function KnowledgePage() {
  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))",
        color: "white",
        padding: "var(--space-12) var(--space-4)",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="section-tag" style={{ background: "hsl(38 95% 52% / 0.15)", color: "var(--color-accent-light)", marginInline: "auto" }}>
            📚 BuySafe Learning Centre
          </div>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "var(--text-3xl)", marginTop: "var(--space-3)", marginBottom: "var(--space-3)",
          }}>
            Knowledge Centre
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.70)", maxWidth: 560, marginInline: "auto" }}>
            People trust education. Learn everything about buying property in Bihar —
            written by our expert team.
          </p>
        </div>
      </div>

      <div className="container section">
        {/* Featured article */}
        {featured && (
          <Link href={`/knowledge/${featured.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "var(--space-8)" }}>
            <article style={{
              display: "grid", gridTemplateColumns: "1fr",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
              borderRadius: "var(--radius-xl)", overflow: "hidden", color: "white",
            }}
              className="card"
            >
              <div style={{ padding: "var(--space-8)" }}>
                <span style={{
                  display: "inline-block",
                  background: "hsl(0 0% 100% / 0.15)",
                  padding: "3px 12px",
                  borderRadius: "var(--radius-pill)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}>
                  ⭐ Featured — {featured.category}
                </span>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "var(--text-2xl)", marginBottom: "var(--space-3)" }}>
                  {featured.title}
                </h2>
                <p style={{ color: "hsl(0 0% 100% / 0.75)", marginBottom: "var(--space-5)", lineHeight: 1.7 }}>
                  {featured.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--text-sm)", color: "hsl(0 0% 100% / 0.65)" }}>
                    <Clock size={14} aria-hidden="true" /> {featured.readTime} read
                  </span>
                  <span style={{ color: "var(--color-accent-light)", fontWeight: 600, fontSize: "var(--text-sm)", display: "flex", alignItems: "center", gap: 4 }}>
                    Read Article <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Article grid */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-xl)", marginBottom: "var(--space-5)" }}>
          All Articles
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--space-5)",
          }}
          role="list"
        >
          {rest.map((article, i) => (
            <Link key={article.id} href={`/knowledge/${article.slug}`} style={{ textDecoration: "none" }} role="listitem">
              <article
                className="card animate-fade-up"
                style={{ height: "100%", animationDelay: `${i * 60}ms` }}
              >
                <div style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                  padding: "var(--space-4)",
                  display: "flex", alignItems: "center", gap: "var(--space-3)",
                }}>
                  <span style={{ fontSize: "1.8rem" }} aria-hidden="true">{article.emoji}</span>
                  <span style={{ background: "hsl(0 0% 100% / 0.15)", color: "white", fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "var(--radius-pill)", textTransform: "uppercase" }}>
                    {article.category}
                  </span>
                </div>
                <div className="card-body">
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "var(--text-base)", marginBottom: "var(--space-2)", lineHeight: 1.35 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "var(--space-4)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                    {article.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                      <Clock size={12} aria-hidden="true" /> {article.readTime} read
                    </span>
                    <span style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "var(--text-xs)", display: "flex", alignItems: "center", gap: 4 }}>
                      Read <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

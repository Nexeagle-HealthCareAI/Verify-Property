import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    id: "a1",
    slug: "how-to-check-property-documents-bihar",
    category: "Legal Guide",
    title: "How to Check Property Documents Before Buying in Bihar",
    excerpt: "A step-by-step guide to verifying title deeds, revenue records, and encumbrance certificates in Bihar.",
    readTime: "8 min read",
    emoji: "📄",
  },
  {
    id: "a2",
    slug: "understanding-mutation-bihar-property",
    category: "Mutation Guide",
    title: "Understanding Mutation After Property Purchase in Bihar",
    excerpt: "Why mutation matters, what documents you need, and the complete process — explained in simple language.",
    readTime: "6 min read",
    emoji: "🏛️",
  },
  {
    id: "a3",
    slug: "home-loan-tips-bihar-first-time-buyers",
    category: "Home Loan",
    title: "Home Loan Tips for First-Time Buyers in Kishanganj",
    excerpt: "Compare interest rates, understand eligibility, and avoid common mistakes when applying for a home loan.",
    readTime: "5 min read",
    emoji: "💰",
  },
];

export default function KnowledgePreview() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "var(--space-5)",
      }}
      role="list"
    >
      {ARTICLES.map((article, i) => (
        <Link
          key={article.id}
          href={`/knowledge/${article.slug}`}
          role="listitem"
          style={{ textDecoration: "none" }}
        >
          <article
            className="card animate-fade-up"
            style={{ height: "100%", animationDelay: `${i * 80}ms` }}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
              padding: "var(--space-5) var(--space-4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}>
              <span style={{ fontSize: "2rem" }} aria-hidden="true">{article.emoji}</span>
              <span style={{
                background: "hsl(0 0% 100% / 0.15)",
                color: "white",
                fontSize: "10px",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "var(--radius-pill)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                {article.category}
              </span>
            </div>

            {/* Body */}
            <div className="card-body" style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "var(--text-base)",
                marginBottom: "var(--space-2)",
                lineHeight: 1.35,
                color: "var(--color-text-primary)",
              }}>
                {article.title}
              </h3>
              <p style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                marginBottom: "var(--space-4)",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              } as React.CSSProperties}>
                {article.excerpt}
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} aria-hidden="true" />
                  <span>{article.readTime}</span>
                </div>
                <span style={{ color: "var(--color-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  Read <ArrowRight size={12} aria-hidden="true" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

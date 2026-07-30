"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function ArticlePage() {
  const { slug } = useParams();
  const router = useRouter();
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // First fetch all and find by slug, or use an endpoint if available
      // The backend has /api/v1/articles/{slug}
      fetch(`http://localhost:8000/api/v1/articles/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then(data => {
          setArticle(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          router.push("/knowledge");
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh", paddingBottom: "var(--space-12)" }}>
      <article className="container" style={{ maxWidth: 800, marginTop: "var(--space-8)" }}>
        
        <Link href="/knowledge" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-secondary)", textDecoration: "none", marginBottom: "var(--space-6)", fontWeight: 500 }}>
          <ArrowLeft size={18} /> Back to Knowledge Base
        </Link>

        <header style={{ marginBottom: "var(--space-8)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-4)" }}>
            <span style={{ background: "var(--color-primary-light)", color: "white", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {article.category}
            </span>
            <span style={{ fontSize: "1.5rem" }}>{article.emoji}</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "var(--space-6)" }}>
            {article.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", color: "var(--color-text-secondary)", fontSize: "14px", fontWeight: 500, paddingBottom: "var(--space-6)", borderBottom: "1px solid var(--color-border)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={16} /> {article.read_time || "5 min"} read
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={16} /> {new Date(article.created_at).toLocaleDateString()}
            </span>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      <style jsx global>{`
        .article-content {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--color-text-primary);
        }
        .article-content p {
          margin-bottom: 1.5em;
        }
        .article-content h1, .article-content h2, .article-content h3 {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 2em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }
        .article-content h2 { fontSize: 1.75rem; }
        .article-content h3 { fontSize: 1.25rem; }
        .article-content ul, .article-content ol {
          margin-left: 1.5em;
          margin-bottom: 1.5em;
        }
        .article-content li {
          margin-bottom: 0.5em;
        }
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2em 0;
          box-shadow: var(--shadow-sm);
        }
        .article-content strong {
          font-weight: 600;
        }
        .article-content blockquote {
          border-left: 4px solid var(--color-primary);
          padding-left: 1.5em;
          margin: 1.5em 0;
          font-style: italic;
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  );
}

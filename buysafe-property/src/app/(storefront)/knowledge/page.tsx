"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, BookMarked, Search } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Legal Guide", "Mutation", "Home Loan", "Score™", "Registry", "Agricultural"];

export default function KnowledgePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/articles")
      .then(res => res.json())
      .then(data => {
        // Only show published articles in storefront
        const published = data.filter((a: any) => a.is_published);
        setArticles(published);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const featured = articles.find((a) => a.is_featured);
  const rest = articles.filter((a) => a.id !== featured?.id);

  if (loading) {
    return (
      <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Loading knowledge base...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* ── Editorial Hero ── */}
      <section style={{
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--color-border)",
        padding: "calc(var(--space-10) + var(--space-4)) var(--space-4) var(--space-10)",
      }}>
        <div className="container" style={{ maxWidth: 900, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "var(--space-4)" }}>
              <BookMarked size={18} /> BuySafe Learning Centre
            </div>
            
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", color: "var(--text-primary)", marginBottom: "var(--space-4)" }}>
              Master the art of <span style={{ color: "var(--color-primary)" }}>property buying.</span>
            </h1>
            
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.2rem", lineHeight: 1.6, maxWidth: 650, margin: "0 auto", marginBottom: "var(--space-8)" }}>
              In-depth guides, legal explanations, and market insights tailored specifically for Kishanganj & Bihar real estate.
            </p>

            <div style={{ display: "flex", maxWidth: 500, margin: "0 auto", position: "relative" }}>
              <Search size={20} color="var(--color-text-muted)" style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)" }} />
              <input 
                type="text" 
                placeholder="Search guides, e.g. 'Mutation'" 
                style={{ width: "100%", padding: "16px 20px 16px 52px", borderRadius: "100px", border: "1px solid var(--color-border)", fontSize: "16px", background: "var(--surface-light)", boxShadow: "var(--shadow-sm)" }} 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Category Chips ── */}
      <div style={{ borderBottom: "1px solid var(--color-border)", background: "var(--surface-card)", position: "sticky", top: "var(--nav-height-mobile)", zIndex: 10 }}>
        <div className="container" style={{ padding: "var(--space-4)", overflowX: "auto", whiteSpace: "nowrap", WebkitOverflowScrolling: "touch" }}>
          <div style={{ display: "inline-flex", gap: "8px" }}>
            {CATEGORIES.map((c, i) => (
              <button key={c} style={{
                padding: "8px 20px", borderRadius: "100px", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer",
                background: i === 0 ? "var(--text-primary)" : "var(--surface-light)",
                color: i === 0 ? "white" : "var(--color-text-secondary)",
                transition: "all 0.2s ease"
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container section">
        {/* ── Featured Article ── */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ marginBottom: "var(--space-12)" }}>
            <Link href={`/knowledge/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <article style={{
                display: "grid", gridTemplateColumns: "1fr",
                background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))",
                borderRadius: "32px", overflow: "hidden", color: "white",
                boxShadow: "0 20px 40px hsl(220 85% 28% / 0.15)", position: "relative"
              }}>
                <div style={{ position: "absolute", top: -50, right: -50, fontSize: "15rem", opacity: 0.1, transform: "rotate(15deg)" }}>{featured.emoji}</div>
                
                <div style={{ padding: "var(--space-10) var(--space-8)", position: "relative", zIndex: 2 }}>
                  <span style={{
                    display: "inline-block", background: "var(--color-accent)", color: "var(--color-primary-dark)",
                    padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "var(--space-6)",
                  }}>
                    ⭐ Featured Editor's Pick
                  </span>
                  
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.2, marginBottom: "var(--space-4)", maxWidth: 700 }}>
                    {featured.title}
                  </h2>
                  
                  <p style={{ color: "hsl(0 0% 100% / 0.8)", marginBottom: "var(--space-8)", lineHeight: 1.6, fontSize: "1.1rem", maxWidth: 600 }}>
                    {featured.excerpt}
                  </p>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 500, color: "hsl(0 0% 100% / 0.7)" }}>
                      <Clock size={16} /> {featured.readTime} read
                    </span>
                    <span style={{ color: "var(--color-accent-light)", fontWeight: 700, fontSize: "15px", display: "flex", alignItems: "center", gap: 6 }}>
                      Read the full guide <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        )}

        {/* ── Article Grid ── */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem", marginBottom: "var(--space-6)", color: "var(--text-primary)" }}>
          Latest Articles
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-8)" }} role="list">
          {rest.map((article, i) => (
            <motion.div 
              key={article.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/knowledge/${article.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }} role="listitem">
                <article style={{
                  background: "var(--surface-card)", border: "1px solid var(--color-border)",
                  borderRadius: "24px", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column",
                  boxShadow: "var(--shadow-sm)", transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}>
                  <div style={{
                    background: "var(--surface-light)", padding: "var(--space-6)", display: "flex", alignItems: "center", justifyContent: "space-between",
                    borderBottom: "1px solid var(--color-border)"
                  }}>
                    <span style={{ fontSize: "2.5rem", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }} aria-hidden="true">{article.emoji}</span>
                    <span style={{ background: "white", color: "var(--color-text-secondary)", fontSize: "11px", fontWeight: 700, padding: "6px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "var(--shadow-sm)" }}>
                      {article.category}
                    </span>
                  </div>
                  
                  <div style={{ padding: "var(--space-6)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "var(--space-3)", lineHeight: 1.4 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "var(--space-6)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                      {article.excerpt}
                    </p>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "13px", fontWeight: 500, color: "var(--color-text-muted)" }}>
                        <Clock size={14} /> {article.readTime}
                      </span>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "14px", display: "flex", alignItems: "center", gap: 4 }}>
                        Read <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

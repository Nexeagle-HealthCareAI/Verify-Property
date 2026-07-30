"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Globe, FileText, CheckCircle } from "lucide-react";
import styles from "../../../admin.module.css";
import { AnimatedDiv, AnimatedStaggerContainer, AnimatedStaggerItem } from "../../../../components/AnimatedDiv";

export default function KnowledgeAdmin() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles", err);
        setLoading(false);
      });
  }, []);

  const deleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/v1/articles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AnimatedDiv>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Knowledge Base</h1>
        <Link href="/admin/knowledge/editor" style={{ textDecoration: "none" }}>
          <button style={{ 
            background: "linear-gradient(135deg, var(--color-primary-light), var(--color-primary))", 
            color: "white", 
            border: "none", 
            padding: "8px 16px", 
            borderRadius: "var(--radius-pill)", 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            cursor: "pointer", 
            fontWeight: 500,
            boxShadow: "0 4px 16px hsla(220, 85%, 28%, 0.3)"
          }}>
            <Plus size={18} /> Write Article
          </button>
        </Link>
      </div>

      <AnimatedDiv delay={0.1} className={styles.adminCard}>
        {loading ? (
          <p style={{ color: "hsla(0,0%,100%,0.7)" }}>Loading articles...</p>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "var(--space-8) 0" }}>
            <FileText size={48} color="hsla(0,0%,100%,0.3)" style={{ marginBottom: "var(--space-4)" }} />
            <p style={{ color: "hsla(0,0%,100%,0.7)", marginBottom: "var(--space-4)" }}>No articles found. Start writing your first guide!</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Category</th>
                  <th>Read Time</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "20px" }}>{article.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 600 }}>{article.title}</div>
                          <div style={{ fontSize: "12px", color: "hsla(0,0%,100%,0.5)" }}>/{article.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "hsla(0,0%,100%,0.7)" }}>{article.category}</td>
                    <td style={{ color: "hsla(0,0%,100%,0.7)" }}>{article.read_time || "N/A"}</td>
                    <td>
                      {article.is_published ? (
                        <span className="badge badge-docs-verified" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <Globe size={12} /> Published
                        </span>
                      ) : (
                        <span className="badge badge-self-listed" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <FileText size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td>
                      {article.is_featured ? (
                        <CheckCircle size={18} color="var(--color-accent)" />
                      ) : (
                        <span style={{ color: "hsla(0,0%,100%,0.3)" }}>-</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "var(--space-3)" }}>
                        <Link href={`/admin/knowledge/editor?id=${article.id}`}>
                          <button style={{ background: "none", border: "none", color: "var(--color-primary-light)", cursor: "pointer", padding: 4 }}>
                            <Edit size={18} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => deleteArticle(article.id)}
                          style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", padding: 4 }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AnimatedDiv>
    </AnimatedDiv>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ArrowLeft, Save, Image as ImageIcon, Bold, Italic, Heading1, Heading2, List, ListOrdered } from "lucide-react";
import styles from "../../../../admin.module.css";
import { AnimatedDiv } from "../../../../../components/AnimatedDiv";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("http://localhost:8000/api/v1/upload/image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (err) {
        console.error("Failed to upload image", err);
        alert("Image upload failed");
      }
    };
    input.click();
  };

  return (
    <div style={{ display: "flex", gap: "8px", padding: "8px", borderBottom: "1px solid hsla(220,15%,88%,0.1)", background: "hsla(220,30%,15%,0.8)", flexWrap: "wrap" }}>
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`editor-btn ${editor.isActive("bold") ? "active" : ""}`}>
        <Bold size={16} />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`editor-btn ${editor.isActive("italic") ? "active" : ""}`}>
        <Italic size={16} />
      </button>
      <div style={{ width: 1, background: "hsla(220,15%,88%,0.1)", margin: "0 4px" }} />
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`editor-btn ${editor.isActive("heading", { level: 1 }) ? "active" : ""}`}>
        <Heading1 size={16} />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`editor-btn ${editor.isActive("heading", { level: 2 }) ? "active" : ""}`}>
        <Heading2 size={16} />
      </button>
      <div style={{ width: 1, background: "hsla(220,15%,88%,0.1)", margin: "0 4px" }} />
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`editor-btn ${editor.isActive("bulletList") ? "active" : ""}`}>
        <List size={16} />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`editor-btn ${editor.isActive("orderedList") ? "active" : ""}`}>
        <ListOrdered size={16} />
      </button>
      <div style={{ width: 1, background: "hsla(220,15%,88%,0.1)", margin: "0 4px" }} />
      <button onClick={addImage} className="editor-btn">
        <ImageIcon size={16} /> Image
      </button>

      <style jsx>{`
        .editor-btn {
          background: transparent;
          border: none;
          color: hsla(220,15%,88%,0.6);
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s;
        }
        .editor-btn:hover {
          background: hsla(220,15%,88%,0.1);
          color: white;
        }
        .editor-btn.active {
          background: hsla(220,85%,48%,0.2);
          color: var(--color-primary-light);
        }
      `}</style>
    </div>
  );
};

export default function ArticleEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [emoji, setEmoji] = useState("📝");
  const [excerpt, setExcerpt] = useState("");
  const [readTime, setReadTime] = useState("5 min");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Start writing your article here...</p>",
  });

  useEffect(() => {
    if (articleId && editor) {
      fetch(`http://localhost:8000/api/v1/articles/${articleId}`) // wait, I don't have get by ID, I have get by slug. Let's fetch all and filter for now, or just use slug in URL
        .then(res => res.json())
        .then(data => {
            // Note: The backend has /api/v1/articles/{slug} but if we pass id to that it will fail.
            // Actually let's fetch all and find the one.
            fetch("http://localhost:8000/api/v1/articles")
              .then(r => r.json())
              .then(all => {
                const article = all.find((a: any) => a.id === articleId);
                if (article) {
                  setTitle(article.title);
                  setSlug(article.slug);
                  setCategory(article.category);
                  setEmoji(article.emoji || "📝");
                  setExcerpt(article.excerpt || "");
                  setReadTime(article.read_time || "5 min");
                  setIsFeatured(article.is_featured);
                  setIsPublished(article.is_published);
                  editor.commands.setContent(article.content);
                }
              });
        });
    }
  }, [articleId, editor]);

  // Auto-generate slug from title if empty
  useEffect(() => {
    if (title && !articleId && !slug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title]);

  const saveArticle = async (publish: boolean) => {
    if (!editor || !title || !slug || !category) {
      alert("Please fill in the title, slug, and category.");
      return;
    }

    const htmlContent = editor.getHTML();
    
    const payload = {
      title,
      slug,
      category,
      emoji,
      excerpt,
      content: htmlContent,
      read_time: readTime,
      is_featured: isFeatured,
      is_published: publish
    };

    try {
      const url = articleId 
        ? `http://localhost:8000/api/v1/articles/${articleId}`
        : "http://localhost:8000/api/v1/articles";
      
      const method = articleId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Error: ${err.detail}`);
        return;
      }

      router.push("/admin/knowledge");
    } catch (e) {
      console.error(e);
      alert("Failed to save article");
    }
  };

  return (
    <AnimatedDiv>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <button onClick={() => router.back()} style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>{articleId ? "Edit Article" : "Write Article"}</h1>
        </div>
        
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <button onClick={() => saveArticle(false)} style={{ 
            background: "hsla(220,15%,88%,0.1)", 
            color: "white", 
            border: "1px solid hsla(220,15%,88%,0.2)", 
            padding: "8px 16px", 
            borderRadius: "var(--radius-pill)", 
            cursor: "pointer", 
            fontWeight: 500
          }}>
            Save Draft
          </button>
          <button onClick={() => saveArticle(true)} style={{ 
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
            <Save size={18} /> Publish
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-6)" }}>
        {/* Main Editor Area */}
        <AnimatedDiv delay={0.1} className={styles.adminCard} style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: "600px" }}>
          <div style={{ padding: "var(--space-6)", borderBottom: "1px solid hsla(220,15%,88%,0.1)" }}>
            <input 
              type="text" 
              placeholder="Article Title..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ 
                width: "100%", 
                background: "transparent", 
                border: "none", 
                fontSize: "var(--text-3xl)", 
                fontWeight: 800, 
                color: "white",
                outline: "none"
              }}
            />
          </div>
          <MenuBar editor={editor} />
          <div style={{ padding: "var(--space-6)", flex: 1, overflowY: "auto", color: "hsla(0,0%,100%,0.9)" }} className="tiptap-wrapper">
            <EditorContent editor={editor} />
          </div>
        </AnimatedDiv>

        {/* Sidebar Settings */}
        <AnimatedDiv delay={0.2}>
          <div className={styles.adminCard} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, borderBottom: "1px solid hsla(220,15%,88%,0.1)", paddingBottom: "var(--space-3)" }}>Settings</h3>
            
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "hsla(0,0%,100%,0.6)", marginBottom: "4px" }}>URL Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", color: "hsla(0,0%,100%,0.6)", marginBottom: "4px" }}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                <option value="">Select Category...</option>
                <option value="Legal Guide">Legal Guide</option>
                <option value="Mutation">Mutation</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Score™">Score™</option>
                <option value="Registry">Registry</option>
                <option value="Agricultural">Agricultural</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "hsla(0,0%,100%,0.6)", marginBottom: "4px" }}>Emoji</label>
                <input type="text" value={emoji} onChange={(e) => setEmoji(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "hsla(0,0%,100%,0.6)", marginBottom: "4px" }}>Read Time</label>
                <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", color: "hsla(0,0%,100%,0.6)", marginBottom: "4px" }}>Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={4} style={{ ...inputStyle, resize: "none" }} />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginTop: "var(--space-2)" }}>
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} style={{ width: 18, height: 18 }} />
              <span style={{ fontSize: "14px" }}>Featured Editor's Pick</span>
            </label>
          </div>
        </AnimatedDiv>
      </div>

      <style jsx global>{`
        .tiptap-wrapper .ProseMirror {
          min-height: 400px;
          outline: none;
        }
        .tiptap-wrapper .ProseMirror p {
          margin-bottom: 1em;
          line-height: 1.6;
        }
        .tiptap-wrapper .ProseMirror h1, .tiptap-wrapper .ProseMirror h2 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          color: white;
        }
        .tiptap-wrapper .ProseMirror ul, .tiptap-wrapper .ProseMirror ol {
          margin-left: 1.5em;
          margin-bottom: 1em;
        }
        .tiptap-wrapper .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
      `}</style>
    </AnimatedDiv>
  );
}

const inputStyle = {
  width: "100%", 
  padding: "10px 12px", 
  borderRadius: "var(--radius-md)", 
  border: "1px solid hsla(220,15%,88%,0.2)",
  background: "hsla(220,15%,88%,0.05)",
  color: "white",
  fontSize: "14px"
};

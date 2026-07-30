"use client";

import { useEffect, useState } from "react";
import { X, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already installed or dismissed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      localStorage.getItem("pwa-install-dismissed") === "true"
    ) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show after 30s or 2 property views
      setTimeout(() => setShow(true), 30_000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShow(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  if (!show || dismissed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed", inset: 0, background: "hsl(220 28% 8% / 0.4)",
          backdropFilter: "blur(4px)", zIndex: "var(--z-overlay)" as any,
        }}
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Android-style install sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Install BuySafe app"
        className="bottom-sheet animate-fade-up"
        style={{ zIndex: "var(--z-modal)" as any, maxHeight: "auto", padding: "var(--space-6)" }}
      >
        <div className="bottom-sheet-handle" />

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          <div style={{
            width: 60, height: 60, borderRadius: "var(--radius-lg)",
            background: "linear-gradient(135deg, var(--color-primary-light), var(--color-primary))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.8rem", flexShrink: 0,
          }}>
            🏡
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-lg)" }}>
              Install BuySafe
            </p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
              buysafe.in • Property Platform
            </p>
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            style={{
              marginLeft: "auto", background: "var(--surface-bg)", border: "none",
              borderRadius: "var(--radius-pill)", width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--color-text-muted)",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
          {[
            { icon: "📴", text: "Works Offline" },
            { icon: "⚡", text: "Faster Loading" },
            { icon: "🔔", text: "Visit Alerts" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                flex: 1, background: "var(--surface-bg)", borderRadius: "var(--radius-md)",
                padding: "var(--space-3)", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{icon}</div>
              <p style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-secondary)" }}>{text}</p>
            </div>
          ))}
        </div>

        <button
          id="pwa-install-btn"
          onClick={handleInstall}
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", gap: "var(--space-2)" }}
        >
          <Download size={18} />
          Add to Home Screen
        </button>
      </div>
    </>
  );
}

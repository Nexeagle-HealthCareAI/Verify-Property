"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";

// Basic session id generator
function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("bs_session_id");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("bs_session_id", sessionId);
  }
  return sessionId;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const trackEvent = useCallback(async (action: string, details?: any) => {
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    try {
      await fetch("http://localhost:8000/api/v1/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_id: user?.id || null,
          action,
          details: details || {},
        }),
      });
    } catch (e) {
      console.error("Failed to track event", e);
    }
  }, [user]);

  // Track page views
  useEffect(() => {
    trackEvent("PAGE_VIEW", { path: pathname });
  }, [pathname, trackEvent]);

  // Expose to window for manual tracking (e.g. tracking form submissions or clicks)
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).trackBuySafeEvent = trackEvent;
    }
  }, [trackEvent]);

  return <>{children}</>;
}

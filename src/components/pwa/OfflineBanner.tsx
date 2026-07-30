"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const goOffline = () => setIsOffline(true);
    const goOnline  = () => setIsOffline(false);

    window.addEventListener("offline", goOffline);
    window.addEventListener("online",  goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online",  goOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      className="offline-banner"
      role="alert"
      aria-live="polite"
      id="offline-banner"
    >
      <WifiOff size={16} />
      <span>You&apos;re offline — showing cached content</span>
    </div>
  );
}

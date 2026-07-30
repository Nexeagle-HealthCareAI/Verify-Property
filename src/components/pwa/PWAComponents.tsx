"use client";
import dynamic from "next/dynamic";

const OfflineBanner    = dynamic(() => import("./OfflineBanner"),    { ssr: false });
const PWAInstallPrompt = dynamic(() => import("./InstallPrompt"),    { ssr: false });

export function PWAComponents() {
  return (
    <>
      <OfflineBanner />
      <PWAInstallPrompt />
    </>
  );
}

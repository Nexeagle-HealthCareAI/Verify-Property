import { TopNav } from "@/components/layout/TopNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingActions } from "@/components/layout/FloatingActions";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Top navigation (desktop sidebar / mobile header) */}
      <TopNav />

      {/* Page content */}
      <main id="main-content" role="main">
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <BottomNav />

      {/* Floating WhatsApp / Call / Visit buttons */}
      <FloatingActions />
    </>
  );
}

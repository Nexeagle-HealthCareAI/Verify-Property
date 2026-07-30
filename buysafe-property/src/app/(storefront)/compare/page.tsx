import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Compare Properties — BuySafe Property",
  description: "Compare up to 3 verified properties side by side. See BuySafe Score™, area, road width, and investment potential at a glance.",
  robots: { index: false, follow: false },
};

const CompareClient = dynamic(() => import("@/components/compare/CompareClient"));

export default function ComparePage() {
  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", minHeight: "100vh" }}>
      <CompareClient />
    </div>
  );
}

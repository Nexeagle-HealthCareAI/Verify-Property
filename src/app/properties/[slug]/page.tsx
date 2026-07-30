import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Maximize2, Calendar, Download, Share2 } from "lucide-react";
import { VerificationBadge, type VerificationLevel } from "@/components/property/VerificationBadge";
import { BeforeYouBuy } from "@/components/property/BeforeYouBuy";

// Lazy load heavy components
const BuySafeScore  = dynamic(() => import("@/components/property/BuySafeScore").then(m => ({ default: m.BuySafeScore })));
const VisitBooking  = dynamic(() => import("@/components/property/VisitBooking"));
const SimilarProps  = dynamic(() => import("@/components/property/SimilarProperties"));

/* ── Mock property data ── */
interface PropertyDetail {
  id: string;
  slug: string;
  title: string;
  type: string;
  verificationLevel: VerificationLevel;
  buySafeScore: number;
  buySafeScoreMax: number;
  areaDisplay: string;
  locationDisplay: string;
  facing: string;
  roadWidth: string;
  images: string[];
  goodThings: string[];
  thingsToVerify: string[];
  description: string;
}

const PROPERTIES: Record<string, PropertyDetail> = {
  "3-bigha-residential-plot-khagra": {
    id: "prop-001",
    slug: "3-bigha-residential-plot-khagra",
    title: "3 Bigha Residential Plot in Khagra — 20ft Road Access",
    type: "Residential",
    verificationLevel: "premium",
    buySafeScore: 88,
    buySafeScoreMax: 110,
    areaDisplay: "3 Bigha (~7,260 sq ft)",
    locationDisplay: "Khagra, Kishanganj",
    facing: "East",
    roadWidth: "20 feet",
    images: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    goodThings: [
      "20-ft metalled road with good connectivity",
      "Residential zone — municipality approved",
      "Mutation completed — records updated",
      "Electricity connection available at boundary",
      "School within 500m walking distance",
      "Flood-safe elevation (not in flood plain)",
    ],
    thingsToVerify: [
      "Original parent deed chain (3 generations)",
      "Physical demarcation / boundary wall not yet done",
      "Water connection — requires new pipeline",
    ],
    description:
      "A prime 3 Bigha residential plot in the heart of Khagra, Kishanganj. This is one of the few BuySafe Premium Verified plots available in the area, with a complete document chain and a 20-ft road on the front. Ideal for building a family home or investment.",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = PROPERTIES[slug];
  if (!property) return { title: "Property Not Found" };
  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [{ url: property.images[0], width: 800, height: 600 }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = PROPERTIES[slug];
  if (!property) notFound();

  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)" }}>
      {/* ── Image Gallery ── */}
      <section aria-label="Property images">
        <div style={{ display: "flex", gap: "2px", height: "300px", overflow: "hidden" }}>
          {property.images.slice(0, 3).map((img, i) => (
            <div
              key={i}
              style={{
                flex: i === 0 ? 2 : 1,
                position: "relative",
                minWidth: 0,
              }}
            >
              <Image
                src={img}
                alt={`${property.title} — Image ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="container" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-8)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-8)" }}>

          {/* Main content column */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap", marginBottom: "var(--space-3)" }}>
                <VerificationBadge level={property.verificationLevel} size="md" />
                <span className="chip" style={{ fontSize: "10px", padding: "2px 8px", minHeight: 24 }}>
                  {property.type}
                </span>
              </div>
              <h1 style={{
                fontFamily: "var(--font-heading)", fontWeight: 800,
                fontSize: "var(--text-2xl)", lineHeight: 1.25,
                marginBottom: "var(--space-3)",
              }}>
                {property.title}
              </h1>

              <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-4)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                  <MapPin size={14} aria-hidden="true" /> {property.locationDisplay}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                  <Maximize2 size={14} aria-hidden="true" /> {property.areaDisplay}
                </div>
              </div>

              {/* Price on Request */}
              <div style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-4)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "var(--space-3)",
              }}>
                <div>
                  <p style={{ fontSize: "var(--text-xs)", opacity: 0.75, marginBottom: 2 }}>Property Price</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-xl)" }}>
                    Price on Request
                  </p>
                </div>
                <button
                  id="detail-price-request-btn"
                  className="btn btn-accent btn-sm"
                >
                  Request Price
                </button>
              </div>
            </div>

            {/* Property details table */}
            <div className="card card-body" style={{ marginBottom: "var(--space-6)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-4)" }}>
                Property Details
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
                {[
                  { label: "Area",        value: property.areaDisplay },
                  { label: "Facing",      value: property.facing },
                  { label: "Road Width",  value: property.roadWidth },
                  { label: "Location",    value: property.locationDisplay },
                ].map(({ label, value }) => (
                  <div key={label} style={{ padding: "var(--space-3)", background: "var(--surface-bg)", borderRadius: "var(--radius-md)" }}>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: 2 }}>{label}</p>
                    <p style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BuySafe Score */}
            <div className="card card-body" style={{ marginBottom: "var(--space-6)" }}>
              <BuySafeScore
                total={property.buySafeScore}
                maxTotal={property.buySafeScoreMax}
              />
            </div>

            {/* Before You Buy */}
            <div style={{ marginBottom: "var(--space-6)" }}>
              <BeforeYouBuy
                goodThings={property.goodThings}
                thingsToVerify={property.thingsToVerify}
              />
            </div>

            {/* Description */}
            <div className="card card-body" style={{ marginBottom: "var(--space-6)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
                About This Property
              </h2>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "var(--text-sm)" }}>
                {property.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <button id="detail-download-pdf" className="btn btn-outline" style={{ gap: "var(--space-2)" }}>
                <Download size={16} /> Download Property Report
              </button>
              <button id="detail-share" className="btn btn-ghost" style={{ gap: "var(--space-2)" }}>
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          {/* Sidebar — Visit Booking */}
          <div>
            <div style={{ position: "sticky", top: "calc(var(--nav-height-mobile) + var(--space-4))" }}>
              <div className="card card-body">
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Calendar size={20} color="var(--color-primary)" aria-hidden="true" />
                  Book Site Visit
                </h2>
                <VisitBooking
                  propertyId={property.id}
                  propertySlug={property.slug}
                  propertyTitle={property.title}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-xl)", marginBottom: "var(--space-5)" }}>
            Similar Properties
          </h2>
          <SimilarProps currentSlug={slug} />
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: property.title,
            description: property.description,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kishanganj",
              addressRegion: "Bihar",
              addressCountry: "IN",
            },
            additionalProperty: [
              { "@type": "PropertyValue", name: "BuySafe Score", value: `${property.buySafeScore}/${property.buySafeScoreMax}` },
              { "@type": "PropertyValue", name: "Verification Level", value: property.verificationLevel },
            ],
          }),
        }}
      />
    </div>
  );
}

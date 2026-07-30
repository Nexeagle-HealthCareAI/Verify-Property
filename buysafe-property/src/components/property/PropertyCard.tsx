"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Maximize2, IndianRupee } from "lucide-react";
import { useState } from "react";
import { VerificationBadge, type VerificationLevel } from "./VerificationBadge";
import { BuySafeScore } from "./BuySafeScore";

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: string;
  verificationLevel: VerificationLevel;
  buySafeScore: number;
  buySafeScoreMax: number;
  areaDisplay: string;         // e.g. "1200 sq ft" or "3 Bigha"
  locationDisplay: string;     // e.g. "Khagra, Kishanganj"
  thumbnail: string;
  thumbnailBlur?: string;
}

interface PropertyCardProps {
  property: Property;
  onSave?: (id: string, saved: boolean) => void;
  initialSaved?: boolean;
}

export function PropertyCard({ property, onSave, initialSaved = false }: PropertyCardProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    onSave?.(property.id, next);
    // Haptic feedback on mobile
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <>
      <article className="property-card" aria-label={`Property: ${property.title}`}>
        <Link
          href={`/properties/${property.slug}`}
          style={{ display: "block", textDecoration: "none", color: "inherit" }}
        >
          {/* Image */}
          <div className="property-card-img">
            <Image
              src={property.thumbnail}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              loading="lazy"
              placeholder={property.thumbnailBlur ? "blur" : "empty"}
              blurDataURL={property.thumbnailBlur}
              style={{ objectFit: "cover" }}
            />

            {/* Overlay: badge + save */}
            <div className="property-card-overlay">
              <VerificationBadge level={property.verificationLevel} size="sm" />
              <button
                className={`property-card-save ${saved ? "saved" : ""}`}
                onClick={handleSave}
                aria-label={saved ? "Remove from saved" : "Save property"}
                aria-pressed={saved}
              >
                <Heart
                  size={16}
                  fill={saved ? "hsl(0, 70%, 55%)" : "none"}
                  stroke={saved ? "hsl(0, 70%, 55%)" : "currentColor"}
                />
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="property-card-body">
            {/* Property type tag */}
            <div style={{ marginBottom: "var(--space-2)" }}>
              <span className="chip" style={{ fontSize: "10px", padding: "2px 8px", minHeight: 24 }}>
                {property.type}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "var(--text-base)",
              marginBottom: "var(--space-2)",
              lineHeight: 1.3,
              color: "var(--color-text-primary)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {property.title}
            </h3>

            {/* Location */}
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              color: "var(--color-text-muted)", fontSize: "var(--text-xs)",
              marginBottom: "var(--space-3)",
            }}>
              <MapPin size={12} aria-hidden="true" />
              <span>{property.locationDisplay}</span>
            </div>

            {/* Stats row */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "var(--space-3)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                <Maximize2 size={12} aria-hidden="true" />
                <span>{property.areaDisplay}</span>
              </div>
              {/* BuySafe Score compact */}
              <BuySafeScore
                total={property.buySafeScore}
                maxTotal={property.buySafeScoreMax}
                compact
              />
            </div>

            {/* Price on Request CTA */}
            <button
              id={`price-request-${property.id}`}
              onClick={(e) => { e.preventDefault(); setPriceModalOpen(true); }}
              className="btn btn-primary btn-sm"
              style={{ width: "100%", justifyContent: "center" }}
              aria-label={`Request price for ${property.title}`}
            >
              <IndianRupee size={14} />
              Request Price
            </button>
          </div>
        </Link>
      </article>

      {/* Price Request Modal */}
      {priceModalOpen && (
        <PriceRequestModal
          propertyTitle={property.title}
          propertyId={property.id}
          onClose={() => setPriceModalOpen(false)}
        />
      )}
    </>
  );
}

/* ── Price Request Modal ── */
function PriceRequestModal({
  propertyTitle,
  propertyId,
  onClose,
}: {
  propertyTitle: string;
  propertyId: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "price_request",
          propertyId,
          name:        data.get("name"),
          mobile:      data.get("mobile"),
          requirement: data.get("requirement"),
        }),
      });
      setSubmitted(true);
    } catch {
      /* handle gracefully */
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bottom-sheet-overlay" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request property price"
        className="bottom-sheet"
      >
        <div className="bottom-sheet-handle" />
        <div style={{ padding: "0 var(--space-5) var(--space-5)" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-1)" }}>
            Request Price
          </h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)" }}>
            {propertyTitle}
          </p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "var(--space-8) 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>✅</div>
              <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
                Request Sent!
              </h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                Our team will contact you within 2 hours with the price details.
              </p>
              <button className="btn btn-primary" style={{ marginTop: "var(--space-5)" }} onClick={onClose}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="input-label" htmlFor="price-req-name">Your Name *</label>
                <input
                  id="price-req-name"
                  name="name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label className="input-label" htmlFor="price-req-mobile">Mobile Number *</label>
                <input
                  id="price-req-mobile"
                  name="mobile"
                  type="tel"
                  required
                  pattern="[6-9]\d{9}"
                  maxLength={10}
                  className="input-field"
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                />
              </div>
              <div className="form-group">
                <label className="input-label" htmlFor="price-req-requirement">Your Requirement</label>
                <textarea
                  id="price-req-requirement"
                  name="requirement"
                  rows={3}
                  className="input-field"
                  placeholder="e.g. Looking for 1500 sq ft plot for residential use"
                  style={{ resize: "vertical" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Price Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

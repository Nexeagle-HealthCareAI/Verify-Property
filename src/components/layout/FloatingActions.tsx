"use client";

import { useState } from "react";
import { Phone, CalendarCheck, X, Plus } from "lucide-react";

export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);

  const whatsappUrl = "https://wa.me/91XXXXXXXXXX?text=Hi%20BuySafe%2C%20I'm%20looking%20for%20a%20property";
  const phoneUrl    = "tel:+91XXXXXXXXXX";
  const visitUrl    = "/properties?action=book-visit";

  return (
    <div className="fab-container" role="complementary" aria-label="Quick contact options">
      {/* Expanded actions */}
      {expanded && (
        <>
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fab fab-whatsapp animate-scale-in delay-100"
            aria-label="Chat on WhatsApp"
            title="WhatsApp"
          >
            <span className="fab-label">WhatsApp</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
          </a>

          {/* Call */}
          <a
            href={phoneUrl}
            className="fab fab-call animate-scale-in delay-200"
            aria-label="Call BuySafe"
            title="Call Us"
          >
            <span className="fab-label">Call Now</span>
            <Phone size={20} />
          </a>

          {/* Book Visit */}
          <a
            href={visitUrl}
            className="fab fab-visit animate-scale-in delay-300"
            aria-label="Book a site visit"
            title="Book Visit"
          >
            <span className="fab-label">Book Visit</span>
            <CalendarCheck size={20} />
          </a>
        </>
      )}

      {/* Toggle button */}
      <button
        className="fab"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Close quick actions" : "Open quick actions"}
        aria-expanded={expanded}
        style={{
          background: expanded ? "hsl(220, 28%, 25%)" : "var(--color-primary)",
          color: "white",
          transform: expanded ? "rotate(45deg)" : "none",
          transition: "transform var(--transition-spring), background var(--transition-base)",
        }}
      >
        <Plus size={22} />
      </button>
    </div>
  );
}

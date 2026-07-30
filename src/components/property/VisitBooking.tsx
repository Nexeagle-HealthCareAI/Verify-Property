"use client";

import { useState } from "react";
import { Calendar, Clock, Users, CheckCircle } from "lucide-react";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

interface VisitBookingProps {
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
}

export default function VisitBooking({ propertyId, propertySlug, propertyTitle }: VisitBookingProps) {
  const [name, setName]               = useState("");
  const [mobile, setMobile]           = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [visitorCount, setVisitorCount] = useState(1);
  const [loading, setLoading]         = useState(false);
  const [bookingRef, setBookingRef]   = useState("");
  const [error, setError]             = useState("");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          propertySlug,
          name,
          mobile,
          date:         selectedDate,
          timeSlot:     selectedTime,
          visitorCount,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      setBookingRef(data.bookingRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (bookingRef) {
    return (
      <div style={{ textAlign: "center", padding: "var(--space-4) 0" }}>
        <CheckCircle size={48} color="var(--color-success)" style={{ margin: "0 auto var(--space-4)" }} aria-hidden="true" />
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
          Visit Confirmed! 🎉
        </h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)" }}>
          {selectedDate} at {selectedTime} · {visitorCount} visitor(s)
        </p>
        <div style={{
          background: "var(--surface-bg)", borderRadius: "var(--radius-md)",
          padding: "var(--space-3)", marginBottom: "var(--space-4)",
        }}>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: 2 }}>Booking Reference</p>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--color-primary)" }}>
            {bookingRef}
          </p>
        </div>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
          You will receive a confirmation call within 2 hours. Save your booking reference.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="input-label" htmlFor="visit-name">Your Name *</label>
        <input
          id="visit-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          placeholder="Full name"
          autoComplete="name"
        />
      </div>
      <div className="form-group">
        <label className="input-label" htmlFor="visit-mobile">Mobile Number *</label>
        <input
          id="visit-mobile"
          type="tel"
          required
          pattern="[6-9]\d{9}"
          maxLength={10}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="input-field"
          placeholder="10-digit number"
          autoComplete="tel"
        />
      </div>
      <div className="form-group">
        <label className="input-label" htmlFor="visit-date">
          <Calendar size={14} style={{ display: "inline", marginRight: 6 }} aria-hidden="true" />
          Preferred Date *
        </label>
        <input
          id="visit-date"
          type="date"
          required
          min={minDateStr}
          max={maxDateStr}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label className="input-label">
          <Clock size={14} style={{ display: "inline", marginRight: 6 }} aria-hidden="true" />
          Preferred Time *
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }} role="radiogroup" aria-label="Select time slot">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              role="radio"
              aria-checked={selectedTime === slot}
              onClick={() => setSelectedTime(slot)}
              className={`chip ${selectedTime === slot ? "active" : ""}`}
              style={{ fontSize: "var(--text-xs)" }}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label className="input-label" htmlFor="visit-visitors">
          <Users size={14} style={{ display: "inline", marginRight: 6 }} aria-hidden="true" />
          Number of Visitors
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <button
            type="button"
            onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))}
            className="btn btn-ghost btn-sm"
            aria-label="Decrease visitor count"
            style={{ borderRadius: "var(--radius-pill)", width: 36, height: 36, padding: 0 }}
          >
            −
          </button>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-xl)", minWidth: 24, textAlign: "center" }}>
            {visitorCount}
          </span>
          <button
            type="button"
            onClick={() => setVisitorCount(Math.min(6, visitorCount + 1))}
            className="btn btn-ghost btn-sm"
            aria-label="Increase visitor count"
            style={{ borderRadius: "var(--radius-pill)", width: 36, height: 36, padding: 0 }}
          >
            +
          </button>
        </div>
      </div>

      {error && (
        <p className="input-error" style={{ marginBottom: "var(--space-3)" }} role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        id="visit-booking-submit"
        className="btn btn-primary btn-lg"
        style={{ width: "100%", justifyContent: "center" }}
        disabled={loading || !selectedDate || !selectedTime}
      >
        <Calendar size={18} />
        {loading ? "Booking..." : "Confirm Visit"}
      </button>
    </form>
  );
}

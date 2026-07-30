"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreDimension {
  label: string;
  score: number;
  max: number;
}

interface BuySafeScoreProps {
  total: number;
  maxTotal?: number;
  dimensions?: ScoreDimension[];
  compact?: boolean;
}

const DEFAULT_DIMENSIONS: ScoreDimension[] = [
  { label: "Ownership Documents", score: 25, max: 25 },
  { label: "Revenue Records",     score: 20, max: 25 },
  { label: "Road & Accessibility",score: 18, max: 20 },
  { label: "Location Potential",  score: 15, max: 15 },
  { label: "Flood Risk",          score: 10, max: 10 },
  { label: "Investment Potential",score: 10, max: 15 },
];

function getScoreColor(pct: number): string {
  if (pct >= 85) return "hsl(145, 60%, 40%)";   // Green
  if (pct >= 65) return "hsl(38, 90%, 48%)";    // Orange
  return "hsl(0, 68%, 48%)";                    // Red
}

function getScoreLabel(pct: number): string {
  if (pct >= 90) return "Excellent";
  if (pct >= 80) return "Very Good";
  if (pct >= 65) return "Good";
  if (pct >= 50) return "Average";
  return "Below Average";
}

export function BuySafeScore({
  total,
  maxTotal = 110,
  dimensions = DEFAULT_DIMENSIONS,
  compact = false,
}: BuySafeScoreProps) {
  const pct = Math.round((total / maxTotal) * 100);
  const color = getScoreColor(pct);
  const label = getScoreLabel(pct);

  const [animated, setAnimated] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          // Animate score counter
          let start = 0;
          const step = Math.ceil(total / 40);
          const timer = setInterval(() => {
            start = Math.min(start + step, total);
            setDisplayScore(start);
            if (start >= total) clearInterval(timer);
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated, total]);

  // SVG donut chart params
  const radius = 44;
  const cx = 56;
  const cy = 56;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animated ? pct / 100 : 0) * circumference;

  if (compact) {
    return (
      <div
        ref={ref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: `${color}18`,
          border: `1.5px solid ${color}`,
          borderRadius: "var(--radius-pill)",
          padding: "4px 12px",
        }}
        title={`BuySafe Score: ${total}/${maxTotal} — ${label}`}
        aria-label={`BuySafe Score ${total} out of ${maxTotal}`}
      >
        <span style={{ fontSize: "12px" }}>⭐</span>
        <span style={{ fontWeight: 700, fontSize: "var(--text-sm)", color }}>
          {displayScore}/{maxTotal}
        </span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>BuySafe Score</span>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Score header */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", flexWrap: "wrap" }}>
        {/* Donut SVG */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
            {/* Background track */}
            <circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="10"
            />
            {/* Animated progress arc */}
            <circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
          </svg>
          {/* Center text */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color, lineHeight: 1 }}>
              {displayScore}
            </span>
            <span style={{ fontSize: "10px", color: "var(--color-text-muted)", fontWeight: 500 }}>
              /{maxTotal}
            </span>
          </div>
        </div>

        {/* Score summary */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
            <span style={{ fontSize: "1.2rem" }}>⭐</span>
            <span style={{
              fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-xl)",
            }}>
              BuySafe Score™
            </span>
          </div>
          <p style={{
            fontSize: "var(--text-2xl)", fontWeight: 800,
            color, fontFamily: "var(--font-heading)",
          }}>
            {label}
          </p>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "4px" }}>
            Based on {dimensions.length} verified parameters
          </p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div>
        <h4 style={{
          fontFamily: "var(--font-heading)", fontWeight: 600,
          fontSize: "var(--text-base)", marginBottom: "var(--space-4)",
          color: "var(--color-text-secondary)",
        }}>
          Score Breakdown
        </h4>
        <div className="score-bar-wrap" role="list">
          {dimensions.map((dim, i) => {
            const dimPct = Math.round((dim.score / dim.max) * 100);
            const dimColor = getScoreColor(dimPct);
            return (
              <div
                key={dim.label}
                className="score-bar-item"
                role="listitem"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="score-bar-label" style={{ fontSize: "var(--text-sm)" }}>
                  {dim.label}
                </span>
                <div className="score-bar-track" aria-label={`${dim.score} of ${dim.max}`}>
                  <div
                    className="score-bar-fill"
                    style={{
                      width: animated ? `${dimPct}%` : "0%",
                      background: `linear-gradient(90deg, ${dimColor}80, ${dimColor})`,
                      transitionDelay: animated ? `${i * 80}ms` : "0ms",
                    }}
                  />
                </div>
                <span className="score-value">
                  {dim.score}/{dim.max}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

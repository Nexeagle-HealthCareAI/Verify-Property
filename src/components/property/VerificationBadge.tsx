import { CheckCircle, FileCheck, MapPin, Star } from "lucide-react";

export type VerificationLevel =
  | "self_listed"
  | "docs_verified"
  | "site_verified"
  | "premium";

interface VerificationBadgeProps {
  level: VerificationLevel;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const BADGE_CONFIG = {
  self_listed: {
    label: "Self Listed",
    icon: CheckCircle,
    className: "badge badge-self-listed",
    description: "Property listed by owner. Basic information verified.",
    emoji: "🔵",
  },
  docs_verified: {
    label: "Documents Verified",
    icon: FileCheck,
    className: "badge badge-docs-verified",
    description: "Ownership & title documents verified by BuySafe team.",
    emoji: "🔵",
  },
  site_verified: {
    label: "Site Verified",
    icon: MapPin,
    className: "badge badge-site-verified",
    description: "Physical site inspection completed. Boundaries confirmed.",
    emoji: "🔵",
  },
  premium: {
    label: "BuySafe Premium Verified",
    icon: Star,
    className: "badge badge-premium",
    description:
      "Full verification: Documents + Site visit + Revenue records + Flood risk assessment.",
    emoji: "⭐",
  },
};

export function VerificationBadge({
  level,
  size = "md",
  showTooltip = true,
}: VerificationBadgeProps) {
  const config = BADGE_CONFIG[level];
  const IconComponent = config.icon;

  const iconSize = size === "sm" ? 10 : size === "lg" ? 16 : 12;
  const fontSize =
    size === "sm" ? "10px" : size === "lg" ? "var(--text-sm)" : "var(--text-xs)";

  return (
    <span
      className={config.className}
      style={{ fontSize, cursor: showTooltip ? "help" : "default" }}
      title={showTooltip ? config.description : undefined}
      aria-label={`${config.label}: ${config.description}`}
    >
      <IconComponent size={iconSize} aria-hidden="true" />
      {config.label}
    </span>
  );
}

/* Full tier display (for landing page / detail page explainer) */
export function VerificationTierDisplay() {
  const levels: VerificationLevel[] = [
    "self_listed",
    "docs_verified",
    "site_verified",
    "premium",
  ];

  return (
    <div className="verification-tier" role="list" aria-label="Verification levels">
      {levels.map((level, index) => {
        const config = BADGE_CONFIG[level];
        const IconComponent = config.icon;

        return (
          <div
            key={level}
            className={`verification-tier-item ${level === "premium" ? "active" : ""}`}
            role="listitem"
          >
            {/* Level number */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-pill)",
                background:
                  level === "premium"
                    ? "linear-gradient(135deg, var(--color-accent-light), var(--color-accent))"
                    : "var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                color: level === "premium" ? "hsl(30, 60%, 12%)" : "var(--color-text-muted)",
                flexShrink: 0,
              }}
            >
              {index + 1}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <VerificationBadge level={level} size="sm" showTooltip={false} />
              <p style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                marginTop: "4px",
              }}>
                {config.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

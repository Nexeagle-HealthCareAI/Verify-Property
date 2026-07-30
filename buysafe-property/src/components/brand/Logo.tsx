"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  className?: string;
  light?: boolean;
}

const sizes = {
  sm: { icon: 20, text: "var(--text-lg)" },
  md: { icon: 28, text: "var(--text-2xl)" },
  lg: { icon: 40, text: "var(--text-4xl)" },
};

export function Logo({ size = "md", withText = true, className = "", light = false }: LogoProps) {
  const iconSize = sizes[size].icon;
  const textSize = sizes[size].text;

  // The geometric mark uses a stylized "B" + "Shield" or "House" shape.
  // We'll use Framer Motion for a subtle draw effect on load.
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay: 0.1
      }
    }
  };

  const fillVariants = {
    hidden: { fillOpacity: 0 },
    visible: { 
      fillOpacity: 1,
      transition: { duration: 1, delay: 0.8 }
    }
  };

  return (
    <Link 
      href="/" 
      className={`logo-container ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        color: light ? "white" : "var(--color-primary-dark)",
      }}
      aria-label="BuySafe Home"
    >
      <motion.svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-accent-light)" />
            <stop offset="1" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>

        {/* Shield / House Base */}
        <motion.path
          d="M24 4L4 14V28C4 37 12.5 43.5 24 46C35.5 43.5 44 37 44 28V14L24 4Z"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          fill="url(#logo-gradient)"
          custom={fillVariants}
          initial={{ fillOpacity: 0 }}
          animate={{ fillOpacity: 0.15 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Inner Checkmark (Verified) */}
        <motion.path
          d="M16 26L22 32L34 18"
          stroke="url(#logo-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </motion.svg>

      {withText && (
        <span 
          style={{ 
            fontFamily: "var(--font-heading)", 
            fontWeight: 800,
            fontSize: textSize,
            letterSpacing: "-0.03em",
            background: light 
              ? "linear-gradient(135deg, #FFF 0%, #E2E8F0 100%)" 
              : "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          BuySafe
        </span>
      )}
    </Link>
  );
}

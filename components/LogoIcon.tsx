import React from "react";

export interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  variant?: "badge" | "standalone";
  showAudioWaves?: boolean;
}

/**
 * Modern Brand Logo Mark for Rimslin.com
 * 
 * Core Metaphors:
 * 1. Lettermark "R": Solid, trusted pillar on the left anchor.
 * 2. Speech Bubble / Dialogue Loop: Vocal communication & spoken language fluency.
 * 3. StepAhead Career Trajectory: Upward-surging diagonal stroke with golden amber accent.
 * 4. Acoustic Audio Waves: Active spoken language resonance.
 */
export default function LogoIcon({
  size = 40,
  className = "",
  variant = "badge",
  showAudioWaves = true,
  ...props
}: LogoIconProps) {
  // Generate a unique ID prefix to prevent SVG gradient ID collisions
  const idPrefix = "rimslin-logo";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Rimslin Logo"
      role="img"
      {...props}
    >
      <defs>
        {/* Pillar Stem Gradient (Deep Emerald -> Vibrant Emerald) */}
        <linearGradient
          id={`${idPrefix}-stem`}
          x1="10"
          y1="8"
          x2="10"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="35%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* Upper Dialogue Loop Gradient */}
        <linearGradient
          id={`${idPrefix}-loop`}
          x1="12"
          y1="9"
          x2="34"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="40%" stopColor="#10b981" />
          <stop offset="85%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* StepAhead Career Ascent Gradient (Emerald -> Radiant Amber/Gold) */}
        <linearGradient
          id={`${idPrefix}-arrow`}
          x1="20"
          y1="25"
          x2="37"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="45%" stopColor="#059669" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        {/* Acoustic Pulse Wave Gradient */}
        <linearGradient
          id={`${idPrefix}-wave`}
          x1="34"
          y1="14"
          x2="42"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Badge Backdrop Gradient (Deep Slate/Emerald Glassmorphism) */}
        <linearGradient
          id={`${idPrefix}-badge-bg`}
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0f2b1d" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#081b12" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#030c08" stopOpacity="1" />
        </linearGradient>

        {/* Badge Border Stroke Gradient */}
        <linearGradient
          id={`${idPrefix}-badge-border`}
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>

        {/* Ambient Glow Filter */}
        <filter
          id={`${idPrefix}-glow`}
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="2"
            floodColor="#047857"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      {/* 1. Optional Refined Glassmorphism Badge */}
      {variant === "badge" && (
        <g>
          <rect
            x="1.5"
            y="1.5"
            width="45"
            height="45"
            rx="13"
            fill={`url(#${idPrefix}-badge-bg)`}
            stroke={`url(#${idPrefix}-badge-border)`}
            strokeWidth="1.2"
          />
          {/* Subtle Glass Top Highlight */}
          <path
            d="M 6 12 C 6 8 8 6 12 6 H 36 C 40 6 42 8 42 12 V 16 C 42 16 30 14 18 17 C 10 19 6 16 6 16 Z"
            fill="white"
            fillOpacity="0.04"
          />
        </g>
      )}

      {/* 2. Brand Emblem Group (Sharp & Scalable) */}
      <g filter={`url(#${idPrefix}-glow)`}>
        {/* A. Vertical Pillar Stem of "R" (Trust & Firm Foundation) */}
        <rect
          x="9"
          y="8.5"
          width="6"
          height="29"
          rx="3"
          fill={`url(#${idPrefix}-stem)`}
        />

        {/* B. Dialogue / Speech Bubble Loop of "R" (Spoken Communication) */}
        <path
          d="M 12 11.5 H 22.5 C 27.194 11.5 31 15.306 31 20 C 31 24.694 27.194 28.5 22.5 28.5 H 15"
          stroke={`url(#${idPrefix}-loop)`}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* C. StepAhead Career Trajectory Leg (Dynamic Upward Surge) */}
        <path
          d="M 19.5 25.5 C 22.5 25.5 24.8 27.2 27.2 31 L 32.5 37.5"
          stroke={`url(#${idPrefix}-arrow)`}
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* D. Acoustic Spoken Sound Waves (Radiating Dialogue) */}
        {showAudioWaves && (
          <g>
            {/* Primary Sound Wave Arc */}
            <path
              d="M 34.5 14.5 C 36.8 16.5 38.2 19 38.2 21.5 C 38.2 24 36.8 26.5 34.5 28.5"
              stroke={`url(#${idPrefix}-wave)`}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Active Voice Spark Dot */}
            <circle cx="34" cy="11.5" r="1.4" fill="#fbbf24" />
          </g>
        )}
      </g>
    </svg>
  );
}

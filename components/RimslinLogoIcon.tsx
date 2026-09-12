import React, { useId } from "react";

export interface RimslinLogoIconProps extends React.SVGProps<SVGSVGElement> {
  /** Width and height in pixels or CSS units (default: 48) */
  size?: number | string;
  /** Additional Tailwind or CSS classes */
  className?: string;
  /** Display style: "standalone" (clean vector, default) or "badge" (rounded backdrop) */
  variant?: "standalone" | "badge";
  /** Accent color theme for the career flight arrow */
  accentColor?: "gold" | "navy";
  /** Whether to render the acoustic voice / passport stamp lines */
  showPassportLines?: boolean;
}

/**
 * RimslinLogoIcon
 *
 * Official modern brand logo SVG icon for Rimslin.com.
 * Designed for a 48x48 viewBox with pixel-crisp rendering at 24px, 32px, and 48px.
 *
 * Core Metaphors:
 * 1. Spoken Communication: Aerodynamic speech bubble contour denoting conversational
 *    fluency and foreign language coaching for migrant workers.
 * 2. Global Career Advancement (StepAhead): A sharp 45° upward-surging career arrow
 *    symbolizing foreign work placement, overseas mobility, and higher income.
 * 3. Passport Lines & Voice Waves: Precision stamp notches signifying both passport
 *    visa clearance and phonetic speech soundwaves.
 */
export default function RimslinLogoIcon({
  size = 48,
  className = "",
  variant = "standalone",
  accentColor = "gold",
  showPassportLines = true,
  ...props
}: RimslinLogoIconProps) {
  const rawId = useId();
  const id = `rimslin-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const isGold = accentColor === "gold";

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
        {/* Primary Emerald Gradient (Trust, Growth & Global Mobility) */}
        <linearGradient
          id={`${id}-emerald`}
          x1="6"
          y1="6"
          x2="42"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* Accent Flight Arrow Gradient (Gold/Amber or Slate Navy) */}
        <linearGradient
          id={`${id}-accent`}
          x1="18"
          y1="30"
          x2="38"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          {isGold ? (
            <>
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#334155" />
            </>
          )}
        </linearGradient>

        {/* Badge Backdrop Gradient (Used only when variant === "badge") */}
        {variant === "badge" && (
          <linearGradient
            id={`${id}-badge-bg`}
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#061A12" />
            <stop offset="100%" stopColor="#020805" />
          </linearGradient>
        )}
      </defs>

      {/* Optional Badge Backdrop */}
      {variant === "badge" && (
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="12"
          fill={`url(#${id}-badge-bg)`}
          stroke="#059669"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />
      )}

      {/* 1. Spoken Communication: Aerodynamic Speech Bubble Contour */}
      <path
        d="M 12 37.5 L 6.5 41.5 L 8.5 34.5 C 6 31.2 4.5 27.3 4.5 23 C 4.5 12.8 13.2 4.5 24 4.5 C 34.8 4.5 43.5 12.8 43.5 23 C 43.5 33.2 34.8 41.5 24 41.5 C 19.8 41.5 15.9 40.2 12.8 38"
        stroke={`url(#${id}-emerald)`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Global Career Advancement: 45° Soaring StepAhead Vector Arrow */}
      <path
        d="M 25 11 H 37 V 23 M 37 11 L 18 30"
        stroke={`url(#${id}-accent)`}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Passport Visa Stamp Lines & Phonetic Sound Harmonics */}
      {showPassportLines && (
        <g stroke="#059669" strokeWidth="2.8" strokeLinecap="round">
          {/* Primary sound / stamp bar */}
          <line x1="13" y1="17" x2="20" y2="17" />
          {/* Secondary harmonic / milestone bar */}
          <line x1="13" y1="22.5" x2="18" y2="22.5" />
        </g>
      )}
    </svg>
  );
}

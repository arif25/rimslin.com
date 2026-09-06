import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "horizontal"; // "square" | "horizontal"
  const theme = searchParams.get("theme") || "dark"; // "dark" | "light"

  const isSquare = format === "square";
  const isDark = theme === "dark";

  const width = isSquare ? 800 : 1200;
  const height = isSquare ? 800 : 630;

  const bgColor = isDark ? "#060b08" : "#f8fafc";
  const textColor = isDark ? "#ffffff" : "#0f172a";
  const subtextColor = isDark ? "#94a3b8" : "#64748b";
  const cardBg = isDark ? "#07120b" : "#f1f5f9";
  const badgeBg = isDark ? "rgba(6, 78, 59, 0.5)" : "#ecfdf5";
  const badgeBorder = isDark ? "#065f46" : "#a7f3d0";
  const badgeText = isDark ? "#34d399" : "#047857";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
          padding: "40px",
        }}
      >
        {/* Logo Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Brand Icon Box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "100px",
              borderRadius: "26px",
              background: "linear-gradient(135deg, #059669, #34d399, #fbbf24)",
              padding: "2px",
              boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                borderRadius: "24px",
                backgroundColor: cardBg,
              }}
            >
              {/* Globe SVG */}
              <svg
                width="54"
                height="54"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
          </div>

          {/* Typography */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Title & Badge Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "52px",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: textColor,
                  display: "flex",
                }}
              >
                Rimslin
                <span style={{ color: "#f59e0b" }}>.com</span>
              </div>

              {/* Career Pill Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px 14px",
                  borderRadius: "8px",
                  backgroundColor: badgeBg,
                  border: `1.5px solid ${badgeBorder}`,
                  fontSize: "17px",
                  fontWeight: 700,
                  color: badgeText,
                  marginTop: "4px",
                }}
              >
                StepAhead
              </div>
            </div>

            {/* Subtext */}
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: subtextColor,
                marginTop: "4px",
              }}
            >
              Expat Language &amp; Career Platform
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}

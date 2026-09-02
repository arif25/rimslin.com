import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rimslin | Gulf Spoken Arabic & English for Bengali Speakers";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#060b08",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          padding: "60px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "25%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.25), transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #059669, #10b981, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "34px",
              fontWeight: "bold",
            }}
          >
            R
          </div>
          <span
            style={{
              fontSize: "44px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Rimslin<span style={{ color: "#34d399" }}>.com</span>
          </span>
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 900,
            background: "linear-gradient(to right, #34d399, #6ee7b7, #fbbf24)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          Gulf Arabic, Spoken English & Hindi for Gulf Jobs
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#d1fae5",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.4,
            marginBottom: "32px",
          }}
        >
          সৌদি আরব, দুবাই, কাতার, কুয়েত ও ওমান কাজের জন্য প্রবাসী ভাষা শিক্ষা প্ল্যাটফর্ম
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "20px",
            color: "#fbbf24",
            fontWeight: 600,
          }}
        >
          <span>🇸🇦 Saudi Arabia</span>
          <span>🇦🇪 UAE Dubai</span>
          <span>🇶🇦 Qatar</span>
          <span>🇰🇼 Kuwait</span>
          <span>🇴🇲 Oman</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

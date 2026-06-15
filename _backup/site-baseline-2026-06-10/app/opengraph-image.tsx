import { ImageResponse } from "next/og";

export const alt = "Successfulbob LLC | Go to Market Strategy for Technical Startups";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #061126 0%, #0d1a3a 55%, #061126 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            width: 88,
            height: 8,
            borderRadius: 999,
            background: "linear-gradient(90deg, #3f6bff, #8b5cf6)",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 950,
          }}
        >
          Make your technical story easier to
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 44,
          }}
        >
          understand, sell, and scale.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "linear-gradient(135deg, #3f6bff, #8b5cf6)",
            }}
          />
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
            Successfulbob LLC
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.4)" }}>
            · Go to Market Strategy for Technical Startups
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

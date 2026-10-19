import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "WebHet — Weby, které mají smysl.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0b1019",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        padding: "65px 80px",
        width: "100%",
        height: "100%",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        webhet<span style={{ color: "#3b82f6" }}>.</span>
      </div>
      <div
        style={{
          fontSize: 18,
          color: "#94a3b8",
          letterSpacing: 4,
          marginTop: 64,
        }}
      >
        WEB DESIGN & DEVELOPMENT
      </div>
      <div
        style={{
          fontSize: 92,
          fontWeight: 700,
          lineHeight: 1.1,
          marginTop: 20,
          letterSpacing: -5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Weby, které</span>
        <span>
          mají <span style={{ color: "#3b82f6" }}>smysl.</span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: -120,
          top: 100,
          width: 500,
          height: 500,
          border: "60px solid #172e51",
          borderRadius: 160,
          transform: "rotate(-25deg)",
        }}
      />
    </div>,
    size,
  );
}

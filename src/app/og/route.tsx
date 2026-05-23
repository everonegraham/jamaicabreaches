import { ImageResponse } from "next/og";

// Static OG image (1200x630). Referenced via metadata as /og on every page.
export const dynamic = "force-static";

export function GET() {
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
          background: "#09090b",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            color: "#34D399",
            letterSpacing: "-0.02em",
          }}
        >
          Jamaica Breaches
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 940,
          }}
        >
          Cybersecurity Incidents &amp; Data Breaches in Jamaica
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            color: "#a1a1aa",
            maxWidth: 940,
          }}
        >
          A public record of breaches, data leaks, hacks and scams affecting
          Jamaican organizations.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 26,
            color: "#71717a",
          }}
        >
          jamaicabreaches.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

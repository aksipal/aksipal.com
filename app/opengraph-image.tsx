import { ImageResponse } from "next/og";

export const alt = "Aksipal - Premium Web Systems";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          backgroundColor: "#07070b",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(124,255,146,0.22), transparent 45%), radial-gradient(circle at 80% 10%, rgba(132,106,255,0.22), transparent 40%)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#7cff92",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Aksipal
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 700,
            maxWidth: 920,
          }}
        >
          Premium web siteleri ve modern yazılım altyapıları.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Template paketler • Custom projeler • Lighthouse 90+
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

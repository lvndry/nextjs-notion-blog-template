import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          borderRadius: 40,
        }}
      >
        N
      </div>
    ),
    {
      ...size,
    }
  )
}

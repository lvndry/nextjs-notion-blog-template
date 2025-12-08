import { ImageResponse } from "next/og";

export const alt = "Next.js + Notion Blog Template";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default function OpenGraphImage() {
  try {
    const BASE_URL =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://nextjs-notion-blog-template-eight.vercel.app";
    const imageUrl = `${BASE_URL}/banner.png`;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            position: "relative",
          }}
        >
          <img
            src={imageUrl}
            alt="Banner"
            width={2882} // dimension of the image
            height={972} // dimension of the image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch {
    // Fallback to gradient design if image fails to load
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Next.js + Notion Blog
          </div>
          <div
            style={{
              fontSize: 32,
              opacity: 0.9,
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            A modern, customizable Next.js boilerplate for creating a blog
            powered by Notion as a CMS
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 40,
              fontSize: 24,
              opacity: 0.7,
            }}
          >
            notion-blog-template.com
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

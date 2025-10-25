import { searchAllPages } from "@/lib/notion";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextjs-notion-blog-template-eight.vercel.app"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  try {
    const pages = await searchAllPages()
    const dynamicPages: MetadataRoute.Sitemap = pages.map((page) => ({
      url: `${baseUrl}/page/${page.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }))

    return [...staticPages, ...dynamicPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}

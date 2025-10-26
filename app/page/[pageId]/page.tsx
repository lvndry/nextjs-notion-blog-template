import NotionPageViewer from "@/components/NotionPageViewer";
import { getPageContent, getPageDetails, searchAllPages, type NotionPageDetails } from "@/lib/notion";
import { isValidUUID, normalizeUUID } from "@/lib/uuid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    pageId: string;
  }>;
}

async function fetchPageData(pageId: string) {
  try {
    // Normalize the UUID format for the Notion API
    const normalizedPageId = normalizeUUID(pageId);

    const [pageDetails, pageContent] = await Promise.all([
      getPageDetails(normalizedPageId),
      getPageContent(normalizedPageId)
    ]);

    return { pageDetails, pageContent };
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
}

export default async function NotionPage({ params }: PageProps) {
  const resolvedParams = await params;

  if (!resolvedParams.pageId || resolvedParams.pageId === "undefined" || !isValidUUID(resolvedParams.pageId)) {
    console.error("Invalid pageId:", resolvedParams.pageId);
    notFound();
  }

  const pageData = await fetchPageData(resolvedParams.pageId).catch(() => {
    notFound();
  });

  if (!pageData) {
    notFound();
  }

  const { pageDetails, pageContent } = pageData;

  const title = extractPageTitle(pageDetails);
  const coverUrl = extractCoverUrl(pageDetails);
  const icon = extractPageIcon(pageDetails);
  const notionUrl = extractPageUrl(pageDetails);

  return (
    <>
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        {/* Hero with optional cover image */}
        <section className="relative overflow-hidden">
        {coverUrl ? (
          <div className="absolute inset-0">
            <Image src={coverUrl} alt={title} fill className="object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-500/20 via-sky-400/20 to-cyan-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-linear-to-tr from-fuchsia-400/10 via-purple-400/10 to-emerald-400/10 blur-3xl" />
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-24 md:pb-16">
          <div className="max-w-3xl">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 transition-colors min-h-[44px] ${coverUrl ? 'text-white/80 hover:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'}`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
              {icon && (
                <span className="text-3xl sm:text-4xl md:text-5xl">{icon}</span>
              )}
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${coverUrl ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                {title}
              </h1>
            </div>
            {notionUrl && (
              <div className="mt-4 sm:mt-6 flex gap-3">
                <a
                  href={notionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${coverUrl ? 'border-white/30 bg-white/10 text-white hover:bg-white/20' : 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'} inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm backdrop-blur min-h-[44px]`}
                >
                  Open in Notion
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <NotionPageViewer pageDetails={pageDetails} pageContent={pageContent} />
        </div>
      </section>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextjs-notion-blog-template-eight.vercel.app";
  const pageUrl = `${baseUrl}/page/${resolvedParams.pageId}`;

  if (!resolvedParams.pageId || resolvedParams.pageId === "undefined" || !isValidUUID(resolvedParams.pageId)) {
    return {
      title: "Page Not Found - Notion Blog",
      description: "The requested Notion page could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  try {
    const normalizedPageId = normalizeUUID(resolvedParams.pageId);
    const pageDetails = await getPageDetails(normalizedPageId);
    const title = extractPageTitle(pageDetails);
    const coverUrl = extractCoverUrl(pageDetails);
    const notionUrl = extractPageUrl(pageDetails);

    // Create a description from the title or use a default
    const description = `Read "${title}" - A Notion-powered blog post with rich content and modern design.`;

    // Use cover image for Open Graph, fallback to default
    const ogImage = coverUrl || `${baseUrl}/og-image.png`;

    return {
      title: title,
      description: description,
      keywords: [title, "Notion", "Blog", "Article", "Content"],
      authors: [{ name: "Notion Blog Template" }],
      creator: "Notion Blog Template",
      publisher: "Notion Blog Template",
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        type: "article",
        locale: "en_US",
        url: pageUrl,
        title: title,
        description: description,
        siteName: "Notion Blog Template",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        publishedTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
        authors: ["Notion Blog Template"],
        section: "Technology",
        tags: [title, "Notion", "Blog"],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [ogImage],
        creator: "@notionblogtemplate", // Replace with your Twitter handle
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      other: {
        "article:author": "Notion Blog Template",
        "article:section": "Technology",
        "article:tag": title,
        ...(notionUrl && { "notion:url": notionUrl }),
      },
    };
  } catch {
    return {
      title: "Page Not Found - Notion Blog",
      description: "The requested Notion page could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export async function generateStaticParams() {
  const pages = await searchAllPages();
  return pages.map((page) => ({
    pageId: page.id,
  }));
}

export const revalidate = 3600;
export const dynamic = 'force-static';

// Helper function to extract page title
function extractPageTitle(pageDetails: NotionPageDetails): string {
  const properties = pageDetails.properties;

  if (!properties) {
    return `Untitled Page (${pageDetails.id.slice(0, 8)})`;
  }

  for (const [, value] of Object.entries(properties)) {
    if (value && typeof value === "object" && "type" in value) {
      if (value.type === "title") {
        if (value.title && Array.isArray(value.title) && value.title.length > 0) {
          return value.title.map(t => t.plain_text || '').join('');
        }
      }
    }
  }

  // Fallback to page ID if no title found
  return `Untitled Page (${pageDetails.id.slice(0, 8)})`;
}

function extractCoverUrl(pageDetails: NotionPageDetails): string | null {
  const { cover } = pageDetails;

  if (!cover) return null;

  if (cover.type === "file" && cover.file?.url) {
    return cover.file.url;
  }

  if (cover.type === "external" && cover.external?.url) {
    return cover.external.url;
  }

  return null;
}

function extractPageUrl(details: NotionPageDetails): string | null {
  return details.url || null;
}

function extractPageIcon(pageDetails: NotionPageDetails): string | null {
  const icon = pageDetails.icon;
  if (!icon) return null;

  if (icon.type === "emoji" && icon.emoji) {
    return icon.emoji;
  }

  if (icon.type === "file" && icon.file?.url) {
    return icon.file.url;
  }

  if (icon.type === "external" && icon.external?.url) {
    return icon.external.url;
  }

  return null;
}

import { getPageContent, getPageDetails } from "@/lib/notion";
import { isValidUUID, normalizeUUID } from "@/lib/uuid";
import Link from "next/link";
import { notFound } from "next/navigation";
import NotionPageViewer from "../../../components/NotionPageViewer";

interface PageProps {
  params: Promise<{
    pageId: string;
  }>;
}


async function fetchPageData(pageId: string) {
  try {
    // Normalize the UUID format for the Notion API
    const normalizedPageId = normalizeUUID(pageId);
    
    // Fetch page details and content in parallel
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

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Pages
          </Link>
        </div>

        {/* Page Content */}
        <NotionPageViewer 
          pageDetails={pageDetails} 
          pageContent={pageContent}
        />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams.pageId || resolvedParams.pageId === "undefined" || !isValidUUID(resolvedParams.pageId)) {
    return {
      title: "Page Not Found - Notion Blog",
      description: "The requested Notion page could not be found.",
    };
  }

  try {
    const normalizedPageId = normalizeUUID(resolvedParams.pageId);
    const pageDetails = await getPageDetails(normalizedPageId);
    const title = extractPageTitle(pageDetails);
    
    return {
      title: `${title} - Notion Blog`,
      description: `View content from your Notion page: ${title}`,
    };
  } catch {
    return {
      title: "Page Not Found - Notion Blog",
      description: "The requested Notion page could not be found.",
    };
  }
}

// Helper function to extract page title
function extractPageTitle(pageDetails: Record<string, unknown>): string {
  const properties = pageDetails.properties as Record<string, unknown>;
  
  for (const [, value] of Object.entries(properties)) {
    if (value && typeof value === "object" && "type" in value) {
      const prop = value as { type: string; title?: Array<{ plain_text: string }> };
      if (prop.type === "title" && prop.title && prop.title.length > 0) {
        return prop.title.map((t) => t.plain_text).join('');
      }
    }
  }
  
  // Fallback to page ID if no title found
  return `Untitled Page (${(pageDetails.id as string).slice(0, 8)})`;
}
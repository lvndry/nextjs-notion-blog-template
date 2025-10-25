import { getPageContent, getPageDetails, searchAllPages } from "@/lib/notion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.NOTION_TOKEN) {
      return NextResponse.json(
        { error: "NOTION_TOKEN environment variable is not set" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || "list";
    const pageId = searchParams.get("pageId");

    switch (action) {
      case "list":
        // Get all accessible pages
        const pages = await searchAllPages();
        return NextResponse.json({ pages }, {
          headers: {
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
          },
        });

      case "content":
        // Get content for a specific page
        if (!pageId) {
          return NextResponse.json(
            { error: "pageId parameter is required for content action" },
            { status: 400 }
          );
        }

        const content = await getPageContent(pageId);
        return NextResponse.json({ content }, {
          headers: {
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
          },
        });

      case "details":
        // Get detailed information for a specific page
        if (!pageId) {
          return NextResponse.json(
            { error: "pageId parameter is required for details action" },
            { status: 400 }
          );
        }

        const details = await getPageDetails(pageId);
        return NextResponse.json({ details }, {
          headers: {
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
          },
        });

      default:
        return NextResponse.json(
          { error: "Invalid action. Use: list, content, or details" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Notion" },
      { status: 500 }
    );
  }
}

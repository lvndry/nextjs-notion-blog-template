export interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, unknown>;
  parent: Record<string, unknown>;
}

export interface NotionPagesResponse {
  pages: NotionPage[];
  error?: string;
}

/**
 * Fetches all Notion pages from the API
 * Can be used anywhere - components, server-side, other utilities
 */
export async function fetchNotionPages(): Promise<NotionPagesResponse> {
  try {
    const response = await fetch("/api/notion/pages?action=list");
    const data = await response.json();

    if (data.error) {
      return { pages: [], error: data.error };
    }

    return { pages: data.pages || [] };
  } catch (error) {
    console.error("Error fetching pages:", error);
    return {
      pages: [],
      error: "Failed to fetch pages from Notion"
    };
  }
}

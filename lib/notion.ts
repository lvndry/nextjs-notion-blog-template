import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, unknown>;
  parent: Record<string, unknown>;
}

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  [key: string]: unknown;
}

interface NotionPageResponse {
  id: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, unknown>;
  parent: Record<string, unknown>;
}

interface NotionBlockResponse {
  id: string;
  type: string;
  has_children: boolean;
  [key: string]: unknown;
}

// Search for all pages accessible to the integration
export async function searchAllPages(): Promise<NotionPage[]> {
  try {
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      },
      page_size: 100
    });

    const pages: NotionPage[] = response.results.map((page) => {
      const urlFriendlyId = page.id.replace(/-/g, '');
      
      return {
        id: urlFriendlyId,
        title: extractPageTitle(page as NotionPageResponse),
        url: (page as NotionPageResponse).url,
        created_time: (page as NotionPageResponse).created_time,
        last_edited_time: (page as NotionPageResponse).last_edited_time,
        properties: (page as NotionPageResponse).properties,
        parent: (page as NotionPageResponse).parent
      };
    });

    return pages;
  } catch (error) {
    console.error('Error searching pages:', error);
    throw new Error('Failed to fetch pages from Notion');
  }
}

// Extract page title from properties
function extractPageTitle(page: NotionPageResponse): string {
  const properties = page.properties;
  
  for (const [, value] of Object.entries(properties)) {
    if (value && typeof value === 'object' && 'type' in value) {
      const prop = value as { type: string; title?: Array<{ plain_text: string }> };
      if (prop.type === 'title' && prop.title && prop.title.length > 0) {
        return prop.title.map((t) => t.plain_text).join('');
      }
    }
  }
  
  // Fallback to page ID if no title found
  return `Untitled Page (${page.id.slice(0, 8)})`;
}

// Get page content (blocks) for a specific page
export async function getPageContent(pageId: string): Promise<NotionBlock[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100
    });

    return response.results as NotionBlockResponse[];
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw new Error('Failed to fetch page content');
  }
}

// Get detailed page information
export async function getPageDetails(pageId: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    return page;
  } catch (error) {
    console.error('Error fetching page details:', error);
    throw new Error('Failed to fetch page details');
  }
}

import { Client } from "@notionhq/client";
import type { NotionBlock, NotionPageParentInfo, NotionPageProperties } from "./notion-types";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: NotionPageProperties;
  parent: NotionPageParentInfo;
}

interface NotionPageResponse {
  id: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: NotionPageProperties;
  parent: NotionPageParentInfo;
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
    console.error(`${error} Error searching pages:`);
    throw new Error(`${error} Failed to fetch pages from Notion`);
  }
}

// Extract page title from properties
function extractPageTitle(page: NotionPageResponse): string {
  const properties = page.properties;

  for (const [, value] of Object.entries(properties)) {
    if (value && typeof value === "object" && "type" in value) {
      if (value.type === "title" && "title" in value) {
        const titleProp = value as { type: "title"; title: Array<{ plain_text: string }> };
        if (titleProp.title && titleProp.title.length > 0) {
          return titleProp.title.map((t) => t.plain_text).join("");
        }
      }
    }
  }

  // Fallback to page ID if no title found
  return `Untitled Page (${page.id.slice(0, 8)})`;
}

// Get page content (blocks) for a specific page
// Recursively fetch children for a block
async function fetchChildrenRecursively(blockId: string): Promise<NotionBlock[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100
  });

  const children = response.results as NotionBlockResponse[];

  const withNested: NotionBlock[] = [];

  for (const child of children) {
    const childBlock: NotionBlock = { ...(child as NotionBlockResponse) } as NotionBlock;
    if (child.has_children) {
      childBlock.children = await fetchChildrenRecursively(child.id);
    }

    withNested.push(childBlock);
  }

  return withNested;
}

export async function getPageContent(pageId: string): Promise<NotionBlock[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100
    });

    const topLevelBlocks = response.results as NotionBlockResponse[];

    const withChildren: NotionBlock[] = [];
    for (const block of topLevelBlocks) {
      const topBlock: NotionBlock = { ...(block as NotionBlockResponse) } as NotionBlock;
      if (block.has_children) {
        topBlock.children = await fetchChildrenRecursively(block.id);
      }
      withChildren.push(topBlock);
    }

    return withChildren;
  } catch (error) {
    console.error(`${error} Error fetching page content:`);
    throw new Error(`${error} Failed to fetch page content`);
  }
}

// Get detailed page information
export async function getPageDetails(pageId: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    return page;
  } catch (error) {
    console.error(`${error} Error fetching page details:`);
    throw new Error(`${error} Failed to fetch page details`);
  }
}

import { BlockObjectResponse, Client, PageObjectResponse } from "@notionhq/client";

export type NotionPageDetails = Pick<PageObjectResponse, "id" | "url" | "cover" | "icon" | "properties" | "created_time" | "last_edited_time">;

// Extended block type that includes children for our use case
export type NotionBlockWithChildren = BlockObjectResponse & {
  children?: NotionBlockWithChildren[];
};

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: PageObjectResponse["properties"];
  parent: PageObjectResponse["parent"];
}

interface NotionPageResponse {
  id: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: PageObjectResponse["properties"];
  parent: PageObjectResponse["parent"];
}

// Search for all pages accessible to the integration
export async function searchAllPages(): Promise<NotionPage[]> {
  try {
    const response = await notion.search({
      filter: {
        property: "object",
        value: "page"
      },
      page_size: 100
    });

    const pages: NotionPage[] = response.results.map((page) => {
      const urlFriendlyId = page.id.replace(/-/g, "");

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
async function fetchChildrenRecursively(blockId: string): Promise<NotionBlockWithChildren[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100
  });

  const children = response.results as BlockObjectResponse[];

  const withNested: NotionBlockWithChildren[] = [];

  for (const child of children) {
    const childBlock: NotionBlockWithChildren = { ...(child as BlockObjectResponse) } as NotionBlockWithChildren;
    if (child.has_children) {
      childBlock.children = await fetchChildrenRecursively(child.id);
    }

    withNested.push(childBlock);
  }

  return withNested;
}

export async function getPageContent(pageId: string): Promise<NotionBlockWithChildren[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100
    });

    const topLevelBlocks = response.results as BlockObjectResponse[];

    const withChildren: NotionBlockWithChildren[] = [];
    for (const block of topLevelBlocks) {
      const topBlock: NotionBlockWithChildren = { ...(block as BlockObjectResponse) } as NotionBlockWithChildren;
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
export async function getPageDetails(pageId: string): Promise<NotionPageDetails> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });

    // Type guard to ensure we have a full page response
    if ('url' in page && 'properties' in page) {

      const fullPage = page as PageObjectResponse;
      return {
        id: fullPage.id,
        url: fullPage.url,
        cover: fullPage.cover,
        icon: fullPage.icon,
        properties: fullPage.properties,
        created_time: fullPage.created_time,
        last_edited_time: fullPage.last_edited_time
      };
    } else {
      throw new Error('Page not found or access denied');
    }
  } catch (error) {
    console.error(`${error} Error fetching page details:`);
    throw new Error(`${error} Failed to fetch page details`);
  }
}

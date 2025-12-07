import { BlockObjectResponse, Client, PageObjectResponse } from "@notionhq/client";
import { prepareUUID } from "./uuid";

export type NotionPageDetails = Pick<PageObjectResponse, "id" | "url" | "cover" | "icon" | "properties" | "created_time" | "last_edited_time">;

export type NotionBlockWithChildren = BlockObjectResponse & {
  children?: NotionBlockWithChildren[];
};

export const notion = new Client({
  auth: process.env.NOTION_TOKEN ?? "",
});

export interface NotionPage {
  id: string;
  title: string;
  url: string;
  cover: PageObjectResponse["cover"];
  icon: PageObjectResponse["icon"];
  created_time: string;
  last_edited_time: string;
  properties: PageObjectResponse["properties"];
  parent: PageObjectResponse["parent"];
}

interface NotionPageResponse {
  id: string;
  url: string;
  cover: PageObjectResponse["cover"];
  icon: PageObjectResponse["icon"];
  created_time: string;
  last_edited_time: string;
  properties: PageObjectResponse["properties"];
  parent: PageObjectResponse["parent"];
}

/**
 * Search for all pages accessible to the integration
 */
export async function searchAllPages(): Promise<NotionPage[]> {
  try {
    console.log("Fetching pages from Notion...");
    const response = await notion.search({
      filter: {
        property: "object",
        value: "page"
      },
      page_size: 100
    });

    console.log(`Notion search returned ${response.results.length} results.`);

    const pages: NotionPage[] = response.results.map((page) => {
      const urlFriendlyId = page.id.replace(/-/g, "");
      const typedPage = page as unknown as NotionPageResponse;

      return {
        id: urlFriendlyId,
        title: extractPageTitle(typedPage),
        url: typedPage.url,
        cover: typedPage.cover,
        icon: typedPage.icon,
        created_time: typedPage.created_time,
        last_edited_time: typedPage.last_edited_time,
        properties: typedPage.properties,
        parent: typedPage.parent
      };
    });

    return pages;
  } catch (error) {
    console.error(`${error} Error searching pages:`);
    throw new Error(`${error} Failed to fetch pages from Notion`);
  }
}

/**
 * Fetch all child pages of a specific page
 */
export async function getChildrenPages(pageId: string): Promise<NotionPage[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100
    });

    // Filter only child_page blocks and ensure they are full BlockObjectResponses
    const childValues = response.results.filter(
      (block): block is BlockObjectResponse & { type: 'child_page' } =>
      "type" in block && block.type === "child_page"
    );

    const pages = await Promise.all(
      childValues.map(async (child) => {
        const page = await notion.pages.retrieve({ page_id: child.id });

        // Type guard to ensure full page response
        if (!("url" in page)) return null;

        return {
          id: prepareUUID(page.id),
          title: extractPageTitle(page),
          url: page.url,
          cover: page.cover,
          icon: page.icon,
          created_time: page.created_time,
          last_edited_time: page.last_edited_time,
          properties: page.properties,
          parent: page.parent
        };
      })
    );

    return pages.filter((p): p is NotionPage => p !== null);
  } catch (error) {
    console.error(`Error fetching children pages: ${error}`);
    return [];
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

/**
 * Get page content (blocks) for a specific page
 * Recursively fetch children for a block
 */
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

/**
 * Get detailed page information
 */
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

/**
 * Extract cover URL from page
 */
export function extractCoverUrl(page: { cover: PageObjectResponse["cover"] }): string | null {
  const { cover } = page;
  if (!cover) return null;
  if (cover.type === "file" && cover.file?.url) return cover.file.url;
  if (cover.type === "external" && cover.external?.url) return cover.external.url;
  return null;
}

import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

function hasTextContent(items: Array<{ plain_text?: string }> | undefined) {
  return !!(items && items.length > 0 && items.some(t => (t.plain_text ?? '').trim() !== ''));
}

export function Heading1Block({ block }: { block: NotionBlockWithChildren }) {
  const heading1 = (block as Extract<NotionBlockWithChildren, { type: "heading_1" }>).heading_1;
  const items = heading1?.rich_text;
  if (!hasTextContent(items)) return null;

  // Generate a consistent ID based on the block content
  const text = items?.map(item => item.plain_text || "").join("") || "";
  const elementId = `heading-${text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

  return (
    <h1 id={elementId} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
      <RichText items={items} />
    </h1>
  );
}

export function Heading2Block({ block }: { block: NotionBlockWithChildren }) {
  const heading2 = (block as Extract<NotionBlockWithChildren, { type: "heading_2" }>).heading_2;
  const items = heading2?.rich_text;
  if (!hasTextContent(items)) return null;

  // Generate a consistent ID based on the block content
  const text = items?.map(item => item.plain_text || "").join("") || "";
  const elementId = `heading-${text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

  return (
    <h2 id={elementId} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">
      <RichText items={items} />
    </h2>
  );
}

export function Heading3Block({ block }: { block: NotionBlockWithChildren }) {
  const heading3 = (block as Extract<NotionBlockWithChildren, { type: "heading_3" }>).heading_3;
  const items = heading3?.rich_text;
  if (!hasTextContent(items)) return null;

  // Generate a consistent ID based on the block content
  const text = items?.map(item => item.plain_text || "").join("") || "";
  const elementId = `heading-${text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

  return (
    <h3 id={elementId} className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-5">
      <RichText items={items} />
    </h3>
  );
}

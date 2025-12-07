import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

export function ParagraphBlock({ block }: { block: NotionBlockWithChildren }) {
  const paragraph = (block as Extract<NotionBlockWithChildren, { type: "paragraph" }>).paragraph;
  const items = paragraph?.rich_text;

  return (
    <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed mb-3 sm:mb-4">
      <RichText items={items} />
    </p>
  );
}

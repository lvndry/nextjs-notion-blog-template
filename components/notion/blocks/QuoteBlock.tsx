import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

export function QuoteBlock({ block }: { block: NotionBlockWithChildren }) {
  const quote = (block as Extract<NotionBlockWithChildren, { type: "quote" }>)
    .quote;

  return (
    <blockquote className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 mb-3 sm:mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic">
        <RichText items={quote?.rich_text} />
      </p>
    </blockquote>
  );
}

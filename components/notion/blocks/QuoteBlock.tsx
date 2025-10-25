'use client';

import type { NotionBlock } from "../../../lib/notion-types";
import { RichText } from "../RichText";

export function QuoteBlock({ block }: { block: NotionBlock }) {
  const quote = (block as Extract<NotionBlock, { type: "quote" }>).quote;

  return (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
      <p className="text-gray-700 dark:text-gray-300 italic">
        <RichText items={quote?.rich_text} />
      </p>
    </blockquote>
  );
}

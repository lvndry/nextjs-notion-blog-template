'use client';

import type { NotionBlock } from "../../../lib/notion-types";
import { RichText } from "../RichText";

export function ParagraphBlock({ block }: { block: NotionBlock }) {
  const paragraph = (block as Extract<NotionBlock, { type: "paragraph" }>).paragraph;
  const items = paragraph?.rich_text ?? paragraph?.text;

  return (
    <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
      <RichText items={items} />
    </p>
  );
}

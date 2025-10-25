 'use client';

import type { NotionRichText } from "../../lib/notion-types";

export function RichText({ items }: { items?: NotionRichText[] }) {
  if (!items || items.length === 0) return null;
  return (
    <>
      {items.map((text, index) => (
        <span key={index}>{text?.plain_text ?? ''}</span>
      ))}
    </>
  );
}

import type { RichTextItemResponse } from "@notionhq/client";

export function RichText({ items }: { items?: RichTextItemResponse[] }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((text, index) => (
        <span key={index}>{text?.plain_text ?? ""}</span>
      ))}
    </>
  );
}

'use client';

import type { NotionBlock } from "../../../lib/notion-types";
import { RichText } from "../RichText";

export function ImageBlock({ block }: { block: NotionBlock }) {
  const image = (block as Extract<NotionBlock, { type: "image" }>).image;
  const src = image?.type === "external" ? image?.external?.url : image?.file?.url;

  if (!src) return null;

  return (
    <figure className="my-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Notion image" className="rounded-md border border-gray-200 dark:border-gray-700" />
      {!!(image?.caption && image.caption.length) && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400"><RichText items={image?.caption} /></figcaption>
      )}
    </figure>
  );
}

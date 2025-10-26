'use client';

import type { NotionBlockWithChildren } from "../../../lib/notion";
import { NotionBlocks } from "../NotionBlocks";

export function ColumnListBlock({ block }: { block: NotionBlockWithChildren }) {
  const columns = (block as Extract<NotionBlockWithChildren, { type: "column_list" }>).children || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {columns.map((col, idx) => (
        <div key={(col.id as string) || idx}>
          <NotionBlocks blocks={((col as { children?: NotionBlockWithChildren[] }).children || [])} />
        </div>
      ))}
    </div>
  );
}

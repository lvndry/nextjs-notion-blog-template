'use client';

import type { NotionBlock } from '../../../lib/notion-types';
import { NotionBlocks } from '../NotionBlocks';

export function ColumnListBlock({ block }: { block: NotionBlock }) {
  const columns = (block as Extract<NotionBlock, { type: 'column_list' }>).children || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {columns.map((col, idx) => (
        <div key={(col.id as string) || idx}>
          <NotionBlocks blocks={((col as { children?: NotionBlock[] }).children || [])} />
        </div>
      ))}
    </div>
  );
}

import type { NotionBlockWithChildren } from "@/lib/notion";
import { NotionBlocks } from "../NotionBlocks";

export function ColumnListBlock({ block }: { block: NotionBlockWithChildren }) {
  const columns = (block as Extract<NotionBlockWithChildren, { type: "column_list" }>).children || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6">
      {columns.map((col, idx) => (
        <div key={(col.id ?? idx)} className="min-w-0">
          <NotionBlocks blocks={col.children ?? []} />
        </div>
      ))}
    </div>
  );
}

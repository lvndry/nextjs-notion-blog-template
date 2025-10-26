'use client';

import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

export function TableBlock({ block }: { block: NotionBlockWithChildren }) {
  const { table, children } = block as Extract<NotionBlockWithChildren, { type: "table" }>;

  const rows = children || [];

  if (rows.length === 0) return null;
  const isHeader = Boolean(table?.has_column_header);

  function renderRowCells(row: Record<string, unknown>, asHeader = false) {
    const cells = (row as Extract<NotionBlockWithChildren, { type: "table_row" }>).table_row?.cells || [];
    const CellTag = asHeader ? 'th' : 'td';

    return cells.map((cell, idx) => (
      <CellTag key={idx} className={`border border-gray-200 dark:border-gray-700 p-2 align-top ${asHeader ? "bg-gray-50 dark:bg-gray-800 font-semibold" : ""}`}>
        <RichText items={cell} />
      </CellTag>
    ));
  }

  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-gray-800 dark:text-gray-200">
        {isHeader && (
          <thead>
            <tr>
              {renderRowCells(rows[0], true)}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.slice(isHeader ? 1 : 0).map((row, rIdx) => (
            <tr key={(row.id ?? rIdx)}>{renderRowCells(row)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

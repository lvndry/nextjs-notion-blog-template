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
      <CellTag key={idx} className={`border border-gray-200 dark:border-gray-700 p-2 sm:p-3 align-top text-xs sm:text-sm ${asHeader ? "bg-gray-50 dark:bg-gray-800 font-semibold" : ""}`}>
        <RichText items={cell} />
      </CellTag>
    ));
  }

  return (
    <div className="my-4 sm:my-6 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
      <table className="w-full border-collapse text-gray-800 dark:text-gray-200 min-w-[500px] sm:min-w-0">
        {isHeader && (
          <thead>
            <tr>
              {renderRowCells(rows[0] as Record<string, unknown>, true)}
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

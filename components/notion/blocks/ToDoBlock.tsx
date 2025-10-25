'use client';

import type { NotionBlock } from "../../../lib/notion-types";
import { RichText } from "../RichText";

export function ToDoBlock({ block }: { block: NotionBlock }) {
  const todoItem = (block as Extract<NotionBlock, { type: "to_do" }>).to_do;

  return (
    <div className="flex items-start gap-3 text-gray-800 dark:text-gray-200 mb-3">
      <input
        type="checkbox"
        checked={todoItem?.checked || false}
        readOnly
        className="mt-1 rounded border-gray-300 dark:border-gray-600"
      />
      <span className={todoItem?.checked ? "line-through text-gray-500 dark:text-gray-400" : ""}>
        <RichText items={todoItem?.rich_text} />
      </span>
    </div>
  );
}

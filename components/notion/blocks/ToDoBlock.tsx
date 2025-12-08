import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

export function ToDoBlock({ block }: { block: NotionBlockWithChildren }) {
  const todoItem = (
    block as Extract<NotionBlockWithChildren, { type: "to_do" }>
  ).to_do;

  return (
    <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">
      <input
        type="checkbox"
        checked={todoItem?.checked || false}
        readOnly
        className="mt-0.5 sm:mt-1 rounded border-gray-300 dark:border-gray-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
      />
      <span
        className={`min-w-0 flex-1 ${
          todoItem?.checked
            ? "line-through text-gray-500 dark:text-gray-400"
            : ""
        }`}
      >
        <RichText items={todoItem?.rich_text} />
      </span>
    </div>
  );
}

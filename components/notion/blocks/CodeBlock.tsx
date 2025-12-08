import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

export function CodeBlock({ block }: { block: NotionBlockWithChildren }) {
  const code = (block as Extract<NotionBlockWithChildren, { type: "code" }>)
    .code;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
        {code?.language || "code"}
      </div>
      <pre className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
        <code>
          <RichText items={code?.rich_text} />
        </code>
      </pre>
    </div>
  );
}

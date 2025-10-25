'use client';

import type { NotionBlock } from "../../../lib/notion-types";
import { RichText } from "../RichText";

export function CodeBlock({ block }: { block: NotionBlock }) {
  const code = (block as Extract<NotionBlock, { type: "code" }>).code;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {code?.language || 'code'}
      </div>
      <pre className="text-sm text-gray-800 dark:text-gray-200">
        <code>
          <RichText items={code?.rich_text} />
        </code>
      </pre>
    </div>
  );
}

'use client';

import type { NotionBlockWithChildren } from "@/lib/notion";
import { useState } from "react";
import { BlockRenderer } from "../BlockRenderer";
import { RichText } from "../RichText";

export function ToggleBlock({ block }: { block: NotionBlockWithChildren }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (block as Extract<NotionBlockWithChildren, { type: "toggle" }>).toggle;
  const children = block.children || [];

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start gap-2 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded p-2 -m-2 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="shrink-0 mt-1">
          <svg
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="flex-1 text-gray-800 dark:text-gray-200">
          <RichText items={toggle?.rich_text} />
        </div>
      </button>

      {isOpen && children.length > 0 && (
        <div className="ml-6 mt-2 space-y-2">
          {children.map((childBlock) => (
            <BlockRenderer key={childBlock.id} block={childBlock} />
          ))}
        </div>
      )}
    </div>
  );
}

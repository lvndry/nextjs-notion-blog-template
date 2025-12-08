"use client";

import type { NotionBlockWithChildren } from "@/lib/notion";
import { useState } from "react";
import { BlockRenderer } from "../BlockRenderer";
import { RichText } from "../RichText";

export function ToggleBlock({ block }: { block: NotionBlockWithChildren }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (block as Extract<NotionBlockWithChildren, { type: "toggle" }>)
    .toggle;
  const children = block.children || [];

  return (
    <div className="mb-3 sm:mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start gap-2 sm:gap-3 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded p-2 sm:p-2.5 -m-2 transition-colors min-h-[44px]"
        aria-expanded={isOpen}
      >
        <div className="shrink-0 mt-0.5 sm:mt-1">
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="flex-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 min-w-0">
          <RichText items={toggle?.rich_text} />
        </div>
      </button>

      {isOpen && children.length > 0 && (
        <div className="ml-4 sm:ml-6 mt-2 sm:mt-3 space-y-2 sm:space-y-2.5">
          {children.map((childBlock) => (
            <BlockRenderer key={childBlock.id} block={childBlock} />
          ))}
        </div>
      )}
    </div>
  );
}

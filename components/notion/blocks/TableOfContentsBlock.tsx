'use client';

import { useMemo } from 'react';
import type { NotionBlock } from '../../../lib/notion-types';

interface TocItem {
  id: string;
  text: string;
  level: number;
  elementId: string;
}

function extractTextFromRichText(richText?: Array<{ plain_text?: string }>): string {
  if (!richText) return '';
  return richText.map(item => item.plain_text || '').join('');
}

function extractHeadingsFromBlocks(blocks: NotionBlock[]): TocItem[] {
  const headings: TocItem[] = [];

  function processBlock(block: NotionBlock) {
    if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
      let headingData: { rich_text?: Array<{ plain_text?: string }> } | undefined;

      if (block.type === 'heading_1') {
        headingData = (block as Extract<NotionBlock, { type: 'heading_1' }>).heading_1;
      } else if (block.type === 'heading_2') {
        headingData = (block as Extract<NotionBlock, { type: 'heading_2' }>).heading_2;
      } else if (block.type === 'heading_3') {
        headingData = (block as Extract<NotionBlock, { type: 'heading_3' }>).heading_3;
      }

      const text = extractTextFromRichText(headingData?.rich_text);

      if (text.trim()) {
        const level = block.type === 'heading_1' ? 1 : block.type === 'heading_2' ? 2 : 3;
        // Generate the same ID as the heading blocks
        const elementId = `heading-${text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

        headings.push({
          id: elementId,
          text: text.trim(),
          level,
          elementId
        });
      }
    }

    // Process child blocks recursively
    if (block.children) {
      block.children.forEach(childBlock => processBlock(childBlock));
    }
  }

  blocks.forEach(block => processBlock(block));
  return headings;
}

export function TableOfContentsBlock({ allBlocks }: { block: NotionBlock; allBlocks?: NotionBlock[] }) {
  const tocItems = useMemo(() => {
    if (!allBlocks) return [];
    return extractHeadingsFromBlocks(allBlocks);
  }, [allBlocks]);

  function scrollToHeading(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function getIndentClass(level: number) {
    switch (level) {
      case 1: return 'ml-0';
      case 2: return 'ml-4';
      case 3: return 'ml-8';
      case 4: return 'ml-12';
      case 5: return 'ml-16';
      case 6: return 'ml-20';
      default: return 'ml-0';
    }
  };

  if (tocItems.length === 0) {
    return (
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="text-sm font-medium">Table of Contents</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          No headings found in this page.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span className="text-sm font-medium">Table of Contents</span>
      </div>

      <nav className="space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.elementId)}
            className={`block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1 transition-colors ${getIndentClass(item.level)}`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}

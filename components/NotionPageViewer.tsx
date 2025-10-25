'use client';

import { useState } from 'react';
import { formatDate } from '../lib/date';

interface NotionPageViewerProps {
  pageDetails: Record<string, unknown>;
  pageContent: Array<Record<string, unknown>>;
}

export default function NotionPageViewer({ pageDetails, pageContent }: NotionPageViewerProps) {
  const [showRawData, setShowRawData] = useState(false);

  function extractPageTitle (pageDetails: Record<string, unknown>): string {
    const properties = pageDetails.properties as Record<string, unknown>;

    // Look for title property
    for (const [, value] of Object.entries(properties)) {
      if (value && typeof value === 'object' && 'type' in value) {
        const prop = value as { type: string; title?: Array<{ plain_text: string }> };
        if (prop.type === 'title' && prop.title && prop.title.length > 0) {
          return prop.title.map((t) => t.plain_text).join('');
        }
      }
    }

    // Fallback to page ID if no title found
    return `Untitled Page (${(pageDetails.id as string).slice(0, 8)})`;
  };



  function renderContentBlocks(blocks: Array<Record<string, unknown>>) {
    console.log(blocks);
    const result: React.ReactElement[] = [];
    let i = 0;

    while (i < blocks.length) {
      const block = blocks[i];

      if (block.type === 'bulleted_list_item') {
        // Handle bulleted list items and render nested children inside each <li>
        const listItems: React.ReactElement[] = [];
        let currentIndex = i;

        while (currentIndex < blocks.length && blocks[currentIndex].type === 'bulleted_list_item') {
          const currentBlock = blocks[currentIndex];
          const bulletedItem = currentBlock.bulleted_list_item as { rich_text?: Array<{ plain_text: string }> } | undefined;
          const childrenBlocks = (currentBlock.children as Array<Record<string, unknown>> | undefined) || [];

          const listItem = (
            <li key={(currentBlock.id as string) || currentIndex} className="text-gray-800 dark:text-gray-200 mb-2">
              <div className="flex items-start">
                <span className="mr-2 text-gray-500 dark:text-gray-400">•</span>
                <span>{getTextContent(bulletedItem?.rich_text)}</span>
              </div>
              {childrenBlocks.length > 0 && (
                <div className="pl-6 mt-1">
                  {renderContentBlocks(childrenBlocks)}
                </div>
              )}
            </li>
          );

          listItems.push(listItem);
          currentIndex++;
        }

        result.push(
          <ul key={`bulleted-${i}`} className="list-none pl-4 mb-4 space-y-1">
            {listItems}
          </ul>
        );
        i = currentIndex;
      } else if (block.type === 'numbered_list_item') {
        // Handle numbered/lettered list items and render nested children inside each <li>
        const listItems: React.ReactElement[] = [];
        let currentIndex = i;
        let itemNumber = 1;

        // Determine list type based on content or context
        // Only use letters if explicitly requested or if the content suggests it
        const firstItem = block.numbered_list_item as { rich_text?: Array<{ plain_text: string }> } | undefined;
        const firstItemText = firstItem?.rich_text?.[0]?.plain_text?.toLowerCase() || '';
        const useLetters = firstItemText.includes('letter') || firstItemText.includes('alphabet') || firstItemText.includes('a)') || firstItemText.includes('b)');
        const listType = useLetters ? 'letter' : 'number';

        while (currentIndex < blocks.length && blocks[currentIndex].type === 'numbered_list_item') {
          const currentBlock = blocks[currentIndex];
          const numberedItem = currentBlock.numbered_list_item as { rich_text?: Array<{ plain_text: string }> } | undefined;
          const childrenBlocks = (currentBlock.children as Array<Record<string, unknown>> | undefined) || [];

          const marker = getListMarker(itemNumber, listType);

          const listItem = (
            <li key={(currentBlock.id as string) || currentIndex} className="text-gray-800 dark:text-gray-200 mb-2">
              <div className="flex items-start">
                <span className="mr-2 text-gray-500 dark:text-gray-400">{marker}.</span>
                <span>{getTextContent(numberedItem?.rich_text)}</span>
              </div>
              {childrenBlocks.length > 0 && (
                <div className="pl-6 mt-1">
                  {renderContentBlocks(childrenBlocks)}
                </div>
              )}
            </li>
          );

          listItems.push(listItem);
          itemNumber++;
          currentIndex++;
        }

        result.push(
          <ol key={`numbered-${i}`} className="list-none pl-4 mb-4 space-y-1">
            {listItems}
          </ol>
        );
        i = currentIndex;
      } else {
        // Render non-list blocks normally
        result.push(
          <div key={(block.id as string) || i}>
            {renderBlockContent(block)}
          </div>
        );
        i++;
      }
    }

    return result;
  }

  function getTextContent (textArray: Array<{ plain_text: string }> | undefined) {
    if (!textArray || textArray.length === 0) return '';
    return textArray.map((text, index) => (
      <span key={index}>{text.plain_text}</span>
    ));
  }

  function getListMarker(itemNumber: number, listType: 'number' | 'letter' = 'number'): string {
    if (listType === 'letter') {
      // Generate letter sequence: a, b, c, ..., z, aa, ab, ac, etc.
      let result = '';
      let num = itemNumber - 1; // Convert to 0-based index

      do {
        result = String.fromCharCode(97 + (num % 26)) + result; // 97 is 'a' in ASCII
        num = Math.floor(num / 26) - 1;
      } while (num >= 0);

      return result;
    }

    // Default to numbers
    return itemNumber.toString();
  }

  function renderBlockContent (block: Record<string, unknown>) {


    function hasTextContent (textArray: Array<{ plain_text: string }> | undefined) {
      return textArray && textArray.length > 0 && textArray.some(text => text.plain_text.trim() !== '');
    };

    switch (block.type) {
      case 'paragraph':
        const paragraph = block.paragraph as { text?: Array<{ plain_text: string }> } | undefined;
        return (
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
            {getTextContent(paragraph?.text)}
          </p>
        );
      case 'heading_1':
        const heading1 = block.heading_1 as { text?: Array<{ plain_text: string }> } | undefined;
        if (!hasTextContent(heading1?.text)) return null;
        return (
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
            {getTextContent(heading1?.text)}
          </h1>
        );
      case 'heading_2':
        const heading2 = block.heading_2 as { text?: Array<{ plain_text: string }> } | undefined;
        if (!hasTextContent(heading2?.text)) return null;
        return (
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">
            {getTextContent(heading2?.text)}
          </h2>
        );
      case 'heading_3':
        const heading3 = block.heading_3 as { text?: Array<{ plain_text: string }> } | undefined;
        if (!hasTextContent(heading3?.text)) return null;
        return (
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-5">
            {getTextContent(heading3?.text)}
          </h3>
        );
      case 'to_do':
        const todoItem = block.to_do as { rich_text?: Array<{ plain_text: string }>; checked?: boolean } | undefined;
        return (
          <div className="flex items-start gap-3 text-gray-800 dark:text-gray-200 mb-3">
            <input
              type="checkbox"
              checked={todoItem?.checked || false}
              readOnly
              className="mt-1 rounded border-gray-300 dark:border-gray-600"
            />
            <span className={todoItem?.checked ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
              {getTextContent(todoItem?.rich_text)}
            </span>
          </div>
        );
      case 'code':
        const codeBlock = block.code as { rich_text?: Array<{ plain_text: string }>; language?: string } | undefined;
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {codeBlock?.language || 'code'}
            </div>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              <code>{getTextContent(codeBlock?.rich_text)}</code>
            </pre>
          </div>
        );
      case 'quote':
        const quoteBlock = block.quote as { rich_text?: Array<{ plain_text: string }> } | undefined;
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
            <p className="text-gray-700 dark:text-gray-300 italic">
              {getTextContent(quoteBlock?.rich_text)}
            </p>
          </blockquote>
        );
      case 'divider':
        return <hr className="my-6 border-gray-300 dark:border-gray-600" />;
      default:
        return (
          <div className="text-sm text-gray-500 dark:text-gray-400 italic mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
            Unsupported block type: {String(block.type)}
          </div>
        );
    }
  };

  const pageTitle = extractPageTitle(pageDetails);
  const pageUrl = pageDetails.url as string;
  const createdTime = pageDetails.created_time as string;
  const lastEditedTime = pageDetails.last_edited_time as string;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {pageTitle}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-medium">Created:</span> {formatDate(createdTime)}
              </div>
              <div>
                <span className="font-medium">Last edited:</span> {formatDate(lastEditedTime)}
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Open in Notion
            </a>
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {showRawData ? 'Hide' : 'Show'} Raw Data
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        {showRawData ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Raw Page Data</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Page Details:</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(pageDetails, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Page Content:</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(pageContent, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {pageContent.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No content found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This page doesn&apos;t have any content blocks yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {renderContentBlocks(pageContent)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

 "use client";

import { formatDate } from "@/lib/date";
import type { NotionBlockWithChildren, NotionPageDetails } from "@/lib/notion";
import { useState } from "react";
import { NotionBlocks } from "./notion/NotionBlocks";

interface NotionPageViewerProps {
  pageDetails: NotionPageDetails;
  pageContent: NotionBlockWithChildren[];
}

export default function NotionPageViewer({ pageDetails, pageContent }: NotionPageViewerProps) {
  const [showRawData, setShowRawData] = useState(false);

  function extractPageTitle (pageDetails: NotionPageDetails): string {
    const properties = pageDetails.properties;

    // Look for title property
    for (const [, value] of Object.entries(properties)) {
      if (value && typeof value === "object" && "type" in value) {
        if (value.type === 'title') {
          if (value.title && Array.isArray(value.title) && value.title.length > 0) {
            return value.title.map((t: { plain_text: string }) => t.plain_text || '').join('');
          }
        }
      }
    }

    // Fallback to page ID if no title found
    return `Untitled Page (${pageDetails.id.slice(0, 8)})`;
  };

  const pageTitle = extractPageTitle(pageDetails);
  const pageUrl = pageDetails.url;
  const createdTime = pageDetails.created_time;
  const lastEditedTime = pageDetails.last_edited_time;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {pageTitle}
            </h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-medium">Created:</span> {formatDate(createdTime)}
              </div>
              <div>
                <span className="font-medium">Last edited:</span> {formatDate(lastEditedTime)}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:ml-4">
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center min-h-[44px] flex items-center justify-center"
            >
              Open in Notion
            </a>
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-h-[44px]"
            >
              {showRawData ? 'Hide' : 'Show'} Raw Data
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
        {showRawData ? (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Raw Page Data</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Page Details:</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm -mx-2 sm:mx-0 px-2 sm:px-0">
                  {JSON.stringify(pageDetails, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Page Content:</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm -mx-2 sm:mx-0 px-2 sm:px-0">
                  {JSON.stringify(pageContent, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm sm:prose-base prose-gray dark:prose-invert max-w-none prose-headings:mt-6 prose-headings:mb-3 prose-p:mb-3 prose-ul:mb-3 prose-ol:mb-3">
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
              <NotionBlocks blocks={pageContent} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

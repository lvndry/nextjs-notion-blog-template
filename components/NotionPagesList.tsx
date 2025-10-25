'use client';

import { useNotionPages } from "@/hooks/useNotionPages";
import { useState } from "react";
import NotionPageCard from "./NotionPageCard";

export default function NotionPagesList({
  limit,
  header = true,
}: {
  limit?: number;
  header?: boolean;
}) {
  const { pages, loading, error, refetch } = useNotionPages();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading pages from Notion...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="text-red-600 dark:text-red-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="ml-2 text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
        </div>
        <p className="text-sm text-red-700 dark:text-red-300 mb-4">{error}</p>
        <div className="text-sm text-red-600 dark:text-red-400">
          <p className="mb-2">To fix this issue:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create a <code className="bg-red-100 dark:bg-red-800 px-1 rounded">.env.local</code> file in your project root</li>
            <li>Add your Notion integration token: <code className="bg-red-100 dark:bg-red-800 px-1 rounded">NOTION_TOKEN=your_token_here</code></li>
            <li>Make sure your integration has access to the pages you want to view</li>
            <li>Restart your development server</li>
          </ol>
        </div>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const visiblePages = typeof limit === 'number' ? filteredPages.slice(0, limit) : filteredPages;

  return (
    <div className="space-y-6">
      {header && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Notion Pages
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {pages.length} page{pages.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      )}

      {visiblePages.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'No pages match your search' : 'No pages found'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Make sure your Notion integration has access to pages and try refreshing'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {visiblePages.map((page) => (
            <NotionPageCard key={page.id} page={page} />
          ))}
        </div>
      )}
    </div>
  );
}

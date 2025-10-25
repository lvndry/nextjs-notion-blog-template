'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, unknown>;
  parent: Record<string, unknown>;
}

interface NotionPageCardProps {
  page: NotionPage;
}

export default function NotionPageCard({ page }: NotionPageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewContent = async () => {
    if (content.length > 0) {
      setIsExpanded(!isExpanded);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/notion/pages?action=content&pageId=${page.id}`);
      const data = await response.json();
      
      if (data.content) {
        setContent(data.content);
        setIsExpanded(true);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderBlockContent = (block: Record<string, unknown>) => {
    const getTextContent = (textArray: Array<{ plain_text: string }> | undefined) => {
      if (!textArray) return "";
      return textArray.map((text, index) => (
        <span key={index}>{text.plain_text}</span>
      ));
    };

    switch (block.type) {
      case "paragraph":
        const paragraph = block.paragraph as { text?: Array<{ plain_text: string }> } | undefined;
        return (
          <p className="text-gray-700 dark:text-gray-300">
            {getTextContent(paragraph?.text)}
          </p>
        );
      case "heading_1":
        const heading1 = block.heading_1 as { text?: Array<{ plain_text: string }> } | undefined;
        return (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {getTextContent(heading1?.text)}
          </h1>
        );
      case "heading_2":
        const heading2 = block.heading_2 as { text?: Array<{ plain_text: string }> } | undefined;
        return (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getTextContent(heading2?.text)}
          </h2>
        );
      case "heading_3":
        const heading3 = block.heading_3 as { text?: Array<{ plain_text: string }> } | undefined;
        return (
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {getTextContent(heading3?.text)}
          </h3>
        );
      case "bulleted_list_item":
        const bulletedItem = block.bulleted_list_item as { text?: Array<{ plain_text: string }> } | undefined;
        return (
          <li className="text-gray-700 dark:text-gray-300">
            • {getTextContent(bulletedItem?.text)}
          </li>
        );
      case "numbered_list_item":
        const numberedItem = block.numbered_list_item as { text?: Array<{ plain_text: string }> } | undefined;
        return (
          <li className="text-gray-700 dark:text-gray-300">
            {getTextContent(numberedItem?.text)}
          </li>
        );
      case "to_do":
        const todoItem = block.to_do as { text?: Array<{ plain_text: string }>; checked?: boolean } | undefined;
        return (
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={todoItem?.checked || false} 
              readOnly 
              className="rounded"
            />
            <span>
              {getTextContent(todoItem?.text)}
            </span>
          </div>
        );
      default:
        return (
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            Unsupported block type: {String(block.type)}
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {page.id ? (
            <Link 
              href={`/page/${page.id}`}
              className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors cursor-pointer block mb-2"
            >
              {page.title}
            </Link>
          ) : (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {page.title}
            </h3>
          )}
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>Created: {formatDate(page.created_time)}</p>
            <p>Last edited: {formatDate(page.last_edited_time)}</p>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          {page.id && (
            <Link
              href={`/page/${page.id}`}
              className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              View Details
            </Link>
          )}
          <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            Open in Notion
          </a>
          <button
            onClick={handleViewContent}
            disabled={loading}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : isExpanded ? 'Hide Content' : 'View Content'}
          </button>
        </div>
      </div>

      {isExpanded && content.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Page Content:</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {content.map((block, index) => (
              <div key={(block.id as string) || index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                {renderBlockContent(block)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

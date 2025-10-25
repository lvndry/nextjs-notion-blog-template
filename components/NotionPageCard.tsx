'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "../lib/date";

type NotionParent = { type?: "workspace" | "page_id" | "database_id"; page_id?: string };
type NotionTitleProperty = { type: "title"; title?: Array<{ plain_text?: string }> };
type NotionPageDetails = { properties?: Record<string, NotionTitleProperty | { type: string }> };

interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, unknown>;
  parent: NotionParent;
}

interface NotionPageCardProps {
  page: NotionPage;
}

export default function NotionPageCard({ page }: NotionPageCardProps) {
  const [parentName, setParentName] = useState<string | null>(null);

  const { parent } = page;

  useEffect(() => {
    const parentPageId = parent?.type === "page_id" ? parent.page_id : undefined;
    if (!parentPageId) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/notion/pages?action=details&pageId=${parentPageId}`);
        const data: { details?: NotionPageDetails } = await res.json();
        const details = data.details;

        let title: string | null = null;
        const properties = details?.properties;
        if (properties) {
          for (const [, value] of Object.entries(properties)) {
            if (value.type === "title") {
              const titleArr = (value as NotionTitleProperty).title;
              if (Array.isArray(titleArr) && titleArr.length > 0) {
                title = titleArr.map(t => t?.plain_text ?? '').join('');
                break;
              }
            }
          }
        }

        if (!cancelled) {
          setParentName(title || `Page ${parentPageId.slice(0, 8)}`);
        }
      } catch {
        if (!cancelled) {
          setParentName(`Page ${parentPageId.slice(0, 8)}`);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [parent?.type, parent?.page_id]);

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
            {parent?.type === "page_id" && (
              <p>Parent Page: {parentName ?? "Loading..."}</p>
            )}
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
        </div>
      </div>
    </div>
  );
}

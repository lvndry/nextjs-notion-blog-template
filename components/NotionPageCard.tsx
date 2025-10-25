'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "../lib/date";
import type { NotionPage } from "../lib/notion-client";
import type { NotionPageParent, NotionPageParentInfo, NotionTitleProperty } from "../lib/notion-types";

type NotionPageDetails = {
  properties?: Record<string, NotionTitleProperty | { type: string }>;
};

function isPageParent(parent: NotionPageParentInfo): parent is NotionPageParent {
  return parent.type === "page_id";
}

interface NotionPageCardProps {
  page: NotionPage;
}

export default function NotionPageCard({ page }: NotionPageCardProps) {
  const [parentName, setParentName] = useState<string | null>(null);

  const { parent } = page;

  useEffect(() => {
    const parentPageId = isPageParent(parent) ? parent.page_id : undefined;
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
  }, [parent]);

  return (
    <div className="group rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {page.id ? (
        <Link href={`/page/${page.id}`} className="block">
          <h3 className="text-lg font-medium text-zinc-900 group-hover:underline dark:text-white">
            {page.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{formatDate(page.created_time)}</span>
            {isPageParent(parent) && (
              <span>· {parentName ?? "Parent"}</span>
            )}
          </div>
        </Link>
      ) : (
        <div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
            {page.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{formatDate(page.created_time)}</span>
            {isPageParent(parent) && (
              <span>· {parentName ?? "Parent"}</span>
            )}
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
        <a
          href={page.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          Open in Notion →
        </a>
      </div>
    </div>
  );
}

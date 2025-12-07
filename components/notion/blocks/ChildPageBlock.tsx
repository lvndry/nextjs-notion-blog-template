import type { NotionBlockWithChildren } from "@/lib/notion";
import Link from "next/link";

export function ChildPageBlock({ block }: { block: NotionBlockWithChildren }) {
  const { child_page, id } = block as Extract<NotionBlockWithChildren, { type: "child_page" }>;

  const title = child_page?.title || "Untitled";
  const idNoDash = String(id || '').replace(/-/g, '');

  return (
    <div className="mb-3">
      <Link href={`/page/${idNoDash}`} className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 2h6l5 5v13a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6" />
        </svg>
        <span>{title}</span>
      </Link>
    </div>
  );
}

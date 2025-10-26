import { fetchNotionPages, type NotionPage } from "@/lib/notion-client";
import { cache, useCallback, useEffect, useState } from "react";

interface UseNotionPagesReturn {
  pages: NotionPage[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing Notion pages
 * Provides loading, error, and data states with automatic fetching
 */
export function useNotionPages(): UseNotionPagesReturn {
  const [pages, setPages] = useState<NotionPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    const cachedFetch = cache(async () => {
      const result = await fetchNotionPages();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.pages;
    });

    try {
      setLoading(true);
      setError(null);
      const pages = await cachedFetch();
      setPages(pages);
    } catch (err) {
      setError(`${err} Failed to fetch pages from Notion`);
      console.error(`${err} Error fetching pages:`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return {
    pages,
    loading,
    error,
    refetch: fetchPages,
  };
}

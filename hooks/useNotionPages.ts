import { fetchNotionPages, type NotionPage } from '@/lib/notion-client';
import { useCallback, useEffect, useState } from 'react';

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
    try {
      setLoading(true);
      setError(null);

      const result = await fetchNotionPages();

      if (result.error) {
        setError(result.error);
      } else {
        setPages(result.pages);
      }
    } catch (err) {
      setError("Failed to fetch pages from Notion");
      console.error("Error fetching pages:", err);
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

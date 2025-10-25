'use client';

import type { NotionBlock } from '../../../lib/notion-types';
import { RichText } from '../RichText';

function hasTextContent(items: Array<{ plain_text?: string }> | undefined) {
  return !!(items && items.length > 0 && items.some(t => (t.plain_text ?? '').trim() !== ''));
}

export function Heading1Block({ block }: { block: NotionBlock }) {
  const heading1 = (block as Extract<NotionBlock, { type: 'heading_1' }>).heading_1;
  const items = heading1?.rich_text ?? heading1?.text;
  if (!hasTextContent(items)) return null;
  return (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
      <RichText items={items} />
    </h1>
  );
}

export function Heading2Block({ block }: { block: NotionBlock }) {
  const heading2 = (block as Extract<NotionBlock, { type: 'heading_2' }>).heading_2;
  const items = heading2?.rich_text ?? heading2?.text;
  if (!hasTextContent(items)) return null;
  return (
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">
      <RichText items={items} />
    </h2>
  );
}

export function Heading3Block({ block }: { block: NotionBlock }) {
  const heading3 = (block as Extract<NotionBlock, { type: 'heading_3' }>).heading_3;
  const items = heading3?.rich_text ?? heading3?.text;
  if (!hasTextContent(items)) return null;

  return (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-5">
      <RichText items={items} />
    </h3>
  );
}

import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

export function CalloutBlock({ block }: { block: NotionBlockWithChildren }) {
  const { callout } = block as Extract<NotionBlockWithChildren, { type: "callout" }>;

  return (
    <div className="flex items-start gap-3 p-3 my-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
      <div className="text-xl leading-none">
        {callout?.icon?.type === 'emoji' ? callout.icon.emoji : '💡'}
      </div>
      <div><RichText items={callout?.rich_text} /></div>
    </div>
  );
}

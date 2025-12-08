import type { NotionBlockWithChildren } from "@/lib/notion";
import { RichText } from "../RichText";

export function CalloutBlock({ block }: { block: NotionBlockWithChildren }) {
  const { callout } = block as Extract<
    NotionBlockWithChildren,
    { type: "callout" }
  >;

  return (
    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 my-3 sm:my-4 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
      <div className="text-lg sm:text-xl leading-none shrink-0">
        {callout?.icon?.type === "emoji" ? callout.icon.emoji : "💡"}
      </div>
      <div className="min-w-0 flex-1 text-sm sm:text-base">
        <RichText items={callout?.rich_text} />
      </div>
    </div>
  );
}

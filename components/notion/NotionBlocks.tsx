 'use client';

import type { NotionBlockWithChildren } from "@/lib/notion";
import { BlockRenderer } from "./BlockRenderer";
import { RichText } from "./RichText";

function getListMarker(itemNumber: number, listType: "number" | "letter" = "number"): string {
  if (listType === "letter") {
    let result = ""
    let num = itemNumber - 1;

    do {
      result = String.fromCharCode(97 + (num % 26)) + result;
      num = Math.floor(num / 26) - 1;
    } while (num >= 0);
    return result;
  }

  return itemNumber.toString();
}

export function NotionBlocks({ blocks }: { blocks: NotionBlockWithChildren[] }) {
  const elements: React.ReactElement[] = [];
  let blockIndex = 0;

  while (blockIndex < blocks.length) {
    const block = blocks[blockIndex];
    if (!block) continue;

    if (block.type === "bulleted_list_item") {
      const listItems: React.ReactElement[] = [];
      let currentIndex = blockIndex;
      const currentBlock = blocks[currentIndex];

      while (currentIndex < blocks.length && currentBlock?.type === "bulleted_list_item") {
        const bulletedItem = currentBlock.bulleted_list_item;
        const childrenBlocks = currentBlock.children ?? [];
        const listItem = (
          <li key={(currentBlock.id ?? currentIndex)} className="text-gray-800 dark:text-gray-200 mb-2">
            <div className="flex items-start">
              <span className="mr-2 text-gray-500 dark:text-gray-400">•</span>
              <span>
                <RichText items={bulletedItem?.rich_text} />
              </span>
            </div>
            {childrenBlocks.length > 0 && (
              <div className="pl-6 mt-1">
                <NotionBlocks blocks={childrenBlocks} />
              </div>
            )}
          </li>
        );

        listItems.push(listItem);
        currentIndex++;
      }

      elements.push(
        <ul key={`bulleted-${blockIndex}`} className="list-none pl-4 mb-4 space-y-1">
          {listItems}
        </ul>
      );
      blockIndex = currentIndex;
      continue;
    }

    if (block.type === "numbered_list_item") {
      const listItems: React.ReactElement[] = [];
      let currentIndex = blockIndex;
      let itemNumber = 1;

      const firstItem = block.numbered_list_item;
      const firstItemText = firstItem?.rich_text?.[0]?.plain_text?.toLowerCase() || "";
      const useLetters = firstItemText.includes("letter") || firstItemText.includes("alphabet") || firstItemText.includes("a)") || firstItemText.includes("b)");
      const listType: "number" | "letter" = useLetters ? "letter" : "number";

      while (currentIndex < blocks.length && blocks[currentIndex]?.type === "numbered_list_item") {
        const currentBlock = blocks[currentIndex] as Extract<NotionBlockWithChildren, { type: "numbered_list_item" }>;
        const numberedItem = currentBlock.numbered_list_item;
        const childrenBlocks = currentBlock.children || [];

        const marker = getListMarker(itemNumber, listType);

        const listItem = (
          <li key={(currentBlock.id ?? currentIndex)} className="text-gray-800 dark:text-gray-200 mb-2">
            <div className="flex items-start">
              <span className="mr-2 text-gray-500 dark:text-gray-400">{marker}.</span>
              <span>
                <RichText items={numberedItem?.rich_text} />
              </span>
            </div>
            {childrenBlocks.length > 0 && (
              <div className="pl-6 mt-1">
                <NotionBlocks blocks={childrenBlocks} />
              </div>
            )}
          </li>
        );

        listItems.push(listItem);
        itemNumber++;
        currentIndex++;
      }

      elements.push(
        <ol key={`numbered-${blockIndex}`} className="list-none pl-4 mb-4 space-y-1">
          {listItems}
        </ol>
      );
      blockIndex = currentIndex;
      continue;
    }

    elements.push(
      <div key={String(block.id ?? blockIndex)}>
        <BlockRenderer block={block} allBlocks={blocks} />
      </div>
    );

    blockIndex++;
  }

  return <div className="space-y-2">{elements}</div>;
}

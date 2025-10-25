'use client';

import type { NotionBlock } from "../../lib/notion-types";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ChildPageBlock } from "./blocks/ChildPageBlock";
import { CodeBlock } from "./blocks/CodeBlock";
import { ColumnListBlock } from "./blocks/ColumnListBlock";
import { DividerBlock } from "./blocks/DividerBlock";
import { Heading1Block, Heading2Block, Heading3Block } from "./blocks/HeadingBlocks";
import { ImageBlock } from "./blocks/ImageBlock";
import { ParagraphBlock } from "./blocks/ParagraphBlock";
import { QuoteBlock } from "./blocks/QuoteBlock";
import { TableBlock } from "./blocks/TableBlock";
import { ToDoBlock } from "./blocks/ToDoBlock";

export function BlockRenderer({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "heading_1":
      return <Heading1Block block={block} />;
    case "heading_2":
      return <Heading2Block block={block} />;
    case "heading_3":
      return <Heading3Block block={block} />;
    case "to_do":
      return <ToDoBlock block={block} />;
    case "code":
      return <CodeBlock block={block} />;
    case "quote":
      return <QuoteBlock block={block} />;
    case "divider":
      return <DividerBlock />;
    case "child_page":
      return <ChildPageBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "column_list":
      return <ColumnListBlock block={block} />;
    default:
      return (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
          Unsupported block type: {String(block.type)}
        </div>
      );
  }
}

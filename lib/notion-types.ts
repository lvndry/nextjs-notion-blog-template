export type NotionRichText = {
  plain_text?: string
};

export type BaseNode = {
  id?: string;
  has_children?: boolean;
  children?: NotionBlock[];
};

export type ParagraphNode = BaseNode & {
  type: "paragraph";
  paragraph: { text?: NotionRichText[]; rich_text?: NotionRichText[] };
};

export type Heading1Node = BaseNode & {
  type: "heading_1";
  heading_1: { text?: NotionRichText[]; rich_text?: NotionRichText[] };
};

export type Heading2Node = BaseNode & {
  type: "heading_2";
  heading_2: { text?: NotionRichText[]; rich_text?: NotionRichText[] };
};

export type Heading3Node = BaseNode & {
  type: "heading_3";
  heading_3: { text?: NotionRichText[]; rich_text?: NotionRichText[] };
};

export type ToDoNode = BaseNode & {
  type: "to_do";
  to_do: { rich_text?: NotionRichText[]; checked?: boolean };
};

export type CodeNode = BaseNode & {
  type: "code";
  code: { rich_text?: NotionRichText[]; language?: string };
};

export type QuoteNode = BaseNode & {
  type: "quote";
  quote: { rich_text?: NotionRichText[] };
};

export type DividerNode = BaseNode & {
  type: "divider";
};

export type ChildPageNode = BaseNode & {
  type: "child_page";
  child_page: { title?: string };
};

export type ImageNode = BaseNode & {
  type: "image";
  image: {
    type?: 'file' | 'external';
    file?: { url?: string };
    external?: { url?: string };
    caption?: NotionRichText[];
  };
};

export type TableRowNode = BaseNode & {
  type: "table_row";
  table_row: { cells?: Array<NotionRichText[]> };
};

export type TableNode = BaseNode & {
  type: "table";
  table: { has_column_header?: boolean; has_row_header?: boolean };
  children?: TableRowNode[];
};

export type CalloutNode = BaseNode & {
  type: "callout";
  callout: { icon?: { emoji?: string }; rich_text?: NotionRichText[] };
};

export type ColumnListNode = BaseNode & {
  type: "column_list";
  children?: Array<BaseNode & { children?: NotionBlock[] }>;
};

export type BulletedListItemNode = BaseNode & {
  type: "bulleted_list_item";
  bulleted_list_item: { rich_text?: NotionRichText[] };
};

export type NumberedListItemNode = BaseNode & {
  type: "numbered_list_item";
  numbered_list_item: { rich_text?: NotionRichText[] };
};

export type ToggleNode = BaseNode & {
  type: "toggle";
  toggle: { rich_text?: NotionRichText[] };
};

export type TableOfContentsNode = BaseNode & {
  type: "table_of_contents";
  table_of_contents: Record<string, never>;
};

export type NotionBlock =
  | ParagraphNode
  | Heading1Node
  | Heading2Node
  | Heading3Node
  | ToDoNode
  | CodeNode
  | QuoteNode
  | DividerNode
  | ChildPageNode
  | ImageNode
  | TableNode
  | TableRowNode
  | CalloutNode
  | ColumnListNode
  | BulletedListItemNode
  | NumberedListItemNode
  | ToggleNode
  | TableOfContentsNode;

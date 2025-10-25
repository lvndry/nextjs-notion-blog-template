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

// Notion Property Types
export type NotionProperty = {
  id: string;
  type: string;
  [key: string]: unknown;
};

export type NotionTitleProperty = NotionProperty & {
  type: "title";
  title: Array<{ plain_text: string; [key: string]: unknown }>;
};

export type NotionRichTextProperty = NotionProperty & {
  type: "rich_text";
  rich_text: Array<{ plain_text: string; [key: string]: unknown }>;
};

export type NotionNumberProperty = NotionProperty & {
  type: "number";
  number: number | null;
};

export type NotionSelectProperty = NotionProperty & {
  type: "select";
  select: { name: string; id: string } | null;
};

export type NotionMultiSelectProperty = NotionProperty & {
  type: "multi_select";
  multi_select: Array<{ name: string; id: string }>;
};

export type NotionDateProperty = NotionProperty & {
  type: "date";
  date: { start: string; end?: string; time_zone?: string } | null;
};

export type NotionCheckboxProperty = NotionProperty & {
  type: "checkbox";
  checkbox: boolean;
};

export type NotionUrlProperty = NotionProperty & {
  type: "url";
  url: string | null;
};

export type NotionEmailProperty = NotionProperty & {
  type: "email";
  email: string | null;
};

export type NotionPhoneNumberProperty = NotionProperty & {
  type: "phone_number";
  phone_number: string | null;
};

export type NotionFilesProperty = NotionProperty & {
  type: "files";
  files: Array<{
    name: string;
    type: "file" | "external";
    file?: { url: string; expiry_time: string };
    external?: { url: string };
  }>;
};

export type NotionRelationProperty = NotionProperty & {
  type: "relation";
  relation: Array<{ id: string }>;
};

export type NotionFormulaProperty = NotionProperty & {
  type: "formula";
  formula: {
    type: string;
    [key: string]: unknown;
  };
};

export type NotionRollupProperty = NotionProperty & {
  type: "rollup";
  rollup: {
    type: string;
    [key: string]: unknown;
  };
};

export type NotionCreatedTimeProperty = NotionProperty & {
  type: "created_time";
  created_time: string;
};

export type NotionCreatedByProperty = NotionProperty & {
  type: "created_by";
  created_by: {
    object: "user";
    id: string;
    name?: string;
    avatar_url?: string;
  };
};

export type NotionLastEditedTimeProperty = NotionProperty & {
  type: "last_edited_time";
  last_edited_time: string;
};

export type NotionLastEditedByProperty = NotionProperty & {
  type: "last_edited_by";
  last_edited_by: {
    object: "user";
    id: string;
    name?: string;
    avatar_url?: string;
  };
};

export type NotionStatusProperty = NotionProperty & {
  type: "status";
  status: { id: string; name: string; color: string } | null;
};

export type NotionPeopleProperty = NotionProperty & {
  type: "people";
  people: Array<{
    object: "user";
    id: string;
    name?: string;
    avatar_url?: string;
  }>;
};

export type NotionPageProperties = {
  [key: string]:
    | NotionTitleProperty
    | NotionRichTextProperty
    | NotionNumberProperty
    | NotionSelectProperty
    | NotionMultiSelectProperty
    | NotionDateProperty
    | NotionCheckboxProperty
    | NotionUrlProperty
    | NotionEmailProperty
    | NotionPhoneNumberProperty
    | NotionFilesProperty
    | NotionRelationProperty
    | NotionFormulaProperty
    | NotionRollupProperty
    | NotionCreatedTimeProperty
    | NotionCreatedByProperty
    | NotionLastEditedTimeProperty
    | NotionLastEditedByProperty
    | NotionStatusProperty
    | NotionPeopleProperty;
};

// Notion Parent Types
export type NotionParent = {
  type: string;
  [key: string]: unknown;
};

export type NotionDatabaseParent = NotionParent & {
  type: "database_id";
  database_id: string;
};

export type NotionPageParent = NotionParent & {
  type: "page_id";
  page_id: string;
};

export type NotionWorkspaceParent = NotionParent & {
  type: "workspace";
  workspace: true;
};

export type NotionBlockParent = NotionParent & {
  type: "block_id";
  block_id: string;
};

export type NotionPageParentInfo =
  | NotionDatabaseParent
  | NotionPageParent
  | NotionWorkspaceParent
  | NotionBlockParent;

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

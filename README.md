# Next.js Notion Blog Template

A modern, customizable Next.js boilerplate for creating a blog powered by Notion as a CMS. Perfect for developers who want to leverage Notion's powerful content management while maintaining full control over their blog's design and functionality.

[Live Demo](https://nextjs-notion-blog-template-eight.vercel.app)

## Quick Start

This template provides everything you need to get started with a Notion-powered blog in minutes.

## Features

- **Notion as CMS**: Use Notion as your content management system
- **Fully Customizable**: Complete control over design and UI components
- **Next.js 16**: Latest Next.js with App Router and React 19
- **Responsive Design**: Mobile-first, responsive layout
- **Dark Mode**: Built-in dark mode support
- **SEO Ready**: Optimized for search engines
- **Performance**: Fast loading with optimized rendering
- **Rich Content**: Support for all Notion block types
- **Direct Links**: Easy navigation between pages

## Setup Instructions

### 1. Clone and Install

```bash
# Clone this template
git clone https://github.com/lvndry/nextjs-notion-blog-template.git
cd nextjs-notion-blog-template

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### 2. Create Notion Integration

1. Go to [https://www.notion.so/profile/integrations](https://www.notion.so/profile/integrations)
2. Click **"New integration"**
3. Give it a name (e.g., "My Blog CMS")
4. Select the workspace you want to access
5. Click **"Submit"**
6. Copy the **"Internal Integration Token"** (starts with `ntn_`)

### 3. Configure Environment

```bash
# Copy the environment example
cp .env.example .env.local
```

Edit `.env.local` and add your Notion token:
```env
NOTION_TOKEN=ntn_your_actual_token_here
```

### 4. Grant Access to Your Notion Pages

To allow your integration to access specific pages:

1. Go back to your integration at [https://www.notion.so/profile/integrations](https://www.notion.so/profile/integrations)
2. Click on your integration name
3. Go to the **"Access"** tab
4. Click **"Add pages"** or **"Add databases"**
5. Search for and select the pages/databases you want to display on your blog
6. Click **"Save"**

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog!

## 🎨 Customization Guide

This template is designed to be easily customizable. Here's what you can modify:

### 1. Styling and Theme

The app uses **Tailwind CSS** with custom CSS variables for easy theming:

- **Colors**: Modify CSS variables in `app/globals.css` for custom color schemes
- **Typography**: Change fonts in the CSS variables or add Google Fonts
- **Layout**: Adjust spacing, containers, and responsive breakpoints
- **Dark Mode**: Customize dark mode colors in the CSS variables

### 2. Components

All components are in the `/components` directory:

- **`NotionPagesList.tsx`**: Main page listing component - customize grid layout, search functionality, and pagination
- **`NotionPageCard.tsx`**: Individual page card component - modify card styling, metadata display, and hover effects
- **`NotionPageViewer.tsx`**: Full page content renderer - customize content layout and styling
- **`DebugInfo.tsx`**: Development debugging component

### 3. Page Structure

- **`app/page.tsx`**: Homepage layout - add hero sections, navigation, or custom content
- **`app/page/[pageId]/page.tsx`**: Individual page layout - add breadcrumbs, back buttons, or custom metadata
- **`app/layout.tsx`**: Global layout and metadata - customize site-wide elements

### 4. Notion Integration

The Notion API integration is in `/lib/notion.ts`:

- **`searchAllPages()`**: Fetch all accessible pages - add custom filtering, sorting, or pagination
- **`getPageContent()`**: Get page content blocks - customize content processing
- **`getPageDetails()`**: Get page metadata - add custom property handling

### 5. Content Rendering

Customize how Notion blocks are rendered in `/components/notion/`:

- **`BlockRenderer.tsx`**: Main block renderer - add support for new block types
- **`blocks/`**: Individual block components - customize how each block type is displayed
- **`RichText.tsx`**: Text formatting - modify how rich text is rendered

### 6. Common Customizations

- **Add navigation**: Create header/navigation components
- **Page categories**: Display Notion properties as tags or filters
- **Custom metadata**: Show reading time, author info, or custom fields
- **Search and filtering**: Add advanced search or category filtering
- **Pagination**: Implement pagination for large page lists
- **SEO**: Add custom meta tags, Open Graph, or structured data

### 7. Supported Content Types

The template supports all major Notion block types:

- ✅ Paragraphs and text
- ✅ Headings (H1, H2, H3)
- ✅ Lists (bulleted, numbered, to-do)
- ✅ Code blocks with syntax highlighting
- ✅ Quotes and callouts
- ✅ Images and embeds
- ✅ Tables
- ✅ Dividers
- ✅ Toggle blocks
- ✅ Column layouts


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📖 Learn More

- [Notion API Documentation](https://developers.notion.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Notion API Working with Page Content](https://developers.notion.com/docs/working-with-page-content)

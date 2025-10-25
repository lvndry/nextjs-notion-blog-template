# Next.js Notion Blog Template

A modern, customizable Next.js boilerplate for creating a blog powered by Notion as a CMS. Perfect for developers who want to leverage Notion's powerful content management while maintaining full control over their blog's design and functionality.

## 🚀 Quick Start

This template provides everything you need to get started with a Notion-powered blog in minutes.

## ✨ Features

- 📝 **Notion as CMS**: Use Notion as your content management system
- 🎨 **Fully Customizable**: Complete control over design and UI components
- ⚡ **Next.js 16**: Latest Next.js with App Router and React 19
- 📱 **Responsive Design**: Mobile-first, responsive layout
- 🌙 **Dark Mode**: Built-in dark mode support
- 🔍 **SEO Ready**: Optimized for search engines
- 🚀 **Performance**: Fast loading with optimized rendering
- 📄 **Rich Content**: Support for all Notion block types
- 🔗 **Direct Links**: Easy navigation between pages

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- A Notion account
- Git

### 1. Clone and Install

```bash
# Clone this template
git clone https://github.com/your-username/nextjs-notion-blog-template.git
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
# Copy the environment template
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

This template is designed to be easily customizable. Here's how to make it your own:

### 1. Styling and Theme

The app uses **Tailwind CSS** for styling. You can customize:

- **Colors**: Edit `app/globals.css` for custom color schemes
- **Typography**: Modify font families and sizes in the CSS
- **Layout**: Adjust spacing, containers, and responsive breakpoints
- **Dark Mode**: Customize dark mode colors in the CSS variables

### 2. Components

All components are in the `/components` directory:

- **`NotionPagesList.tsx`**: Main page listing component
- **`NotionPageCard.tsx`**: Individual page card component  
- **`NotionPageViewer.tsx`**: Full page content renderer
- **`DebugInfo.tsx`**: Development debugging component

### 3. Page Structure

- **`app/page.tsx`**: Homepage layout
- **`app/page/[pageId]/page.tsx`**: Individual page layout
- **`app/layout.tsx`**: Global layout and metadata

### 4. Notion Integration

The Notion API integration is in `/lib/notion.ts`:

- **`searchAllPages()`**: Fetch all accessible pages
- **`getPageContent()`**: Get page content blocks
- **`getPageDetails()`**: Get page metadata

### 5. Supported Content Types

The template supports all major Notion block types:

- ✅ Paragraphs and text
- ✅ Headings (H1, H2, H3)
- ✅ Lists (bulleted, numbered, to-do)
- ✅ Code blocks with syntax highlighting
- ✅ Quotes and callouts
- ✅ Images and embeds
- ✅ Tables
- ✅ Dividers


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
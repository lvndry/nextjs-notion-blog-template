# Notion Pages Viewer

A Next.js application that uses the Notion API to retrieve and display all pages accessible to your Notion integration.

## Features

- 🔍 **Search and View Pages**: Browse all Notion pages accessible to your integration
- 📄 **Full Page View**: Click on page titles to view complete page content in a dedicated view
- 📄 **Page Content Preview**: View the content of individual pages without leaving the app
- 🔗 **Direct Notion Links**: Open pages directly in Notion
- 🎨 **Modern UI**: Clean, responsive interface with dark mode support
- ⚡ **Real-time Updates**: Refresh to get the latest pages and content
- 🔄 **Navigation**: Easy navigation between page list and individual page views

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Pages Viewer")
4. Select the workspace you want to access
5. Click "Submit"
6. Copy the "Internal Integration Token"

### 3. Configure Environment

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Notion token:
   ```
   NOTION_TOKEN=your_actual_token_here
   ```

### 4. Share Pages with Integration

For each page you want to view in the app:

1. Open the page in Notion
2. Click the "Share" button (top right)
3. Click "Add connections"
4. Search for and select your integration
5. Click "Confirm"

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Endpoints

The application includes the following API routes:

- `GET /api/notion/pages?action=list` - Get all accessible pages
- `GET /api/notion/pages?action=content&pageId=<id>` - Get page content
- `GET /api/notion/pages?action=details&pageId=<id>` - Get page details

## Supported Block Types

The application can display content from various Notion block types:

- Paragraphs
- Headings (H1, H2, H3)
- Bulleted lists
- Numbered lists
- To-do items
- Code blocks
- Quotes
- Dividers
- And more with graceful fallbacks for unsupported types

## Navigation

- **Main Page (`/`)**: View all your Notion pages in a list format
- **Individual Page (`/page/[pageId]`)**: View the full content of a specific page
- **Click on page titles** to navigate to the detailed view
- **Use the "Back to Pages" link** to return to the main list

## UUID Format Handling

The application automatically handles different UUID formats:

- **Notion URLs**: `5d0afad8277a4ffa8eea4820700ee069` (32 characters, no hyphens)
- **Standard UUIDs**: `5d0afad8-277a-4ffa-8eea-4820700ee069` (36 characters with hyphens)
- **Automatic Conversion**: The app converts between formats as needed for API calls and URLs

## Troubleshooting

### "NOTION_TOKEN environment variable is not set"

- Make sure you've created a `.env.local` file
- Verify the token is correctly set in the file
- Restart your development server

### "No pages found"

- Ensure your integration has been shared with the pages you want to view
- Check that the integration has the correct permissions
- Try refreshing the page

### Pages not loading

- Verify your Notion token is valid
- Check that the integration hasn't been revoked
- Ensure you have internet connectivity

## Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [Notion API](https://developers.notion.com/) - Official Notion API
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Learn More

- [Notion API Documentation](https://developers.notion.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Working with Page Content](https://developers.notion.com/docs/working-with-page-content)
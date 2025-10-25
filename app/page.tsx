import NotionPagesList from "@/components/NotionPagesList";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Notion Pages Viewer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            View and interact with all your Notion pages that are accessible to your integration.
            This application uses the Notion API to retrieve page content and display it in a user-friendly interface.
          </p>
        </div>
        
        <NotionPagesList />
      </main>
    </div>
  );
}

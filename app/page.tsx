import NotionPagesList from "@/components/NotionPagesList";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js + Notion Blog Template
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Easily create a blog powered by Notion as a CMS.</p>
        </div>

        <NotionPagesList />
      </main>
    </div>
  );
}

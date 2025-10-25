import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              The Notion page you're looking for doesn't exist or you don't have access to it.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Pages
            </Link>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Possible reasons:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>The page ID is invalid or malformed</li>
                <li>You don't have access to this page</li>
                <li>The page has been deleted</li>
                <li>Your Notion integration doesn't have permission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Gradient background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-500/20 via-sky-400/20 to-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-linear-to-tr from-fuchsia-400/10 via-purple-400/10 to-emerald-400/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          {/* Status indicator */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs uppercase tracking-widest text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 mb-8">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            Page not found
          </div>

          {/* Main content */}
          <div className="mb-8">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto">
              The Notion page you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
          </div>

          {/* Action buttons */}
          <div className="mb-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-5 py-3 text-white shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 min-h-[44px] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Pages
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-5 py-3 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 min-h-[44px] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
          </div>

          {/* Help section */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-3">
              Possible reasons:
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-start gap-2">
                <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold mt-0.5">1</div>
                <span>The page ID is invalid or malformed</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mt-0.5">2</div>
                <span>You don&apos;t have access to this page</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold mt-0.5">3</div>
                <span>The page has been deleted</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mt-0.5">4</div>
                <span>Your Notion integration doesn&apos;t have permission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

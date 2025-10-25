import NotionPagesList from "@/components/NotionPagesList";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Hero: premium startup landing */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-500/20 via-sky-400/20 to-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-linear-to-tr from-fuchsia-400/10 via-purple-400/10 to-emerald-400/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 pt-24 pb-10 sm:pt-32 sm:pb-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs uppercase tracking-widest text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Built for creators and startups
              </div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 sm:text-6xl dark:text-white">
                Launch a beautiful blog with Notion and Next.js
              </h1>
              <p className="mt-5 max-w-xl text-lg text-zinc-700 dark:text-zinc-300">
                Publish from Notion with a stunning, conversion-focused landing. No CMS, no friction—just ship.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="https://github.com/lvndry/nextjs-notion-blog-template" className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-5 py-3 text-white shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Start Now</a>
                <a href="https://nextjs-notion-blog-template-eight.vercel.app" className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">See it in action</a>
              </div>
              {/* Social proof */}
              <div className="mt-10 grid grid-cols-2 items-center gap-6 opacity-80 sm:grid-cols-4">
                <Image src="/next.svg" alt="Next.js" width={28} height={28} className="h-7 w-auto" />
                <Image src="/vercel.svg" alt="Vercel" width={28} height={28} className="h-7 w-auto" />
                <Image src="/globe.svg" alt="Web" width={28} height={28} className="h-7 w-auto" />
                <Image src="/window.svg" alt="Window" width={28} height={28} className="h-7 w-auto" />
              </div>
            </div>
            {/* Mock screenshot frame */}
            <div className="relative">
              <div className="relative rounded-2xl border border-zinc-200 bg-white/70 p-2 shadow-2xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
                <div className="rounded-xl bg-linear-to-br from-zinc-50 to-zinc-100 p-5 dark:from-zinc-900 dark:to-zinc-950">
                  <div className="flex items-center gap-1 pb-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="h-32 rounded-md bg-linear-to-br from-indigo-500/15 to-sky-500/15" />
                      <div className="mt-3 h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="mt-2 h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="h-32 rounded-md bg-linear-to-br from-fuchsia-500/15 to-purple-500/15" />
                      <div className="mt-3 h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="mt-2 h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -left-8 -top-8 -z-10 h-44 w-44 rounded-full bg-linear-to-br from-indigo-400/20 to-emerald-400/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -right-8 -z-10 h-52 w-52 rounded-full bg-linear-to-br from-fuchsia-400/20 to-purple-400/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features: premium icon cards */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Everything you need to ship content fast</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Beautiful defaults, clean components, and performance that scales with you.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-indigo-500/15 to-sky-500/15 text-indigo-600 dark:text-indigo-400">⚡</div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Performance-first</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Next.js App Router, server components, and edge-ready APIs for instant loads.</p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-indigo-500/40 via-fuchsia-500/40 to-emerald-500/40 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600 dark:text-emerald-400">🧩</div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Composable by design</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Sensible defaults and clean building blocks—customize quickly without the yak shave.</p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-indigo-500/40 via-fuchsia-500/40 to-emerald-500/40 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500/15 to-purple-500/15 text-fuchsia-600 dark:text-fuchsia-400">🔗</div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Notion-native</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Connect your database and publish—no CMS migrations or plugins required.</p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-indigo-500/40 via-fuchsia-500/40 to-emerald-500/40 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-8 sm:py-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-indigo-500/20 to-sky-500/20 text-sm font-semibold text-indigo-600 dark:text-indigo-400">1</div>
              <h3 className="mt-3 text-base font-medium text-zinc-900 dark:text-white">Connect your Notion</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Add your integration token and select a database.</p>
            </div>
            <div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500/20 to-purple-500/20 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">2</div>
              <h3 className="mt-3 text-base font-medium text-zinc-900 dark:text-white">Write in Notion</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Use your favorite editor—no new CMS to learn.</p>
            </div>
            <div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-emerald-500/20 to-teal-500/20 text-sm font-semibold text-emerald-600 dark:text-emerald-400">3</div>
              <h3 className="mt-3 text-base font-medium text-zinc-900 dark:text-white">Deploy in minutes</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Ship to Vercel with fast defaults and a beautiful UI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="demo" className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">From the blog</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Recent posts from your connected Notion workspace.</p>
          </div>
        </div>
        <NotionPagesList limit={4} header={false} />
      </section>

      {/* CTA: gradient bordered */}
      <section id="get-started" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-indigo-500/50 via-fuchsia-500/50 to-emerald-500/50" />
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">Launch your Notion-powered blog today</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Deploy on Vercel, connect your database, and start publishing in minutes.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="https://vercel.com/new?template=https://github.com/lvndry/nextjs-notion-blog-template" className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-5 py-3 text-white shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Deploy to Vercel</a>
              <a href="https://github.com/lvndry/nextjs-notion-blog-template" className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">Star on GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} Notion Blog Template</div>
            <div className="flex items-center gap-5 text-sm">
              <a href="https://github.com/lvndry/nextjs-notion-blog-template" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">GitHub</a>
              <Link href="/" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

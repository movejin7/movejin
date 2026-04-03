import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Movejin Dashboard</h1>
        <p className="mt-2 text-slate-600">Open the admin dashboard page.</p>
        <Link
          href="/admin"
          className="mt-6 inline-flex rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          Go to /admin
        </Link>
      </div>
    </main>
  );
}

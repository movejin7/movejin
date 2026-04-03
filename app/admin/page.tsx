import { headers } from "next/headers";
import AdminConsultRealtime from "@/components/AdminConsultRealtime";

type Consult = {
  id: string;
  category: string;
  description: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
};

async function getConsults(): Promise<Consult[]> {
  const headerStore = headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return [];
  }

  const response = await fetch(`${protocol}://${host}/api/consult`, {
    method: "GET",
    cache: "no-store"
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as Consult[];
}

export default async function AdminPage() {
  const consults = await getConsults();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-brand-600">Admin</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Consult Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            Track consult performance and review the latest consult list in real time.
          </p>
        </header>

        <AdminConsultRealtime initialConsults={consults} />
      </div>
    </main>
  );
}

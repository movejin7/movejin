import { headers } from "next/headers";
import KpiCard from "@/components/KpiCard";
import Table from "@/components/Table";

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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export default async function AdminPage() {
  const consults = await getConsults();
  const totalConsults = consults.length;
  const completionRate =
    totalConsults > 0
      ? `${Math.round(
          (consults.filter((consult) => consult.status === "COMPLETED").length / totalConsults) * 100
        )}%`
      : "0%";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-brand-600">Admin</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Consult Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Track consult performance and review the latest consult list.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <KpiCard
            label="Total Consults"
            value={String(totalConsults)}
            helperText="From database records"
            trend={{ value: "+8%", positive: true }}
          />
          <KpiCard
            label="Completion Rate"
            value={completionRate}
            helperText="Completed consults vs total"
            trend={{ value: "+4.2%", positive: true }}
          />
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Consult List</h2>
            <span className="text-sm text-slate-500">Prisma API data</span>
          </div>
          <Table
            rowKey="id"
            data={consults}
            columns={[
              { key: "id", header: "Consult ID" },
              { key: "category", header: "Category" },
              { key: "description", header: "Description" },
              {
                key: "createdAt",
                header: "Created At",
                render: (value) => formatDate(String(value))
              },
              {
                key: "status",
                header: "Status",
                render: (value) => {
                  const status = String(value);
                  const styles: Record<string, string> = {
                    COMPLETED: "bg-emerald-50 text-emerald-700",
                    PENDING: "bg-amber-50 text-amber-700",
                    CANCELLED: "bg-rose-50 text-rose-700"
                  };
                  return (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        styles[status] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {status}
                    </span>
                  );
                }
              }
            ]}
          />
        </section>
      </div>
    </main>
  );
}

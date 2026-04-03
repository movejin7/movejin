import KpiCard from "@/components/KpiCard";
import Table from "@/components/Table";

type Consult = {
  id: string;
  patientName: string;
  doctor: string;
  type: string;
  scheduledAt: string;
  status: "Completed" | "Pending" | "Cancelled";
};

const consults: Consult[] = [
  {
    id: "C-1001",
    patientName: "Ava Thompson",
    doctor: "Dr. Lee",
    type: "Follow-up",
    scheduledAt: "2026-04-03 09:00",
    status: "Completed"
  },
  {
    id: "C-1002",
    patientName: "Noah Kim",
    doctor: "Dr. Johnson",
    type: "Initial",
    scheduledAt: "2026-04-03 09:30",
    status: "Pending"
  },
  {
    id: "C-1003",
    patientName: "Emma Chen",
    doctor: "Dr. Patel",
    type: "Review",
    scheduledAt: "2026-04-03 10:00",
    status: "Completed"
  },
  {
    id: "C-1004",
    patientName: "Lucas Garcia",
    doctor: "Dr. Lee",
    type: "Initial",
    scheduledAt: "2026-04-03 10:30",
    status: "Cancelled"
  },
  {
    id: "C-1005",
    patientName: "Mia Roberts",
    doctor: "Dr. Patel",
    type: "Follow-up",
    scheduledAt: "2026-04-03 11:15",
    status: "Completed"
  }
];

const totalConsults = consults.length;
const completionRate = `${Math.round(
  (consults.filter((consult) => consult.status === "Completed").length / totalConsults) * 100
)}%`;

export default function AdminPage() {
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
            helperText="Across today’s schedule"
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
            <span className="text-sm text-slate-500">Mock data</span>
          </div>
          <Table
            rowKey="id"
            data={consults}
            columns={[
              { key: "id", header: "Consult ID" },
              { key: "patientName", header: "Patient" },
              { key: "doctor", header: "Doctor" },
              { key: "type", header: "Type" },
              { key: "scheduledAt", header: "Scheduled" },
              {
                key: "status",
                header: "Status",
                render: (value) => {
                  const status = String(value);
                  const styles: Record<string, string> = {
                    Completed: "bg-emerald-50 text-emerald-700",
                    Pending: "bg-amber-50 text-amber-700",
                    Cancelled: "bg-rose-50 text-rose-700"
                  };
                  return (
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status] ?? "bg-slate-100 text-slate-700"}`}>
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

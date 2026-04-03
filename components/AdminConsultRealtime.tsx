"use client";

import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import KpiCard from "@/components/KpiCard";
import Table from "@/components/Table";

type Consult = {
  id: string;
  category: string;
  description: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
};

type AdminConsultRealtimeProps = {
  initialConsults: Consult[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export default function AdminConsultRealtime({ initialConsults }: AdminConsultRealtimeProps) {
  const [consults, setConsults] = useState<Consult[]>(initialConsults);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const socket = io();

    socket.on("new-consult", (newConsult: Consult) => {
      setConsults((prev) => {
        if (prev.some((consult) => consult.id === newConsult.id)) {
          return prev;
        }
        return [newConsult, ...prev];
      });
      setNotification(`New consult created: ${newConsult.category}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  const totalConsults = consults.length;
  const completionRate =
    totalConsults > 0
      ? `${Math.round(
          (consults.filter((consult) => consult.status === "COMPLETED").length / totalConsults) * 100
        )}%`
      : "0%";

  const sortedConsults = useMemo(
    () => [...consults].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [consults]
  );

  return (
    <>
      {notification ? (
        <div className="fixed right-4 top-4 z-50 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg">
          {notification}
        </div>
      ) : null}

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
          <span className="text-sm text-slate-500">Prisma + Socket.IO</span>
        </div>
        <Table
          rowKey="id"
          data={sortedConsults}
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
    </>
  );
}

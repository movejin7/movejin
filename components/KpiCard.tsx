type KpiCardProps = {
  label: string;
  value: string;
  helperText?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
};

export default function KpiCard({ label, value, helperText, trend }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        {trend ? (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              trend.positive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {trend.value}
          </span>
        ) : null}
      </div>
      {helperText ? <p className="mt-2 text-sm text-slate-500">{helperText}</p> : null}
    </article>
  );
}

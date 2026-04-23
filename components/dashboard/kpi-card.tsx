import { Kpi } from "@/types/domain";

export function KpiCard({ label, value, variation }: Kpi) {
  return (
    <article className="card p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <p className="text-xs text-emerald-600 mt-1">{variation}</p>
    </article>
  );
}

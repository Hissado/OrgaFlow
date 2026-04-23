import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  brouillon: "bg-slate-100 text-slate-700",
  en_cours: "bg-amber-100 text-amber-700",
  a_valider: "bg-indigo-100 text-indigo-700",
  valide: "bg-emerald-100 text-emerald-700",
  archive: "bg-rose-100 text-rose-700"
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={cn("rounded-full px-2 py-1 text-xs font-medium", map[status] || map.brouillon)}>{status.replaceAll("_", " ")}</span>;
}

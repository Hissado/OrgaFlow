import { StatusBadge } from "@/components/ui/status-badge";

type Row = Record<string, string | number>;

export function DataTable({ rows }: { rows: Row[] }) {
  if (!rows.length) return <div className="card p-8 text-center text-slate-500">Aucune donnée disponible.</div>;
  const cols = Object.keys(rows[0]);

  return (
    <div className="card overflow-hidden">
      <div className="p-3 border-b"><input className="w-full rounded border px-3 py-2 text-sm" placeholder="Rechercher..." /></div>
      <table className="w-full text-sm">
        <thead className="bg-slate-50"><tr>{cols.map((col) => <th key={col} className="px-4 py-2 text-left font-medium">{col}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {cols.map((c) => (
                <td key={c} className="px-4 py-2">{c === "statut" ? <StatusBadge status={String(row[c])} /> : String(row[c])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

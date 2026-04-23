import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ jalon: "Diagnostic initial", date: "2026-04-30", statut: "valide" }, { jalon: "Validation roadmap", date: "2026-05-25", statut: "en_cours" }]} />;
}

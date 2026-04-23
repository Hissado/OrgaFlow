import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ livrable: "Note de cadrage", version: "v1", statut: "valide" }, { livrable: "Rapport de diagnostic", version: "v0.9", statut: "a_valider" }]} />;
}

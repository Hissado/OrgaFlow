import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ chapitre: "Ressources humaines", version: "v1.2", statut: "a_valider" }, { chapitre: "Finance et contrôle", version: "v1.0", statut: "valide" }]} />;
}

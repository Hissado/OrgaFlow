import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ action: "Former les managers au pilotage", echeance: "2026-05-10", statut: "en_cours" }, { action: "Publier le manuel v1", echeance: "2026-05-20", statut: "a_valider" }]} />;
}

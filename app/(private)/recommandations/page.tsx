import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ recommandation: "Mettre en place un circuit d'approbation", priorite: "Haute", statut: "en_cours" }, { recommandation: "Automatiser le suivi des congés", priorite: "Moyenne", statut: "a_valider" }]} />;
}

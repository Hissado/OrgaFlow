import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ departement: "Finance", manager: "Fatou Ndiaye", effectif: 12, statut: "valide" }, { departement: "Opérations", manager: "Jean Yao", effectif: 18, statut: "valide" }]} />;
}

import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ nom: "Koffi Amani", poste: "Comptable", departement: "Finance", statut: "en_cours" }, { nom: "Nadia Traoré", poste: "Assistante RH", departement: "RH", statut: "valide" }]} />;
}

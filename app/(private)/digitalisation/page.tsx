import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ opportunite: "Workflow validation achats", gain: "-35% délai", statut: "en_cours" }, { opportunite: "Portail documents RH", gain: "-25% tâches manuelles", statut: "a_valider" }]} />;
}

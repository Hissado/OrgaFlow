import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ utilisateur: "Aïcha Koné", action: "Validation procédure RH", date: "2026-04-22", statut: "valide" }, { utilisateur: "Moussa Diallo", action: "Ajout entretien", date: "2026-04-21", statut: "valide" }]} />;
}

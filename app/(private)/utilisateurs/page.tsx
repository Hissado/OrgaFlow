import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <DataTable rows={[{ nom: "Aïcha Koné", role: "super_admin", email: "admin@orgaflow.io", statut: "valide" }, { nom: "Moussa Diallo", role: "manager", email: "m.diallo@edole.africa", statut: "en_cours" }]} />;
}

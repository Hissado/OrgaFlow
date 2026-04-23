import { ProcessForm } from "@/components/forms/process-form";
import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <div className="grid gap-4 lg:grid-cols-2"><ProcessForm /><DataTable rows={[{ processus: "Gestion achats", criticite: "Haute", statut: "en_cours" }, { processus: "Onboarding", criticite: "Moyenne", statut: "valide" }]} /></div>;
}

import { EvaluationForm } from "@/components/forms/evaluation-form";
import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <div className="grid gap-4 lg:grid-cols-2"><EvaluationForm /><DataTable rows={[{ axe: "Coordination interservices", score: 61, statut: "en_cours" }, { axe: "Maturité digitale", score: 43, statut: "a_valider" }]} /></div>;
}

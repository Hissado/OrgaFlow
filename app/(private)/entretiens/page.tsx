import { InterviewForm } from "@/components/forms/interview-form";
import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <div className="grid gap-4 lg:grid-cols-2"><InterviewForm /><DataTable rows={[{ collaborateur: "Koffi Amani", date: "2026-04-15", score: 74, statut: "valide" }, { collaborateur: "Nadia Traoré", date: "2026-04-20", score: 68, statut: "en_cours" }]} /></div>;
}

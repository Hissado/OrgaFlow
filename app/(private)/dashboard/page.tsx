import { KpiCard } from "@/components/dashboard/kpi-card";
import { MissionChart } from "@/components/dashboard/mission-chart";
import { DataTable } from "@/components/tables/data-table";

const kpis = [
  { label: "Avancement global", value: "78%", variation: "+9% ce mois" },
  { label: "Entretiens réalisés", value: "24 / 32", variation: "8 restants" },
  { label: "Procédures validées", value: "18", variation: "+4 cette semaine" },
  { label: "Recommandations critiques", value: "6", variation: "2 à traiter en priorité" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{kpis.map((k) => <KpiCard key={k.label} {...k} />)}</section>
      <MissionChart />
      <DataTable rows={[
        { tache: "Validation manuel RH", responsable: "DAF", statut: "a_valider" },
        { tache: "Collecte pièces juridiques", responsable: "Consultant", statut: "en_cours" }
      ]} />
    </div>
  );
}

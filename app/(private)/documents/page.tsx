import { DocumentUpload } from "@/components/forms/document-upload";
import { DataTable } from "@/components/tables/data-table";

export default function Page() {
  return <div className="grid gap-4 lg:grid-cols-2"><DocumentUpload /><DataTable rows={[{ document: "Contrat de travail", categorie: "RH", statut: "valide" }, { document: "Procédure achats", categorie: "Organisation", statut: "a_valider" }]} /></div>;
}

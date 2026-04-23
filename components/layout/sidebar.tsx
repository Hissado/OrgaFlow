"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  ["/dashboard", "Tableau de bord"], ["/utilisateurs", "Utilisateurs"], ["/departements", "Départements"],
  ["/collaborateurs", "Collaborateurs"], ["/documents", "Documents"], ["/entretiens", "Entretiens"],
  ["/evaluations", "Évaluations"], ["/processus", "Processus"], ["/manuel-procedures", "Manuel de procédures"],
  ["/recommandations", "Recommandations"], ["/plan-action", "Plan d'action"], ["/digitalisation", "Digitalisation"],
  ["/planning", "Planning"], ["/livrables", "Livrables"], ["/parametres", "Paramètres"], ["/journal-activite", "Journal d'activité"]
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-72 border-r border-slate-200 bg-slate-950 text-slate-100 min-h-screen p-4">
      <div className="text-xl font-semibold mb-6">OrgaFlow</div>
      <nav className="space-y-1">
        {nav.map(([href, label]) => (
          <Link key={href} href={href} className={cn("block rounded-lg px-3 py-2 text-sm", pathname === href ? "bg-sky-500 text-white" : "hover:bg-slate-800")}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

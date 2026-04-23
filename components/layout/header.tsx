import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-500">Mission EDOLE AFRICA</p>
        <h1 className="font-semibold">Pilotage de structuration interne</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-lg border px-3 py-2"><Bell size={16} /></button>
        <div className="text-right">
          <p className="text-sm font-medium">Aïcha Koné</p>
          <p className="text-xs text-slate-500">Super Admin</p>
        </div>
      </div>
    </header>
  );
}

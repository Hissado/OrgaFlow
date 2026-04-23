import { createClient } from "@/lib/supabase-browser";

export async function getDashboardData() {
  const supabase = createClient();
  const [interviews, recommendations, procedures] = await Promise.all([
    supabase.from("interviews").select("id", { count: "exact", head: true }),
    supabase.from("recommendations").select("id", { count: "exact", head: true }),
    supabase.from("procedure_versions").select("id", { count: "exact", head: true })
  ]);
  return {
    interviews: interviews.count ?? 0,
    recommendations: recommendations.count ?? 0,
    procedures: procedures.count ?? 0
  };
}

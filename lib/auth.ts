import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function requireSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");
  return session;
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Identifiants invalides." };
  }
  redirect("/dashboard");
}

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email"));
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`
  });
  if (error) return { error: "Impossible d'envoyer l'e-mail." };
  return { success: "Lien de réinitialisation envoyé." };
}

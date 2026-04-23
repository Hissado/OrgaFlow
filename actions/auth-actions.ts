"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?erreur=Identifiants%20invalides");
  }

  redirect("/dashboard");
}

export async function forgotPasswordAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`
  });

  if (error) {
    redirect("/forgot-password?erreur=Impossible%20d%27envoyer%20l%27e-mail");
  }

  redirect("/forgot-password?succes=1");
}

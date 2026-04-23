"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export function useRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("user_roles").select("roles(code)").eq("user_id", user.id).single();
      setRole((data as any)?.roles?.code ?? null);
    };
    void load();
  }, []);

  return role;
}

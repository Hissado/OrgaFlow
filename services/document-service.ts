import { createClient } from "@/lib/supabase-browser";

export async function uploadDocument(file: File) {
  const supabase = createClient();
  const filePath = `documents/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("orgaflow-documents").upload(filePath, file, { upsert: false });
  if (error) return { ok: false, error };
  return { ok: true, filePath };
}

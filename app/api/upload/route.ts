import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });

  const filePath = `documents/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("orgaflow-documents").upload(filePath, file, { upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, filePath });
}

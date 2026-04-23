"use client";

import { useState } from "react";
import { uploadDocument } from "@/services/document-service";

export function DocumentUpload() {
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) return;
    const result = await uploadDocument(file);
    setMessage(result.ok ? "Document chargé avec succès." : "Échec du chargement.");
  }

  return (
    <form action={onSubmit} className="card p-4 space-y-3">
      <h3 className="font-semibold">Importer un document</h3>
      <input name="file" type="file" className="w-full rounded border px-3 py-2" />
      <button className="rounded bg-slate-900 text-white px-4 py-2">Téléverser</button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}

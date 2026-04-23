"use client";
import { useForm } from "react-hook-form";

export function ProcessForm() {
  const { register, handleSubmit } = useForm();
  return (
    <form className="card p-4 space-y-3" onSubmit={handleSubmit(() => undefined)}>
      <h3 className="font-semibold">Cartographier un processus</h3>
      <input {...register("nom")} className="w-full rounded border px-3 py-2" placeholder="Nom du processus" />
      <input {...register("service")} className="w-full rounded border px-3 py-2" placeholder="Service" />
      <textarea {...register("etapes")} className="w-full rounded border px-3 py-2" placeholder="Étapes clés" />
      <button className="rounded bg-slate-900 text-white px-4 py-2">Créer</button>
    </form>
  );
}

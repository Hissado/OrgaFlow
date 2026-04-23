"use client";
import { useForm } from "react-hook-form";

type FormValues = { collaborateur: string; date: string; notes: string; score: number };

export function InterviewForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  return (
    <form className="card p-4 space-y-3" onSubmit={handleSubmit(() => reset())}>
      <h3 className="font-semibold">Planifier un entretien</h3>
      <input {...register("collaborateur")} className="w-full rounded border px-3 py-2" placeholder="Collaborateur" />
      <input {...register("date")} type="date" className="w-full rounded border px-3 py-2" />
      <textarea {...register("notes")} className="w-full rounded border px-3 py-2" placeholder="Notes" />
      <input {...register("score", { valueAsNumber: true })} type="number" min={0} max={100} className="w-full rounded border px-3 py-2" placeholder="Score" />
      <button className="rounded bg-slate-900 text-white px-4 py-2">Enregistrer</button>
    </form>
  );
}

"use client";
import { useForm } from "react-hook-form";

export function EvaluationForm() {
  const { register, handleSubmit } = useForm();
  return (
    <form className="card p-4 space-y-3" onSubmit={handleSubmit(() => undefined)}>
      <h3 className="font-semibold">Nouvelle évaluation organisationnelle</h3>
      <input {...register("theme")} className="w-full rounded border px-3 py-2" placeholder="Thème" />
      <textarea {...register("constat")} className="w-full rounded border px-3 py-2" placeholder="Constat" />
      <button className="rounded bg-sky-600 text-white px-4 py-2">Soumettre</button>
    </form>
  );
}

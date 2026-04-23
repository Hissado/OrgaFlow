import { forgotPasswordAction } from "@/actions/auth-actions";

export default function ForgotPasswordPage() {
  return (
    <form action={forgotPasswordAction} className="card w-full max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Réinitialisation</h1>
      <input name="email" type="email" required className="w-full rounded border px-3 py-2" placeholder="E-mail" />
      <button className="w-full rounded bg-sky-600 text-white px-4 py-2">Envoyer le lien</button>
    </form>
  );
}

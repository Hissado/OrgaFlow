import { loginAction } from "@/actions/auth-actions";

export default function LoginPage() {
  return (
    <form action={loginAction} className="card w-full max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Connexion à OrgaFlow</h1>
      <input name="email" type="email" required className="w-full rounded border px-3 py-2" placeholder="E-mail professionnel" />
      <input name="password" type="password" required className="w-full rounded border px-3 py-2" placeholder="Mot de passe" />
      <button className="w-full rounded bg-slate-900 text-white px-4 py-2">Se connecter</button>
    </form>
  );
}

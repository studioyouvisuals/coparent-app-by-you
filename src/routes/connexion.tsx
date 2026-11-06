import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button, Field, LangSwitch, Logo, inputCls } from "@/components/shell";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — CoParent" },
      { name: "description", content: "Connectez-vous à votre espace famille CoParent par lien magique." },
      { property: "og:title", content: "Connexion — CoParent" },
      { property: "og:description", content: "Un lien sécurisé par email, sans mot de passe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError(t.login.invalidEmail);
    setError("");
    setSent(true); // Magic link sending will be wired when the backend is connected.
  };
  return (
    <div className="flex min-h-screen flex-col bg-hero px-5">
      <div className="mx-auto flex w-full max-w-md items-center justify-between py-5"><Logo /><LangSwitch /></div>
      <div className="mx-auto mt-16 w-full max-w-md rounded-2xl border bg-card p-7">
        <h1 className="text-2xl font-semibold tracking-tight">{t.login.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.login.subtitle}</p>
        {sent ? (
          <div className="mt-6 flex gap-3 rounded-xl border bg-secondary p-4 text-sm"><MailCheck className="h-5 w-5 shrink-0 text-success" />{t.login.sent}</div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            <Field label={t.login.email} error={error}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.login.placeholder} className={inputCls} />
            </Field>
            <Button type="submit" className="w-full">{t.login.submit}</Button>
          </form>
        )}
        <Link to="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground">{t.login.back}</Link>
      </div>
    </div>
  );
}

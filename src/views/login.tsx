"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button, Field, LangSwitch, Logo, inputCls } from "@/components/shell";
import { useDocTitle, useI18n } from "@/i18n";
import { supabaseBrowser } from "@/lib/supabase/client";

export function Login() {
  const { t } = useI18n();
  useDocTitle(t.meta.login);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState<"" | "real" | "demo">("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError(t.login.invalidEmail);
    setError("");
    const supabase = supabaseBrowser();
    if (!supabase) return setSent("demo");
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (err) return setError(t.login.error);
    setSent("real");
  };
  return (
    <div className="flex min-h-screen flex-col bg-hero px-5">
      <div className="mx-auto flex w-full max-w-md items-center justify-between py-5">
        <Logo />
        <LangSwitch />
      </div>
      <div className="mx-auto mt-16 w-full max-w-md rounded-2xl border bg-card p-7">
        <h1 className="text-2xl font-semibold tracking-tight">{t.login.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.login.subtitle}</p>
        {sent ? (
          <div className="mt-6 flex gap-3 rounded-xl border bg-secondary p-4 text-sm">
            <MailCheck className="h-5 w-5 shrink-0 text-success" />
            <span>
              {sent === "demo" ? t.login.demoSent : t.login.sent}
              {sent === "demo" && (
                <Link href="/tableau-de-bord" className="mt-2 block font-semibold text-primary">
                  {t.nav.dashboard} →
                </Link>
              )}
            </span>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            <Field label={t.login.email} error={error}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.login.placeholder}
                className={inputCls}
              />
            </Field>
            <Button type="submit" className="w-full" disabled={busy}>
              {t.login.submit}
            </Button>
          </form>
        )}
        <Link
          href="/"
          className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {t.login.back}
        </Link>
      </div>
    </div>
  );
}

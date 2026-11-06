import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button, Field, LangSwitch, inputCls } from "@/components/shell";
import { formatDate, formatMoney, useI18n } from "@/i18n";
import { demoChildren } from "@/lib/events";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — CoParent" },
      { name: "description", content: "Profil, langue, facturation et membres de votre espace famille CoParent." },
      { property: "og:title", content: "Paramètres — CoParent" },
      { property: "og:description", content: "Gérez votre profil, votre abonnement et votre famille." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

type Tab = "profile" | "billing" | "family";

function SettingsPage() {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<Tab>("profile");
  const [note, setNote] = useState("");
  const [color, setColor] = useState<"a" | "b">("a");
  const [children, setChildren] = useState(demoChildren);
  const [first, setFirst] = useState("");
  const [birth, setBirth] = useState("");
  const [childErr, setChildErr] = useState("");
  const [invite, setInvite] = useState("");
  const [inviteErr, setInviteErr] = useState("");
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(""), 3000); };

  const addChild = (e: FormEvent) => {
    e.preventDefault();
    if (!first.trim() || !birth) return setChildErr(t.settings.childRequired);
    setChildErr("");
    setChildren((c) => [...c, { id: crypto.randomUUID(), firstName: first.trim().slice(0, 50), birthDate: birth }]);
    setFirst(""); setBirth("");
  };
  const sendInvite = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(invite)) return setInviteErr(t.login.invalidEmail);
    setInviteErr(""); setInvite(""); flash(t.settings.inviteSent);
  };
  const pro = t.pricing.plans[1];

  return (
    <AppLayout active="settings">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">{t.settings.title}</h1>
        <div role="tablist" className="mt-6 flex gap-1 rounded-xl border bg-secondary/50 p-1">
          {(["profile", "billing", "family"] as Tab[]).map((k) => (
            <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)}
              className={cn("flex-1 rounded-lg px-3 py-2 text-sm font-medium", tab === k ? "bg-card text-foreground" : "text-muted-foreground")}>{t.settings.tabs[k]}</button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-6">
          {tab === "profile" && (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); flash(t.settings.saved); }}>
              <Field label={t.settings.name}><input defaultValue="Camille" className={inputCls} /></Field>
              <Field label={t.settings.email}><input type="email" defaultValue="camille@exemple.fr" className={inputCls} /></Field>
              <div className="space-y-1.5">
                <span className="text-sm font-medium text-muted-foreground">{t.settings.color}</span>
                <div className="flex gap-3">
                  {(["a", "b"] as const).map((c) => (
                    <button key={c} type="button" aria-pressed={color === c} onClick={() => setColor(c)}
                      className={cn("h-9 w-9 rounded-full", c === "a" ? "bg-parent-a" : "bg-parent-b", color === c && "ring-2 ring-foreground ring-offset-2 ring-offset-card")} />
                  ))}
                </div>
              </div>
              <div className="space-y-1.5"><span className="block text-sm font-medium text-muted-foreground">{t.settings.language}</span><LangSwitch /></div>
              <Button type="submit">{t.settings.save}</Button>
            </form>
          )}

          {tab === "billing" && (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">{t.settings.currentPlan}</p>
                <p className="mt-1 text-xl font-semibold">{pro.name} · {formatMoney(pro.price, lang)}<span className="text-sm font-normal text-muted-foreground">{t.pricing.perMonth}</span></p>
              </div>
              <Button variant="outline" onClick={() => flash(t.settings.manageSoon)}>{t.settings.manage}</Button>
            </div>
          )}

          {tab === "family" && (
            <div className="space-y-8">
              <form onSubmit={sendInvite} className="space-y-3" noValidate>
                <h2 className="font-semibold">{t.settings.invite}</h2>
                <p className="text-sm text-muted-foreground">{t.settings.inviteHelp}</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input type="email" value={invite} onChange={(e) => setInvite(e.target.value)} placeholder={t.login.placeholder} className={inputCls} />
                  <Button type="submit" className="shrink-0">{t.settings.inviteSend}</Button>
                </div>
                {inviteErr && <p className="text-xs text-destructive">{inviteErr}</p>}
              </form>
              <div className="space-y-3">
                <h2 className="font-semibold">{t.settings.children}</h2>
                <ul className="divide-y rounded-xl border">
                  {children.map((c) => (
                    <li key={c.id} className="flex justify-between px-4 py-3 text-sm"><span className="font-medium">{c.firstName}</span><span className="text-muted-foreground">{t.settings.born} {formatDate(new Date(c.birthDate + "T00:00:00"), lang)}</span></li>
                  ))}
                </ul>
                <form onSubmit={addChild} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                  <Field label={t.settings.firstName}><input value={first} maxLength={50} onChange={(e) => setFirst(e.target.value)} className={inputCls} /></Field>
                  <Field label={t.settings.birthDate}><input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className={inputCls} /></Field>
                  <Button type="submit">{t.settings.addChild}</Button>
                </form>
                {childErr && <p className="text-xs text-destructive">{childErr}</p>}
              </div>
            </div>
          )}
        </div>
        {note && <p role="status" className="mt-4 text-sm text-success">{note}</p>}
      </div>
    </AppLayout>
  );
}

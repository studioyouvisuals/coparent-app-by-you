import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Check, Plane, ReceiptText, School } from "lucide-react";
import { useState } from "react";
import { LangSwitch, Logo, btn } from "@/components/shell";
import { formatMoney, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CoParent — Un seul planning pour vos enfants" },
      { name: "description", content: "Gardes, vacances, achats et réunions scolaires partagés entre deux parents, sans oubli." },
      { property: "og:title", content: "CoParent — Un seul planning pour vos enfants" },
      { property: "og:description", content: "Le planning partagé des parents séparés : gardes, vacances, dépenses et école." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const icons = [CalendarDays, Plane, ReceiptText, School];

function Landing() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">{t.nav.features}</a>
            <a href="#pricing" className="hover:text-foreground">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-foreground">{t.nav.faq}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LangSwitch />
            <Link to="/connexion" className="hidden text-sm font-medium sm:inline">{t.nav.login}</Link>
          </div>
        </div>
      </header>

      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-5 pb-20 pt-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">{t.hero.eyebrow}</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{t.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">{t.hero.subtitle}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/connexion" className={btn()}>{t.hero.cta}</Link>
            <Link to="/tableau-de-bord" className={btn("outline")}>{t.hero.secondary}</Link>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{t.features.title}</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <div key={f.title} className="rounded-2xl border bg-card p-6">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-5 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{t.pricing.title}</h2>
        <p className="mt-3 text-center text-muted-foreground">{t.pricing.subtitle}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.pricing.plans.map((p) => {
            const hl = p.id === "pro";
            return (
              <div key={p.id} className={cn("relative flex flex-col rounded-2xl border bg-card p-7", hl && "border-primary shadow-glow")}>
                {hl && <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">{t.pricing.popular}</span>}
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-6 text-4xl font-semibold tracking-tight">
                  {p.price === 0 ? t.pricing.free : formatMoney(p.price, lang)}
                  {p.price > 0 && <span className="text-sm font-normal text-muted-foreground">{t.pricing.perMonth}</span>}
                </p>
                {p.id === "pro" && <p className="text-xs text-muted-foreground">{t.pricing.perFamily}</p>}
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" />{f}</li>)}
                </ul>
                <Link to="/connexion" className={cn(btn(hl ? "primary" : "outline"), "mt-8")}>{t.pricing.choose}</Link>
              </div>
            );
          })}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{t.faq.title}</h2>
        <div className="mt-10 divide-y rounded-2xl border bg-card">
          {t.faq.items.map((f, i) => (
            <div key={f.q}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
                className="flex w-full items-center justify-between px-6 py-5 text-left font-medium">
                {f.q}<span className="text-muted-foreground">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} {t.brand}. {t.footer.rights}</p>
          <div className="flex gap-5"><span>{t.footer.privacy}</span><span>{t.footer.terms}</span></div>
        </div>
      </footer>
    </div>
  );
}

function HeroPreview() {
  const days = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div aria-hidden className="mx-auto mt-16 max-w-2xl rounded-2xl border bg-card/70 p-5 shadow-glow backdrop-blur">
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <div key={d} className={cn("aspect-square rounded-lg", Math.floor(d / 7) % 2 ? "bg-parent-b/25" : "bg-parent-a/30", d === 9 && "ring-2 ring-primary")} />
        ))}
      </div>
    </div>
  );
}

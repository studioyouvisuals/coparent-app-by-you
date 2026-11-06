import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AppLayout, type Section } from "@/components/app-layout";
import { Button, Field, inputCls } from "@/components/shell";
import { formatDate, formatMoney, formatMonth, useI18n } from "@/i18n";
import { custodyParent, demoChildren, demoEvents, initialStatus, parents, toIso, type EventType, type FamilyEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tableau-de-bord")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — CoParent" },
      { name: "description", content: "Calendrier de garde, vacances, achats et rendez-vous scolaires de votre famille." },
      { property: "og:title", content: "Tableau de bord — CoParent" },
      { property: "og:description", content: "Le planning partagé de votre famille en un coup d'œil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const parentBg = (id: string) => (id === "p1" ? "bg-parent-a/25" : "bg-parent-b/20");
const parentDot = (id: string) => (id === "p1" ? "bg-parent-a" : "bg-parent-b");
const parentName = (id: string) => parents.find((p) => p.id === id)?.name ?? "";

function Dashboard() {
  const { t, lang } = useI18n();
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date | null>(null);
  const [events, setEvents] = useState<FamilyEvent[]>([]);
  const [section, setSection] = useState<Section>("calendar");
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0);
    setToday(d); setMonth(new Date(d.getFullYear(), d.getMonth(), 1)); setEvents(demoEvents(d));
  }, []);

  const upcoming = useMemo(() => {
    if (!today) return [];
    const iso = toIso(today);
    return events.filter((e) => e.date >= iso && (section === "calendar" || e.type === section)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
  }, [events, today, section]);

  if (!today || !month) return <AppLayout active={section} onSection={setSection}><div /></AppLayout>;

  const first = (month.getDay() + 6) % 7;
  const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: daysIn }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const week = custodyParent(today);

  return (
    <AppLayout active={section} onSection={setSection}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">{t.dashboard.thisWeek} <span className="ml-1 inline-flex items-center gap-2 font-semibold text-foreground"><span className={cn("h-2.5 w-2.5 rounded-full", parentDot(week))} />{parentName(week)}</span></p>
          <Button onClick={() => setModal(true)}><Plus className="h-4 w-4" />{t.dashboard.add}</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-2xl border bg-card p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold capitalize">{formatMonth(month, lang)}</h1>
              <div className="flex gap-1">
                <button type="button" aria-label={t.dashboard.prev} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-lg p-2 hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
                <button type="button" aria-label={t.dashboard.next} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-lg p-2 hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">{t.weekdays.map((w) => <div key={w} className="py-1">{w}</div>)}</div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {cells.map((d, i) => {
                if (!d) return <div key={`x${i}`} />;
                const iso = toIso(d);
                const dayEvents = events.filter((e) => e.date === iso);
                return (
                  <div key={iso} className={cn("flex aspect-square flex-col rounded-lg p-1 text-xs sm:p-1.5 sm:text-sm", parentBg(custodyParent(d)), iso === toIso(today) && "ring-2 ring-primary")}>
                    <span className="font-medium">{d.getDate()}</span>
                    <div className="mt-auto flex flex-wrap gap-0.5">{dayEvents.map((e) => <span key={e.id} title={e.title} className="h-1.5 w-1.5 rounded-full bg-foreground" />)}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {parents.map((p) => <span key={p.id} className="flex items-center gap-2"><span className={cn("h-3 w-3 rounded", parentDot(p.id))} />{p.name}</span>)}
            </div>
          </section>

          <aside className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{t.dashboard.upcoming}</h2>
              {section !== "calendar" && <button type="button" onClick={() => setSection("calendar")} className="text-xs text-primary">{t.dashboard.all}</button>}
            </div>
            {section !== "calendar" && <p className="mt-1 text-xs text-muted-foreground">{t.dashboard.filtered} {t.types[section]}</p>}
            <ul className="mt-4 space-y-3">
              {upcoming.length === 0 && <li className="text-sm text-muted-foreground">{t.dashboard.noEvents}</li>}
              {upcoming.map((e) => (
                <li key={e.id} className="rounded-xl border bg-secondary/40 p-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(new Date(e.date + "T00:00:00"), lang)} · {t.types[e.type]}</span>
                    <span className={cn("rounded-full px-2 py-0.5", e.status === "propose" ? "bg-primary/20 text-primary" : "bg-success/15 text-success")}>{t.status[e.status]}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium">{e.title}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={cn("h-2 w-2 rounded-full", parentDot(e.parentId))} />{demoChildren.find((c) => c.id === e.childId)?.firstName}
                    {e.amount != null && <span className="ml-auto font-medium text-foreground">{formatMoney(e.amount, lang)}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {modal && <AddModal defaultDate={toIso(today)} onClose={() => setModal(false)} onSave={(e) => {
        setEvents((prev) => [...prev, e]); setModal(false);
        setToast(e.status === "valide" ? t.modal.savedValidated : t.modal.savedProposed);
        setTimeout(() => setToast(""), 3500);
      }} />}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border bg-popover px-4 py-3 text-sm shadow-glow">{toast}</div>}
    </AppLayout>
  );
}

function AddModal({ defaultDate, onClose, onSave }: { defaultDate: string; onClose: () => void; onSave: (e: FamilyEvent) => void }) {
  const { t } = useI18n();
  const [type, setType] = useState<EventType>("achat");
  const [date, setDate] = useState(defaultDate);
  const [childId, setChildId] = useState(demoChildren[0]!.id);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ date?: string; title?: string; amount?: string }>({});
  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const errs: { date?: string; title?: string; amount?: string } = {};
    if (!date) errs.date = t.modal.dateRequired;
    if (!title.trim()) errs.title = t.modal.descRequired;
    const amt = amount.trim() ? Number(amount.replace(",", ".")) : undefined;
    if (amt !== undefined && (isNaN(amt) || amt < 0)) errs.amount = t.modal.amountInvalid;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave({ id: crypto.randomUUID(), type, date, childId, title: title.trim().slice(0, 200), ...(amt !== undefined ? { amount: amt } : {}), parentId: "p1", status: initialStatus(type) });
  };
  const types: EventType[] = ["garde", "vacances", "achat", "besoin", "reunion_scolaire"];
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <form role="dialog" aria-label={t.modal.title} onSubmit={submit} onClick={(e) => e.stopPropagation()} noValidate className="w-full max-w-md space-y-4 rounded-t-2xl border bg-card p-6 sm:rounded-2xl">
        <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">{t.modal.title}</h2><button type="button" onClick={onClose} aria-label={t.modal.cancel}><X className="h-5 w-5 text-muted-foreground" /></button></div>
        <Field label={t.modal.type}><select value={type} onChange={(e) => setType(e.target.value as EventType)} className={inputCls}>{types.map((ty) => <option key={ty} value={ty}>{t.types[ty]}</option>)}</select></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.modal.date} error={errors.date}><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} /></Field>
          <Field label={t.modal.child}><select value={childId} onChange={(e) => setChildId(e.target.value)} className={inputCls}>{demoChildren.map((c) => <option key={c.id} value={c.id}>{c.firstName}</option>)}</select></Field>
        </div>
        <Field label={t.modal.description} error={errors.title}><input value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} className={inputCls} /></Field>
        <Field label={t.modal.amount} error={errors.amount}><input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputCls} /></Field>
        <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="ghost" onClick={onClose}>{t.modal.cancel}</Button><Button type="submit">{t.modal.save}</Button></div>
      </form>
    </div>
  );
}

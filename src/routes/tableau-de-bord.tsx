import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Clock, MapPin, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AppLayout, type Section } from "@/components/app-layout";
import { Button, Field, inputCls } from "@/components/shell";
import { eventTitle, formatDate, formatMoney, formatMonth, useDocTitle, useI18n } from "@/i18n";
import {
  activityKinds,
  canDecide,
  custodyParent,
  demoChildren,
  demoEvents,
  eventTypes,
  initialStatus,
  parents,
  toIso,
  type ActivityKind,
  type EventStatus,
  type EventType,
  type FamilyEvent,
} from "@/lib/events";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tableau-de-bord")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — CoParent" },
      {
        name: "description",
        content:
          "Calendrier de garde, vacances, achats, activités et rendez-vous scolaires de votre famille.",
      },
      { property: "og:title", content: "Tableau de bord — CoParent" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const parentBg = (id: string) => (id === "p1" ? "bg-parent-a/25" : "bg-parent-b/20");
const parentDot = (id: string) => (id === "p1" ? "bg-parent-a" : "bg-parent-b");
const parentName = (id: string) => parents.find((p) => p.id === id)?.name ?? "";
const statusCls: Record<EventStatus, string> = {
  propose: "bg-primary/20 text-primary",
  valide: "bg-success/15 text-success",
  fait: "bg-success/15 text-success",
  refuse: "bg-destructive/15 text-destructive",
};

function Dashboard() {
  const { t, lang } = useI18n();
  useDocTitle(t.meta.dashboard);
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date | null>(null);
  const [events, setEvents] = useState<FamilyEvent[]>([]);
  const [section, setSection] = useState<Section>("calendar");
  const [me, setMe] = useState<string>("p1"); // demo: switch parent to test approvals
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setToday(d);
    setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    setEvents(demoEvents(d));
  }, []);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 3500);
  };
  const decide = (id: string, status: EventStatus) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    flash(status === "valide" ? t.dashboard.approved : t.dashboard.declined);
  };

  const upcoming = useMemo(() => {
    if (!today) return [];
    const iso = toIso(today);
    return events
      .filter((e) => e.date >= iso && (section === "calendar" || e.type === section))
      .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? ""))
      .slice(0, 6);
  }, [events, today, section]);

  if (!today || !month)
    return (
      <AppLayout active={section} onSection={setSection}>
        <div />
      </AppLayout>
    );

  const first = (month.getDay() + 6) % 7;
  const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(first).fill(null),
    ...Array.from(
      { length: daysIn },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
    ),
  ];
  const week = custodyParent(today);

  return (
    <AppLayout active={section} onSection={setSection}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            {t.dashboard.thisWeek}{" "}
            <span className="ml-1 inline-flex items-center gap-2 font-semibold text-foreground">
              <span className={cn("h-2.5 w-2.5 rounded-full", parentDot(week))} />
              {parentName(week)}
            </span>
          </p>
          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label={t.dashboard.viewAs}
              className="inline-flex items-center gap-1 rounded-full border bg-secondary p-0.5 text-xs font-medium"
            >
              <span className="px-2 text-muted-foreground">{t.dashboard.viewAs}</span>
              {parents.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={me === p.id}
                  onClick={() => setMe(p.id)}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    me === p.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <Button onClick={() => setModal(true)}>
              <Plus className="h-4 w-4" />
              {t.dashboard.add}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="rounded-2xl border bg-card p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold capitalize">{formatMonth(month, lang)}</h1>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label={t.dashboard.prev}
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                  className="rounded-lg p-2 hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={t.dashboard.next}
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                  className="rounded-lg p-2 hover:bg-secondary"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
              {t.weekdays.map((w) => (
                <div key={w} className="py-1">
                  {w}
                </div>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {cells.map((d, i) => {
                if (!d) return <div key={`x${i}`} />;
                const iso = toIso(d);
                const dayEvents = events.filter((e) => e.date === iso && e.status !== "refuse");
                return (
                  <div
                    key={iso}
                    className={cn(
                      "flex aspect-square flex-col rounded-lg p-1 text-xs sm:p-1.5 sm:text-sm",
                      parentBg(custodyParent(d)),
                      iso === toIso(today) && "ring-2 ring-primary",
                    )}
                  >
                    <span className="font-medium">{d.getDate()}</span>
                    <div className="mt-auto flex flex-wrap gap-0.5">
                      {dayEvents.map((e) => (
                        <span
                          key={e.id}
                          title={eventTitle(e, t)}
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            e.type === "activite" ? "bg-success" : "bg-foreground",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {parents.map((p) => (
                <span key={p.id} className="flex items-center gap-2">
                  <span className={cn("h-3 w-3 rounded", parentDot(p.id))} />
                  {p.name}
                </span>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{t.dashboard.upcoming}</h2>
              {section !== "calendar" && (
                <button
                  type="button"
                  onClick={() => setSection("calendar")}
                  className="text-xs text-primary"
                >
                  {t.dashboard.all}
                </button>
              )}
            </div>
            {section !== "calendar" && (
              <p className="mt-1 text-xs text-muted-foreground">
                {t.dashboard.filtered} {t.types[section]}
              </p>
            )}
            <ul className="mt-4 space-y-3">
              {upcoming.length === 0 && (
                <li className="text-sm text-muted-foreground">{t.dashboard.noEvents}</li>
              )}
              {upcoming.map((e) => (
                <li
                  key={e.id}
                  className={cn(
                    "rounded-xl border bg-secondary/40 p-3",
                    e.status === "refuse" && "opacity-60",
                  )}
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {formatDate(new Date(e.date + "T00:00:00"), lang)} ·{" "}
                      {e.kind ? t.kinds[e.kind] : t.types[e.type]}
                    </span>
                    <span className={cn("rounded-full px-2 py-0.5", statusCls[e.status])}>
                      {t.status[e.status]}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-sm font-medium",
                      e.status === "refuse" && "line-through",
                    )}
                  >
                    {eventTitle(e, t)}
                  </p>
                  {(e.time || e.place) && (
                    <p className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {e.time && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {e.time}
                        </span>
                      )}
                      {e.place && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {e.place}
                        </span>
                      )}
                    </p>
                  )}
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={cn("h-2 w-2 rounded-full", parentDot(e.parentId))} />
                    {demoChildren.find((c) => c.id === e.childId)?.firstName} {t.dashboard.with}{" "}
                    {parentName(e.parentId)}
                    {e.amount != null && (
                      <span className="ml-auto font-medium text-foreground">
                        {formatMoney(e.amount, lang)}
                      </span>
                    )}
                  </p>
                  {canDecide(e, me) && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => decide(e.id, "valide")}
                        className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110"
                      >
                        <Check className="h-3.5 w-3.5" />
                        {t.dashboard.approve}
                      </button>
                      <button
                        type="button"
                        onClick={() => decide(e.id, "refuse")}
                        className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                        {t.dashboard.decline}
                      </button>
                    </div>
                  )}
                  {e.status === "propose" && e.createdBy === me && (
                    <p className="mt-2 text-xs italic text-muted-foreground">
                      {t.dashboard.waiting}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {modal && (
        <AddModal
          me={me}
          defaultDate={toIso(today)}
          onClose={() => setModal(false)}
          onSave={(e) => {
            setEvents((prev) => [...prev, e]);
            setModal(false);
            flash(e.status === "valide" ? t.modal.savedValidated : t.modal.savedProposed);
          }}
        />
      )}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border bg-popover px-4 py-3 text-sm shadow-glow"
        >
          {toast}
        </div>
      )}
    </AppLayout>
  );
}

function AddModal({
  me,
  defaultDate,
  onClose,
  onSave,
}: {
  me: string;
  defaultDate: string;
  onClose: () => void;
  onSave: (e: FamilyEvent) => void;
}) {
  const { t } = useI18n();
  const [type, setType] = useState<EventType>("activite");
  const [kind, setKind] = useState<ActivityKind>("sport");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [childId, setChildId] = useState(demoChildren[0]!.id);
  const [parentId, setParentId] = useState(me);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ date?: string; title?: string; amount?: string }>({});
  const isActivity = type === "activite";
  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const errs: { date?: string; title?: string; amount?: string } = {};
    if (!date) errs.date = t.modal.dateRequired;
    if (!title.trim()) errs.title = t.modal.descRequired;
    const amt = amount.trim() ? Number(amount.replace(",", ".")) : undefined;
    if (amt !== undefined && (isNaN(amt) || amt < 0)) errs.amount = t.modal.amountInvalid;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave({
      id: crypto.randomUUID(),
      type,
      date,
      childId,
      parentId,
      createdBy: me,
      title: title.trim().slice(0, 200),
      status: initialStatus(type),
      ...(amt !== undefined ? { amount: amt } : {}),
      ...(time ? { time } : {}),
      ...(place.trim() ? { place: place.trim().slice(0, 120) } : {}),
      ...(isActivity ? { kind } : {}),
    });
  };
  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-label={t.modal.title}
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        noValidate
        className="max-h-[92vh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-2xl border bg-card p-6 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.modal.title}</h2>
          <button type="button" onClick={onClose} aria-label={t.modal.cancel}>
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.modal.type}>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as EventType)}
              className={inputCls}
            >
              {eventTypes.map((ty) => (
                <option key={ty} value={ty}>
                  {t.types[ty]}
                </option>
              ))}
            </select>
          </Field>
          {isActivity && (
            <Field label={t.modal.kind}>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as ActivityKind)}
                className={inputCls}
              >
                {activityKinds.map((k) => (
                  <option key={k} value={k}>
                    {t.kinds[k]}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>
        <Field label={t.modal.description} error={errors.title}>
          <input
            value={title}
            maxLength={200}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCls}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.modal.date} error={errors.date}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label={t.modal.time}>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
        {(isActivity || type === "reunion_scolaire") && (
          <Field label={t.modal.place}>
            <input
              value={place}
              maxLength={120}
              onChange={(e) => setPlace(e.target.value)}
              className={inputCls}
            />
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.modal.child}>
            <select
              value={childId}
              onChange={(e) => setChildId(e.target.value)}
              className={inputCls}
            >
              {demoChildren.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t.modal.parent}>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className={inputCls}
            >
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label={t.modal.amount} error={errors.amount}>
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputCls}
          />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t.modal.cancel}
          </Button>
          <Button type="submit">{t.modal.save}</Button>
        </div>
      </form>
    </div>
  );
}

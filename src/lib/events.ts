export type EventType = "garde" | "vacances" | "achat" | "besoin" | "reunion_scolaire" | "activite";
export type EventStatus = "propose" | "valide" | "refuse" | "fait";
export type ActivityKind = "sport" | "spectacle" | "sortie" | "anniversaire";
export type DemoKey = "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8";

export const eventTypes: EventType[] = [
  "garde",
  "vacances",
  "achat",
  "besoin",
  "reunion_scolaire",
  "activite",
];
export const activityKinds: ActivityKind[] = ["sport", "spectacle", "sortie", "anniversaire"];

export type FamilyEvent = {
  id: string;
  type: EventType;
  /** Free text typed by a parent. Demo events use `demoKey` instead so they can be translated. */
  title: string;
  demoKey?: DemoKey;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  place?: string;
  kind?: ActivityKind;
  childId: string;
  /** Parent in charge (accompanies the child, pays, attends). */
  parentId: string;
  /** Parent who created the event: only the other parent can approve or decline it. */
  createdBy: string;
  amount?: number;
  status: EventStatus;
};

/** An event created by one parent stays "proposed" until the other approves — except custody. */
export function initialStatus(type: EventType): EventStatus {
  return type === "garde" ? "valide" : "propose";
}

/** Only the parent who did NOT create a proposed event can approve or decline it. */
export function canDecide(e: FamilyEvent, userId: string): boolean {
  return e.status === "propose" && e.createdBy !== userId;
}

export const parents = [
  { id: "p1", name: "Camille", color: "parent-a" },
  { id: "p2", name: "Thomas", color: "parent-b" },
] as const;

export const demoChildren = [
  { id: "c1", firstName: "Léa", birthDate: "2016-04-12" },
  { id: "c2", firstName: "Hugo", birthDate: "2019-09-03" },
];

/** Alternating weeks: ISO week parity decides the custody parent. */
export function custodyParent(d: Date): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return week % 2 === 0 ? "p1" : "p2";
}

export const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function demoEvents(today: Date): FamilyEvent[] {
  const at = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return toIso(d);
  };
  return [
    {
      id: "e1",
      demoKey: "e1",
      title: "",
      type: "reunion_scolaire",
      date: at(2),
      time: "18:00",
      childId: "c1",
      parentId: "p1",
      createdBy: "p1",
      status: "valide",
    },
    {
      id: "e2",
      demoKey: "e2",
      title: "",
      type: "achat",
      date: at(4),
      childId: "c2",
      parentId: "p2",
      createdBy: "p2",
      amount: 24.5,
      status: "propose",
    },
    {
      id: "e3",
      demoKey: "e3",
      title: "",
      type: "besoin",
      date: at(7),
      childId: "c2",
      parentId: "p1",
      createdBy: "p1",
      amount: 49.9,
      status: "propose",
    },
    {
      id: "e4",
      demoKey: "e4",
      title: "",
      type: "vacances",
      date: at(15),
      childId: "c1",
      parentId: "p2",
      createdBy: "p2",
      status: "propose",
    },
    {
      id: "e5",
      demoKey: "e5",
      title: "",
      type: "activite",
      kind: "spectacle",
      date: at(21),
      time: "19:30",
      childId: "c2",
      parentId: "p1",
      createdBy: "p1",
      status: "valide",
    },
    {
      id: "e6",
      demoKey: "e6",
      title: "",
      type: "activite",
      kind: "sport",
      date: at(28),
      childId: "c1",
      parentId: "p2",
      createdBy: "p2",
      amount: 120,
      status: "fait",
    },
    {
      id: "e7",
      demoKey: "e7",
      title: "",
      type: "activite",
      kind: "sport",
      date: at(3),
      time: "10:00",
      childId: "c2",
      parentId: "p2",
      createdBy: "p2",
      status: "propose",
    },
    {
      id: "e8",
      demoKey: "e8",
      title: "",
      type: "activite",
      kind: "anniversaire",
      date: at(10),
      time: "14:30",
      childId: "c1",
      parentId: "p1",
      createdBy: "p2",
      amount: 20,
      status: "propose",
    },
  ];
}

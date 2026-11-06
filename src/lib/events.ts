export type EventType = "garde" | "vacances" | "achat" | "besoin" | "reunion_scolaire";
export type EventStatus = "propose" | "valide" | "refuse" | "fait";

export type FamilyEvent = {
  id: string;
  type: EventType;
  title: string;
  date: string; // YYYY-MM-DD
  childId: string;
  parentId: string;
  amount?: number;
  status: EventStatus;
};

/** An event created by one parent stays "proposed" until the other approves — except custody. */
export function initialStatus(type: EventType): EventStatus {
  return type === "garde" ? "valide" : "propose";
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
  const at = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return toIso(d); };
  return [
    { id: "e1", type: "reunion_scolaire", title: "Réunion parents-professeurs", date: at(2), childId: "c1", parentId: "p1", status: "valide" },
    { id: "e2", type: "achat", title: "Fournitures de dessin", date: at(4), childId: "c2", parentId: "p2", amount: 24.5, status: "propose" },
    { id: "e3", type: "besoin", title: "Chaussures d'hiver", date: at(7), childId: "c2", parentId: "p1", amount: 49.9, status: "propose" },
    { id: "e4", type: "vacances", title: "Séjour chez les grands-parents", date: at(15), childId: "c1", parentId: "p2", status: "valide" },
    { id: "e5", type: "reunion_scolaire", title: "Spectacle de fin de trimestre", date: at(21), childId: "c2", parentId: "p1", status: "valide" },
    { id: "e6", type: "achat", title: "Cours de natation", date: at(28), childId: "c1", parentId: "p2", amount: 120, status: "fait" },
  ];
}

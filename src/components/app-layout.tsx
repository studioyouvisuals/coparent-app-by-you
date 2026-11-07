"use client";

import Link from "next/link";
import {
  CalendarDays,
  HeartHandshake,
  Plane,
  School,
  Settings,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import type { ReactNode } from "react";
import { LangSwitch, Logo } from "@/components/shell";
import { useI18n } from "@/i18n";
import type { EventType } from "@/lib/events";
import { cn } from "@/lib/utils";

export type Section = "calendar" | EventType;

export function AppLayout({
  children,
  active,
  onSection,
}: {
  children: ReactNode;
  active: Section | "settings";
  onSection?: (s: Section) => void;
}) {
  const { t } = useI18n();
  const items: { key: Section; label: string; Icon: typeof CalendarDays }[] = [
    { key: "calendar", label: t.sidebar.calendar, Icon: CalendarDays },
    { key: "vacances", label: t.sidebar.holidays, Icon: Plane },
    { key: "achat", label: t.sidebar.purchases, Icon: ShoppingBag },
    { key: "besoin", label: t.sidebar.needs, Icon: HeartHandshake },
    { key: "reunion_scolaire", label: t.sidebar.school, Icon: School },
    { key: "activite", label: t.sidebar.activities, Icon: Trophy },
  ];
  const itemCls = (on: boolean) =>
    cn(
      "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
      on
        ? "bg-accent text-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
    );
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between p-4 md:p-5">
          <Logo />
          <LangSwitch className="md:hidden" />
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {items.map(({ key, label, Icon }) =>
            onSection ? (
              <button
                key={key}
                type="button"
                onClick={() => onSection(key)}
                className={itemCls(active === key)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ) : (
              <Link key={key} href="/tableau-de-bord" className={itemCls(false)}>
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ),
          )}
          <Link href="/parametres" className={itemCls(active === "settings")}>
            <Settings className="h-4 w-4" />
            {t.sidebar.settings}
          </Link>
        </nav>
        <div className="hidden p-5 md:absolute md:bottom-0 md:block">
          <LangSwitch />
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}

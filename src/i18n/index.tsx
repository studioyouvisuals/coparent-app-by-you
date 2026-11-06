import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fr, type Dict } from "./fr";
import { en } from "./en";

export type Lang = "fr" | "en";
const dicts: Record<Lang, Dict> = { fr, en };
const KEY = "coparent.lang";

export function detectLang(stored: string | null, browser: string | undefined): Lang {
  if (stored === "fr" || stored === "en") return stored;
  if (browser?.toLowerCase().startsWith("en")) return "en";
  return "fr";
}

export function formatDate(d: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
}
export function formatMoney(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", { style: "currency", currency: "EUR" }).format(n);
}
export function formatMonth(d: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", { month: "long", year: "numeric" }).format(d);
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const I18nContext = createContext<Ctx>({ lang: "fr", t: fr, setLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    setLangState(detectLang(localStorage.getItem(KEY), navigator.language));
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    localStorage.setItem(KEY, l);
    setLangState(l);
  };
  return <I18nContext.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useI18n, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";

export function Logo() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
        <span className="flex gap-0.5"><span className="h-3 w-1 rounded-full bg-primary-foreground" /><span className="h-3 w-1 rounded-full bg-primary-foreground/60" /></span>
      </span>
      {t.brand}
    </Link>
  );
}

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.lang.switch} className={cn("inline-flex rounded-full border bg-secondary p-0.5 text-xs font-medium", className)}>
      {(["fr", "en"] as Lang[]).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
          className={cn("rounded-full px-3 py-1 uppercase transition-colors", lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
          {l}
        </button>
      ))}
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" };
export const btn = (variant: BtnProps["variant"] = "primary") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all disabled:opacity-50",
    variant === "primary" && "bg-primary text-primary-foreground shadow-glow hover:brightness-110",
    variant === "outline" && "border bg-secondary/40 text-foreground hover:bg-secondary",
    variant === "ghost" && "text-muted-foreground hover:text-foreground",
  );
export function Button({ variant, className, ...p }: BtnProps) {
  return <button className={cn(btn(variant), className)} {...p} />;
}

export const inputCls = "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function Field({ label, children, error }: { label: string; children: ReactNode; error?: string | undefined }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive">{error}</span>}
    </label>
  );
}

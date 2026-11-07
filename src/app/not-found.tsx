"use client";

import Link from "next/link";
import { btn } from "@/components/shell";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-semibold tracking-tight">404</h1>
        <h2 className="mt-4 text-xl font-semibold">{t.errors.notFound}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.errors.notFoundText}</p>
        <Link href="/" className={`${btn()} mt-6`}>
          {t.errors.home}
        </Link>
      </div>
    </div>
  );
}

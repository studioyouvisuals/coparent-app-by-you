import type { Metadata } from "next";
import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoParent — La garde partagée. Enfin simple.",
  description: "Gardes, vacances, achats, activités et école. Un calendrier pour deux parents.",
  openGraph: {
    title: "CoParent — La garde partagée. Enfin simple.",
    description: "Un calendrier. Deux parents. Zéro oubli.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

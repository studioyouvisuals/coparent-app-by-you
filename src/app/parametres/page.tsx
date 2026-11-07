import type { Metadata } from "next";
import { SettingsPage } from "@/views/settings";

export const metadata: Metadata = { title: "Paramètres — CoParent" };

export default function Page() {
  return <SettingsPage />;
}

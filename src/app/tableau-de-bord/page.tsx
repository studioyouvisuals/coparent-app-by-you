import type { Metadata } from "next";
import { Dashboard } from "@/views/dashboard";

export const metadata: Metadata = { title: "Tableau de bord — CoParent" };

export default function Page() {
  return <Dashboard />;
}

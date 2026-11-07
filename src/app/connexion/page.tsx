import type { Metadata } from "next";
import { Login } from "@/views/login";

export const metadata: Metadata = { title: "Connexion — CoParent" };

export default function Page() {
  return <Login />;
}

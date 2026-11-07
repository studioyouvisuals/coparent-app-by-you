import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Server client bound to the request cookies, or null in demo mode. */
export async function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  const store = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value, options }) => store.set(name, value, options));
      },
    },
  });
}

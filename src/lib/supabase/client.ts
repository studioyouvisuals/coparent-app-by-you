import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Browser client, or null in demo mode (no Supabase keys configured). */
export const supabaseBrowser = () => (url && anonKey ? createBrowserClient(url, anonKey) : null);

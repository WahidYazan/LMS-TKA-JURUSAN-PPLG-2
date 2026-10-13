import { supabase } from "./supabase";

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi");
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSessionOnce() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(
  cb: (signedIn: boolean, email: string | null) => void,
) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(!!session, session?.user?.email ?? null);
  });
  return () => data.subscription.unsubscribe();
}

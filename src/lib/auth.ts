import { supabase } from "./supabase";

type AuthUser = {
  user_metadata?: Record<string, unknown>;
} | null | undefined;

export function getDisplayName(user: AuthUser): string | null {
  const metadata = user?.user_metadata;
  for (const key of ["full_name", "name", "display_name"]) {
    const value = metadata?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

export function isAuthSessionMissingError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const authError = error as { name?: unknown; message?: unknown };
  return (
    authError.name === "AuthSessionMissingError" ||
    (typeof authError.message === "string" &&
      authError.message.toLowerCase().includes("auth session missing"))
  );
}

function createMissingSessionError() {
  const error = new Error("Auth session missing!");
  error.name = "AuthSessionMissingError";
  return error;
}

export async function updateAdminDisplayName(name: string): Promise<string> {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi");
  const normalizedName = name.trim();
  if (!normalizedName) throw new Error("Nama wajib diisi.");

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!sessionData.session) throw createMissingSessionError();

  const { data, error } = await supabase.auth.updateUser({
    data: { full_name: normalizedName },
  });
  if (error) throw error;
  return getDisplayName(data.user) ?? normalizedName;
}

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
  cb: (signedIn: boolean, name: string | null) => void,
) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(!!session, getDisplayName(session?.user));
  });
  return () => data.subscription.unsubscribe();
}

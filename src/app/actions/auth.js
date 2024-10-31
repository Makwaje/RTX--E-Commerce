"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(email, password) {
  const supabase = await createClient();
  const res = await supabase.auth.signUp({
    email,
    password,
  });

  return res;
}

export async function login(email, password) {
  const supabase = await createClient();
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return res;
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect("/");
  }
}

export async function updatePassword(password) {
  const supabase = await createClient();
  const res = supabase.auth.updateUser({ password });

  return res;
}

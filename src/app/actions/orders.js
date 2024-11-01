"use server";

import { createClient } from "@/lib/supabase/server";

export async function getOrders() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const res = await supabase.from("orders").select("*").eq("user_id", user.id);

  return res;
}

export async function cancelOrder(id) {
  const supabase = await createClient();
  const res = await supabase.from("orders").delete().eq("id", id);

  const data = await getOrders();

  return data;
}

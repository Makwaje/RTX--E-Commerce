"use server";

import { createClient } from "@/lib/supabase/server";

export async function getOrderDetails(id) {
  const supabase = await createClient();
  const { data: order_items, error } = await supabase
    .from("order_items")
    .select("*, order_id (address, name), product_id (name, price) ")
    .eq("order_id", id);

  if (error) console.error(error);
  else {
    return order_items;
  }
}

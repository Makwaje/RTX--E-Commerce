"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getUserCart() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("carts")
    .select(`*, products (name, price, photos)`)
    .eq("user_id", user.id);

  if (error) console.error(error);
  else {
    return data;
  }
}

export async function deleteCartItem(id) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("carts").delete().match({ id });

  if (error) console.error(error);
  else {
    return data;
  }
}

export async function checkout(name, address, total) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("orders")
    .insert([{ user_id: user.id, name, address, total_price: total }])
    .select();

  if (error) console.error(error);
  else {
    redirect(`/checkout/${data?.at(0)?.id}`);
  }
}

export async function addToCart(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from("carts")
    .insert([{ user_id: user.id, product_id: id }]);

  if (error) console.error(error);
  else {
    redirect(`/cart`);
  }
}

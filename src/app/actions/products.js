"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getProduct(id) {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) console.error(error);
  else return products;
}

export async function search(searchTerm) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, photos, category_id(name)")
    .ilike("name", `%${decodeURIComponent(searchTerm)}%`);

  if (error) console.error(error);
  else return data;
}

export async function featuredProducts() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .range(0, 3);

  return products;
}

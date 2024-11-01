"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("name, id");

  if (error) console.error(error);
  else {
    return categories;
  }
}

export async function getCategory(name) {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("name, price, photos, id, category_id(name)")
    .eq("category_id.name", formatString(name))
    .not("category_id", "is", null);

  if (error) console.error(error);
  else {
    return products;
  }
}

function formatString(input) {
  // Decode URL encoding and split words
  const words = decodeURIComponent(input).split(" ");

  // Capitalize each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join words with a space
  return capitalizedWords.join(" ");
}

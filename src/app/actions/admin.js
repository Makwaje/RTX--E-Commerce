"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAllOrders() {
  const supabase = await createClient();
  const data = await supabase.from("orders").select("*");

  return data;
}

export async function approveOrder(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "Approved" })
    .eq("id", id);

  if (!error) {
    const orders = await supabase.from("orders").select("*");
    return orders;
  }
}

export async function cancelOrder(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "Canceled" })
    .eq("id", id);

  if (!error) {
    const orders = await supabase.from("orders").select("*");
    return orders;
  }
}

export async function deliveredOrder(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "Delivered" })
    .eq("id", id);

  if (!error) {
    const orders = await supabase.from("orders").select("*");
    return orders;
  }
}

export async function addProduct(formData) {
  const imageFile = formData.image[0];
  const { name, description, price, category } = formData;

  const supabase = await createClient();
  try {
    // Step 1: Upload the image to Supabase Storage
    const imageName = `${Date.now()}_${imageFile.name}`; // Create a unique filename
    const { data: imageData, error: uploadError } = await supabase.storage
      .from("products-images") // Specify the storage bucket name
      .upload(imageName, imageFile);

    if (uploadError) throw uploadError;

    // Step 2: Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("products-images")
      .getPublicUrl(imageName);

    const imageUrl = publicUrlData.publicUrl;

    // Step 3: Insert the product data with the image URL into the database
    const { data, error: insertError } = await supabase
      .from("products")
      .insert([
        { name, description, price, category_id: category, photos: [imageUrl] },
      ])
      .select("*");

    if (insertError) throw insertError;

    console.log("Data submitted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

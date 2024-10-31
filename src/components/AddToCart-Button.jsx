"use client";
import { addToCart } from "@/app/actions/cart";
import { Button } from "./ui/button";

function AddToCartButton({ id }) {
  return (
    <Button className="flex-1" onClick={() => addToCart(id)}>
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;

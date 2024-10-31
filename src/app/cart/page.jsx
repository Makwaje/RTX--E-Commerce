"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { checkout, deleteCartItem, getUserCart } from "../actions/cart";
import { useForm } from "react-hook-form";
import { LoaderPinwheel } from "lucide-react";

export default function CartPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.products.price,
    0
  );

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  async function callApi() {
    setIsLoading(true);
    const data = await getUserCart();

    setCartItems(data);
    setIsLoading(false);
  }

  function handleDeleteItem(itemId) {
    deleteCartItem(itemId);
    callApi();
  }

  function handleCheckout(formData) {
    const address = `${formData.state}, ${formData.city}, ${formData.address}, ${formData.code}`;

    checkout(formData.name, address, total);
  }

  useEffect(function () {
    callApi();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center bg-white">
                  <LoaderPinwheel className="animate-spin" size={80} />
                </div>
              ) : (
                cartItems.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      data={item}
                      handleDeleteItem={handleDeleteItem}
                    />
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleCheckout)}
              >
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    required
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p role="alert" className="text-destructive text-sm">
                      This filed is required
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    required
                    {...register("address", {
                      required: true,
                    })}
                  />
                  {errors.address && (
                    <p role="alert" className="text-destructive text-sm">
                      This filed is required
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    required
                    {...register("city", { required: true })}
                  />
                  {errors.name && (
                    <p role="alert" className="text-destructive text-sm">
                      This filed is required
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      required
                      {...register("state", { required: true })}
                    />
                    {errors.state && (
                      <p role="alert" className="text-destructive text-sm">
                        This filed is required
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      required
                      {...register("code", { required: true })}
                    />
                    {errors.code && (
                      <p role="alert" className="text-destructive text-sm">
                        This filed is required
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full disabled:cursor-not-allowed"
                type="submit"
                onClick={handleSubmit(handleCheckout)}
                disabled={subtotal === 0}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CartItem({ data, handleDeleteItem }) {
  return (
    <div className="flex items-center space-x-4 py-4">
      <Image
        src={data?.products?.photos?.at(0)}
        alt={data?.products?.name}
        width={80}
        height={80}
        className="rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{data?.products?.name}</h3>
        <p className="text-muted-foreground">
          ${data?.products?.price?.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button variant="destructive" onClick={() => handleDeleteItem(data.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
}

import NotFoundPage from "@/app/404";
import { getOrderDetails } from "@/app/actions/confirm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function OrderConfirmationPage({ params }) {
  const { id: orderId } = await params;
  const data = await getOrderDetails(orderId);
  if (data.length === 0) return <NotFoundPage />;

  const shippingCost = 0;

  const subtotal = data.reduce((acc, item) => acc + item.product_id.price, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl">Order Confirmed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Order Number: {orderId}
            </h2>
            <p className="text-muted-foreground">
              Thank you for your order. We&apos;ll send you a confirmation email
              shortly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {data?.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <span>{item.product_id.name}</span>
                <span>${item.product_id.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between py-2">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{}</p>
            <p>{data?.at?.(0)?.order_id?.address}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

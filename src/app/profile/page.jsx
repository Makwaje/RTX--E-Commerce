"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Package, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { updatePassword } from "../actions/auth";
import { cancelOrder, getOrders } from "../actions/orders";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const [orders, setOrders] = useState([]);

  async function handleUpdatePassword(formData) {
    const { data, error } = await updatePassword(formData.password);

    if (data)
      toast({
        title: "Success!",
        description: "Password updated successfully",
        className: "bg-green-200",
      });
    reset();

    if (error) {
      toast({
        title: "Error!",
        description: error.message,
        className: "bg-red-300 text-red-900",
        variant: "destructive",
      });
    }
  }

  async function callApi() {
    const { data } = await getOrders();

    setOrders(data);
  }

  useEffect(function () {
    callApi();
    setIsLoading(false);
  }, []);

  async function handleCancelOrder(id) {
    const { data, error } = await cancelOrder(id);
    if (!error)
      toast({
        title: "Success!",
        description: "Order canceled successfully",
        className: "bg-green-200",
      });
    reset();

    if (error) {
      toast({
        title: "Error!",
        description: error.message,
        className: "bg-red-300 text-red-900",
        variant: "destructive",
      });
    }
    setOrders(data);
  }

  !isLoading && <p>waiting...</p>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your password here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleUpdatePassword)}>
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          {errors.password.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password", "") ||
                          "Passwords do not match",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {errors.confirmPassword.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                onClick={handleSubmit(handleUpdatePassword)}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-4">
                    <Package className="h-10 w-10 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Placed on{" "}
                        {order.created_at.slice(0, 10).replaceAll("-", "/")}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-medium">
                        ${order.total_price.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.status}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/checkout/${order.id}`)}
                    >
                      Order Details
                    </Button>
                    {order.status === "Pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

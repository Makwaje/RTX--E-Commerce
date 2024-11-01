"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Package } from "lucide-react";
import Link from "next/link";

import {
  approveOrder,
  deliveredOrder,
  getAllOrders,
  cancelOrder,
} from "@/app/actions/admin";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleApprove = async (orderId) => {
    setIsLoading(true);
    const { data, error } = await approveOrder(orderId);
    setOrders(data);
    setIsLoading(false);
  };

  const handleDecline = async (orderId) => {
    setIsLoading(true);
    const { data, error } = await cancelOrder(orderId);
    setOrders(data);
    setIsLoading(false);
  };

  const handleDelivered = async (orderId) => {
    setIsLoading(true);
    const { data, error } = await deliveredOrder(orderId);
    setOrders(data);
    setIsLoading(false);
  };

  async function callApi() {
    const { data, error } = await getAllOrders();

    console.log(data);
    setOrders(data);
    setIsLoading(false);
  }

  useEffect(function () {
    callApi();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Link
                      href={`/checkout/${order.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {order?.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order?.name}</TableCell>
                  <TableCell>${order?.total_price?.toFixed?.(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Approved"
                          ? "success"
                          : order.status === "canceled"
                          ? "destructive"
                          : order.status === "Delivered"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {order.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(order.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDecline(order.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      )}
                      {order.status === "Approved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelivered(order.id)}
                        >
                          <Package className="w-4 h-4 mr-1" />
                          Delivered
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoading && (
            <div className="flex items-center justify-center bg-white py-8">
              <LoaderPinwheel className="animate-spin" size={50} />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Total Orders: {orders.length} | Pending:{" "}
            {orders.filter((o) => o.status === "Pending").length} | Approved:{" "}
            {orders.filter((o) => o.status === "Approved").length} | Canceled:{" "}
            {orders.filter((o) => o.status === "Canceled").length} | Delivered:{" "}
            {orders.filter((o) => o.status === "Delivered").length}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;

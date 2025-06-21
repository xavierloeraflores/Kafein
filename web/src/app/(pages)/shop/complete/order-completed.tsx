"use client";

import { Package, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { type orderSchema } from "~/lib/schemas";
import { type z } from "zod";
import { inventory } from "~/lib/constants";
import { convertToAmPm } from "~/lib/convertTime";

export default function OrderCompletePage({
  order,
}: {
  order: z.infer<typeof orderSchema>;
}) {
  const orderTotal = Object.entries(order.selectedDrinks).reduce(
    (acc, [key, value]) => {
      const product = inventory[key as keyof typeof inventory];
      return acc + Number(product?.price) * value;
    },
    0,
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <OrderSummary order={order} />

          <OrderItemsList order={order} />
        </div>

        <OrderSidebar
          paymentMethod={order.paymentMethod}
          orderTotal={orderTotal}
        />
      </div>
    </div>
  );
}

function OrderSummary({ order }: { order: z.infer<typeof orderSchema> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Name:</span>
            <span className="font-medium">{order.fullName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Phone Number:</span>
            <span className="font-mono text-sm">{order.phoneNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Pickup Date:</span>
            <span>
              {order.pickupDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Pickup Time:</span>
            <span>{convertToAmPm(order.pickupTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Confirmed
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderItemsList({ order }: { order: z.infer<typeof orderSchema> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Items Ordered</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(order.selectedDrinks).map(([key, value], index) => {
            const product = inventory[key as keyof typeof inventory];
            if (!product) return null;
            if (index === 0) {
              return <OrderItem key={key} product={product} quantity={value} />;
            }
            return (
              <div key={key}>
                <Separator />
                <OrderItem product={product} quantity={value} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function OrderItem({
  product,
  quantity,
}: {
  product: (typeof inventory)[keyof typeof inventory];
  quantity: number;
}) {
  const price = product.price * quantity;
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={product.image}
        alt={product.title}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium">{product.title}</h3>
        <p className="text-sm text-gray-600">Qty: {quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">${price}</p>
      </div>
    </div>
  );
}

function OrderSidebar({
  paymentMethod,
  orderTotal,
}: {
  paymentMethod: string;
  orderTotal: number;
}) {
  return (
    <div className="space-y-6">
      {/* Order Total */}
      <Card>
        <CardHeader>
          <CardTitle>Order Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Separator />
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${orderTotal}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <DollarSign className="h-6 w-6" />
            <p className="text-lg font-semibold">
              {paymentMethod.charAt(0).toUpperCase() +
                paymentMethod.slice(1).toLowerCase()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-3">
        <Button className="w-full" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

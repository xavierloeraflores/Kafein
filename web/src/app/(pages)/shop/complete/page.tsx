import OrderComplete from "./order-completed";
import { type orderSchema } from "~/lib/schemas";
import { type z } from "zod";
import { Check, Mail, Package, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { inventory } from "~/lib/constants";

export default function OrderCompletePage({
  params,
}: {
  params: {
    fullName: string;
    phoneNumber: string;
    pickupDate: string;
    pickupTime: string;
    paymentMethod: string;
    allergies: string;
    instagramHandle: string;
  };
}) {
  const {
    fullName,
    phoneNumber,
    pickupDate,
    pickupTime,
    paymentMethod,
    allergies,
    instagramHandle,
  } = params;
  const itemsParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => key !== "items"),
  );
  const items =
    itemsParams?.items?.split(";").map((entry) => {
      const [id, quantity] = entry.split(":");
      return { id, quantity: Number(quantity) };
    }) ?? [];
  const validItems = items.filter((item) => {
    if (!item.id || !item.quantity) return false;
    const drink = inventory[item.id as keyof typeof inventory];
    return drink && item.quantity > 0;
  });
  const selectedDrinks = validItems.reduce(
    (acc, item) => {
      acc[item.id as keyof typeof inventory] = item.quantity;
      return acc;
    },
    {} as Record<string, number>,
  );

  const order: z.infer<typeof orderSchema> = {
    fullName,
    phoneNumber,
    pickupDate: new Date(pickupDate),
    pickupTime,
    paymentMethod,
    allergies,
    instagramHandle,
    selectedDrinks,
  };
  if (
    !order.fullName ||
    !order.phoneNumber ||
    !order.pickupDate ||
    !order.pickupTime ||
    !order.paymentMethod ||
    !order.allergies ||
    !order.instagramHandle ||
    !order.selectedDrinks
  ) {
    console.error("Invalid order", order);
    return (
      <main className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invalid order</h1>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <OrderCompleteHeader />
        <OrderComplete order={order} />
        <WhatHappensNext />
        <ContactSupport />
      </div>
    </div>
  );
}
function OrderCompleteHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Complete!</h1>
      <p className="text-lg text-gray-600">
        Thank you for your purchase. Your order has been confirmed and will be
        shipped soon.
      </p>
    </div>
  );
}

function WhatHappensNext() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>What happens next?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 font-medium">Order Confirmation</h3>
            <p className="text-sm text-gray-600">
              You&apos;ll receive an email confirmation with your order details
              shortly.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mb-2 font-medium">Order Processing</h3>
            <p className="text-sm text-gray-600">
              We&apos;ll prepare your items for shipment within 1-2 business
              days.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 font-medium">Shipping Updates</h3>
            <p className="text-sm text-gray-600">
              Track your package with the tracking number we&apos;ll send you.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactSupport() {
  return (
    <div className="mt-8 rounded-lg border bg-white p-6 text-center">
      <h3 className="mb-2 font-medium">Need help with your order?</h3>
      <p className="mb-4 text-sm text-gray-600">
        Our customer support team is here to help you with any questions.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="outline" size="sm" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}

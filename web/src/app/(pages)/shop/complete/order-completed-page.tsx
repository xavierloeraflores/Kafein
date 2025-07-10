"use client";

import OrderComplete from "./order-completed";
import { type orderSchema } from "~/lib/schemas";
import { type z } from "zod";
import { Check, MapPin, MessageCircle, ChefHat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function OrderCompletePage() {
  const params = useSearchParams();
  const fullName = params.get("fullName");
  const phoneNumber = params.get("phoneNumber");
  const pickupDate = params.get("pickupDate");
  const pickupTime = params.get("pickupTime");
  const paymentMethod = params.get("paymentMethod");
  const allergies = params.get("allergies");
  const instagramHandle = params.get("instagramHandle");
  const itemsParams = params.get("items");
  const email = params.get("email");

  let itemsJson: { id: string; quantity: number }[] = [];
  if (itemsParams) {
    itemsJson = JSON.parse(itemsParams) as { id: string; quantity: number }[];
  }

  const selectedDrinks = itemsJson.reduce(
    (acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (
    !fullName ||
    !phoneNumber ||
    !pickupDate ||
    !pickupTime ||
    !paymentMethod ||
    !email
  ) {
    console.error("Invalid order", {
      fullName,
      phoneNumber,
      pickupDate,
      pickupTime,
      paymentMethod,
      allergies: allergies ?? "",
      instagramHandle: instagramHandle ?? "",
      email,
    });
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <main className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Invalid order</h1>
          </div>
        </main>
      </Suspense>
    );
  }

  const order: z.infer<typeof orderSchema> = {
    fullName,
    phoneNumber,
    pickupDate: new Date(pickupDate),
    pickupTime,
    paymentMethod,
    allergies: allergies ?? "",
    instagramHandle: instagramHandle ?? "",
    selectedDrinks,
    email,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <OrderCompleteHeader />
          <OrderComplete order={order} />
          <WhatHappensNext />
          <ContactSupport />
        </div>
      </div>
    </Suspense>
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
        Thank you for your purchase. Your order has been received, we will reach
        out to you to confirm soon!
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
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 font-medium">Order Confirmation</h3>
            <p className="text-sm text-gray-600">
              You&apos;ll receive a text message with your order details
              shortly.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <ChefHat className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mb-2 font-medium">Order Preparation</h3>
            <p className="text-sm text-gray-600">
              We&apos;ll prepare your order at your requested time.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 font-medium">Pickup Order</h3>
            <p className="text-sm text-gray-600">
              Pick up your order and enjoy!
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

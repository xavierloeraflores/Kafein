/* eslint-disable react/no-children-prop */
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { api } from "~/trpc/react";
import { orderSchema } from "~/lib/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { type z } from "zod";
import { products } from "~/lib/constants";
import { DrinkCard } from "./drink-card";
import { getDrinkPrice, getOrderDrinkName } from "~/lib/convertdrinkId";

function generateOrderUrl(order: z.infer<typeof orderSchema>) {
  const url = new URL("/shop/complete", window.location.origin);
  url.searchParams.set("fullName", order.fullName);
  url.searchParams.set("email", order.email);
  url.searchParams.set("phoneNumber", order.phoneNumber);
  url.searchParams.set("pickupDate", order.pickupDate.toISOString());
  url.searchParams.set("pickupTime", order.pickupTime);
  url.searchParams.set("paymentMethod", order.paymentMethod);
  url.searchParams.set("allergies", order.allergies);
  url.searchParams.set("instagramHandle", order.instagramHandle);
  const items = Object.entries(order.selectedDrinks).map(([id, quantity]) => ({
    id,
    quantity,
  }));
  url.searchParams.set("items", JSON.stringify(items));
  return url.toString();
}

export default function OrderForm() {
  const { mutateAsync: order } = api.order.order.useMutation();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      pickupDate: new Date(),
      pickupTime: "",
      allergies: "",
      paymentMethod: "",
      instagramHandle: "",
      selectedDrinks: {},
    },
    onSubmit: async () => {
      const result = await order(form.state.values);
      if (result) {
        toast.success("Order placed successfully");
        setTimeout(() => {
          const url = generateOrderUrl(form.state.values);
          router.push(url);
        }, 1000);
      } else {
        toast.error("Failed to place order");
      }
    },
    validators: {
      onChange: orderSchema,
      onMount: orderSchema,
    },
  });
  const [selectedDrinks, setSelectedDrinks] = useState<Record<string, number>>(
    {},
  );

  const handleDrinkSelection = (drinkId: string, checked: boolean) => {
    if (checked) {
      setSelectedDrinks((prev) => ({ ...prev, [drinkId]: 1 }));
    } else {
      const newSelection = { ...selectedDrinks };
      delete newSelection[drinkId];
      setSelectedDrinks(newSelection);
    }
  };

  const handleQuantityChange = (drinkId: string, quantity: number) => {
    if (quantity > 0) {
      setSelectedDrinks((prev) => ({ ...prev, [drinkId]: quantity }));
    } else {
      const newSelection = { ...selectedDrinks };
      delete newSelection[drinkId];
      setSelectedDrinks(newSelection);
    }
  };

  useEffect(() => {
    form.setFieldValue("selectedDrinks", selectedDrinks);
  }, [selectedDrinks]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Personal Information
        </h3>
        <form.Field
          name="fullName"
          children={(field) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
                <FieldError field={field} />
              </div>
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <FieldError field={field} />
              </div>
            );
          }}
        />
        <form.Field
          name="phoneNumber"
          children={(field) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
                <FieldError field={field} />
              </div>
            );
          }}
        />
      </div>

      {/* Pickup Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Pickup Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form.Field
            name="pickupDate"
            children={(field) => {
              return (
                <div className="space-y-2">
                  <Label>Pickup Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.state.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value ? (
                          format(field.state.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.state.value}
                        onSelect={field.handleChange}
                        required
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldError field={field} />
                </div>
              );
            }}
          />
          <form.Field
            name="pickupTime"
            children={(field) => {
              return (
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time *</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                      <SelectItem value="8:30 AM">8:30 AM</SelectItem>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                      <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                      <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                      <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                      <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                      <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                      <SelectItem value="5:30 PM">5:30 PM</SelectItem>
                      <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                      <SelectItem value="6:30 PM">6:30 PM</SelectItem>
                      <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                      <SelectItem value="7:30 PM">7:30 PM</SelectItem>
                      <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError field={field} />
                </div>
              );
            }}
          />
        </div>
      </div>

      {/* Drink Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Select Your Drink(s) *
        </h3>
        <div className="space-y-3">
          {products.map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
              handleDrinkSelection={handleDrinkSelection}
              handleQuantityChange={handleQuantityChange}
              selectedDrinks={selectedDrinks}
            />
          ))}
        </div>
      </div>

      <form.Field
        name="allergies"
        children={(field) => {
          return (
            <div className="space-y-2">
              <Label htmlFor="allergies">Have allergies? Let us know!</Label>
              <Textarea
                id="allergies"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Please list any allergies or dietary restrictions..."
                rows={3}
              />
              <FieldError field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="paymentMethod"
        children={(field) => {
          return (
            <div className="space-y-3">
              <Label className="text-base font-medium">Payment Method *</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zelle">Zelle</SelectItem>
                  <SelectItem value="venmo">Venmo</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
              <FieldError field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="instagramHandle"
        children={(field) => {
          return (
            <div className="space-y-2">
              <Label htmlFor="instagramHandle">
                Instagram Handle (Optional)
              </Label>
              <Input
                id="instagramHandle"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="@yourusername"
              />
              <p className="text-sm text-gray-500">
                For us to tag you or reach out if needed
              </p>
              <FieldError field={field} />
            </div>
          );
        }}
      />

      <form.Subscribe
        children={() => {
          if (Object.keys(selectedDrinks).length > 0)
            return (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="mb-2 font-semibold text-green-800">
                  Order Summary:
                </h4>
                <ul className="space-y-1 text-sm">
                  {Object.entries(selectedDrinks).map(([drinkId, quantity]) => {
                    return (
                      <li
                        key={drinkId}
                        className="flex justify-between text-lg"
                      >
                        <span>
                          {getOrderDrinkName(drinkId)} ({quantity})
                        </span>
                        <span className="w-20 text-green-600">
                          | ${(getDrinkPrice(drinkId) * quantity).toFixed(2)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <hr className="my-2 border-green-600" />
                <div className="flex flex-row justify-end gap-2">
                  <span className="text-lg font-semibold text-green-600">
                    Total: $
                    {Object.entries(selectedDrinks)
                      .reduce((acc, [drinkId, quantity]) => {
                        const price = getDrinkPrice(drinkId);
                        return acc + price * quantity;
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            );
        }}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => {
          const hasSelectedDrinks = Object.keys(selectedDrinks).length > 0;
          return (
            <Button
              type="submit"
              className="w-full bg-green-600 from-green-600 to-emerald-600 py-3 font-semibold text-white"
              disabled={!canSubmit || !hasSelectedDrinks || isSubmitting}
            >
              Place Order 🍵
              {isSubmitting && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          );
        }}
      />
    </form>
  );
}

function FieldError({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500">
          {field.state.meta.errors
            .map((error: { message: string }) => error.message)
            .join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

/* eslint-disable react/no-children-prop */
"use client";

import type React from "react";
import { useState } from "react";
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
import { Checkbox } from "~/components/ui/checkbox";
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

const drinks = [
  {
    id: "iced-matcha-whole",
    name: "🍵 Iced Matcha Latte - Whole Milk",
    price: "$5.50",
  },
  {
    id: "banana-matcha-whole",
    name: "🍌 Banana Cream Matcha Latte - Whole Milk",
    price: "$6.00",
  },
  {
    id: "strawberry-matcha-whole",
    name: "🍓 Strawberry & Cream Matcha Latte - Whole Milk",
    price: "$6.00",
  },
  {
    id: "iced-matcha-oat",
    name: "🍵 Iced Matcha Latte - Oat Milk (Recommended)",
    price: "$5.75",
  },
  {
    id: "banana-matcha-oat",
    name: "🍌 Banana Cream Matcha Latte - Oat Milk (Recommended)",
    price: "$6.25",
  },
  {
    id: "strawberry-matcha-oat",
    name: "🍓 Strawberry & Cream Matcha Latte - Oat Milk (Recommended)",
    price: "$6.25",
  },
];

export default function OrderForm() {
  const { mutateAsync: order } = api.order.order.useMutation();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
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
          router.push("/");
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
    form.setFieldValue("selectedDrinks", selectedDrinks);
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
                  <Input
                    id="pickupTime"
                    type="time"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500">Example: 10:15 AM</p>
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
          {drinks.map((drink) => (
            <div key={drink.id} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={drink.id}
                  checked={drink.id in selectedDrinks}
                  onCheckedChange={(checked) =>
                    handleDrinkSelection(drink.id, checked as boolean)
                  }
                />
                <Label htmlFor={drink.id} className="flex-1 cursor-pointer">
                  {drink.name}{" "}
                  <span className="font-medium text-green-600">
                    {drink.price}
                  </span>
                </Label>
              </div>

              {drink.id in selectedDrinks && (
                <div className="ml-6 flex items-center space-x-2">
                  <Label htmlFor={`quantity-${drink.id}`} className="text-sm">
                    Quantity:
                  </Label>
                  <Input
                    id={`quantity-${drink.id}`}
                    type="number"
                    min="1"
                    max="10"
                    value={selectedDrinks[drink.id]}
                    onChange={(e) =>
                      handleQuantityChange(
                        drink.id,
                        Number.parseInt(e.target.value) || 0,
                      )
                    }
                    className="w-20"
                  />
                </div>
              )}
            </div>
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
          if (Object.keys(form.state.values.selectedDrinks).length > 0)
            return (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="mb-2 font-semibold text-green-800">
                  Order Summary:
                </h4>
                <ul className="space-y-1 text-sm">
                  {Object.entries(selectedDrinks).map(([drinkId, quantity]) => {
                    const drink = drinks.find((d) => d.id === drinkId);
                    return (
                      <li key={drinkId} className="flex justify-between">
                        <span>
                          {drink?.name.split(" - ")[0]} ({quantity})
                        </span>
                        <span className="text-green-600">
                          {drink?.name.includes("Oat Milk")
                            ? "Oat Milk"
                            : "Whole Milk"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
        }}
      />

      {/* Order Summary */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => {
          return (
            <Button
              type="submit"
              className="w-full bg-green-600 from-green-600 to-emerald-600 py-3 font-semibold text-white"
              disabled={!canSubmit || isSubmitting}
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

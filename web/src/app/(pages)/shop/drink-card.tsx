/* eslint-disable react/no-children-prop */
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import Image from "next/image";
import { type products } from "~/lib/constants";

export function DrinkCard({
  drink,
  handleDrinkSelection,
  handleQuantityChange,
  selectedDrinks,
}: {
  drink: (typeof products)[number];
  handleDrinkSelection: (drinkId: string, checked: boolean) => void;
  handleQuantityChange: (drinkId: string, quantity: number) => void;
  selectedDrinks: Record<string, number>;
}) {
  const oatId = drink.id.concat("-oat");
  const wholeId = drink.id.concat("-whole");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card
      key={drink.id}
      className="flex flex-col justify-between rounded-lg border bg-white shadow-sm"
    >
      <CardHeader className="flex flex-row">
        <div className="aspect-square w-48 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={drink.image}
            width={500}
            height={500}
            alt={drink.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardTitle className="flex min-h-16 flex-col gap-2">
          <span className="text-2xl font-bold">
            {drink.emoji} {drink.title}
          </span>
          <p className="text-sm text-gray-500">{drink.description}</p>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-emerald-600">
          ${drink.price.toFixed(2)}
        </span>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
              type="button"
            >
              Add to Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Order</DialogTitle>
              <DialogDescription>
                Select the milk type you would like to add to your order.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {oatId in selectedDrinks ? (
                <Button
                  onClick={() => {
                    handleDrinkSelection(oatId, false);
                    setIsOpen(false);
                  }}
                >
                  Remove Oat Milk from Order
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleDrinkSelection(oatId, true);
                    setIsOpen(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  type="button"
                >
                  Add Oat Milk to Order
                </Button>
              )}
              {wholeId in selectedDrinks ? (
                <Button
                  onClick={() => {
                    handleDrinkSelection(wholeId, false);
                    setIsOpen(false);
                  }}
                >
                  Remove Whole Milk from Order
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleDrinkSelection(wholeId, true);
                    setIsOpen(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  type="button"
                >
                  Add Whole Milk to Order
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        {oatId in selectedDrinks && (
          <div className="flex flex-row justify-end gap-2">
            <Label htmlFor={oatId}>Oat Milk</Label>
            <Input
              id={`quantity-${oatId}`}
              type="number"
              min="1"
              max="10"
              value={selectedDrinks[oatId]}
              onChange={(e) =>
                handleQuantityChange(
                  oatId,
                  Number.parseInt(e.target.value) || 0,
                )
              }
              className="w-20"
            />
          </div>
        )}
        {wholeId in selectedDrinks && (
          <div className="flex flex-row gap-2">
            <Label htmlFor={wholeId}>Whole Milk</Label>
            <Input
              id={`quantity-${wholeId}`}
              type="number"
              min="1"
              max="10"
              value={selectedDrinks[wholeId]}
              onChange={(e) =>
                handleQuantityChange(
                  wholeId,
                  Number.parseInt(e.target.value) || 0,
                )
              }
              className="w-20"
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

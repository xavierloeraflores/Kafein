"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import Image from "next/image";
import { type products } from "~/lib/constants";
import { AddDrinkDialog } from "./add-drink-dialog";
import { getOrderDrinkName } from "~/lib/convertdrinkId";

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
        <div className="flex flex-col font-mono">
          <span className="text-lg font-bold text-emerald-600">
            ${drink.price.toFixed(2)} - 12oz
          </span>
          <span className="text-lg font-bold text-emerald-600">
            {`$${(drink.price + 0.5).toFixed(2)} - 16oz`}
          </span>
        </div>
        <AddDrinkDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleDrinkSelection={handleDrinkSelection}
          drinkId={drink.id}
          selectedDrinks={selectedDrinks}
          handleQuantityChange={handleQuantityChange}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        {selectedDrinks &&
          Object.keys(selectedDrinks)
            .filter((curDrink) => curDrink.includes(drink.id))
            .map((drinkId) => (
              <DrinkQuantity
                key={drinkId}
                drinkId={drinkId}
                selectedDrinks={selectedDrinks}
                handleQuantityChange={handleQuantityChange}
                handleDrinkSelection={handleDrinkSelection}
                setIsOpen={setIsOpen}
              />
            ))}
      </CardFooter>
    </Card>
  );
}
function DrinkQuantity({
  drinkId,
  selectedDrinks,
  handleQuantityChange,
  handleDrinkSelection,
  setIsOpen,
}: {
  drinkId: string;
  selectedDrinks: Record<string, number>;
  handleQuantityChange: (drinkId: string, quantity: number) => void;
  handleDrinkSelection: (drinkId: string, checked: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="flex flex-row gap-2">
      <Label htmlFor={drinkId}>{getOrderDrinkName(drinkId)}</Label>
      <Input
        id={`quantity-${drinkId}`}
        type="number"
        min="1"
        max="10"
        value={selectedDrinks[drinkId]}
        onChange={(e) =>
          handleQuantityChange(drinkId, Number.parseInt(e.target.value) || 0)
        }
        className="w-20"
      />
      <Button
        onClick={() => {
          handleDrinkSelection(drinkId, false);
          setIsOpen(false);
        }}
      >
        X
      </Button>
    </div>
  );
}

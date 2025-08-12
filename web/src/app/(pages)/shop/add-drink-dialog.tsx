"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function AddDrinkDialog({
  isOpen,
  setIsOpen,
  handleDrinkSelection,
  drinkId,
  selectedDrinks,
  handleQuantityChange,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleDrinkSelection: (drinkId: string, checked: boolean) => void;
  drinkId: string;
  selectedDrinks: Record<string, number>;
  handleQuantityChange: (drinkId: string, quantity: number) => void;
}) {
  const [milkType, setMilkType] = useState<"oat" | "whole">("oat");
  const [sweetness, setSweetness] = useState<"regular" | "extra">("regular");
  const [size, setSize] = useState<"regular" | "large">("regular");
  const [matchaShots, setMatchaShots] = useState<number>(0);
  function resetFormState() {
    setMilkType("oat");
    setSweetness("regular");
    setSize("regular");
    setMatchaShots(0);
  }
  return (
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Your Drink</DialogTitle>
          <DialogDescription>
            Select your preferences for this drink.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Milk Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Milk Type</Label>
            <RadioGroup
              value={milkType}
              onValueChange={(value: "oat" | "whole") => setMilkType(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oat" id="oat" />
                <Label htmlFor="oat">Oat Milk</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whole" id="whole" />
                <Label htmlFor="whole">Whole Milk</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sweetness Level */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Sweetness Level</Label>
            <RadioGroup
              value={sweetness}
              onValueChange={(value: "regular" | "extra") =>
                setSweetness(value)
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular-sweet" />
                <Label htmlFor="regular-sweet">Regular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="extra" id="extra-sweet" />
                <Label htmlFor="extra-sweet">Extra Sweet</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Size</Label>
            <RadioGroup
              value={size}
              onValueChange={(value: "regular" | "large") => setSize(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular-size" />
                <Label htmlFor="regular-size">Regular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large-size" />
                <Label htmlFor="large-size">Large</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Matcha Shots */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Extra Matcha Shots</Label>
            <Select
              value={matchaShots.toString()}
              onValueChange={(value) => setMatchaShots(Number.parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of shots" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 shots</SelectItem>
                <SelectItem value="1">1 shot (+$0.50)</SelectItem>
                <SelectItem value="2">2 shots (+$1.00)</SelectItem>
                <SelectItem value="3">3 shots (+$1.50)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const newDrinkId = `${drinkId}-${milkType}-${sweetness}-${size}-${matchaShots}`;
              if (selectedDrinks[newDrinkId]) {
                handleQuantityChange(
                  newDrinkId,
                  selectedDrinks[newDrinkId] + 1,
                );
              } else {
                handleDrinkSelection(newDrinkId, true);
              }
              resetFormState();
              setIsOpen(false);
            }}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            type="button"
          >
            Add to Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

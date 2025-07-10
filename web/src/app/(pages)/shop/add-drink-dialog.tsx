/* eslint-disable react/no-children-prop */
"use client";

import type React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";

export function AddDrinkDialog({
  isOpen,
  setIsOpen,
  handleDrinkSelection,
  oatId,
  wholeId,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleDrinkSelection: (drinkId: string, checked: boolean) => void;
  oatId: string;
  wholeId: string;
}) {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Order</DialogTitle>
          <DialogDescription>
            Select the milk type you would like to add to your order.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

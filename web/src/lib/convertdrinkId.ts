import { products } from "./constants";

export function convertDrinkId(drinkId: string) {
  const [drink, milkType, sweetness, size, matchaShots] = drinkId.split("-");
  return {
    drink,
    milkType,
    sweetness,
    size,
    matchaShots,
  };
}

export function getDrinkEmoji(drinkId: string) {
  const { drink } = convertDrinkId(drinkId);
  const drinkEmoji = products.find((product) => product.id === drink)?.emoji;
  if (!drinkEmoji) {
    throw new Error("Drink not found");
  }
  return drinkEmoji;
}

export function getDrinkPrice(drinkId: string) {
  const { drink, milkType, size, matchaShots } = convertDrinkId(drinkId);
  let drinkPrice = products.find((product) => product.id === drink)?.price;
  if (!drinkPrice) {
    throw new Error("Drink not found");
  }
  if (size === "large") {
    drinkPrice += 1;
  }
  if (matchaShots && Number(matchaShots) > 0) {
    drinkPrice += 0.5 * Number(matchaShots);
  }
  if (milkType === "whole") {
    drinkPrice += 1;
  }
  return drinkPrice;
}

export function getDrinkName(drinkId: string) {
  const { drink } = convertDrinkId(drinkId);
  const drinkName = products.find((product) => product.id === drink)?.title;
  if (!drinkName) {
    throw new Error("Drink not found");
  }
  return drinkName;
}

export function getFullDrinkName(drinkId: string) {
  const { drink, milkType, sweetness, size, matchaShots } =
    convertDrinkId(drinkId);
  const drinkNameLabel = products.find(
    (product) => product.id === drink,
  )?.title;
  if (!drinkNameLabel) {
    throw new Error("Drink not found");
  }
  const milkTypeLabel = milkType === "oat" ? "Oat Milk" : "Whole Milk";
  const sweetnessLabel = sweetness === "regular" ? "" : "Extra Sweet";
  const sizeLabel = size === "regular" ? "12oz" : "16oz";
  const matchaShotsLabel =
    matchaShots && Number(matchaShots) > 0
      ? `+${matchaShots} Shot${matchaShots === "1" ? "" : "s"}`
      : "";
  return `${drinkNameLabel} ${milkTypeLabel} ${sweetnessLabel} ${sizeLabel} ${matchaShotsLabel}`;
}

export function getOrderDrinkName(drinkId: string) {
  const drinkName = getFullDrinkName(drinkId);
  const drinkEmoji = getDrinkEmoji(drinkId);

  if (drinkId.includes("matcha")) {
    return `${drinkEmoji} ${drinkName.replace("Iced ", "")}`;
  }
  const removeString = "Matcha Latte";
  const shortenedDrinkName = drinkName.replace(removeString, "");
  return `${drinkEmoji} ${shortenedDrinkName}`;
}

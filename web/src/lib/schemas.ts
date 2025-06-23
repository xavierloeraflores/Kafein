import z from "zod";

export const orderSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  pickupDate: z.date().min(new Date(), "Pickup date must be in the future"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  allergies: z.string(),
  instagramHandle: z.string(),
  selectedDrinks: z.record(z.string(), z.number()),
});

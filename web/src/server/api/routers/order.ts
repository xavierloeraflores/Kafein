import { type z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { resendClient } from "~/lib/resendClient";
import { orderSchema } from "~/lib/schemas";

export const orderRouter = createTRPCRouter({
  order: publicProcedure.input(orderSchema).mutation(async ({ input }) => {
    const { data, error } = await sendOrderEmail(input);
    if (error) {
      throw new Error("Failed to send order email");
    }
    return data;
  }),
});

function sendOrderEmail(input: z.infer<typeof orderSchema>) {
  const selectedDrinks = Object.entries(input.selectedDrinks)
    .map(([drink, quantity]) => `${drink} x ${quantity}`)
    .join("<br />");

  return resendClient.emails.send({
    from: "onboarding@resend.dev",
    to: env.RESEND_BUSINESS_EMAIL as string,
    subject: "New Order",
    html: `<p>New order from ${input.fullName}</p>
    <p>Phone: ${input.phoneNumber}</p>
    <p>Pickup Date: ${input.pickupDate.toLocaleDateString()}</p>
    <p>Pickup Time: ${input.pickupTime}</p>
    <p>Payment Method: ${input.paymentMethod}</p>
    <p>Allergies: ${input.allergies}</p>
    <p>Instagram Handle: ${input.instagramHandle}</p>
    <p>Selected Drinks:<br />${selectedDrinks}</p>`,
  });
}

import { type z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { resendClient } from "~/lib/resendClient";
import { orderSchema } from "~/lib/schemas";
import { convertToAmPm } from "~/lib/convertTime";

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
    subject: `🍵 New Order Received: ${input.fullName}`,
    html: `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="margin-top: 0; color: #222222;">📦 New Order Received</h2>
        <p style="margin: 8px 0;"><strong>Name:</strong> ${input.fullName}</p>
        <p style="margin: 8px 0;"><strong>Phone:</strong> ${input.phoneNumber}</p>
        <p style="margin: 8px 0;"><strong>Pickup Date:</strong> ${input.pickupDate.toLocaleDateString()}</p>
        <p style="margin: 8px 0;"><strong>Pickup Time:</strong> ${convertToAmPm(input.pickupTime)}</p>
        <p style="margin: 8px 0;"><strong>Payment Method:</strong> ${input.paymentMethod}</p>
        <p style="margin: 8px 0;"><strong>Allergies:</strong> ${input.allergies || "None"}</p>
        <p style="margin: 8px 0;"><strong>Instagram Handle:</strong> ${input.instagramHandle || "N/A"}</p>
        <p style="margin: 16px 0 8px;"><strong>Selected Drinks:</strong></p>
        <div style="padding-left: 20px; margin: 0;">
          ${selectedDrinks
            .split("\n")
            .map((drink) => `<span style="margin-bottom: 4px;">${drink}</span>`)
            .join("")}
        </div>
      </div>
    </div>
    `,
  });
}

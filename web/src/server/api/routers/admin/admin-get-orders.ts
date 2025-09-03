import { publicProcedure } from "~/server/api/trpc";
import { orderSchema } from "~/lib/schemas";

export const adminGetOrdersProcedure = publicProcedure
  .input(orderSchema)
  .mutation(async ({ input }) => {
    return "order";
  });

export default adminGetOrdersProcedure;

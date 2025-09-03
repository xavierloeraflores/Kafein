import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";
export const adminGetOrdersProcedure = publicProcedure
  .input(z.object({ page: z.number() }))
  .query(async ({ input }) => {
    const { page } = input;
    const orders = await db.order.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  });

export default adminGetOrdersProcedure;

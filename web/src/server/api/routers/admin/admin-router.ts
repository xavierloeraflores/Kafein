import { createTRPCRouter } from "~/server/api/trpc";
import adminGetOrdersProcedure from "./admin-get-orders";

export const adminRouter = createTRPCRouter({
  getOrders: adminGetOrdersProcedure,
});

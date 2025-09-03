"use client";
import { OrdersTable } from "./orders-table";
import { api } from "~/trpc/react";
import { useState } from "react";

export default function AdminPage() {
  const [page, setPage] = useState(1);
  const { data: orders } = api.admin.getOrders.useQuery({ page });

  return (
    <div>
      <OrdersTable orders={orders ?? []} />
    </div>
  );
}

import { OrdersTable } from "./orders-table";

export default function AdminPage() {
  return (
    <div>
      <OrdersTable orders={[]} />
    </div>
  );
}

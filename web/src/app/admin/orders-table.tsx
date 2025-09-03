"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type Order = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  allergies: string;
  pickupDate: Date;
  pickupTime: string;
  paymentMethod: string;
  selectedDrinks: Record<string, number>;
  status: string;
  total: string;
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  const formatDrinks = (drinks: Record<string, number>) => {
    return Object.entries(drinks)
      .map(([drink, quantity]) => `${drink} (${quantity})`)
      .join(", ");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground text-xl font-bold">
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border border-b">
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Order ID
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Customer
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Pickup
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Items
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Payment
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Total
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Status
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-border hover:bg-muted/50 border-b"
                >
                  <td className="px-4 py-4">
                    <div className="text-card-foreground font-medium">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-card-foreground font-medium">
                      {order.fullName}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {order.email}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {order.phoneNumber}
                    </div>
                    {order.allergies && (
                      <div className="text-destructive mt-1 text-xs">
                        ⚠️ {order.allergies}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-card-foreground text-sm">
                      {order.pickupDate.toLocaleDateString()}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {order.pickupTime}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-card-foreground max-w-48 truncate text-sm">
                      {formatDrinks(order.selectedDrinks)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-card-foreground text-sm">
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-card-foreground font-medium">
                      {order.total}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className={
                        statusColors[order.status as keyof typeof statusColors]
                      }
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <OrderDropdownMenu orderId={order.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderDropdownMenu({ orderId }: { orderId: string }) {
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(orderId, newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => updateOrderStatus(orderId, "confirmed")}
        >
          Mark Confirmed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateOrderStatus(orderId, "ready")}>
          Mark Ready
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateOrderStatus(orderId, "completed")}
        >
          Mark Completed
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateOrderStatus(orderId, "cancelled")}
          className="text-destructive"
        >
          Cancel Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

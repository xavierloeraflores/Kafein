import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import OrderForm from "./order-form";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="mx-auto max-w-2xl pt-0 shadow-lg">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-600 to-emerald-600 text-center text-white">
          <CardTitle className="text-2xl font-bold">
            🍵 Matcha Order Form
          </CardTitle>
          <CardDescription className="text-green-100">
            Place your order for premium matcha lattes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <OrderForm />
        </CardContent>
      </Card>
    </main>
  );
}

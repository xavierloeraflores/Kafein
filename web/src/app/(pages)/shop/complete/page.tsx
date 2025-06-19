import OrderCompletedPage from "./order-completed-page";
import { Suspense } from "react";

export default function OrderCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderCompletedPage />
    </Suspense>
  );
}

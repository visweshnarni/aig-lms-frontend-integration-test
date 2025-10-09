"use client";

import MyPurchasesContent from "@/app/components/dashboard/mypurchases/purchase";
import { purchases } from "@/app/data/purchase";

export default function PurchasesPage() {
  return <MyPurchasesContent purchases={purchases} />;
}

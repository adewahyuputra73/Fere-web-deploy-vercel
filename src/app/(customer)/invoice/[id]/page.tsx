"use client";

import { use } from "react";
import { InvoiceView } from "@/features/invoice";

interface InvoicePageProps {
  params: Promise<{ id: string }>;
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const { id } = use(params);

  return <InvoiceView orderId={id} />;
}

/**
 * Service untuk mengambil data invoice.
 * Menggunakan pubClient → /api/pub/* → Next.js proxy → BE.
 * Halaman invoice bersifat publik (tanpa login browser).
 *
 * Struktur response BE (GET /orders/:id):
 * - order_number, order_type, payment_status, fulfillment_status
 * - subtotal, discount, tax, service_fee, delivery_fee, total_amount (string decimal)
 * - items[]: { qty, price, subtotal, note, product: { name, sku } }
 * - payments[]: { payment_method, amount, is_cash }
 * - invoice: { invoice_number, status, ... } | null
 * - customer: { name, phone, email } | null
 * - kasirDetail: { full_name, phone_number } | null
 */
import pubClient from "@/lib/api/pub-client";
import type { InvoiceOrder, InvoiceStoreInfo } from "../types";

/** Map raw BE response → InvoiceOrder */
function mapOrderResponse(data: any): InvoiceOrder {
  const invoice = data.invoice;
  const customer = data.customer;
  const kasir = data.kasirDetail;

  return {
    id: data.id,
    orderNumber: data.order_number ?? "-",
    invoiceNumber: invoice?.invoice_number ?? undefined,
    customerName: customer?.name ?? "Pelanggan",
    customerPhone: customer?.phone ?? "-",
    fulfillmentType: data.order_type ?? "-",
    orderDate: data.createdAt ?? data.created_at ?? "",
    completedAt: data.completed_at ?? undefined,
    totalPrice: Number(data.total_amount ?? 0),
    subtotal: Number(data.subtotal ?? 0),
    discount: Number(data.discount ?? 0),
    tax: Number(data.tax ?? 0),
    serviceFee: Number(data.service_fee ?? 0),
    shippingFee: Number(data.delivery_fee ?? 0),
    paymentMethod:
      data.payments?.[0]?.payment_method ?? "-",
    paymentStatus: data.payment_status ?? "-",
    fulfillmentStatus: data.fulfillment_status ?? "-",
    status: invoice?.status ?? data.payment_status ?? "-",
    items: (data.items ?? []).map((item: any) => ({
      id: item.id,
      productName: item.product?.name ?? "-",
      variantName: item.variant?.name ?? undefined,
      quantity: Number(item.qty ?? 0),
      price: Number(item.price ?? 0),
      discount: Number(item.discount ?? 0),
      subtotal: Number(
        item.subtotal ??
          (Number(item.price ?? 0) * Number(item.qty ?? 0))
      ),
      notes: item.note ?? undefined,
    })),
    cashierName: kasir?.full_name ?? "-",
    notes: data.notes ?? undefined,
    payments: data.payments ?? [],
  };
}

export const invoiceService = {
  /** Ambil detail order untuk invoice */
  async getOrder(orderId: string): Promise<InvoiceOrder> {
    const response = await pubClient.get<any>(`/orders/${orderId}`);
    const data = response.data.data ?? response.data;
    return mapOrderResponse(data);
  },

  /** Ambil info toko untuk header invoice */
  async getStore(): Promise<InvoiceStoreInfo | null> {
    try {
      const response = await pubClient.get<any>("/stores/my");
      return response.data.data ?? null;
    } catch {
      return null;
    }
  },
};

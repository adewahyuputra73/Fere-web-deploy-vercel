export type OrderType = "DINE_IN" | "TAKEAWAY" | "PICKUP";

export type PaymentMethod = "CASH" | "TRANSFER" | "QRIS";

export interface OrderItem {
  product_id: string;
  qty: number;
  notes?: string;
}

export interface CheckoutPayment {
  method: PaymentMethod;
  amount?: number;
}

export interface CheckoutRequest {
  order_type: OrderType;
  table_number?: string;
  items: OrderItem[];
  voucher_code?: string;
  payments?: CheckoutPayment[];
  customer_name?: string;
  customer_phone?: string;
  scheduled_at?: string;
  notes?: string;
}

export type FulfillmentStatus = "PENDING" | "SCHEDULED" | "PROCESSING" | "READY" | "DELIVERED" | "COMPLETED" | "CANCELLED";

export interface UpdateOrderStatusRequest {
  status: FulfillmentStatus;
}

export interface VoidOrderRequest {
  reason: string;
}

export interface PayOrderRequest {
  payment_method: PaymentMethod;
  paid_amount?: number;
}

export interface OrderSummaryCards {
  belum_dibayar: { count: number; potensi: number };
  siap_diproses: { count: number; potensi: number };
  dalam_pengiriman: { count: number; potensi: number };
  selesai_3hari: { count: number; total: number };
}

export interface OrderListParams {
  page?: number;
  limit?: number;
}

export interface OrderInvoice {
  invoice_number: string;
  total_amount: string;
  status: string;
}

export interface OrderKasirDetail {
  id?: string;
  name?: string;
  phone?: string;
}

export interface Order {
  id: string;
  store_id?: string;
  order_number?: string;
  order_type: OrderType;
  customer_id?: string | null;
  table_id?: string | null;
  table_number?: string | null;
  is_preorder?: boolean;
  scheduled_at?: string | null;
  fulfillment_status?: FulfillmentStatus | string;
  payment_status?: string;
  source?: string;
  subtotal?: string;
  additional_fee?: string;
  delivery_fee?: string;
  service_fee?: string;
  rounding?: string;
  tax?: string;
  discount?: string;
  total_amount?: string;
  platform?: string;
  xendit_invoice_id?: string | null;
  xendit_invoice_url?: string | null;
  biteship_id?: string | null;
  createdAt?: string;
  updatedAt?: string;
  items?: OrderItem[];
  payments?: { payment_method: string; amount: string; is_cash: boolean }[];
  kasirDetail?: OrderKasirDetail | null;
  customer?: { id?: string; name: string; phone: string } | null;
  invoice?: OrderInvoice | null;
}

export interface OrderListResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  data: Order[];
}

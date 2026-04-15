// Invoice feature types

export interface InvoiceOrder {
  id: string | number;
  orderNumber: string;
  invoiceId?: string;
  invoiceNumber?: string;
  customerName: string;
  customerPhone: string;
  fulfillmentType: string;
  orderDate: string;
  completedAt?: string;
  paidAt?: string;
  totalPrice: number;
  subtotal: number;
  discount: number;
  tax: number;
  serviceFee: number;
  additionalFee: number;
  shippingFee: number;
  rounding: number;
  paymentMethod: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  status: string;
  isVoid: boolean;
  items: InvoiceOrderItem[];
  cashierName: string;
  notes?: string;
  payments?: InvoicePayment[];
}

export interface Invoice {
  id: string;
  orderId: string;
  orderNumber: string;
  orderType: string;
  invoiceNumber: string;
  subtotal: number;
  discount: number;
  tax: number;
  serviceFee: number;
  additionalFee: number;
  deliveryFee: number;
  rounding: number;
  totalAmount: number;
  status: string;
  paidAt?: string;
  isVoid: boolean;
  createdAt: string;
  payments: InvoicePayment[];
}

export interface InvoiceListParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface InvoiceListResult {
  total: number;
  page: number;
  limit: number;
  data: Invoice[];
}

export interface InvoiceOrderItem {
  id: number;
  productName: string;
  variantName?: string;
  quantity: number;
  price: number;
  discount: number;
  subtotal: number;
  notes?: string;
}

export interface InvoicePayment {
  payment_method: string;
  amount: string | number;
  is_cash?: boolean;
}

export interface InvoiceStoreInfo {
  id: string;
  name: string;
  address: string;
  owner?: {
    phone_number: string;
  };
  is_tax_enabled?: boolean;
  tax_name?: string;
  tax_rate?: number;
  tax_id_number?: string;
}

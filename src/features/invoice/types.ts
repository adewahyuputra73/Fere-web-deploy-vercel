// Invoice feature types

export interface InvoiceOrder {
  id: string | number;
  orderNumber: string;
  invoiceNumber?: string;
  customerName: string;
  customerPhone: string;
  fulfillmentType: string;
  orderDate: string;
  completedAt?: string;
  totalPrice: number;
  subtotal: number;
  discount: number;
  tax: number;
  serviceFee: number;
  shippingFee: number;
  paymentMethod: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  status: string;
  items: InvoiceOrderItem[];
  cashierName: string;
  notes?: string;
  payments?: InvoicePayment[];
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

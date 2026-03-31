// Customer Order Types
import { Product, VariantOption } from '../products/types';

// Cart Types
export interface CartItemVariant {
  variantId: number;
  variantName: string;
  optionId: number;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // unique cart item ID
  product: Product;
  quantity: number;
  selectedVariants: CartItemVariant[];
  notes?: string;
  unitPrice: number; // base price + variant prices
  subtotal: number; // unitPrice * quantity
}

// Order Mode — chosen before browsing menu
export type OrderMode = 'dine_in' | 'pre_order' | 'reservation';

export const ORDER_MODE_LABELS: Record<OrderMode, string> = {
  dine_in: 'Dine-In',
  pre_order: 'Pre-Order',
  reservation: 'Reservasi',
};

// Order Form Types
export type CustomerFulfillmentType = 'dine_in' | 'takeaway';

export interface CustomerOrderForm {
  customerName: string;
  customerPhone: string;
  fulfillmentType: CustomerFulfillmentType;
  tableNumber?: string;
  notes?: string;
}

// Order Confirmation
export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  fulfillmentType: CustomerFulfillmentType;
  tableNumber?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  createdAt: string;
  estimatedMinutes: number;
}

// Label maps
export const CUSTOMER_FULFILLMENT_LABELS: Record<CustomerFulfillmentType, string> = {
  dine_in: 'Makan di Tempat',
  takeaway: 'Bawa Pulang',
};

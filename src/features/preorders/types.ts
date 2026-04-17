export type PreorderOrderType = "DINE_IN" | "TAKEAWAY";

export interface PreorderItem {
  product_id: string;
  qty: number;
}

export interface CreatePreorderRequest {
  name: string;
  phone: string;
  order_type: PreorderOrderType;
  scheduled_at: string;
  table_id?: string;
  items: PreorderItem[];
}

export interface CreatePosPreorderRequest {
  order_type: PreorderOrderType;
  customer_name: string;
  customer_phone: string;
  scheduled_at: string;
  table_id?: string;
  items: PreorderItem[];
  payments: { method: string; amount: number }[];
}

export interface Preorder {
  id: string;
  order_number?: string;
  name?: string;
  customer_name?: string;
  phone?: string;
  customer_phone?: string;
  order_type: PreorderOrderType;
  scheduled_at: string;
  table_id?: string;
  items?: PreorderItem[];
  status: string;
  createdAt?: string;
  created_at?: string;
}

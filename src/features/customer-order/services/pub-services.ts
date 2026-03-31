/**
 * Service methods untuk halaman customer order.
 * Menggunakan pubClient → /api/pub/* → Next.js proxy → BE (dengan auth server-side).
 * Tidak ada token yang dipegang browser.
 */
import pubClient from "@/lib/api/pub-client";
import { mapApiProduct } from "@/features/products/services/product-service";
import type { Product } from "@/features/products/types";
import type { StoreInfo } from "@/features/store-settings/types";
import type { Table } from "@/features/tables/types";
import type { CheckoutRequest } from "@/features/orders/types";

export const pubProductService = {
  async list(): Promise<Product[]> {
    const response = await pubClient.get<any>("/products");
    const payload = response.data.data;
    const items: any[] = payload?.products ?? payload ?? [];
    return items.map(mapApiProduct);
  },
};

export const pubStoreService = {
  async my(): Promise<StoreInfo | null> {
    try {
      const response = await pubClient.get<any>("/stores/my");
      return response.data.data ?? null;
    } catch {
      return null;
    }
  },
};

export const pubTableService = {
  async list(): Promise<Table[]> {
    try {
      const response = await pubClient.get<any>("/tables");
      const payload = response.data.data;
      return Array.isArray(payload) ? payload : (payload?.data ?? payload?.tables ?? []);
    } catch {
      return [];
    }
  },
};

export const pubOrderService = {
  async checkout(data: CheckoutRequest): Promise<any> {
    const response = await pubClient.post<any>("/orders/checkout", data);
    return response.data.data;
  },

  async detail(id: string): Promise<any> {
    const response = await pubClient.get<any>(`/orders/${id}`);
    return response.data.data;
  },
};

export const pubCustomerService = {
  async createReview(
    customerId: string,
    data: { order_id: string; rating: number; comment: string }
  ): Promise<void> {
    await pubClient.post(`/customers/${customerId}/reviews`, data);
  },
};

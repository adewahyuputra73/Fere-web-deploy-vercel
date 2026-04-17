import apiClient from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types";
import type { Preorder, CreatePosPreorderRequest, PreorderOrderType } from "../types";

export const preorderService = {
  async slots(
    storeId: string,
    date: string,
    orderType: PreorderOrderType,
    tableId?: string
  ): Promise<string[]> {
    const params: Record<string, string> = { store_id: storeId, date, order_type: orderType };
    if (tableId) params.table_id = tableId;
    const response = await apiClient.get<ApiResponse<string[] | { time: string }[]>>(
      ENDPOINTS.PREORDERS.SLOTS,
      { params }
    );
    const data = response.data.data;
    if (!Array.isArray(data)) return [];
    if (data.length === 0) return [];
    if (typeof data[0] === "string") return data as string[];
    return (data as { time: string }[]).map((s) => s.time);
  },

  async list(): Promise<Preorder[]> {
    const response = await apiClient.get<ApiResponse<Preorder[]>>(ENDPOINTS.PREORDERS.LIST);
    const data = response.data.data;
    return Array.isArray(data) ? data : [];
  },

  async createPos(data: CreatePosPreorderRequest): Promise<Preorder> {
    const response = await apiClient.post<ApiResponse<Preorder>>(
      ENDPOINTS.PREORDERS.CREATE_POS,
      data
    );
    return response.data.data;
  },
};

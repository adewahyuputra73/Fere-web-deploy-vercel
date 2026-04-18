/**
 * Biteship delivery service.
 * Semua endpoint real API via /api/pub/biteship/* → pub proxy → BE → Biteship.
 */
import pubClient from "@/lib/api/pub-client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  BiteshipArea,
  BiteshipCourier,
  BiteshipRateRequest,
  BiteshipOrderDetail,
  BiteshipTrackingResponse,
  BiteshipCancelReason,
} from "../types";

export const biteshipService = {
  /**
   * Cari area berdasarkan kata kunci (nama kota/kecamatan/kelurahan).
   */
  async searchAreas(keyword: string): Promise<BiteshipArea[]> {
    if (!keyword || keyword.trim().length < 3) return [];
    try {
      const res = await pubClient.get<any>(ENDPOINTS.BITESHIP.AREAS, {
        params: { keyword: keyword.trim() },
      });
      const payload = res.data?.data ?? res.data;
      const areas: BiteshipArea[] = payload?.areas ?? [];
      return Array.isArray(areas) ? areas : [];
    } catch (err) {
      console.error("[biteshipService] searchAreas error:", err);
      return [];
    }
  },

  /**
   * Ambil tarif pengiriman dari Biteship via BE proxy.
   * POST /biteship/rates/courier
   * BE yang handle pilihan courier list, FE cukup kirim koordinat + items.
   */
  async getRates(data: BiteshipRateRequest): Promise<BiteshipCourier[]> {
    try {
      const res = await pubClient.post<any>(ENDPOINTS.BITESHIP.RATES, data);
      const payload = res.data?.data ?? res.data;
      const pricing: BiteshipCourier[] = payload?.pricing ?? [];
      return Array.isArray(pricing) ? pricing : [];
    } catch (err: any) {
      const status = err?.response?.status;
      const body = err?.response?.data;
      console.error(
        `[biteshipService] getRates error | status=${status} | body=${JSON.stringify(body)} | request=${JSON.stringify(data)}`
      );
      // Re-throw agar komponen bisa tampilkan pesan yang tepat
      const wrapped = new Error("getRates_failed") as any;
      wrapped.httpStatus = status;
      throw wrapped;
    }
  },

  /**
   * Buat order pengiriman di Biteship.
   */
  async createOrder(data: Record<string, unknown>): Promise<any> {
    const res = await pubClient.post<any>("/biteship/order/create", data);
    return res.data?.data ?? res.data;
  },

  /**
   * Ambil detail order Biteship.
   */
  async getOrder(biteshipOrderId: string): Promise<BiteshipOrderDetail | null> {
    try {
      const res = await pubClient.get<any>(ENDPOINTS.BITESHIP.ORDER_DETAIL(biteshipOrderId));
      return res.data?.data ?? res.data ?? null;
    } catch {
      return null;
    }
  },

  /**
   * Ambil daftar alasan pembatalan order.
   */
  async getCancelReasons(): Promise<BiteshipCancelReason[]> {
    try {
      const res = await pubClient.get<any>("/biteship/order/cancel/reason");
      const payload = res.data?.data ?? res.data;
      const reasons: BiteshipCancelReason[] = payload?.cancellation_reasons ?? [];
      return Array.isArray(reasons) ? reasons : [];
    } catch (err) {
      console.error("[biteshipService] getCancelReasons error:", err);
      return [];
    }
  },

  /**
   * Batalkan order berdasarkan order ID.
   */
  async cancelOrder(
    orderId: string,
    data: { cancellation_reason_code: string; cancellation_reason: string }
  ): Promise<void> {
    await pubClient.post(`/biteship/order/cancel/${orderId}`, data);
  },

  /**
   * Tracking order berdasarkan tracking ID.
   */
  async trackOrder(trackingId: string): Promise<BiteshipTrackingResponse | null> {
    try {
      const res = await pubClient.get<any>(`/biteship/order/tracking/${trackingId}`);
      return res.data?.data ?? res.data ?? null;
    } catch {
      return null;
    }
  },
};

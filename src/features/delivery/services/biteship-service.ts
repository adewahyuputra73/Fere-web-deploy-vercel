/**
 * Biteship delivery service.
 * Semua request melewati /api/pub/biteship/* → pub proxy → BE → Biteship.
 */
import pubClient from "@/lib/api/pub-client";
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
      const res = await pubClient.get<any>("/biteship/areas", {
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
   * Ambil tarif pengiriman berdasarkan koordinat origin → destination.
   */
  async getRates(data: BiteshipRateRequest): Promise<BiteshipCourier[]> {
    try {
      const res = await pubClient.post<any>("/biteship/rates/courier", data);
      const payload = res.data?.data ?? res.data;
      const pricing: BiteshipCourier[] = payload?.pricing ?? [];
      return Array.isArray(pricing) ? pricing : [];
    } catch (err) {
      console.error("[biteshipService] getRates error:", err);
      return [];
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
      const res = await pubClient.get<any>(`/biteship/orders/${biteshipOrderId}`);
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

/**
 * Biteship delivery service.
 * Semua request melewati /api/pub/biteship/* → pub proxy → BE → Biteship.
 */
import pubClient from "@/lib/api/pub-client";
import type {
  BiteshipArea,
  BiteshipAreasResponse,
  BiteshipCourier,
  BiteshipRatesResponse,
  BiteshipRateRequest,
  BiteshipOrderDetail,
  BiteshipTrackingResponse,
  BiteshipCourierInfo,
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
      // BE mungkin wrap: { data: { areas: [...] } } atau langsung { areas: [...] }
      const payload = res.data?.data ?? res.data;
      const areas: BiteshipArea[] =
        payload?.areas ?? payload?.data?.areas ?? [];
      return Array.isArray(areas) ? areas : [];
    } catch (err) {
      console.error("[biteshipService] searchAreas error:", err);
      return [];
    }
  },

  /**
   * Ambil tarif pengiriman antara origin → destination.
   */
  async getRates(
    data: BiteshipRateRequest
  ): Promise<BiteshipCourier[]> {
    try {
      const res = await pubClient.post<any>("/biteship/rates/couriers", data);
      const payload = res.data?.data ?? res.data;
      const pricing: BiteshipCourier[] =
        payload?.pricing ?? payload?.data?.pricing ?? [];
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
    const res = await pubClient.post<any>("/biteship/orders", data);
    return res.data?.data ?? res.data;
  },

  /**
   * Ambil detail order Biteship (termasuk data driver).
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
   * Tracking berdasarkan waybill / resi.
   */
  async trackWaybill(waybillId: string): Promise<BiteshipTrackingResponse | null> {
    try {
      const res = await pubClient.get<any>(`/biteship/trackings/${waybillId}`);
      return res.data?.data ?? res.data ?? null;
    } catch {
      return null;
    }
  },

  /**
   * Daftar kurir yang tersedia.
   */
  async getCouriers(): Promise<BiteshipCourierInfo[]> {
    try {
      const res = await pubClient.get<any>("/biteship/couriers");
      const payload = res.data?.data ?? res.data;
      const couriers: BiteshipCourierInfo[] =
        payload?.couriers ?? payload ?? [];
      return Array.isArray(couriers) ? couriers : [];
    } catch {
      return [];
    }
  },
};

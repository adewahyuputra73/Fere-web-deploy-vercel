/**
 * Biteship delivery service.
 * Semua endpoint real API via /api/pub/biteship/* → pub proxy → BE → Biteship,
 * kecuali getRates yang sementara menggunakan mock karena endpoint belum tersedia di BE.
 *
 * TODO: Aktifkan getRates real API ketika BE sudah menyediakan:
 *   POST /api/pub/biteship/rates/courier
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

// ── Mock courier rates (sementara) ───────────────────────────────────────────

const MOCK_COURIERS: BiteshipCourier[] = [
  {
    courier_code: "gojek",
    courier_name: "GoSend",
    courier_service_code: "instant",
    courier_service_name: "Instant",
    company: "Gojek",
    description: "Pengiriman instan dalam 60 menit",
    duration: "60 menit",
    shipment_duration_range: "1",
    shipment_duration_unit: "hours",
    service_type: "instant",
    shipping_type: "domestic",
    type: "instant",
    price: 15000,
    shipping_fee: 15000,
    shipping_fee_discount: 0,
    shipping_fee_surcharge: 0,
    insurance_fee: 0,
    cash_on_delivery_fee: 0,
    currency: "IDR",
    available_for_insurance: false,
    available_for_cash_on_delivery: false,
    available_for_proof_of_delivery: false,
    available_for_instant_waybill_id: true,
    available_collection_method: ["pickup"],
    tax_lines: [],
  },
  {
    courier_code: "grab",
    courier_name: "GrabExpress",
    courier_service_code: "instant",
    courier_service_name: "Instant Delivery",
    company: "Grab",
    description: "Pengiriman same-day dalam kota",
    duration: "1-3 jam",
    shipment_duration_range: "1-3",
    shipment_duration_unit: "hours",
    service_type: "instant",
    shipping_type: "domestic",
    type: "instant",
    price: 18000,
    shipping_fee: 18000,
    shipping_fee_discount: 0,
    shipping_fee_surcharge: 0,
    insurance_fee: 0,
    cash_on_delivery_fee: 0,
    currency: "IDR",
    available_for_insurance: false,
    available_for_cash_on_delivery: false,
    available_for_proof_of_delivery: true,
    available_for_instant_waybill_id: true,
    available_collection_method: ["pickup"],
    tax_lines: [],
  },
  {
    courier_code: "jne",
    courier_name: "JNE",
    courier_service_code: "reg",
    courier_service_name: "Reguler",
    company: "JNE",
    description: "Estimasi 1-3 hari kerja",
    duration: "1-3 hari",
    shipment_duration_range: "1-3",
    shipment_duration_unit: "days",
    service_type: "regular",
    shipping_type: "domestic",
    type: "regular",
    price: 9000,
    shipping_fee: 9000,
    shipping_fee_discount: 0,
    shipping_fee_surcharge: 0,
    insurance_fee: 0,
    cash_on_delivery_fee: 0,
    currency: "IDR",
    available_for_insurance: true,
    available_for_cash_on_delivery: true,
    available_for_proof_of_delivery: true,
    available_for_instant_waybill_id: false,
    available_collection_method: ["pickup", "dropoff"],
    tax_lines: [],
  },
];

// ── Service ──────────────────────────────────────────────────────────────────

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
   * Ambil tarif pengiriman — MOCK sementara, BE belum menyediakan endpoint.
   *
   * TODO: Ganti dengan real API saat BE siap:
   * async getRates(data: BiteshipRateRequest): Promise<BiteshipCourier[]> {
   *   try {
   *     const res = await pubClient.post<any>("/biteship/rates/courier", data);
   *     const payload = res.data?.data ?? res.data;
   *     const pricing: BiteshipCourier[] = payload?.pricing ?? [];
   *     return Array.isArray(pricing) ? pricing : [];
   *   } catch (err) {
   *     console.error("[biteshipService] getRates error:", err);
   *     return [];
   *   }
   * }
   */
  async getRates(_data: BiteshipRateRequest): Promise<BiteshipCourier[]> {
    await new Promise((r) => setTimeout(r, 700));
    return MOCK_COURIERS;
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

/**
 * Biteship delivery service — MOCK MODE
 *
 * TODO: Aktifkan implementasi real ketika BE sudah menyediakan endpoint:
 *   - GET  /api/pub/biteship/areas?keyword=...
 *   - POST /api/pub/biteship/rates/courier
 *   - POST /api/pub/biteship/order/create
 *   - GET  /api/pub/biteship/orders/:id
 *   - GET  /api/pub/biteship/order/cancel/reason
 *   - POST /api/pub/biteship/order/cancel/:id
 *   - GET  /api/pub/biteship/order/tracking/:trackingId
 *
 * Untuk mengaktifkan real API: ganti setiap method dengan implementasi
 * yang dikomentari di bawah masing-masing method.
 */
import type {
  BiteshipArea,
  BiteshipCourier,
  BiteshipRateRequest,
  BiteshipOrderDetail,
  BiteshipTrackingResponse,
  BiteshipCancelReason,
} from "../types";

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_AREAS: BiteshipArea[] = [
  {
    id: "IDNP10IDNC107IDND3501IDN10000",
    name: "Gambir, Jakarta Pusat, DKI Jakarta",
    country_name: "Indonesia",
    country_code: "ID",
    administrative_division_level_1_name: "DKI Jakarta",
    administrative_division_level_2_name: "Jakarta Pusat",
    administrative_division_level_3_name: "Gambir",
    postal_code: "10110",
  },
  {
    id: "IDNP10IDNC107IDND3502IDN10001",
    name: "Menteng, Jakarta Pusat, DKI Jakarta",
    country_name: "Indonesia",
    country_code: "ID",
    administrative_division_level_1_name: "DKI Jakarta",
    administrative_division_level_2_name: "Jakarta Pusat",
    administrative_division_level_3_name: "Menteng",
    postal_code: "10310",
  },
  {
    id: "IDNP10IDNC108IDND3510IDN10010",
    name: "Kebayoran Baru, Jakarta Selatan, DKI Jakarta",
    country_name: "Indonesia",
    country_code: "ID",
    administrative_division_level_1_name: "DKI Jakarta",
    administrative_division_level_2_name: "Jakarta Selatan",
    administrative_division_level_3_name: "Kebayoran Baru",
    postal_code: "12110",
  },
  {
    id: "IDNP10IDNC108IDND3511IDN10011",
    name: "Mampang Prapatan, Jakarta Selatan, DKI Jakarta",
    country_name: "Indonesia",
    country_code: "ID",
    administrative_division_level_1_name: "DKI Jakarta",
    administrative_division_level_2_name: "Jakarta Selatan",
    administrative_division_level_3_name: "Mampang Prapatan",
    postal_code: "12790",
  },
  {
    id: "IDNP32IDNC3273IDND001IDN60001",
    name: "Cicendo, Bandung, Jawa Barat",
    country_name: "Indonesia",
    country_code: "ID",
    administrative_division_level_1_name: "Jawa Barat",
    administrative_division_level_2_name: "Bandung",
    administrative_division_level_3_name: "Cicendo",
    postal_code: "40171",
  },
  {
    id: "IDNP35IDNC3578IDND001IDN60001",
    name: "Gubeng, Surabaya, Jawa Timur",
    country_name: "Indonesia",
    country_code: "ID",
    administrative_division_level_1_name: "Jawa Timur",
    administrative_division_level_2_name: "Surabaya",
    administrative_division_level_3_name: "Gubeng",
    postal_code: "60281",
  },
];

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

const MOCK_CANCEL_REASONS: BiteshipCancelReason[] = [
  { code: "DRIVER_NOT_FOUND", reason: "Driver tidak ditemukan" },
  { code: "CUSTOMER_REQUEST", reason: "Permintaan pelanggan" },
  { code: "WRONG_ADDRESS", reason: "Alamat salah" },
  { code: "OTHER", reason: "Alasan lainnya" },
];

function mockDelay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Service ──────────────────────────────────────────────────────────────────

export const biteshipService = {
  /**
   * Cari area berdasarkan kata kunci (nama kota/kecamatan/kelurahan).
   */
  async searchAreas(keyword: string): Promise<BiteshipArea[]> {
    if (!keyword || keyword.trim().length < 3) return [];
    await mockDelay(400);
    const q = keyword.trim().toLowerCase();
    return MOCK_AREAS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.administrative_division_level_3_name.toLowerCase().includes(q) ||
        a.administrative_division_level_2_name.toLowerCase().includes(q) ||
        a.administrative_division_level_1_name.toLowerCase().includes(q)
    );

    // ── Real API (aktifkan saat BE siap) ──
    // try {
    //   const res = await pubClient.get<any>("/biteship/areas", {
    //     params: { keyword: keyword.trim() },
    //   });
    //   const payload = res.data?.data ?? res.data;
    //   const areas: BiteshipArea[] = payload?.areas ?? [];
    //   return Array.isArray(areas) ? areas : [];
    // } catch (err) {
    //   console.error("[biteshipService] searchAreas error:", err);
    //   return [];
    // }
  },

  /**
   * Ambil tarif pengiriman berdasarkan koordinat origin → destination.
   */
  async getRates(_data: BiteshipRateRequest): Promise<BiteshipCourier[]> {
    await mockDelay(800);
    return MOCK_COURIERS;

    // ── Real API (aktifkan saat BE siap) ──
    // try {
    //   const res = await pubClient.post<any>("/biteship/rates/courier", _data);
    //   const payload = res.data?.data ?? res.data;
    //   const pricing: BiteshipCourier[] = payload?.pricing ?? [];
    //   return Array.isArray(pricing) ? pricing : [];
    // } catch (err) {
    //   console.error("[biteshipService] getRates error:", err);
    //   return [];
    // }
  },

  /**
   * Buat order pengiriman di Biteship.
   */
  async createOrder(_data: Record<string, unknown>): Promise<any> {
    await mockDelay(1000);
    const mockOrderId = `MOCK-${Date.now()}`;
    return {
      id: mockOrderId,
      status: "confirmed",
      courier: {
        tracking_id: `TRK${Date.now()}`,
        waybill_id: null,
        company: "GoSend",
        name: "GoSend",
        phone: null,
        type: "instant",
        link: null,
        status: "confirmed",
        driver: null,
      },
      price: 15000,
      estimated_time_of_delivery: null,
      note: null,
    };

    // ── Real API (aktifkan saat BE siap) ──
    // const res = await pubClient.post<any>("/biteship/order/create", _data);
    // return res.data?.data ?? res.data;
  },

  /**
   * Ambil detail order Biteship.
   */
  async getOrder(biteshipOrderId: string): Promise<BiteshipOrderDetail | null> {
    await mockDelay(500);
    return {
      id: biteshipOrderId,
      status: "picking_up",
      price: 15000,
      estimated_time_of_delivery: null,
      note: null,
      courier: {
        tracking_id: `TRK${biteshipOrderId}`,
        waybill_id: null,
        company: "GoSend",
        name: "GoSend",
        phone: null,
        type: "instant",
        link: null,
        status: "picking_up",
        driver: {
          name: "Budi Santoso",
          phone: "081234567890",
          vehicle_type: "motor",
          vehicle_license_plate: "B 1234 XYZ",
        },
      },
      destination: {
        contact_name: "Pelanggan",
        contact_phone: "-",
        address: "Jl. Mock Destination No. 1",
        note: null,
        coordinate: null,
      },
    };

    // ── Real API (aktifkan saat BE siap) ──
    // try {
    //   const res = await pubClient.get<any>(`/biteship/orders/${biteshipOrderId}`);
    //   return res.data?.data ?? res.data ?? null;
    // } catch {
    //   return null;
    // }
  },

  /**
   * Ambil daftar alasan pembatalan order.
   */
  async getCancelReasons(): Promise<BiteshipCancelReason[]> {
    await mockDelay(300);
    return MOCK_CANCEL_REASONS;

    // ── Real API (aktifkan saat BE siap) ──
    // try {
    //   const res = await pubClient.get<any>("/biteship/order/cancel/reason");
    //   const payload = res.data?.data ?? res.data;
    //   const reasons: BiteshipCancelReason[] = payload?.cancellation_reasons ?? [];
    //   return Array.isArray(reasons) ? reasons : [];
    // } catch (err) {
    //   console.error("[biteshipService] getCancelReasons error:", err);
    //   return [];
    // }
  },

  /**
   * Batalkan order berdasarkan order ID.
   */
  async cancelOrder(
    _orderId: string,
    _data: { cancellation_reason_code: string; cancellation_reason: string }
  ): Promise<void> {
    await mockDelay(500);
    // ── Real API (aktifkan saat BE siap) ──
    // await pubClient.post(`/biteship/order/cancel/${_orderId}`, _data);
  },

  /**
   * Tracking order berdasarkan tracking ID.
   */
  async trackOrder(trackingId: string): Promise<BiteshipTrackingResponse | null> {
    await mockDelay(600);
    return {
      success: true,
      object: "order",
      id: trackingId,
      waybill_id: null,
      order_id: trackingId,
      status: "picking_up",
      link: null,
      courier: {
        company: "GoSend",
        name: "GoSend",
        phone: null,
        driver_name: "Budi Santoso",
        driver_phone: "081234567890",
      },
      origin: {
        contact_name: "Toko",
        address: "Jl. Mock Origin No. 1",
      },
      destination: {
        contact_name: "Pelanggan",
        address: "Jl. Mock Destination No. 1",
      },
      history: [
        {
          note: "Pesanan dikonfirmasi",
          service_type: "instant",
          status: "confirmed",
          updated_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          note: "Driver sedang menuju toko",
          service_type: "instant",
          status: "picking_up",
          updated_at: new Date().toISOString(),
        },
      ],
    };

    // ── Real API (aktifkan saat BE siap) ──
    // try {
    //   const res = await pubClient.get<any>(`/biteship/order/tracking/${trackingId}`);
    //   return res.data?.data ?? res.data ?? null;
    // } catch {
    //   return null;
    // }
  },
};

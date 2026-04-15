// ─────────────────────────────────────────────────────────────────────────────
// Biteship Delivery — Types
// ─────────────────────────────────────────────────────────────────────────────

// ── Area Search ────────────────────────────────────────────────────────────────
export interface BiteshipArea {
  id: string;
  name: string;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name: string; // Province
  administrative_division_level_1_type?: string;
  administrative_division_level_2_name: string; // City/Regency
  administrative_division_level_2_type?: string;
  administrative_division_level_3_name: string; // District
  administrative_division_level_3_type?: string;
  administrative_division_level_4_name?: string;
  administrative_division_level_4_type?: string;
  postal_code: number | string | null;
  // Catatan: Biteship areas API tidak mengembalikan koordinat
}

export interface BiteshipAreasResponse {
  success: boolean;
  areas: BiteshipArea[];
}

// ── Shipping Rate ──────────────────────────────────────────────────────────────
export interface BiteshipCourier {
  courier_code: string;
  courier_name: string;
  courier_service_code: string;
  courier_service_name: string;
  company: string;
  description: string;
  duration: string;
  shipment_duration_range: string;
  shipment_duration_unit: string;
  service_type: string;
  shipping_type: string;
  type: string;
  price: number;
  shipping_fee: number;
  shipping_fee_discount: number;
  shipping_fee_surcharge: number;
  insurance_fee: number;
  cash_on_delivery_fee: number;
  currency: string;
  available_for_insurance: boolean;
  available_for_cash_on_delivery: boolean;
  available_for_proof_of_delivery: boolean;
  available_for_instant_waybill_id: boolean;
  available_collection_method: string[];
  tax_lines: unknown[];
}

export interface BiteshipRatesResponse {
  success: boolean;
  origin: {
    area_id: string;
    latitude: number;
    longitude: number;
    postal_code: string;
  };
  destination: {
    area_id: string;
    latitude: number;
    longitude: number;
    postal_code: string;
  };
  pricing: BiteshipCourier[];
}

export interface BiteshipRateRequest {
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  items: {
    name: string;
    value: number;
    weight: number;
    quantity: number;
  }[];
}

// ── Order / Shipment ────────────────────────────────────────────────────────────
export type BiteshipOrderStatus =
  | "confirmed"
  | "allocated"
  | "picking_up"
  | "picked"
  | "dropping_off"
  | "delivered"
  | "rejected"
  | "cancelled"
  | "on_hold";

export interface BiteshipDriver {
  name: string;
  phone: string;
  photo_url?: string;
  vehicle_type?: string;
  vehicle_license_plate?: string;
  rating?: number;
}

export interface BiteshipOrderDetail {
  id: string;
  courier: {
    tracking_id: string | null;
    waybill_id: string | null;
    company: string;
    driver: BiteshipDriver | null;
    name: string;
    phone: string | null;
    type: string;
    link: string | null;
    status: BiteshipOrderStatus;
  };
  destination: {
    contact_name: string;
    contact_phone: string;
    address: string;
    note: string | null;
    coordinate: { latitude: number; longitude: number } | null;
  };
  estimated_time_of_delivery: string | null;
  price: number;
  status: BiteshipOrderStatus;
  note: string | null;
}

// ── Tracking ────────────────────────────────────────────────────────────────────
export interface BiteshipTrackingEvent {
  note: string;
  service_type: string;
  status: string;
  updated_at: string; // ISO date
}

export interface BiteshipTrackingResponse {
  success: boolean;
  object: string;
  id: string;
  waybill_id: string | null;
  order_id: string;
  status: BiteshipOrderStatus;
  link: string | null;
  courier: {
    company: string;
    name: string | null;
    phone: string | null;
    driver_name: string | null;
    driver_phone: string | null;
  };
  origin: {
    contact_name: string;
    address: string;
  };
  destination: {
    contact_name: string;
    address: string;
  };
  history: BiteshipTrackingEvent[];
}

// ── Cancel Reasons ──────────────────────────────────────────────────────────────
export interface BiteshipCancelReason {
  code: string;
  reason: string;
}

// ── Courier List ────────────────────────────────────────────────────────────────
export interface BiteshipCourierInfo {
  courier_code: string;
  courier_name: string;
  description: string;
  courier_service_code: string;
  courier_service_name: string;
  type: string;
}

// ── UI selection state ──────────────────────────────────────────────────────────
export interface DeliverySelection {
  destinationArea: BiteshipArea | null;
  selectedRate: BiteshipCourier | null;
  recipientAddress: string; // full street address / notes
}

// Status display labels & colors
export const DELIVERY_STATUS_MAP: Record<
  BiteshipOrderStatus,
  { label: string; color: string; bg: string }
> = {
  confirmed: { label: "Dikonfirmasi", color: "#D97706", bg: "#FEF3C7" },
  allocated: { label: "Mencari Driver", color: "#7C3AED", bg: "#EDE9FE" },
  picking_up: { label: "Driver Menuju Toko", color: "#2563EB", bg: "#DBEAFE" },
  picked: { label: "Pesanan Diambil", color: "#0891B2", bg: "#CFFAFE" },
  dropping_off: { label: "Dalam Perjalanan", color: "#059669", bg: "#D1FAE5" },
  delivered: { label: "Terkirim", color: "#16A34A", bg: "#DCFCE7" },
  rejected: { label: "Ditolak", color: "#DC2626", bg: "#FEE2E2" },
  cancelled: { label: "Dibatalkan", color: "#6B7280", bg: "#F3F4F6" },
  on_hold: { label: "Ditahan", color: "#D97706", bg: "#FEF3C7" },
};

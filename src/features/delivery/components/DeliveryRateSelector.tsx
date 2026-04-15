"use client";

import { useState, useEffect } from "react";
import { Truck, Loader2, AlertCircle, PackageX, ChevronRight, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { biteshipService } from "../services/biteship-service";
import type { BiteshipCourier, BiteshipArea } from "../types";

interface Props {
  originAreaId: string | null;
  destinationArea: BiteshipArea | null;
  items: { name: string; value: number; weight: number; quantity: number }[];
  selected: BiteshipCourier | null;
  onChange: (rate: BiteshipCourier | null) => void;
  originLat?: number | null;
  originLng?: number | null;
  destinationLat?: number | null;
  destinationLng?: number | null;
}

export function DeliveryRateSelector({
  destinationArea,
  items,
  selected,
  onChange,
  originLat,
  originLng,
  destinationLat,
  destinationLng,
}: Props) {
  const [rates, setRates] = useState<BiteshipCourier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Koordinat dari map picker — Biteship areas tidak mengembalikan lat/lng
  const dLat = destinationLat ?? null;
  const dLng = destinationLng ?? null;

  useEffect(() => {
    if (!destinationArea) {
      setRates([]);
      setError(null);
      onChange(null);
      return;
    }
    if (!originLat || !originLng) {
      setRates([]);
      setError("origin_missing");
      onChange(null);
      return;
    }
    if (!dLat || !dLng) {
      // Area dipilih tapi belum ada koordinat dari peta
      setRates([]);
      setError("map_required");
      onChange(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    onChange(null);

    biteshipService
      .getRates({
        origin_latitude: originLat,
        origin_longitude: originLng,
        destination_latitude: dLat,
        destination_longitude: dLng,
        items,
      })
      .then((couriers) => {
        if (cancelled) return;
        setRates(couriers);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Gagal memuat tarif pengiriman. Coba lagi.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationArea?.id, originLat, originLng, dLat, dLng]);

  if (!destinationArea) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed"
        style={{ borderColor: "rgba(124,74,30,0.18)", color: "#9C7D58" }}
      >
        <Truck className="h-4 w-4 shrink-0" />
        <span className="text-sm font-medium">Pilih alamat tujuan untuk melihat tarif</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-4 justify-center">
        <Loader2 className="h-5 w-5 animate-spin" style={{ color: "#D97706" }} />
        <span className="text-sm font-bold" style={{ color: "#9C7D58" }}>
          Menghitung tarif pengiriman...
        </span>
      </div>
    );
  }

  if (error === "origin_missing") {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl"
        style={{ backgroundColor: "#FEF3C7", color: "#92400E", border: "1.5px solid #FDE68A" }}
      >
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
        <span className="text-sm font-medium">Memuat lokasi toko...</span>
      </div>
    );
  }

  if (error === "map_required") {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed"
        style={{ borderColor: "rgba(124,74,30,0.18)", color: "#9C7D58" }}
      >
        <MapPin className="h-4 w-4 shrink-0" />
        <span className="text-sm font-medium">Tandai titik lokasi di peta untuk melihat tarif</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl"
        style={{ backgroundColor: "#FEE2E2", color: "#DC2626", border: "1.5px solid #FECACA" }}
      >
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span className="text-sm font-medium">{error}</span>
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed"
        style={{ borderColor: "rgba(124,74,30,0.18)", color: "#9C7D58" }}
      >
        <PackageX className="h-4 w-4 shrink-0" />
        <span className="text-sm font-medium">Tidak ada kurir tersedia untuk rute ini</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: "#9C7D58" }}>
        Pilih Layanan Pengiriman
      </p>
      {rates.map((rate) => {
        const key = `${rate.courier_code}-${rate.courier_service_code}`;
        const isSelected =
          selected?.courier_code === rate.courier_code &&
          selected?.courier_service_code === rate.courier_service_code;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(isSelected ? null : rate)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all active:scale-[0.98] text-left"
            style={{
              backgroundColor: isSelected ? "#FEF3C7" : "#FFF8EE",
              borderColor: isSelected ? "#F59E0B" : "rgba(124,74,30,0.12)",
            }}
          >
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: isSelected ? "#F59E0B" : "rgba(124,74,30,0.08)",
                color: isSelected ? "#1C0A00" : "#6B4C2A",
              }}
            >
              <Truck className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-black" style={{ color: "#1C0A00" }}>
                {rate.courier_name} — {rate.courier_service_name}
              </p>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: "#9C7D58" }}>
                {rate.description || rate.duration}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5">
              <span
                className="text-sm font-black tabular-nums"
                style={{ color: isSelected ? "#92400E" : "#1C0A00" }}
              >
                {formatCurrency(rate.price)}
              </span>
              <ChevronRight
                className="h-4 w-4"
                style={{ color: isSelected ? "#D97706" : "#9C7D58" }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

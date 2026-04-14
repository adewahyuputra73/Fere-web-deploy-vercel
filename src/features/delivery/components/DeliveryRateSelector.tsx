"use client";

import { useState, useEffect } from "react";
import { Truck, Loader2, AlertCircle, Clock, ChevronRight } from "lucide-react";
import { biteshipService } from "../services/biteship-service";
import { formatCurrency } from "@/lib/utils/format";
import type { BiteshipCourier, BiteshipArea } from "../types";

interface Props {
  originAreaId: string | null;
  destinationArea: BiteshipArea | null;
  items: { name: string; value: number; weight: number; quantity: number }[];
  selected: BiteshipCourier | null;
  onChange: (rate: BiteshipCourier | null) => void;
}

export function DeliveryRateSelector({
  originAreaId,
  destinationArea,
  items,
  selected,
  onChange,
}: Props) {
  const [rates, setRates] = useState<BiteshipCourier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!originAreaId || !destinationArea) {
      setRates([]);
      onChange(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setRates([]);
    onChange(null);

    biteshipService
      .getRates({
        origin_area_id: originAreaId,
        destination_area_id: destinationArea.id,
        items: items.map((item) => ({
          name: item.name,
          value: item.value,
          length: 10,
          width: 10,
          height: 10,
          weight: item.weight || 200, // gram default 200g per item
          quantity: item.quantity,
        })),
      })
      .then((pricing) => {
        if (!cancelled) {
          setRates(pricing);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Gagal memuat tarif pengiriman");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originAreaId, destinationArea?.id]);

  if (!originAreaId || !destinationArea) {
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
          Memuat tarif pengiriman...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl border"
        style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#DC2626" }}
      >
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span className="text-sm font-bold">{error}</span>
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <div
        className="text-center py-4 px-4 rounded-2xl border"
        style={{ borderColor: "rgba(124,74,30,0.12)", color: "#9C7D58" }}
      >
        <p className="text-sm font-bold">Tidak ada kurir tersedia</p>
        <p className="text-xs mt-1">Coba ubah area tujuan</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: "#9C7D58" }}>
        Pilih Layanan Pengiriman
      </p>
      {rates.map((rate) => {
        const isSelected =
          selected?.courier_code === rate.courier_code &&
          selected?.courier_service_code === rate.courier_service_code;

        return (
          <button
            key={`${rate.courier_code}-${rate.courier_service_code}`}
            type="button"
            onClick={() => onChange(isSelected ? null : rate)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all active:scale-[0.98] text-left"
            style={{
              backgroundColor: isSelected ? "#FEF3C7" : "#FFF8EE",
              borderColor: isSelected ? "#F59E0B" : "rgba(124,74,30,0.12)",
            }}
          >
            {/* Courier icon placeholder */}
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 font-black text-xs"
              style={{
                backgroundColor: isSelected ? "#F59E0B" : "rgba(124,74,30,0.08)",
                color: isSelected ? "#1C0A00" : "#6B4C2A",
              }}
            >
              {rate.courier_name?.slice(0, 2).toUpperCase() || "JK"}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-black" style={{ color: "#1C0A00" }}>
                {rate.courier_name} — {rate.courier_service_name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <Clock className="h-3 w-3 shrink-0" style={{ color: "#9C7D58" }} />
                <span className="text-[11px] font-medium" style={{ color: "#9C7D58" }}>
                  {rate.duration || "Estimasi tidak tersedia"}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1.5">
              <span className="text-sm font-black tabular-nums" style={{ color: isSelected ? "#92400E" : "#1C0A00" }}>
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

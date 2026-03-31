"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
} from "@/components/ui";
import { useToast } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Save,
  ToggleLeft,
  ToggleRight,
  Percent,
} from "lucide-react";
import { TaxSettings } from "../types";

interface TaxReceiptSettingsFormProps {
  taxSettings: TaxSettings;
  onSaveTax: (data: TaxSettings) => void;
}

export function TaxReceiptSettingsForm({
  taxSettings,
  onSaveTax,
}: TaxReceiptSettingsFormProps) {
  const { showToast } = useToast();
  const [tax, setTax] = useState<TaxSettings>({ ...taxSettings });
  const [isSavingTax, setIsSavingTax] = useState(false);

  const handleSaveTax = async () => {
    setIsSavingTax(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSaveTax(tax);
    showToast("Pengaturan pajak berhasil disimpan", "success");
    setIsSavingTax(false);
  };

  return (
    <div className="space-y-6">
      {/* Tax Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-warning-light flex items-center justify-center">
              <Percent className="h-5 w-5 text-warning" />
            </div>
            <div>
              <CardTitle className="text-base">Pengaturan Pajak</CardTitle>
              <CardDescription>Konfigurasi pajak dan biaya layanan</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Tax toggle */}
          <ToggleRow
            label="Aktifkan Pajak"
            description="Terapkan pajak pada setiap transaksi"
            enabled={tax.is_tax_enabled}
            onToggle={() => setTax((prev) => ({ ...prev, is_tax_enabled: !prev.is_tax_enabled }))}
          />

          {tax.is_tax_enabled && (
            <div className="pl-4 border-l-2 border-primary/20 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nama Pajak"
                  value={tax.tax_name}
                  onChange={(e) => setTax((prev) => ({ ...prev, tax_name: e.target.value }))}
                  placeholder="PPN"
                />
                <Input
                  label="Tarif Pajak (%)"
                  type="number"
                  value={tax.tax_rate.toString()}
                  onChange={(e) => setTax((prev) => ({ ...prev, tax_rate: parseFloat(e.target.value) || 0 }))}
                  placeholder="11"
                />
              </div>
              <ToggleRow
                label="Pajak Inklusif"
                description="Harga produk sudah termasuk pajak"
                enabled={tax.is_tax_inclusive}
                onToggle={() => setTax((prev) => ({ ...prev, is_tax_inclusive: !prev.is_tax_inclusive }))}
              />
              <Input
                label="Nomor NPWP"
                value={tax.tax_id_number}
                onChange={(e) => setTax((prev) => ({ ...prev, tax_id_number: e.target.value }))}
                placeholder="XX.XXX.XXX.X-XXX.XXX"
              />
            </div>
          )}

          {/* Service charge */}
          <div className="border-t border-divider pt-5">
            <ToggleRow
              label="Biaya Layanan (Service Charge)"
              description="Terapkan biaya layanan pada setiap transaksi"
              enabled={tax.is_service_charge_enabled}
              onToggle={() => setTax((prev) => ({ ...prev, is_service_charge_enabled: !prev.is_service_charge_enabled }))}
            />
            {tax.is_service_charge_enabled && (
              <div className="pl-4 border-l-2 border-primary/20 mt-4">
                <Input
                  label="Tarif Biaya Layanan (%)"
                  type="number"
                  value={tax.service_charge_rate.toString()}
                  onChange={(e) => setTax((prev) => ({ ...prev, service_charge_rate: parseFloat(e.target.value) || 0 }))}
                  placeholder="5"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSaveTax} isLoading={isSavingTax}>
              <Save className="h-4 w-4" />
              Simpan Pajak
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="text-xs text-text-secondary mt-0.5">{description}</p>}
      </div>
      <button type="button" onClick={onToggle} className="flex-shrink-0">
        {enabled ? (
          <ToggleRight className="h-7 w-7 text-success" />
        ) : (
          <ToggleLeft className="h-7 w-7 text-text-disabled" />
        )}
      </button>
    </div>
  );
}

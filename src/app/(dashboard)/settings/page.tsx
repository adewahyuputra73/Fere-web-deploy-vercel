"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { Store, Clock, Receipt, CreditCard, Globe, Printer } from "lucide-react";
import {
  StoreInfoForm,
  OperatingHoursForm,
  TaxReceiptSettingsForm,
  PaymentMethodsConfig,
} from "@/features/store-settings/components";
import { useStoreSettingsStore } from "@/stores/storeSettingsStore";
import { storeSettingsService } from "@/features/store-settings/services/store-settings-service";
import type { UpdateStoreRequest } from "@/features/store-settings";
import {
  GeneralSettingsForm,
  PrinterSettingsForm,
} from "@/features/settings/components";
import { useSettingsStore } from "@/stores/settingsStore";

const SECTIONS = [
  { id: "store-info",      label: "Informasi Toko",  icon: Store },
  { id: "operating-hours", label: "Jam Operasional", icon: Clock },
  { id: "tax-receipt",     label: "Pajak & Struk",   icon: Receipt },
  { id: "payment-methods", label: "Pembayaran",      icon: CreditCard },
  { id: "general",         label: "Umum",            icon: Globe },
  { id: "printer",         label: "Printer",         icon: Printer },
];

function SectionHeader({ id, icon: Icon, label }: { id: string; icon: React.ElementType; label: string }) {
  return (
    <div id={id} className="flex items-center gap-2 mb-5">
      <Icon className="h-4 w-4 text-primary" />
      <h2 className="text-base font-bold text-text-primary">{label}</h2>
      <div className="flex-1 h-px bg-border ml-2" />
    </div>
  );
}

export default function SettingsPage() {
  const [loadingStore, setLoadingStore] = useState(true);
  const storeInfo       = useStoreSettingsStore((s) => s.storeInfo);
  const operatingHours  = useStoreSettingsStore((s) => s.operatingHours);
  const taxSettings     = useStoreSettingsStore((s) => s.taxSettings);
  const paymentMethods  = useStoreSettingsStore((s) => s.paymentMethods);
  const updateStoreInfo        = useStoreSettingsStore((s) => s.updateStoreInfo);
  const updateOperatingHours   = useStoreSettingsStore((s) => s.updateOperatingHours);
  const updateTaxSettings      = useStoreSettingsStore((s) => s.updateTaxSettings);
  const updatePaymentMethods   = useStoreSettingsStore((s) => s.updatePaymentMethods);

  useEffect(() => {
    storeSettingsService.my()
      .then((data) => updateStoreInfo(data))
      .catch(() => {})
      .finally(() => setLoadingStore(false));
  }, [updateStoreInfo]);

  const handleSaveStoreInfo = async (data: UpdateStoreRequest) => {
    const updated = await storeSettingsService.update(data);
    updateStoreInfo(updated);
  };

  const general       = useSettingsStore((s) => s.general);
  const printer       = useSettingsStore((s) => s.printer);
  const updateGeneral = useSettingsStore((s) => s.updateGeneral);
  const updatePrinter = useSettingsStore((s) => s.updatePrinter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pengaturan"
        description="Kelola semua pengaturan toko dan aplikasi"
        breadcrumbs={[{ label: "Pengaturan" }]}
      />

      {/* Quick nav anchors */}
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary bg-surface border border-border hover:text-primary hover:border-primary transition-colors"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </a>
        ))}
      </div>

      <div className="space-y-10">

        <section>
          <SectionHeader id="store-info" icon={Store} label="Informasi Toko" />
          <div className="max-w-3xl">
            {loadingStore ? (
              <div className="flex items-center justify-center h-32">
                <div className="h-7 w-7 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <StoreInfoForm store={storeInfo} onSave={handleSaveStoreInfo} />
            )}
          </div>
        </section>

        <section>
          <SectionHeader id="operating-hours" icon={Clock} label="Jam Operasional" />
          <div className="max-w-3xl">
            <OperatingHoursForm hours={operatingHours} onSave={updateOperatingHours} />
          </div>
        </section>

        <section>
          <SectionHeader id="tax-receipt" icon={Receipt} label="Pajak & Struk" />
          <div className="max-w-3xl">
            <TaxReceiptSettingsForm
              taxSettings={taxSettings}
              onSaveTax={updateTaxSettings}
            />
          </div>
        </section>

        <section>
          <SectionHeader id="payment-methods" icon={CreditCard} label="Pembayaran" />
          <div className="max-w-3xl">
            <PaymentMethodsConfig methods={paymentMethods} onSave={updatePaymentMethods} />
          </div>
        </section>

        <section>
          <SectionHeader id="general" icon={Globe} label="Umum" />
          <div className="max-w-3xl">
            <GeneralSettingsForm settings={general} onSave={updateGeneral} />
          </div>
        </section>

        <section>
          <SectionHeader id="printer" icon={Printer} label="Printer" />
          <div className="max-w-3xl">
            <PrinterSettingsForm settings={printer} onSave={updatePrinter} />
          </div>
        </section>

      </div>
    </div>
  );
}

"use client";

import { Download, QrCode, X } from "lucide-react";
import { Button } from "@/components/ui";
import type { Table } from "../types";

interface QrPreviewDialogProps {
  table: Table;
  onClose: () => void;
}

export function QrPreviewDialog({ table, onClose }: QrPreviewDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-sm p-6 text-center relative animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-disabled hover:text-text-secondary">
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold text-text-primary mb-2">QR Code Meja {table.name}</h3>
        <p className="text-xs text-text-secondary mb-6">{table.area?.name || ""}</p>

        <div className="mx-auto w-48 h-48 bg-background rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
          <div className="text-center">
            <QrCode className="h-16 w-16 text-text-disabled mx-auto mb-2" />
            <p className="text-[10px] text-text-disabled font-mono break-all px-2">{table.qr_code}</p>
          </div>
        </div>

        <p className="text-xs text-text-disabled mb-4">
          URL: <span className="font-mono text-text-secondary">{table.qr_code}</span>
        </p>

        <Button className="w-full gap-2">
          <Download className="h-4 w-4" /> Unduh QR (PNG)
        </Button>
      </div>
    </div>
  );
}

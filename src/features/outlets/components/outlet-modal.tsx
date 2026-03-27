"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input } from "@/components/ui";
import { useToast } from "@/components/ui";
import type { Outlet } from "../types";

interface OutletModalProps {
  outlet?: Outlet;
  onClose: () => void;
  onSave: (data: { name: string; address: string; phone_number?: string }) => Promise<void>;
}

export function OutletModal({ outlet, onClose, onSave }: OutletModalProps) {
  const [name, setName] = useState(outlet?.name ?? "");
  const [address, setAddress] = useState(outlet?.address ?? "");
  const [phone, setPhone] = useState(outlet?.phone_number ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave({ name, address, phone_number: phone || undefined });
      showToast(outlet ? "Cabang berhasil diperbarui" : "Cabang berhasil ditambahkan", "success");
      onClose();
    } catch {
      showToast("Gagal menyimpan cabang", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 pb-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">
            {outlet ? "Edit Cabang" : "Tambah Cabang"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Cabang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Cabang Utama"
              required
            />
            <Input
              label="Alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat lengkap cabang"
              required
            />
            <Input
              label="Nomor Telepon (opsional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+62 xxx-xxxx-xxxx"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                {outlet ? "Simpan Perubahan" : "Tambah Cabang"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

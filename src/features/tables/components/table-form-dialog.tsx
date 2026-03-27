"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import type { Table, Area, CreateTableRequest } from "../types";

interface TableFormDialogProps {
  initialData?: Table;
  areas: Area[];
  onSubmit: (data: CreateTableRequest) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function TableFormDialog({ initialData, areas, onSubmit, onCancel, isEditing }: TableFormDialogProps) {
  const [form, setForm] = useState<CreateTableRequest>({
    name: initialData?.name || "",
    area_id: initialData?.area_id || (areas[0]?.id || ""),
    capacity: initialData?.capacity || 4,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Nama meja wajib diisi";
    if (form.name.length > 5) errs.name = "Maksimal 5 karakter";
    if (form.capacity < 1 || form.capacity > 99) errs.capacity = "Kapasitas 1-99";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={onCancel} className="absolute top-4 right-4 text-text-disabled hover:text-text-secondary">
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold text-text-primary mb-5">
          {isEditing ? "Ubah Meja" : "Tambah Meja"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Nama Meja * <span className="text-text-disabled">(maks 5 karakter)</span>
            </label>
            <Input
              value={form.name}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="1"
              maxLength={5}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">Area *</label>
            <Select value={form.area_id} onValueChange={(v) => setForm((prev) => ({ ...prev, area_id: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {areas.filter((a) => a.is_active).map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">Kapasitas</label>
            <Input
              type="number"
              value={form.capacity}
              onChange={(e) => setForm((prev) => ({ ...prev, capacity: Number(e.target.value) }))}
              min={1}
              max={99}
              className={errors.capacity ? "border-red-500" : ""}
            />
            {errors.capacity && <p className="text-xs text-red-500 mt-1">{errors.capacity}</p>}
          </div>
          <div className="flex gap-3 mt-6">
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              {isEditing ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

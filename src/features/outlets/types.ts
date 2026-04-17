export type OutletOperatingHours = {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
};

export interface Outlet {
  id: string;
  store_id: string;
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  phone_number?: string;
  is_active: boolean;
  operating_hours?: OutletOperatingHours;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOutletRequest {
  name: string;
  address: string;
  phone_number?: string;
  latitude?: number;
  longitude?: number;
  operating_hours?: OutletOperatingHours;
}

export interface UpdateOutletRequest {
  name?: string;
  address?: string;
  phone_number?: string;
  latitude?: number;
  longitude?: number;
  operating_hours?: OutletOperatingHours;
}

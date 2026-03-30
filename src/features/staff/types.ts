// Staff Management types — confirmed from API response

export interface StaffRole {
  id: string;
  name: string;
  description: string;
}

export interface StaffRoleAssignment {
  user_role_id: string;
  role_id: string;
  role_name: string;
  outlet_id: string | null;
  outlet_name: string | null;
}

export type StaffStatus = "AKTIF" | "NONAKTIF" | "BELUM_REGISTRASI";

export interface StaffMember {
  id: string;
  full_name: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  status: StaffStatus;
  roles: StaffRoleAssignment[];
}

export interface StaffListResponse {
  total: number;
  page: number;
  totalPages: number;
  data: StaffMember[];
}

export interface CreateStaffRequest {
  full_name: string;
  phone_number: string;
  role_id: string;
}

export interface CreateStaffResponse {
  staff_id: string;
  phone_number: string;
  full_name: string;
  role_name: string;
  status: StaffStatus;
  is_new_account: boolean;
}

export interface UpdateStaffRequest {
  role_id: string;
}

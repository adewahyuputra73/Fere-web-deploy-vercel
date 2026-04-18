import apiClient from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types";
import type {
  StaffMember,
  StaffRole,
  StaffListResponse,
  CreateStaffRequest,
  CreateStaffResponse,
  UpdateStaffRequest,
} from "../types";

export const staffService = {
  async list(): Promise<StaffListResponse> {
    const response = await apiClient.get<{ status: string; total: number; page: number; totalPages: number; data: StaffMember[] }>(
      ENDPOINTS.STAFF.LIST
    );
    return {
      total: response.data.total,
      page: response.data.page,
      totalPages: response.data.totalPages,
      data: response.data.data,
    };
  },

  async listAll(): Promise<StaffListResponse> {
    const response = await apiClient.get<{ status: string; total: number; page: number; totalPages: number; data: StaffMember[] }>(
      ENDPOINTS.STAFF.ALL
    );
    return {
      total: response.data.total,
      page: response.data.page,
      totalPages: response.data.totalPages,
      data: response.data.data,
    };
  },

  async roles(): Promise<StaffRole[]> {
    const response = await apiClient.get<ApiResponse<StaffRole[]>>(
      ENDPOINTS.STAFF.ROLES
    );
    return response.data.data;
  },

  async create(data: CreateStaffRequest): Promise<CreateStaffResponse> {
    const response = await apiClient.post<ApiResponse<CreateStaffResponse>>(
      ENDPOINTS.STAFF.CREATE,
      data
    );
    return response.data.data;
  },

  async update(id: string, data: UpdateStaffRequest): Promise<void> {
    await apiClient.put(ENDPOINTS.STAFF.UPDATE(id), data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.STAFF.DELETE(id));
  },
};

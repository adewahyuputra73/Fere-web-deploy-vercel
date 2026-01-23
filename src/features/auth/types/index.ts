// Auth feature types
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "cashier" | "manager";
    avatar?: string;
    phone?: string;
  };
  token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

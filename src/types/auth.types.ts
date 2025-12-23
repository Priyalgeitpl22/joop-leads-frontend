export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  orgName?: string;
  industry?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  email: string;
}

export interface ChangePasswordData {
  email: string;
  existingPassword: string;
  newPassword: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}

export interface ActivateAccountData {
  token: string;
  password: string;
  email: string;
}

export interface AuthResponse {
  code: number;
  message: string;
  token?: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    orgId: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}


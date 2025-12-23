import { api } from './api';
import Cookies from 'js-cookie';
import { config } from '../config';
import type { LoginCredentials, RegisterData, AuthResponse, ForgotPasswordData, ResetPasswordData, ChangePasswordData, VerifyOtpData, ResendOtpData, ActivateAccountData } from '../types/auth.types';

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email: credentials.email.toLowerCase(),
      password: credentials.password,
    });
    
    if (response.data.token) {
      Cookies.set(config.auth.tokenKey, response.data.token, {
        expires: 7, // 7 days
        secure: true,
        sameSite: 'strict',
      });
    }
    
    return response.data;
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      ...data,
      email: data.email.toLowerCase(),
    });
    return response.data;
  },

  /**
   * Logout user - calls API and clears local state
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Silently fail - we still want to clear local state
      console.error('Logout API call failed:', error);
    } finally {
      Cookies.remove(config.auth.tokenKey);
    }
  },

  /**
   * Clear local auth state only (used by interceptors on 401/403)
   * Does not call logout API to avoid infinite loops
   */
  clearLocalAuth(): void {
    Cookies.remove(config.auth.tokenKey);
  },

  /**
   * Request password reset
   */
  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const response = await api.post('/auth/forget-password', {
      email: data.email.toLowerCase(),
    });
    return response.data;
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  /**
   * Verify OTP
   */
  async verifyOtp(data: VerifyOtpData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/verify-otp', {
      email: data.email.toLowerCase(),
      otp: data.otp,
    });
    
    if (response.data.token) {
      Cookies.set(config.auth.tokenKey, response.data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }
    
    return response.data;
  },

  /**
   * Resend OTP
   */
  async resendOtp(data: ResendOtpData): Promise<{ message: string }> {
    const response = await api.post('/auth/resend-otp', {
      email: data.email.toLowerCase(),
    });
    return response.data;
  },

  /**
   * Change password (authenticated)
   */
  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },

  /**
   * Activate account with token
   */
  async activateAccount(data: ActivateAccountData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/activate', data);
    
    if (response.data.token) {
      Cookies.set(config.auth.tokenKey, response.data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }
    
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!Cookies.get(config.auth.tokenKey);
  },

  /**
   * Get auth token
   */
  getToken(): string | undefined {
    return Cookies.get(config.auth.tokenKey);
  },
};

export default authService;

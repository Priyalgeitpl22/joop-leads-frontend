// Common types used across the application

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// Status types
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}


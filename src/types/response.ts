export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems?: number;
  hasNext: boolean;
  hasPrev: boolean;
}

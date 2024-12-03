// Enum types
export enum UserRole {
  Creator = "creator",
  Customer = "customer",
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
}

export enum TransactionStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
}

export interface ApiError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}


export interface ResetTokenRequest {
  email?: string;
  phone_number?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
  email?: string;
  phone_number?: string;
}

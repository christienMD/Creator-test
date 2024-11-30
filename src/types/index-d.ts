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

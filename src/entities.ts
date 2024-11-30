// entities.ts

// Enum types
export enum UserRole {
  Admin = "admin",
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

// Interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profile_pic: string;
  bio: string;
  created_at: Date;
  updated_at: Date;
}

export interface Invoice {
  id: number;
  transaction_id: number;
  user_id: number;
  invoice_num: number;
  amount: number;
  created_at: Date;
}

export interface Content {
  id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  preview: string;
  content_url: string;
  thumbnail: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: number;
  transaction_id: number;
  method: string;
  amount: number;
  status: PaymentStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  id: number;
  user_id: number;
  content_id: number;
  total_amount: number;
  platform_fee: number;
  status: TransactionStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Rating {
  id: number;
  user_id: number;
  content_id: number;
  stars: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Cart {
  id: number;
  user_id: number;
  content_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface PlatformRevenue {
  id: number;
  transaction_id: number;
  admin_fee: number;
  total_revenue: number;
  created_at: Date;
  updated_at: Date;
}

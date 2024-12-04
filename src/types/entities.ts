/* eslint-disable @typescript-eslint/no-explicit-any */
// entities.ts

import { PaymentStatus, TransactionStatus, UserRole } from "./index-d";

export type FetchHeaderType = {
  Authorization: string;
  "Content-Type"?: string;
  Accept?: string;
};

export type LoginEntity = {
  email?: string;
  phone_number?: string;
  password?: string;
};

export type CheckoutEntity = {
  phone_number: string;
  product_ids: number[];
};


export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_pic: string | null;
  bio: string | null;
  role: "customer" | "admin" | "creator";
  token: string;
  relationships: {
    roles: string[];
  };
}

export type RegistrationEntity =
  | FormData
  | {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
      role: "creator" | "customer";
      profile_pic?: File;
      bio?: string;
    };

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

export interface Creator {
  id: number;
  name: string;
  email: string;
  profile_pic: string | null;
  bio: string;
  created_at: string;
  updated_at: string;
  relationships: {
    products: Product[];
    media: Media[];
  };
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: "preview_videos" | "thumbnails" | "banners";
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface ProductItem {
  id: number;
  title: string;
  description: string;
  is_downloadable: number;
  order: number;
  relationships: {
    category?: Category;
    media?: Media[];
  };
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  relationships: {
    creator: Creator;
    category: Category;
    ratings: Rating[];
    product_items: ProductItem[];
    media: Media[];
  };
}

export interface PaginatedApiResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface ApiResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface Invoice {
  id: number;
  transaction_id: number;
  user_id: number;
  invoice_num: number;
  amount: number;
  created_at: Date;
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

export interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  author: string;
  rating: number;
}

export interface PlatformRevenue {
  id: number;
  transaction_id: number;
  admin_fee: number;
  total_revenue: number;
  created_at: Date;
  updated_at: Date;
}

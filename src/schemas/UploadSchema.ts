// types/product.ts
import { z } from "zod";
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ProductItemSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  is_downloadable: z.boolean().default(true),
  order: z.coerce.number().min(0, "Order must be a positive number"),
  category_id: z.string().min(1, "Category is required"),
  media: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Media must be a valid file",
    })
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    ),
});

export const Step1FormSchema = z.object({
  title: z.string().min(70, "Title must be at least 70 characters").max(255),
  description: z.string().max(225).optional(),
  price: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Price must be a valid number with up to 2 decimal places"
    ),
  category_id: z.string().min(1, "Category is required"),
  banner: z.any().refine((value) => value instanceof File || value === null, {
    message: "Banner image is required",
  }),
  thumbnail: z
    .any()
    .refine((value) => value instanceof File || value === null, {
      message: "Thumbnail image is required",
    }),
  preview_video: z.any().optional(),
  product_items: z.array(z.any()).optional(),
});

export const UploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z.string().optional(),
  price: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Price must be a valid number with up to 2 decimal places"
    ),
  category_id: z.string().min(1, "Category is required"),
  banner: z.any(),
  thumbnail: z.any(),
  preview_video: z.any().optional(),
  product_items: z
    .array(ProductItemSchema)
    .min(1, "At least one product item is required")
    .max(10, "Maximum 10 items allowed"), // Optional: add max limit
});

export type UploadFormValues = z.infer<typeof UploadFormSchema>;

export interface FilePreview {
  url: string;
  file: File;
}

export const FileTypes = {
  image: ".jpg,.jpeg,.png",
  video: ".mp4,.mov,.avi",
  audio: ".mp3,.wav",
  pdf: "application/pdf",
  zip: ".zip,.rar",
  course: "",
  link: "",
} as const;

// export const FileTypes = {
//   image: ".jpg,.jpeg,.png",
//   video: ".mp4,.mov,.avi",
//   audio: ".mp3,.wav",
//   pdf: ".pdf",
//   zip: ".zip,.rar",
//   course: "",
//   link: "",
// } as const;

// import { z } from "zod";

// export const ProductItemSchema = z.object({
//   title: z.string().min(1, "Title is required").max(255),
//   description: z.string().optional(),
//   is_downloadable: z.boolean().default(false),
//   order: z.coerce.number().min(0).default(0),
//   category_id: z.string().min(1, "Category is required"),
//   media: z.any().optional(),
// });

// export const UploadFormSchema = z.object({
//   title: z.string().min(3).max(255),
//   description: z.string().optional(),
//   price: z.string().regex(/^\d+(\.\d{1,2})?$/),
//   category_id: z.string().min(1, "Category is required"),
//   banner: z.any(),
//   thumbnail: z.any(),
//   preview_video: z.any().optional(),
//   product_items: z
//     .array(ProductItemSchema)
//     .min(1, "At least one product item is required"),
// });

// // types/product.ts
// import { z } from "zod";
// export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// export const ProductItemSchema = z.object({
//   title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
//   description: z.string().optional(),
//   is_downloadable: z.boolean().default(false),
//   order: z.coerce.number().min(0, "Order must be a positive number"),
//   category_id: z.string().min(1, "Category is required"),
//   media: z.any()
//     .refine((file) => file instanceof File || file === null, {
//       message: "Media must be a valid file",
//     })
//     .refine(
//       (file) => !file || file.size <= MAX_FILE_SIZE,
//       `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
//     ),
// });

// // export const Step1FormSchema = z.object({
// //   title: z.string().min(50, "Title must be at least 50 characters").max(100),
// //   description: z.string().optional(),
// //   price: z
// //     .string()
// //     .regex(
// //       /^\d+(\.\d{1,2})?$/,
// //       "Price must be a valid number with up to 2 decimal places"
// //     ),
// //   category_id: z.string().min(1, "Category is required"),
// //   banner: z.any(),
// //   thumbnail: z.any(),
// //   preview_video: z.any().optional(),
// //   product_items: z.array(ProductItemSchema).default([]),
// // });

// export const Step1FormSchema = z.object({
//   title: z.string().min(50, "Product title must be at least 50 characters")
//     .max(255, "Product title must be less than 255 characters"),
//   description: z.string().optional(),
//   price: z.string()
//     .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number with up to 2 decimal places"),
//   category_id: z.string().min(1, "Please select a product category"),
//   banner: z.any()
//     .refine(value => value instanceof File || value === null, {
//       message: "Banner image is required"
//     }),
//   thumbnail: z.any()
//     .refine(value => value instanceof File || value === null, {
//       message: "Thumbnail image is required"
//     }),
//   preview_video: z.any().optional(),
//   product_items: z.array(z.any()).default([])
// });

// export const UploadFormSchema = z.object({
//   title: z.string().min(3).max(255),
//   description: z.string().optional(),
//   price: z.string().regex(/^\d+(\.\d{1,2})?$/),
//   category_id: z.string().min(1, "Category is required"),
//   banner: z.any(),
//   thumbnail: z.any(),
//   preview_video: z.any().optional(),
//   product_items: z
//     .array(ProductItemSchema)
//     .min(1, "At least one product item is required"),
// });

// export type UploadFormValues = z.infer<typeof UploadFormSchema>;

// export interface FilePreview {
//   url: string;
//   file: File;
// }

// export const FileTypes = {
//   image: ".jpg,.jpeg,.png",
//   video: ".mp4,.mov,.avi",
//   audio: ".mp3,.wav",
//   pdf: ".pdf",
//   zip: ".zip,.rar",
//   course: "",
//   link: "",
// } as const;

// import { z } from "zod";

// export const ProductItemSchema = z.object({
//   title: z.string().min(1, "Title is required").max(255),
//   description: z.string().optional(),
//   is_downloadable: z.boolean().default(false),
//   order: z.coerce.number().min(0).default(0),
//   category_id: z.string().min(1, "Category is required"),
//   media: z.any().optional(),
// });

// export const UploadFormSchema = z.object({
//   title: z.string().min(3).max(255),
//   description: z.string().optional(),
//   price: z.string().regex(/^\d+(\.\d{1,2})?$/),
//   category_id: z.string().min(1, "Category is required"),
//   banner: z.any(),
//   thumbnail: z.any(),
//   preview_video: z.any().optional(),
//   product_items: z
//     .array(ProductItemSchema)
//     .min(1, "At least one product item is required"),
// });

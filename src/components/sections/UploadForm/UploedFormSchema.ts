import { z } from "zod";

export const UploadFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .nonempty({ message: "Title is required." }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number." })
    .optional(),
  category_id: z
    .number({ invalid_type_error: "Product category must be selected." })
    .positive({ message: "Please select a valid category." }),
  file: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "A product file must be uploaded.",
      }
    ),
  // preview_video: z
  //   .any()
  //   .refine(
  //     (file) =>
  //       file instanceof File || (typeof file === "string" && file.length > 0),
  //     {
  //       message: "Preview video must be a valid file.",
  //     }
  //   )
  //   .optional(),
  banner: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "Banner image must be a valid file.",
      }
    )
    .optional(),
  thumbnail: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "Thumbnail image must be a valid file.",
      }
    )
    .optional(),
  description: z.string(),
  product_items:z.array(z.object(
    {
      title: z.string(),
      description: z.string(),
      is_downloadable: z.boolean(),
      order: z.number(),
      category_id: z.string(),
      media: z.array(z.any()),
    }
  ))
});

export type UploadFormValues = z.infer<typeof UploadFormSchema>;
import { z } from "zod";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// Define valid file categories
const FileCategories = ['image', 'video', 'audio', 'pdf', 'zip'] as const;
type FileCategory = typeof FileCategories[number];
// Define MIME types for each category
const FileTypes = {
  image: ['image/jpeg', 'image/png', 'image/jpg'] as const,
  video: ['video/mp4', 'video/quicktime', 'video/x-msvideo'] as const,
  audio: ['audio/mpeg', 'audio/wav'] as const,
  pdf: ['application/pdf'] as const,
  zip: [
    'application/zip',
    'application/x-zip',
    'application/x-zip-compressed',
    'application/octet-stream',
    'application/x-rar-compressed'
  ] as const,
} as const;
// Type for all valid MIME types
type ValidMimeType = typeof FileTypes[keyof typeof FileTypes][number];
// Helper function to check if a category is valid
const isValidCategory = (category: string): category is FileCategory => {
  return FileCategories.includes(category as FileCategory);
};
// Helper function to check if a MIME type is valid for a category
const isValidMimeType = (mimeType: string, category: FileCategory): boolean => {
  if (category === 'zip' && mimeType.toLowerCase().endsWith('.zip')) {
    return true;
  }
  return FileTypes[category].includes(mimeType as ValidMimeType);
};
export const UploadFormSchema = z.object({
  title: z.string().min(1, "Name of product required"),
  price: z.number({ invalid_type_error: "Product must be a number" })
    .min(1, "Product should be above 1 FCFA"),
  description: z.string().max(200, "Not more than 200 words"),
  product_category: z.enum(FileCategories, {
    required_error: "Please select a category",
  }),
  file: z.custom<File>()
    .refine((file) => file instanceof File, "Please upload a file")
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine(
      (file) => {
        const category = file.type.split('/')[0];
        if (category === 'application') {
          if (file.name.toLowerCase().endsWith('.pdf')) {
            return isValidMimeType(file.type, 'pdf');
          }
          if (file.name.toLowerCase().endsWith('.zip')) {
            return true;
          }
          return isValidMimeType(file.type, 'zip');
        }
        return isValidCategory(category) && isValidMimeType(file.type, category as FileCategory);
      },
      "Invalid file type for selected category"
    ),
  preview_video: z.custom<File>()
    .refine((file) => file instanceof File, "Please upload a preview video")
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine(
      (file) => FileTypes.video.includes(file.type as ValidMimeType),
      "Invalid video format. Please upload MP4, MOV, or AVI"
    )
    .refine(
      (file) => {
        try {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.src = URL.createObjectURL(file);
          return new Promise<boolean>((resolve) => {
            video.onloadedmetadata = () => {
              window.URL.revokeObjectURL(video.src);
              resolve(video.duration <= 300); // 5 minutes in seconds
            };
          });
        } catch {
          return false;
        }
      },
      "Video duration limit exceeded (maximum duration is 5 minutes)"
    ),
  banner: z.custom<File>()
    .refine((file) => file instanceof File, "Please upload a banner image")
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine(
      (file) => FileTypes.image.includes(file.type as ValidMimeType),
      "Invalid image format. Please upload JPG, JPEG, or PNG"
    )
});
export type UploadFormValues = z.infer<typeof UploadFormSchema>;










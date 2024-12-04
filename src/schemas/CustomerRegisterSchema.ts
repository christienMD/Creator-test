import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const CustomerRegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters")
      .refine(
        (name) => {
          // Check if name starts with letters only
          if (!/^[a-zA-Z]{3}/.test(name)) {
            return false;
          }
          
          // Check if name has too many numbers (more than 50% of the string)
          const numberCount = (name.match(/\d/g) || []).length;
          return numberCount <= name.length / 2;
        },
        "Name must start with at least 3 letters and cannot have too many numbers"
      ),

    email: z
      .string()
      .trim()
      .transform((val) => (val === "" ? undefined : val))
      .pipe(
        z
          .string()
          .email("Invalid email address")
          .max(30, "Email must be less than 50 characters")
          .optional()
      ),

    phone_number: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^\+237\d{9}$/,
        "Please enter a valid phone number of at least 9 digits"
      ),

    password: z.string().min(8, "Password must be at least 8 characters"),

    password_confirmation: z
      .string()
      .min(1, "Password confirmation is required"),

    role: z.literal("customer").default("customer"),

    profile_pic: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      }, "Profile picture must be less than 10MB")
      .refine((file) => {
        if (!file) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }, "Profile picture must be a valid image file (JPG, JPEG, PNG, or WebP)"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type CustomerRegisterData = z.infer<typeof CustomerRegisterSchema>;

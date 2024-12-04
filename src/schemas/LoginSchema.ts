import { z } from "zod";

export const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone number is required")
    .transform((value) => value.replace(/\s+/g, "")) // Remove all whitespace
    .refine((value) => {
      // Check if it's a valid email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      // Check if it's a valid 9-digit phone number after removing spaces
      const isPhoneNumber = /^\d{9}$/.test(value);
      return isEmail || isPhoneNumber;
    }, "Please enter a valid email or 9-digit phone number"),
  password: z.string().min(1, "Password is required"),
});

export type LoginData = z.infer<typeof LoginSchema>;

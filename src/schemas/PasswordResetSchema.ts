import { z } from "zod";

export const PasswordResetSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone number is required")
    .refine((value) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhoneNumber = /^\d{9}$/.test(value);
      return isEmail || isPhoneNumber;
    }, "Please enter a valid email or 9-digit phone number"),
});

export const VerificationSchema = z.object({
  code: z.string().min(1, "Verification code is required"),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordResetData = z.infer<typeof PasswordResetSchema>;
export type VerificationData = z.infer<typeof VerificationSchema>;
export type NewPasswordData = z.infer<typeof NewPasswordSchema>;

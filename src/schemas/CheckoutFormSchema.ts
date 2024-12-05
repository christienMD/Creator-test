// schemas/phoneSchema.ts
import { z } from 'zod';
export const CheckoutformSchema = z
  .string()
  .length(9, 'Phone number must be exactly 9 digits')
  .regex(/^\d+$/, 'Phone number must contain only digits');
export type PhoneSchemaValue = z.infer<typeof CheckoutformSchema>;

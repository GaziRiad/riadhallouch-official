import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name.").max(100),
  email: z.email("Enter a valid email address."),
  reason: z.enum(["project", "full-time", "other"]),
  message: z.string().min(20, "Give me a bit more detail (20+ characters).").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;

// `company` is a honeypot field: real visitors never see or fill it, so any
// non-empty value is a strong signal the submission came from a bot.
export const contactRequestSchema = contactSchema.extend({
  company: z.string().max(0).optional(),
});

import { z } from "zod";

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, "Password must be at least 8 characters long");

const emailSchema = z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email("Please enter a valid email address")
  .transform((email) => email.toLowerCase().trim());

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});


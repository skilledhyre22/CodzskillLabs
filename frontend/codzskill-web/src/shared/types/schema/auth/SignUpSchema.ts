
import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().nonempty("Email is Required")
    .email("Invalid email address"),

  firstName: z.string().min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: z.string().min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),

  password: z.string().min(8, "Password must be at least 8 characters")
});


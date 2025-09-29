import { z } from "zod";

export const Registrationformschema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Firstname is required" })
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" }),

  lastName: z
    .string()
    .min(1, { message: "Lastname is required" })
    .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  userName: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Only letters, numbers, and underscores are allowed" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: "Password must contain at least 1 uppercase, 1 number, and 1 special character",
    }),

  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),

  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    
  referralCode: z
    .string().optional()
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type Registrationforminput = z.infer<typeof Registrationformschema>;

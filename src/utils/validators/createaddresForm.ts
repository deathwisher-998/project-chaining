import { z } from "zod";

export const Createaddressschema = z.object({
  addressLin1: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(/^[\dA-Za-z\s.,#/-]{1,100}$/, {
      message: "Invalid Input",
    }),
  addressLin2: z.string().optional(),
  country: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(/^[A-Za-z]+$/, { message: "Invalid Input" }),
  city: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(/^[A-Za-z]+$/, { message: "Invalid Input" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Field is required" })
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
  postalCode: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(/^[0-9]+$/, { message: "Invalid Input" }),
});

export type Createaddresssfrominput = z.infer<typeof Createaddressschema>;

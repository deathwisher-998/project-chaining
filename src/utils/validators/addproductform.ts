import { z } from "zod";

export const Addproductschema = z.object({
  name: z.string().min(1, { message: "Field is required" }),
  skU: z.string().min(1, { message: "Field is required" }),
  salePrice: z.string().min(1, { message: "Field is required" }),
  regularPrice: z.string().min(1, { message: "Field is required" }),
  quantity: z.string().min(1, { message: "Field is required" }),
  discription: z.string().min(1, { message: "Field is required" }),
  categoryId: z.string().min(1, { message: "Field is required" }),
});

export type Addproductinput = z.infer<typeof Addproductschema>;

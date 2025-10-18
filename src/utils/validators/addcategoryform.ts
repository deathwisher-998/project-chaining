import { z } from "zod";

export const Addcategoryschema = z.object({
  Name: z.string().min(1, { message: "Field is required" }),
  ParentId: z.string().optional(),
  Discription: z.string().optional()
});

export type Addcategoryinput = z.infer<typeof Addcategoryschema>;

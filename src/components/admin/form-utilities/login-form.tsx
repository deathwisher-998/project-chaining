import { z } from "zod";

export const Adminloginformschema = z.object({
  email: z.string().min(1, { error: "Field is required" }),
  password: z.string().min(1, { error: "Field is required" }),
});

export type Adminloginforminput = z.infer<typeof Adminloginformschema>;

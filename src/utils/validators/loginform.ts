import { z } from "zod";

export const Loginformschema = z.object({
  email: z.string().min(1, { error: "Field is required" }),
  password: z.string().min(1, { error: "Field is required" }),
});
export type Loginforminput = z.infer<typeof Loginformschema>;

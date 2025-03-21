import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(5, {
    message: "Name must contain at least 5 characters",
  }),
  email: z.string().email(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

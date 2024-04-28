import { z } from "zod";

export const signInEmailSchema = z.object({
  email: z.string().email({ message: "Некорректная почта" }),
});

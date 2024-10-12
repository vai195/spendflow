import { z } from "zod";
export const createExpenseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.number().min(1, { message: "Amount is required" }),
  comment: z.string().optional(),
});

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;

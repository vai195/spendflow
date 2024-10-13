import { z } from "zod";
export const createExpenseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.coerce
    .number()
    .positive({ message: "Valid Number is required" })
    .min(0.01, "amount are required"),
  comment: z.string().optional(),
});

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;

export const deleteExpenseSchema = z.object({
  id: z.string().min(1),
});

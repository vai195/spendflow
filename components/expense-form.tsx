"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import LoadingButton from "./loading-button";

import { useState } from "react";

import { createExpenseSchema } from "@/lib/validation/expense";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { DollarSign } from "lucide-react";

function ExpenseForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createExpenseSchema>>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: 0,
      comment: "",
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createExpenseSchema>) {
    const isSuccess = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    setOpen(false);
    if (isSuccess.ok) {
      toast({
        title: "Recipe Generated",
      });
    }
    if (!isSuccess.ok && isSuccess.status === 500) {
      toast({
        title: "Error",
        description: isSuccess.statusText as string,
      });
    }
    form.reset();
    router.refresh();
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <DollarSign />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle hidden>Add Expense</DialogTitle>
        <DialogDescription hidden>
          Dialog form for adding an expense
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='car payment, food, insurance, etc'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount $</FormLabel>
                  <FormControl>
                    <Input placeholder='100.00, 0.01, any number' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Talk about your expense'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton loading={form.formState.isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ExpenseForm;

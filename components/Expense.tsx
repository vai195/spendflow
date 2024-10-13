"use client";
import { Expense as ExpenseModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface ExerciseProps {
  expense: ExpenseModel;
}

function Expense({ expense }: ExerciseProps) {
  const router = useRouter();
  const formatter = new Intl.DateTimeFormat([], {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  });

  //   // Format the date and time according to the user's preferences
  //   const formattedDateTime = formatter.format(createdUpdatedAtTimestamp);
  const formattedDateTimeCreated = formatter.format(expense.created_at);
  const deleteExpense = async () => {
    await fetch(`/api/expenses`, {
      method: "DELETE",
      body: JSON.stringify(expense),
      headers: { "Content-Type": "application/json" },
    });
    router.refresh();
  };
  return (
    <>
      <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
        <CardHeader>
          <CardTitle className='capitalize mb-4'>{expense.name}</CardTitle>
          <CardContent className='flex flex-col gap-3 '>
            <span className='font-semibold'>Amount: ${expense.amount}</span>
            <span>
              Comment: {expense.comment ? expense.comment : "No Comment"}
            </span>
            <span>{formattedDateTimeCreated}</span>
          </CardContent>
        </CardHeader>
        <CardFooter className='flex justify-between'>
          <span>{formattedDateTimeCreated}</span>
          <form>
            <Button
              type='submit'
              variant='destructive'
              formAction={deleteExpense}>
              <Trash />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}

export default Expense;

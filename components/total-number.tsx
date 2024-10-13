import { Expense as ExpenseModel } from "@prisma/client";
interface ExpenseProps {
  expenses: ExpenseModel[];
}

function TotalNumber({ expenses }: ExpenseProps) {
  return (
    <div>
      <p className='text-3xl font-bold'>
        Total: ${expenses.reduce((acc, expense) => acc + expense.amount, 0)}
      </p>
    </div>
  );
}

export default TotalNumber;

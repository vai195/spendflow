import Expense from "@/components/Expense";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";

async function Expensespage() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("UserID undefined");
  }

  const allExpenses = await prisma.expense.findMany({
    orderBy: { created_at: "desc" },
    where: { userId },
  });

  return (
    <div>
      <h1 className='text-lg font-bold mb-2 text-center'>All Expenses</h1>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {allExpenses.map((expense) => (
          <Expense expense={expense} key={expense.id} />
        ))}
        {allExpenses.length === 0 && (
          <Card className='col-span-full text-center'>
            <CardHeader>
              <CardTitle>No Expenses Added</CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Expensespage;

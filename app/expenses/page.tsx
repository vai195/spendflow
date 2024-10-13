import Expense from "@/components/Expense";
import TotalNumber from "@/components/total-number";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Expensespage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const allExpenses = await prisma.expense.findMany({
    orderBy: { created_at: "desc" },
    where: { userId },
  });

  return (
    <div>
      <h1 className='text-lg font-bold mb-2 text-center'>
        All Expenses <TotalNumber expenses={allExpenses} />
      </h1>
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
      {/* <div className='mt-8'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 800 200'
          className='w-full h-auto'>
          <path
            fill='#000'
            d='M0 100 L50 50 L100 70 L150 40 L200 60 L250 30 L300 80 L350 30 L400 80 L450 50 L500 70 L550 20 L600 80 L650 30 L700 50 L750 40 L800 100 L800 200 L0 200 Z'
          />
        </svg>
      </div> */}
    </div>
  );
}

export default Expensespage;

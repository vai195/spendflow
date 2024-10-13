import { expenseIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import {
  createExpenseSchema,
  deleteExpenseSchema,
} from "@/lib/validation/expense";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = createExpenseSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return NextResponse.json({ errors: "Invalid input" }, { status: 400 });
    }

    const { amount, comment, name } = parseResult.data;

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ errors: "Unauthorized" }, { status: 401 });
    }
    const x = new Date();

    const embedding = await getEmbeddingForExecise(
      name,
      amount,
      x,
      comment ? comment : ""
    );

    const expense = await prisma.$transaction(async (tx) => {
      const expense = await tx.expense.create({
        data: {
          name,
          amount,
          comment,
          userId,
        },
      });

      await expenseIndex.upsert([
        {
          id: expense.id,
          values: embedding,
          metadata: { userId },
        },
      ]);
      return expense;
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const parseResult = deleteExpenseSchema.safeParse(body);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return NextResponse.json({ errors: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const expense = await prisma.expense.findUnique({ where: { id } });

    if (!expense) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    const { userId } = auth();

    if (!userId || userId !== expense.userId) {
      return NextResponse.json({ errors: "Unauthorized" }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.expense.delete({
        where: { id },
      });
      await expenseIndex.deleteOne(id);
    });

    return NextResponse.json({ message: "Exercise deleted" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function getEmbeddingForExecise(
  name: string,
  amount: number,
  created_at: Date,
  comment?: string
) {
  return getEmbedding(
    name + "\n\n" + amount + "\n\n" + +created_at + "\n\n" + comment
  );
}

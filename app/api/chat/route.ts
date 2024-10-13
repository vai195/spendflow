import { expenseIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import { openai as oAI } from "@ai-sdk/openai";

import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTrucated = messages.slice(-6);
    console.log("Truncated Messages: " + messagesTrucated);

    const embedding = await getEmbedding(
      messagesTrucated.map((message) => message.content).join("\n")
    );
    const { userId } = auth();

    const vectorQueryResponse = await expenseIndex.query({
      vector: embedding,
      topK: 5,
      filter: { userId },
    });

    const releventExercises = await prisma.expense.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    const systemMessage: ChatCompletionMessage = {
      refusal: null,

      role: "assistant",
      content:
        "You are an intelligent expense tracker app, You answer the user's questions based on their existing expenses and values they keep track of everyday on this app as well as finance and spending questions in general" +
        "The relevent expenses for this query are:\n" +
        releventExercises
          .map(
            (expense) =>
              `Name: ${expense.name}\n\Amount: ${expense.amount}\n\Comment: ${expense.comment}\n\nDate: ${expense.created_at}`
          )
          .join("\n\n"),
    };
    // openai.chat.completions.create
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTrucated],
    });

    const stream = OpenAIStream(response);
    // return response.pipeTextStreamToResponse;
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

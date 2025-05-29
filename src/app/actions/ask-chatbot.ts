'use server';

import { askPlatformBot, type PlatformQnaInput } from '@/ai/flows/platform-qna-flow';
import { z } from 'zod';

const AskChatbotSchema = z.object({
  question: z.string().min(1, "Question cannot be empty."),
});

export interface AskChatbotActionState {
  question?: string;
  answer?: string;
  error?: string;
}

export async function askChatbotAction(
  prevState: AskChatbotActionState,
  formData: FormData
): Promise<AskChatbotActionState> {
  try {
    const rawFormData = {
      question: formData.get('question'),
    };

    const validationResult = AskChatbotSchema.safeParse(rawFormData);

    if (!validationResult.success) {
      return {
        error: validationResult.error.flatten().fieldErrors.question?.[0] || "Invalid input.",
      };
    }
    
    const inputData = validationResult.data as PlatformQnaInput;

    const result = await askPlatformBot(inputData);

    if (result.answer) {
      return { question: inputData.question, answer: result.answer };
    } else {
      return { question: inputData.question, error: "The chatbot couldn't provide an answer." };
    }
  } catch (error) {
    console.error("Chatbot error:", error);
    let errorMessage = "An unexpected error occurred with the chatbot.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      question: formData.get('question') as string || "",
      error: errorMessage,
    };
  }
}

// src/app/actions/translate.ts
"use server";

import { realtimeTranslation, type RealtimeTranslationInput } from '@/ai/flows/realtime-translation';
import { z } from 'zod';

const TranslateSchema = z.object({
  text: z.string().min(1, "Text to translate cannot be empty."),
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
});

export interface TranslateActionState {
  translatedText?: string;
  error?: string;
  input?: RealtimeTranslationInput;
}

export async function translateTextAction(
  prevState: TranslateActionState,
  formData: FormData
): Promise<TranslateActionState> {
  try {
    const rawFormData = {
      text: formData.get('text'),
      sourceLanguage: formData.get('sourceLanguage'),
      targetLanguage: formData.get('targetLanguage'),
    };

    const validationResult = TranslateSchema.safeParse(rawFormData);

    if (!validationResult.success) {
      return {
        error: validationResult.error.flatten().fieldErrors.text?.[0] || "Invalid input.",
      };
    }
    
    const inputData = validationResult.data as RealtimeTranslationInput;

    // Add a small delay to simulate network latency and show loading state
    // In a real app, remove this if the AI call is fast enough or already handles this.
    // await new Promise(resolve => setTimeout(resolve, 1500));


    const result = await realtimeTranslation(inputData);

    if (result.translatedText) {
      return { translatedText: result.translatedText, input: inputData };
    } else {
      return { error: "Translation failed to produce text.", input: inputData };
    }
  } catch (error) {
    console.error("Translation error:", error);
    let errorMessage = "An unexpected error occurred during translation.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      error: errorMessage,
      input: {
        text: formData.get('text') as string || "",
        sourceLanguage: formData.get('sourceLanguage') as string || "English",
        targetLanguage: formData.get('targetLanguage') as string || "Swahili",
      }
    };
  }
}

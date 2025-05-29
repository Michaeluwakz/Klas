// Implemented by Gemini.
'use server';
/**
 * @fileOverview A real-time translation AI agent for students.
 *
 * - realtimeTranslation - A function that handles the real-time translation process.
 * - RealtimeTranslationInput - The input type for the realtimeTranslation function.
 * - RealtimeTranslationOutput - The return type for the realtimeTranslation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RealtimeTranslationInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  sourceLanguage: z.string().describe('The language of the input text.'),
  targetLanguage: z.string().describe('The desired language for the output text (African language).'),
});
export type RealtimeTranslationInput = z.infer<typeof RealtimeTranslationInputSchema>;

const RealtimeTranslationOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in the target language.'),
});
export type RealtimeTranslationOutput = z.infer<typeof RealtimeTranslationOutputSchema>;

export async function realtimeTranslation(input: RealtimeTranslationInput): Promise<RealtimeTranslationOutput> {
  return realtimeTranslationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realtimeTranslationPrompt',
  input: {schema: RealtimeTranslationInputSchema},
  output: {schema: RealtimeTranslationOutputSchema},
  prompt: `You are a real-time translation expert, specializing in translating English to African languages.

  Translate the following text from {{sourceLanguage}} to {{targetLanguage}}:

  {{text}}

  Return ONLY the translated text.`,
});

const realtimeTranslationFlow = ai.defineFlow(
  {
    name: 'realtimeTranslationFlow',
    inputSchema: RealtimeTranslationInputSchema,
    outputSchema: RealtimeTranslationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

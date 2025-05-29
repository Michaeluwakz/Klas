'use server';
/**
 * @fileOverview An AI agent that answers questions about the KlasAfrica platform.
 *
 * - askPlatformBot - A function that handles questions about the platform.
 * - PlatformQnaInput - The input type for the askPlatformBot function.
 * - PlatformQnaOutput - The return type for the askPlatformBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlatformQnaInputSchema = z.object({
  question: z.string().describe('The user\'s question about the KlasAfrica platform.'),
});
export type PlatformQnaInput = z.infer<typeof PlatformQnaInputSchema>;

const PlatformQnaOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type PlatformQnaOutput = z.infer<typeof PlatformQnaOutputSchema>;

export async function askPlatformBot(input: PlatformQnaInput): Promise<PlatformQnaOutput> {
  return platformQnaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'platformQnaPrompt',
  input: {schema: PlatformQnaInputSchema},
  output: {schema: PlatformQnaOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for KlasAfrica, an online learning platform.
Your goal is to answer user questions about the platform based on the information provided below.
Be concise and informative. If the question is outside the scope of KlasAfrica or its features, politely state that you can only answer questions about the platform.
When listing multiple items (like features), please use bullet points for clarity.

Platform Information:
KlasAfrica is an online learning platform empowering students, educators, and businesses across Africa with AI-driven tools, accessible education, and real-time multilingual support.

Key Features:

**Student Features:**
- Join live lectures
- Choose voice language
- View/download lessons
- Track assignments
- Live chat/comments on lessons
- Peer-to-peer discussion forums
- Course feedback & ratings

**Lecturer Features:**
- Create courses
- Host live sessions (video/audio)
- Upload materials
- Assignments/quizzes
- Moderate comments
- Track student performance
- Export grades

**Business/Partner Features:**
- List scholarship or internship opportunities
- Sponsor data plans or courses
- Marketplace for verified learning tools
- Analytics dashboard for engagement

**Admin Features:**
- Add/manage institutions
- Verify lecturer accounts
- Control platform content
- Approve businesses
- Access analytics dashboard
- Domain-based login only (@klasafrica.com)

**AI-Powered Features:**
- Live AI Voice Translation: Real-time voice change during live lectures (via Whisper + TTS)
- Auto Transcription: Auto-generate transcripts of lectures
- Smart Summaries: Convert long lectures into bullet-point summaries
- Auto Language Switching: Translate content to student’s chosen language (voice/text)
- Learning Analytics: Recommend courses, flag struggling students

**Unique Selling Points:**
- Built for African universities (language, network, cost-aware).
- Integrated AI tools to make learning easier.
- Connects students, lecturers, and businesses in one ecosystem.
- Admins secured by domain-based access only.

User Question: {{{question}}}
Answer:`,
});

const platformQnaFlow = ai.defineFlow(
  {
    name: 'platformQnaFlow',
    inputSchema: PlatformQnaInputSchema,
    outputSchema: PlatformQnaOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);


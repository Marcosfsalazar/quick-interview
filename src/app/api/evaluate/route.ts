import { NextResponse } from 'next/server';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, CoreMessage } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  compatibility: 'strict',
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { masterPrompt, jobDescription, questions } = data;

    const messages: CoreMessage[] = [
      { role: 'system', content: masterPrompt },
      {
        role: 'user',
        content: `Job Description:\n${JSON.stringify(jobDescription, null, 2)}\n\nQuestions and Responses:\n${JSON.stringify(questions, null, 2)}`,
      },
    ];

    const response = await generateText({
      model: openai('gpt-4-turbo'),
      messages,
    });

    return NextResponse.json({
      evaluation: response.text,
    });
  } catch (error) {
    console.error('Error evaluating responses:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate responses' },
      { status: 500 },
    );
  }
}

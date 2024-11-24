import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 },
      );
    }

    const openaiUrl = 'https://api.openai.com/v1/audio/transcriptions';

    const formDataForOpenAI = new FormData();
    formDataForOpenAI.append('file', file);
    formDataForOpenAI.append('model', 'whisper-1');

    const response = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: formDataForOpenAI,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error transcribing audio:', error);
      return NextResponse.json(
        { error: 'Failed to transcribe audio' },
        { status: 500 },
      );
    }

    const transcription = await response.json();

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 },
    );
  }
}

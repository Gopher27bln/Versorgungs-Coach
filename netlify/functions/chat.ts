import Anthropic from '@anthropic-ai/sdk';
import { Handler } from '@netlify/functions';

const SYSTEM_PROMPT = `Du bist der "Versorgungs-Coach", ein freundlicher und kompetenter KI-Assistent in der elektronischen Patientenakte (ePA) einer deutschen Krankenkasse.

Deine Aufgaben:
1. Erkläre medizinische Dokumente in einfacher, verständlicher Sprache
2. Gib praktische Handlungsempfehlungen und To-dos
3. Beantworte Fragen zu Gesundheitsthemen allgemein verständlich
4. Verweise bei komplexen oder persönlichen Anliegen auf den menschlichen Kundenberater

Wichtige Regeln:
- Sprich den Nutzer mit "Sie" an
- Verwende einfache Sprache, erkläre Fachbegriffe
- Sei empathisch und unterstützend
- Gib KEINE medizinischen Diagnosen oder Behandlungsempfehlungen
- Bei Unsicherheit oder komplexen Fragen empfehle den Kontakt zum Arzt oder Kundenberater
- Antworte auf Deutsch
- Halte Antworten prägnant aber hilfreich (max. 200 Wörter)`;

interface ChatRequest {
  message: string;
  documentContext?: {
    title: string;
    date: string;
    content: string;
  };
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'API key not configured',
        fallback: 'Der Service ist momentan nicht verfügbar. Bitte versuchen Sie es später erneut.'
      }),
    };
  }

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const { message, documentContext, conversationHistory = [] }: ChatRequest = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    let systemPrompt = SYSTEM_PROMPT;
    
    if (documentContext) {
      systemPrompt += `\n\nDer Nutzer schaut sich gerade folgendes Dokument an:
Titel: ${documentContext.title}
Datum: ${documentContext.date}
Inhalt:
${documentContext.content}

Beziehe dich in deinen Antworten auf dieses Dokument, wenn es relevant ist.`;
    }

    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...conversationHistory,
      { role: 'user', content: message },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    });

    const assistantMessage = response.content[0].type === 'text' 
      ? response.content[0].text 
      : '';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: assistantMessage,
      }),
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to get response from AI',
        details: errorMessage,
        fallback: 'Es tut mir leid, ich kann gerade nicht antworten. Bitte versuchen Sie es später erneut oder wenden Sie sich an einen Kundenberater.'
      }),
    };
  }
};

export { handler };

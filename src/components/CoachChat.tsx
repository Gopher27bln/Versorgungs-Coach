import { useState, useEffect, useRef } from 'react';
import { ChatMessage, Document } from '../types';
import { coachResponses } from '../data/mockData';
import { MessageBubble } from './MessageBubble';

interface CoachChatProps {
  document?: Document;
  onClose?: () => void;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function getCurrentTime(): string {
  return new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

async function fetchClaudeResponse(
  message: string,
  documentContext: { title: string; date: string; content: string } | undefined,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  mode: 'coach' | 'advisor' = 'coach'
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        mode,
        documentContext,
        conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.response || data.fallback;
  } catch (error) {
    console.error('Error fetching Claude response:', error);
    return 'Es tut mir leid, ich kann gerade nicht antworten. Bitte versuchen Sie es später erneut.';
  }
}

export function CoachChat({ document }: CoachChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEscalationBanner, setShowEscalationBanner] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const greetingMessage: ChatMessage = {
      id: generateId(),
      sender: 'coach',
      text: document 
        ? coachResponses.greeting(document.title, document.date)
        : 'Hallo! Ich bin Ihr Versorgungs-Coach. Wie kann ich Ihnen heute helfen? Sie können mir Fragen zu Ihrer Gesundheit, Ihren Dokumenten oder Ihrer Versorgung stellen.',
      timestamp: getCurrentTime(),
    };
    setMessages([greetingMessage]);
  }, [document]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessageText = inputValue.trim();
    const userMessage: ChatMessage = {
      id: generateId(),
      sender: 'user',
      text: userMessageText,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const currentSender = isEscalated ? 'advisor' : 'coach';
    const currentMode = isEscalated ? 'advisor' : 'coach';
    
    const conversationHistory = messages
      .filter(m => m.sender !== 'advisor' || isEscalated)
      .map(m => ({
        role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text,
      }));

    const responseText = await fetchClaudeResponse(
      userMessageText,
      document ? {
        title: document.title,
        date: document.date,
        content: document.content,
      } : undefined,
      conversationHistory,
      currentMode
    );

    const responseMessage: ChatMessage = {
      id: generateId(),
      sender: currentSender,
      text: responseText,
      timestamp: getCurrentTime(),
    };
    setMessages((prev) => [...prev, responseMessage]);
    setIsTyping(false);
  };

  const handleEscalate = () => {
    setShowEscalationBanner(true);
  };

  const handleConfirmEscalation = () => {
    setShowEscalationBanner(false);
    setIsEscalated(true);
    setIsTyping(true);

    setTimeout(() => {
      const advisorMessage: ChatMessage = {
        id: generateId(),
        sender: 'advisor',
        text: coachResponses.advisorGreeting,
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, advisorMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Status indicator */}
      {isEscalated && (
        <div className="bg-green-600 text-white text-center py-2 text-sm font-medium">
          Verbunden mit BARMER-Kundenberater
        </div>
      )}

      {/* Escalation Banner */}
      {showEscalationBanner && (
        <div className="p-4 bg-yellow-50 border-b border-yellow-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-yellow-800 font-medium">Übergabe an Kundenberater</p>
              <p className="text-sm text-yellow-700 mt-1">
                Ihr Anliegen wird an einen Kundenberater der Kasse übergeben. Im echten System würden hier relevante Informationen (z. B. gewähltes Dokument und Ihre bisherigen Fragen) sicher übertragen.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleConfirmEscalation}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Bestätigen
                </button>
                <button
                  onClick={() => setShowEscalationBanner(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
            <span className="text-sm">{isEscalated ? 'Berater' : 'Coach'} schreibt...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Escalation Button */}
      {!isEscalated && !showEscalationBanner && (
        <div className="px-4 py-2 border-t border-gray-100">
          <button
            onClick={handleEscalate}
            className="w-full py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mit Kundenberater chatten
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ihre Nachricht..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

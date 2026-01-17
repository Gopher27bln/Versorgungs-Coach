import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const isAdvisor = message.sender === 'advisor';

  const getBubbleStyles = () => {
    if (isUser) {
      return 'bg-blue-500 text-white ml-auto';
    }
    if (isAdvisor) {
      return 'bg-green-600 text-white mr-auto';
    }
    return 'bg-gray-200 text-gray-800 mr-auto';
  };

  const getSenderLabel = () => {
    if (isUser) return 'Sie';
    if (isAdvisor) return 'BARMER-Berater';
    return 'Versorgungs-Coach';
  };

  return (
    <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end ml-auto' : 'items-start mr-auto'}`}>
      <span className={`text-xs text-gray-500 mb-1 ${isUser ? 'text-right' : 'text-left'}`}>
        {getSenderLabel()}
      </span>
      <div className={`rounded-2xl px-4 py-2 ${getBubbleStyles()}`}>
        <p className="whitespace-pre-wrap text-sm">{message.text}</p>
      </div>
      <span className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
        {message.timestamp}
      </span>
    </div>
  );
}

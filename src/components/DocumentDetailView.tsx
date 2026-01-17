import { Document } from '../types';

interface DocumentDetailViewProps {
  document: Document;
  onBack: () => void;
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export function DocumentDetailView({ document, onBack, onOpenChat, isChatOpen }: DocumentDetailViewProps) {
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Zurück zur Übersicht
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-xl font-bold text-gray-800">{document.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{document.type} – {document.date}</p>
        </div>

        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
            {document.content}
          </pre>
        </div>

        {!isChatOpen && (
          <button
            onClick={onOpenChat}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Fragen Sie den Versorgungs-Coach zu diesem Dokument
          </button>
        )}
      </div>
    </div>
  );
}

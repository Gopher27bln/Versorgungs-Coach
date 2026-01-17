import { Document } from '../types';

interface DocumentListViewProps {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
}

export function DocumentListView({ documents, onSelectDocument }: DocumentListViewProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Meine Dokumente</h1>
      <p className="text-gray-600 mb-6">Elektronische Patientenakte (ePA)</p>
      
      <div className="space-y-3">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.type} – {doc.date}</p>
              </div>
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Document } from '../types';
import { mockDocuments } from '../data/mockData';
import { CoachChat } from './CoachChat';

type View = 'list' | 'detail' | 'chat';

export function MobileApp() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleSelectDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setCurrentView('detail');
  };

  const handleBack = () => {
    if (currentView === 'chat') {
      setCurrentView('detail');
    } else {
      setCurrentView('list');
      setSelectedDocument(null);
    }
  };

  const handleOpenChat = () => {
    setCurrentView('chat');
  };

  const handleCloseChat = () => {
    setCurrentView('detail');
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* App Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white pt-14 pb-4 px-4 shadow-lg">
        <div className="flex items-center gap-3">
          {currentView !== 'list' && (
            <button 
              onClick={handleBack}
              className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold">
                {currentView === 'chat' ? 'Versorgungs-Coach' : 'Meine ePA'}
              </h1>
              <p className="text-xs text-blue-100">
                {currentView === 'chat' ? 'KI-gestützte Hilfe' : 'Elektronische Patientenakte'}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentView === 'list' && (
          <div className="h-full overflow-y-auto">
            <MobileDocumentList 
              documents={mockDocuments} 
              onSelectDocument={handleSelectDocument} 
            />
          </div>
        )}
        {currentView === 'detail' && selectedDocument && (
          <div className="h-full overflow-y-auto">
            <MobileDocumentDetail 
              document={selectedDocument} 
              onOpenChat={handleOpenChat} 
            />
          </div>
        )}
        {currentView === 'chat' && selectedDocument && (
          <div className="h-full">
            <CoachChat 
              document={selectedDocument} 
              onClose={handleCloseChat} 
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      {currentView !== 'chat' && (
        <nav className="bg-white border-t border-gray-200 px-6 py-2 pb-8">
          <div className="flex justify-around">
            <NavItem icon="home" label="Start" active />
            <NavItem icon="folder" label="Dokumente" />
            <NavItem icon="calendar" label="Termine" />
            <NavItem icon="user" label="Profil" />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  const icons: Record<string, JSX.Element> = {
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    folder: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  };

  return (
    <button className={`flex flex-col items-center gap-1 px-3 py-1 ${active ? 'text-blue-600' : 'text-gray-400'}`}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function MobileDocumentList({ documents, onSelectDocument }: { documents: Document[]; onSelectDocument: (doc: Document) => void }) {
  const getDocIcon = (type: string) => {
    switch (type) {
      case 'Arztbrief':
        return (
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'Laborbefund':
        return (
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Aktuelle Dokumente</h2>
        <p className="text-sm text-gray-500">Tippen Sie auf ein Dokument für Details</p>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 text-left"
          >
            <div className="flex items-center gap-4">
              {getDocIcon(doc.type)}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.date}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Coach Promo Card */}
      <div className="mt-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Versorgungs-Coach</h3>
            <p className="text-blue-100 text-sm">Ihr KI-Assistent erklärt Ihnen Ihre Dokumente in einfachen Worten.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDocumentDetail({ document, onOpenChat }: { document: Document; onOpenChat: () => void }) {
  return (
    <div className="p-4 pb-6">
      {/* Document Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{document.title}</h2>
              <p className="text-sm text-gray-500">{document.type} • {document.date}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
            {document.content}
          </pre>
        </div>
      </div>

      {/* Coach CTA */}
      <button
        onClick={onOpenChat}
        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-3"
      >
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="text-left">
          <div className="font-bold">Fragen Sie den Versorgungs-Coach</div>
          <div className="text-sm text-blue-100">Lassen Sie sich das Dokument erklären</div>
        </div>
      </button>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 hover:border-blue-300 transition-colors">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">Teilen</span>
        </button>
        <button className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 hover:border-blue-300 transition-colors">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">Download</span>
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Document } from '../types';
import { mockDocuments } from '../data/mockData';
import { CoachChat } from './CoachChat';

type View = 'list' | 'detail' | 'chat';
type Tab = 'home' | 'documents' | 'appointments' | 'profile';

export function MobileApp() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [currentTab, setCurrentTab] = useState<Tab>('home');
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

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    setCurrentView('list');
    setSelectedDocument(null);
  };

  const getHeaderTitle = () => {
    if (currentView === 'chat') return 'Versorgungs-Coach';
    switch (currentTab) {
      case 'home': return 'Meine ePA';
      case 'documents': return 'Dokumente';
      case 'appointments': return 'Termine';
      case 'profile': return 'Mein Profil';
      default: return 'Meine ePA';
    }
  };

  const getHeaderSubtitle = () => {
    if (currentView === 'chat') return 'KI-gestützte Hilfe';
    switch (currentTab) {
      case 'home': return 'Elektronische Patientenakte';
      case 'documents': return 'Alle Ihre Dokumente';
      case 'appointments': return 'Ihre Arzttermine';
      case 'profile': return 'Kontoeinstellungen';
      default: return 'Elektronische Patientenakte';
    }
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
                {getHeaderTitle()}
              </h1>
              <p className="text-xs text-blue-100">
                {getHeaderSubtitle()}
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
        {/* Home Tab */}
        {currentTab === 'home' && currentView === 'list' && (
          <div className="h-full overflow-y-auto">
            <MobileDocumentList 
              documents={mockDocuments} 
              onSelectDocument={handleSelectDocument}
              onOpenCoach={handleOpenChat}
            />
          </div>
        )}
        {currentTab === 'home' && currentView === 'detail' && selectedDocument && (
          <div className="h-full overflow-y-auto">
            <MobileDocumentDetail 
              document={selectedDocument} 
              onOpenChat={handleOpenChat} 
            />
          </div>
        )}
        {currentView === 'chat' && (
          <div className="h-full">
            <CoachChat 
              document={selectedDocument || undefined} 
              onClose={handleCloseChat} 
            />
          </div>
        )}

        {/* Documents Tab */}
        {currentTab === 'documents' && currentView === 'list' && (
          <div className="h-full overflow-y-auto">
            <DocumentsTab documents={mockDocuments} onSelectDocument={handleSelectDocument} />
          </div>
        )}
        {currentTab === 'documents' && currentView === 'detail' && selectedDocument && (
          <div className="h-full overflow-y-auto">
            <MobileDocumentDetail 
              document={selectedDocument} 
              onOpenChat={handleOpenChat} 
            />
          </div>
        )}

        {/* Appointments Tab */}
        {currentTab === 'appointments' && currentView === 'list' && (
          <div className="h-full overflow-y-auto">
            <AppointmentsTab />
          </div>
        )}

        {/* Profile Tab */}
        {currentTab === 'profile' && currentView === 'list' && (
          <div className="h-full overflow-y-auto">
            <ProfileTab />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      {currentView !== 'chat' && (
        <nav className="bg-white border-t border-gray-200 px-6 py-2 pb-8">
          <div className="flex justify-around">
            <NavItem icon="home" label="Start" active={currentTab === 'home'} onClick={() => handleTabChange('home')} />
            <NavItem icon="folder" label="Dokumente" active={currentTab === 'documents'} onClick={() => handleTabChange('documents')} />
            <NavItem icon="calendar" label="Termine" active={currentTab === 'appointments'} onClick={() => handleTabChange('appointments')} />
            <NavItem icon="user" label="Profil" active={currentTab === 'profile'} onClick={() => handleTabChange('profile')} />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
  const icons: Record<string, JSX.Element> = {
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    folder: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  };

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function MobileDocumentList({ documents, onSelectDocument, onOpenCoach }: { documents: Document[]; onSelectDocument: (doc: Document) => void; onOpenCoach: () => void }) {
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
      <button 
        onClick={onOpenCoach}
        className="w-full mt-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left"
      >
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
      </button>
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

function DocumentsTab({ documents, onSelectDocument }: { documents: Document[]; onSelectDocument: (doc: Document) => void }) {
  const getDocIcon = (type: string) => {
    switch (type) {
      case 'Arztbrief':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'Laborbefund':
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Alle Dokumente</h2>
        <p className="text-sm text-gray-500">{documents.length} Dokumente in Ihrer ePA</p>
      </div>

      <div className="mb-4">
        <div className="relative">
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Dokumente durchsuchen..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full whitespace-nowrap">Alle</button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap hover:border-blue-300">Arztbriefe</button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap hover:border-blue-300">Laborbefunde</button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap hover:border-blue-300">Rezepte</button>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className="w-full bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 text-left flex items-center gap-3"
          >
            {getDocIcon(doc.type)}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-800 truncate text-sm">{doc.title}</h3>
              <p className="text-xs text-gray-500">{doc.type} • {doc.date}</p>
            </div>
            <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function AppointmentsTab() {
  const appointments = [
    { id: 1, doctor: 'Dr. med. Schmidt', specialty: 'Hausarzt', date: '28.01.2026', time: '10:30', location: 'Praxis am Markt' },
    { id: 2, doctor: 'Dr. med. Weber', specialty: 'Kardiologie', date: '05.02.2026', time: '14:00', location: 'Herzzentrum Berlin' },
    { id: 3, doctor: 'Dr. med. Müller', specialty: 'Orthopädie', date: '12.02.2026', time: '09:15', location: 'Orthopädicum' },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Ihre Termine</h2>
        <p className="text-sm text-gray-500">Kommende Arzttermine</p>
      </div>

      <button className="w-full mb-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-600 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Neuen Termin hinzufügen
      </button>

      <div className="space-y-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-blue-600">{apt.date.split('.')[0]}</span>
                <span className="text-xs text-blue-500">{apt.date.split('.')[1]}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{apt.doctor}</h3>
                <p className="text-sm text-gray-500">{apt.specialty}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {apt.time} Uhr
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {apt.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Mein Profil</h2>
        <p className="text-sm text-gray-500">Kontoeinstellungen verwalten</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            MK
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Max Krause</h3>
            <p className="text-sm text-gray-500">Versichertennummer: A123456789</p>
            <p className="text-sm text-gray-500">BARMER</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <SettingsItem icon="user" label="Persönliche Daten" />
        <SettingsItem icon="shield" label="Datenschutz & Sicherheit" />
        <SettingsItem icon="bell" label="Benachrichtigungen" />
        <SettingsItem icon="share" label="Datenfreigaben" />
        <SettingsItem icon="help" label="Hilfe & Support" />
        <SettingsItem icon="logout" label="Abmelden" isLast />
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        <p>TI-M ePA App v1.0.0</p>
        <p>© 2026 BARMER</p>
      </div>
    </div>
  );
}

function SettingsItem({ icon, label, isLast = false }: { icon: string; label: string; isLast?: boolean }) {
  const icons: Record<string, JSX.Element> = {
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    share: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />,
    help: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
  };

  return (
    <button className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
        <svg className={`w-4 h-4 ${icon === 'logout' ? 'text-red-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icons[icon]}
        </svg>
      </div>
      <span className={`flex-1 text-left text-sm font-medium ${icon === 'logout' ? 'text-red-500' : 'text-gray-700'}`}>{label}</span>
      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

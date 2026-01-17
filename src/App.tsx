import { IPhoneMockup } from './components/IPhoneMockup';
import { MobileApp } from './components/MobileApp';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Versorgungs-Coach</h1>
        <p className="text-gray-600">TI-M ePA Feature Prototype</p>
      </div>

      {/* iPhone Mockup */}
      <div className="relative z-10">
        <IPhoneMockup>
          <MobileApp />
        </IPhoneMockup>
      </div>

      {/* Feature badges */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">KI-gestützte Erklärungen</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Eskalation zu Berater</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">ePA Integration</span>
        </div>
      </div>
    </div>
  );
}

export default App;

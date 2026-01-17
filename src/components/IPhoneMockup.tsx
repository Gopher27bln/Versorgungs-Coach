import { ReactNode } from 'react';

interface IPhoneMockupProps {
  children: ReactNode;
}

export function IPhoneMockup({ children }: IPhoneMockupProps) {
  return (
    <div className="relative mx-auto">
      {/* iPhone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Outer bezel */}
        <div className="relative bg-gray-800 rounded-[2.5rem] p-1">
          {/* Side buttons - Volume */}
          <div className="absolute -left-1 top-24 w-1 h-8 bg-gray-700 rounded-l-lg"></div>
          <div className="absolute -left-1 top-36 w-1 h-8 bg-gray-700 rounded-l-lg"></div>
          {/* Side button - Power */}
          <div className="absolute -right-1 top-32 w-1 h-12 bg-gray-700 rounded-r-lg"></div>
          {/* Side button - Silent */}
          <div className="absolute -left-1 top-16 w-1 h-4 bg-gray-700 rounded-l-lg"></div>
          
          {/* Screen area */}
          <div className="relative bg-black rounded-[2.25rem] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-black w-28 h-8 rounded-full flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-12 z-40 flex items-center justify-between px-8 pt-1">
              <span className="text-white text-sm font-semibold">9:41</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l11 11c.39.39 1.02.39 1.41 0l11-11c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
                </svg>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 22h20V2z"/>
                </svg>
                <div className="flex items-center">
                  <div className="w-6 h-3 border border-white rounded-sm flex items-center p-0.5">
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                  </div>
                  <div className="w-0.5 h-1.5 bg-white rounded-r-sm ml-0.5"></div>
                </div>
              </div>
            </div>
            
            {/* App content */}
            <div className="w-[375px] h-[812px] overflow-hidden">
              {children}
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

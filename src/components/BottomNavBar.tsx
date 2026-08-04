import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLaunchFleetMonitor?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  onLaunchFleetMonitor,
}) => {
  return (
    <nav className="bg-[#F9F7F2]/95 border-t border-[#1A1A1A]/10 fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2.5 shadow-xl backdrop-blur-md">
      {/* Portfolio Tab */}
      <button
        onClick={() => onTabChange('portfolio')}
        className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
          activeTab === 'portfolio'
            ? 'bg-[#1A1A1A] text-[#F9F7F2] rounded-full px-4 py-1.5 shadow-sm scale-105'
            : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-2'
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] ${activeTab === 'portfolio' ? 'icon-fill-1' : ''}`}>
          folder_special
        </span>
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5">
          Portfolio
        </span>
      </button>

      {/* Metrics Tab */}
      <button
        onClick={() => onTabChange('metrics')}
        className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
          activeTab === 'metrics'
            ? 'bg-[#1A1A1A] text-[#F9F7F2] rounded-full px-4 py-1.5 shadow-sm scale-105'
            : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-2'
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] ${activeTab === 'metrics' ? 'icon-fill-1' : ''}`}>
          query_stats
        </span>
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5">
          Metrics
        </span>
      </button>

      {/* Stack Tab */}
      <button
        onClick={() => onTabChange('stack')}
        className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
          activeTab === 'stack'
            ? 'bg-[#1A1A1A] text-[#F9F7F2] rounded-full px-4 py-1.5 shadow-sm scale-105'
            : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-2'
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] ${activeTab === 'stack' ? 'icon-fill-1' : ''}`}>
          terminal
        </span>
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5">
          Stack
        </span>
      </button>

      {/* Contact Tab */}
      <button
        onClick={() => onTabChange('contact')}
        className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
          activeTab === 'contact'
            ? 'bg-[#1A1A1A] text-[#F9F7F2] rounded-full px-4 py-1.5 shadow-sm scale-105'
            : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-2'
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] ${activeTab === 'contact' ? 'icon-fill-1' : ''}`}>
          alternate_email
        </span>
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5">
          Contact
        </span>
      </button>

      {/* Quick Fleet Monitor Launcher */}
      <button
        onClick={() => {
          if (onLaunchFleetMonitor) {
            onLaunchFleetMonitor();
          } else {
            onTabChange('fleet-monitor');
          }
        }}
        title="Launch Live Fleet Monitor"
        className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-['JetBrains_Mono'] tracking-widest font-bold border transition-all cursor-pointer ${
          activeTab === 'fleet-monitor'
            ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
            : 'bg-[#E5E2DA] text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F9F7F2]'
        }`}
      >
        <span className="material-symbols-outlined text-[16px] animate-pulse">radar</span>
        <span>LIVE MAP</span>
      </button>
    </nav>
  );
};

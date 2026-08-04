import React, { useState } from 'react';

interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  onShare?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title, onBack, onShare }) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    if (onShare) {
      onShare();
      return;
    }
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16">
      <button 
        onClick={onBack}
        title="Go back"
        className="w-10 h-10 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all active:scale-95 flex items-center justify-center cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      </button>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/40 font-['JetBrains_Mono']">
          Editorial
        </span>
        <span className="hidden sm:inline-block text-[#1A1A1A]/20">•</span>
        <h1 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold italic tracking-tight text-[#1A1A1A] truncate max-w-[200px] sm:max-w-md text-center">
          {title}
        </h1>
      </div>

      <div className="relative">
        <button 
          onClick={handleShareClick}
          title="Share project"
          className="w-10 h-10 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            {copied ? 'check' : 'share'}
          </span>
        </button>
        {copied && (
          <div className="absolute right-0 top-12 bg-[#1A1A1A] text-[#F9F7F2] text-[11px] font-['JetBrains_Mono'] tracking-wider uppercase px-3 py-1.5 shadow-xl border border-[#1A1A1A] whitespace-nowrap animate-fade-in">
            Link copied
          </div>
        )}
      </div>
    </header>
  );
};

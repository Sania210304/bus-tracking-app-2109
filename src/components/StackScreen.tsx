import React, { useState } from 'react';
import { TopAppBar } from './TopAppBar';
import { TECH_STACK, PYTHON_LOGGING_CODE, SQLITE_SCHEMA_CODE } from '../data/mockData';

export const StackScreen: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'logger' | 'schema' | 'maps'>('logger');
  const [copiedCode, setCopiedCode] = useState(false);

  const MAPS_API_CODE = `# Google Maps API Integration for Bus Tracking
import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key='YOUR_GOOGLE_MAPS_API_KEY')

def get_optimized_route_and_eta(origin_lat, origin_lng, dest_lat, dest_lng):
    now = datetime.now()
    # Query Google Maps Directions API with traffic model
    directions_result = gmaps.directions(
        (origin_lat, origin_lng),
        (dest_lat, dest_lng),
        mode="transit",
        departure_time=now,
        traffic_model="best_guess"
    )
    if directions_result:
        leg = directions_result[0]['legs'][0]
        duration_in_traffic = leg.get('duration_in_traffic', leg['duration'])
        return {
            'distance_text': leg['distance']['text'],
            'duration_minutes': round(duration_in_traffic['value'] / 60, 1),
            'polyline_points': directions_result[0]['overview_polyline']['points']
        }
    return None
`;

  const getActiveCode = () => {
    if (activeCodeTab === 'logger') return PYTHON_LOGGING_CODE;
    if (activeCodeTab === 'schema') return SQLITE_SCHEMA_CODE;
    return MAPS_API_CODE;
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(getActiveCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] font-['Hanken_Grotesk'] antialiased min-h-screen pt-16 pb-24">
      <TopAppBar title="Tech Stack & Code" />

      <main className="flex flex-col gap-6 px-margin-mobile mt-6 max-w-4xl mx-auto">
        {/* Editorial Subheader Metadata */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-2 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
          <span>VOL. 03 / SYSTEM ARCHITECTURE</span>
          <span>CODE BLUEPRINTS</span>
        </div>

        {/* Header Intro */}
        <div className="bg-[#E5E2DA] p-5 border border-[#1A1A1A]/15 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="material-symbols-outlined text-[20px] text-[#1A1A1A]">terminal</span>
            <h3 className="font-['JetBrains_Mono'] text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
              System Architecture & Stack
            </h3>
          </div>
          <p className="text-sm sm:text-base text-[#1A1A1A] font-['Hanken_Grotesk'] leading-relaxed">
            Built with a high-performance Python core, SQLite thread-safe storage, Google Maps API geofencing, and structured rotating logging handlers.
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TECH_STACK.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#EAE7E0] border border-[#1A1A1A]/15 p-5 flex flex-col justify-between hover:border-[#1A1A1A] transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full border border-[#1A1A1A]/20 bg-[#F9F7F2] text-[#1A1A1A] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    <h4 className="font-['Playfair_Display',serif] text-lg font-bold italic text-[#1A1A1A]">
                      {item.name}
                    </h4>
                  </div>
                  <span className="bg-[#1A1A1A] text-[#F9F7F2] font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider px-2.5 py-0.5 font-bold">
                    {item.version}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-['Hanken_Grotesk'] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1A1A1A]/15 flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#1A1A1A]/70 uppercase tracking-widest">
                <span>CAT: {item.category}</span>
                <span className="text-[#059669] font-bold">● INTEGRATED</span>
              </div>
            </div>
          ))}
        </div>

        {/* Code Viewer Section */}
        <section className="bg-[#1A1A1A] text-[#F9F7F2] border border-[#1A1A1A] shadow-lg overflow-hidden">
          {/* Code Header Bar */}
          <div className="bg-[#2A2A2A] border-b border-[#1A1A1A] p-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1 bg-[#1A1A1A] p-1 border border-[#1A1A1A] font-['JetBrains_Mono'] text-xs">
              <button
                onClick={() => setActiveCodeTab('logger')}
                className={`px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCodeTab === 'logger'
                    ? 'bg-[#F9F7F2] text-[#1A1A1A]'
                    : 'text-[#F9F7F2]/70 hover:text-[#F9F7F2]'
                }`}
              >
                Python Logger
              </button>
              <button
                onClick={() => setActiveCodeTab('schema')}
                className={`px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCodeTab === 'schema'
                    ? 'bg-[#F9F7F2] text-[#1A1A1A]'
                    : 'text-[#F9F7F2]/70 hover:text-[#F9F7F2]'
                }`}
              >
                SQLite Schema
              </button>
              <button
                onClick={() => setActiveCodeTab('maps')}
                className={`px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCodeTab === 'maps'
                    ? 'bg-[#F9F7F2] text-[#1A1A1A]'
                    : 'text-[#F9F7F2]/70 hover:text-[#F9F7F2]'
                }`}
              >
                Maps API Module
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest font-bold border border-[#F9F7F2]/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedCode ? 'check' : 'content_copy'}
              </span>
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Snippet Display */}
          <div className="p-5 overflow-x-auto text-xs font-['JetBrains_Mono'] text-[#F9F7F2]/90 leading-relaxed">
            <pre className="whitespace-pre">
              <code>{getActiveCode()}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
};

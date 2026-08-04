import React from 'react';
import { TopAppBar } from './TopAppBar';

interface ProjectDetailsScreenProps {
  onLaunchFleetMonitor: () => void;
  onSelectTechStackTag?: (tag: string) => void;
  onGoBack?: () => void;
}

export const ProjectDetailsScreen: React.FC<ProjectDetailsScreenProps> = ({
  onLaunchFleetMonitor,
  onSelectTechStackTag,
  onGoBack,
}) => {
  const HERO_IMAGE_URL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBlNnzqdDyZ1fBHh22j_mrtunF_ZyJl5SoUhLGeNaGPqAjSKQSiUg4Dnmkd4o-tumQ-ticfsEQkngQoKym8Iy6RSEYqUGrNGhm4VCH6CuK9Y7lbEwS93In5dG165KEA5BvT8IXWiVaLahuqKdiI6ZrKfYC7Dcb-AZbC0OAZWrtGdU9Pkvvai2yox8-V20XLggDRp8g-OOCw-J3y7iOUBR194Fnu6EVuvXTRa2FIZ1No2QbNPBfJdBvJvw';

  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] font-['Hanken_Grotesk'] antialiased min-h-screen pt-16 pb-24">
      {/* Top Header matching Editorial Theme */}
      <TopAppBar
        title="Project Details"
        onBack={onGoBack}
        onShare={() => {
          if (navigator.share) {
            navigator.share({
              title: 'College Bus Tracking System',
              text: 'Check out the College Bus Tracking System Portfolio & Live Monitor!',
              url: window.location.href,
            }).catch(() => {});
          }
        }}
      />

      <main className="flex flex-col gap-6 px-margin-mobile mt-6 max-w-4xl mx-auto">
        {/* Editorial Subheader Metadata */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-2 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
          <span>VOL. 01 / FEATURED ARCHITECTURE</span>
          <span>TRANSPORT LOGISTICS</span>
        </div>

        {/* Hero Section */}
        <section 
          onClick={onLaunchFleetMonitor}
          className="relative w-full h-72 sm:h-80 overflow-hidden border border-[#1A1A1A]/20 cursor-pointer group shadow-md"
        >
          <img
            alt="Technical backdrop"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
            src={HERO_IMAGE_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />

          {/* Floating Live Badge */}
          <div className="absolute top-4 right-4 bg-[#1A1A1A] text-[#F9F7F2] border border-[#F9F7F2]/20 px-3.5 py-1.5 text-[10px] font-['JetBrains_Mono'] font-bold tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
            <span>INTERACTIVE FLEET DEMO</span>
          </div>

          <div className="absolute bottom-0 left-0 p-6 w-full text-[#F9F7F2]">
            <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-[0.25em] text-[#F9F7F2]/70 mb-1 block">
              CASE STUDY 01
            </span>
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold italic tracking-tight mb-2 text-[#F9F7F2]">
              College Bus Tracking System
            </h2>
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#F9F7F2]/80 tracking-wide">
              Python • Location Services • Dynamic Routing • Real-Time Telemetry
            </p>
          </div>
        </section>

        {/* Live Demo Callout Banner */}
        <button
          onClick={onLaunchFleetMonitor}
          className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F9F7F2] py-4 px-6 font-['JetBrains_Mono'] text-xs tracking-[0.15em] uppercase font-bold shadow-md transition-all flex items-center justify-between group cursor-pointer border border-[#1A1A1A]"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#F9F7F2] group-hover:scale-110 transition-transform">
              radar
            </span>
            <span>Launch Live Interactive Command Monitor</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#F9F7F2]/80">
            <span>124 Units Active</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </button>

        {/* Project Overview */}
        <section className="bg-[#E5E2DA] p-6 border border-[#1A1A1A]/15 shadow-sm relative">
          <h3 className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#1A1A1A] mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#1A1A1A]">info</span>
            <span>Overview & Purpose</span>
          </h3>
          <p className="text-[#1A1A1A] text-base sm:text-lg leading-relaxed font-['Hanken_Grotesk']">
            Streamlining campus transport logistics and route monitoring through a sophisticated, data-driven application designed for real-time fleet visibility, passenger safety, and operational precision.
          </p>
        </section>

        {/* Key Achievements */}
        <section className="bg-[#EAE7E0] p-6 border border-[#1A1A1A]/15 shadow-sm">
          <h3 className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#1A1A1A] mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#1A1A1A]">military_tech</span>
            <span>Key Engineering Milestones</span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono'] text-[#1A1A1A] mt-0.5 font-bold text-sm">—</span>
              <span className="text-[#1A1A1A] text-base font-['Hanken_Grotesk'] leading-relaxed">
                Architected and coded a desktop tracking solution in Python to streamline college transport logistics and route monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono'] text-[#1A1A1A] mt-0.5 font-bold text-sm">—</span>
              <span className="text-[#1A1A1A] text-base font-['Hanken_Grotesk'] leading-relaxed">
                Implemented structured error handling and robust data logging to ensure 99%+ operational accuracy and real-time status reporting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono'] text-[#1A1A1A] mt-0.5 font-bold text-sm">—</span>
              <span className="text-[#1A1A1A] text-base font-['Hanken_Grotesk'] leading-relaxed">
                Integrated Google Maps Directions API to dynamically optimize bus routes during high-traffic campus rush hours.
              </span>
            </li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="bg-[#E5E2DA] p-6 border border-[#1A1A1A]/15 shadow-sm">
          <h3 className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#1A1A1A] mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#1A1A1A]">terminal</span>
            <span>Core Technologies</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {['Python', 'Google Maps API', 'SQLite', 'Python Logging'].map((tech) => (
              <span
                key={tech}
                onClick={() => onSelectTechStackTag?.(tech)}
                className="bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-['JetBrains_Mono'] text-[11px] tracking-wider uppercase px-3.5 py-1.5 transition-colors cursor-pointer border border-[#1A1A1A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Impact Card */}
        <section className="bg-[#1A1A1A] text-[#F9F7F2] p-6 border border-[#1A1A1A] shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.25em] text-[#F9F7F2]/70 mb-2">
                OPERATIONAL ACCURACY & ACCURACY RATE
              </p>
              <p className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold italic text-[#F9F7F2]">
                99%<span className="text-2xl font-sans not-italic text-[#F9F7F2]/80">+</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border border-[#F9F7F2]/30 flex items-center justify-center text-[#F9F7F2]">
              <span className="material-symbols-outlined icon-fill-1 text-[28px]">verified</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { TopAppBar } from './TopAppBar';
import { SYSTEM_METRICS, INITIAL_LOGS } from '../data/mockData';

export const MetricsScreen: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [logs] = useState(INITIAL_LOGS);

  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] font-['Hanken_Grotesk'] antialiased min-h-screen pt-16 pb-24">
      <TopAppBar title="Metrics & Analytics" />

      <main className="flex flex-col gap-6 px-margin-mobile mt-6 max-w-4xl mx-auto">
        {/* Editorial Subheader Metadata */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-2 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
          <span>VOL. 02 / PERFORMANCE REPORT</span>
          <span>SYSTEM DIAGNOSTICS</span>
        </div>

        {/* Timeframe Selector Header */}
        <div className="flex items-center justify-between bg-[#E5E2DA] p-4 border border-[#1A1A1A]/15 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#1A1A1A]">
              query_stats
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">
              Operational Telemetry
            </span>
          </div>
          <div className="flex gap-1 bg-[#F9F7F2] p-1 border border-[#1A1A1A]/15 font-['JetBrains_Mono'] text-xs">
            {(['24h', '7d', '30d'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 text-[11px] font-bold tracking-wider transition-colors cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* System Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SYSTEM_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-[#E5E2DA] border border-[#1A1A1A]/15 p-5 relative overflow-hidden shadow-sm hover:border-[#1A1A1A] transition-colors"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: '#1A1A1A' }}
              />
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#1A1A1A]/70 uppercase tracking-[0.2em] mb-1">
                    {metric.title}
                  </p>
                  <p className="font-['Playfair_Display',serif] text-3xl font-bold italic text-[#1A1A1A]">
                    {metric.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-[#1A1A1A] bg-[#F9F7F2]">
                  <span className="material-symbols-outlined text-[20px]">{metric.icon}</span>
                </div>
              </div>
              <p className="text-xs text-[#1A1A1A]/80 mt-3 font-['Hanken_Grotesk'] leading-normal">{metric.subtext}</p>
              <span className="inline-block mt-2 font-['JetBrains_Mono'] text-[10px] text-[#059669] font-bold uppercase tracking-wider">
                ● {metric.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Route On-Time Adherence Chart */}
        <section className="bg-[#EAE7E0] border border-[#1A1A1A]/15 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#1A1A1A]/15 pb-3">
            <div>
              <h3 className="font-['JetBrains_Mono'] text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                Route Schedule Adherence (%)
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-['Hanken_Grotesk'] mt-0.5">
                Comparison of actual bus arrival times vs target schedule
              </p>
            </div>
            <span className="text-[10px] font-['JetBrains_Mono'] font-bold text-[#F9F7F2] bg-[#1A1A1A] px-3 py-1 tracking-widest uppercase">
              AVG 99.4%
            </span>
          </div>

          <div className="space-y-4 font-['JetBrains_Mono'] text-xs">
            <div>
              <div className="flex justify-between mb-1.5 text-[#1A1A1A]">
                <span>Route A: Main Campus - Metro Link</span>
                <span className="font-bold">99.6%</span>
              </div>
              <div className="w-full bg-[#E5E2DA] h-2 overflow-hidden border border-[#1A1A1A]/15">
                <div className="bg-[#1A1A1A] h-full w-[99.6%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[#1A1A1A]">
                <span>Route B: North Dorms - Science Loop</span>
                <span className="font-bold">98.8%</span>
              </div>
              <div className="w-full bg-[#E5E2DA] h-2 overflow-hidden border border-[#1A1A1A]/15">
                <div className="bg-[#1A1A1A] h-full w-[98.8%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[#1A1A1A]">
                <span>Route C: South Tech Park Express</span>
                <span className="font-bold">99.2%</span>
              </div>
              <div className="w-full bg-[#E5E2DA] h-2 overflow-hidden border border-[#1A1A1A]/15">
                <div className="bg-[#1A1A1A] h-full w-[99.2%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[#1A1A1A]">
                <span>Route D: Faculty Housing West Gate</span>
                <span className="font-bold">99.8%</span>
              </div>
              <div className="w-full bg-[#E5E2DA] h-2 overflow-hidden border border-[#1A1A1A]/15">
                <div className="bg-[#1A1A1A] h-full w-[99.8%]" />
              </div>
            </div>
          </div>
        </section>

        {/* Real-time System Event Audit Stream */}
        <section className="bg-[#E5E2DA] border border-[#1A1A1A]/15 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#1A1A1A]/15 pb-3">
            <h3 className="font-['JetBrains_Mono'] text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">text_snippet</span>
              <span>Live System Diagnostic Events</span>
            </h3>
            <span className="text-[10px] font-['JetBrains_Mono'] text-[#1A1A1A]/60 tracking-wider uppercase font-bold">
              AUTO-STREAMING
            </span>
          </div>

          <div className="space-y-2 font-['JetBrains_Mono'] text-xs max-h-60 overflow-y-auto pr-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-[#F9F7F2] p-3 border border-[#1A1A1A]/15 flex items-start gap-2.5 text-[11px]"
              >
                <span className="text-[#1A1A1A]/50 whitespace-nowrap">{log.timestamp}</span>
                <span
                  className={`px-2 py-0.5 font-bold text-[9px] uppercase tracking-wider whitespace-nowrap ${
                    log.level === 'SUCCESS'
                      ? 'bg-[#059669] text-white'
                      : log.level === 'WARNING'
                      ? 'bg-[#d97706] text-white'
                      : 'bg-[#1A1A1A] text-[#F9F7F2]'
                  }`}
                >
                  {log.level}
                </span>
                <span className="text-[#1A1A1A]">{log.message}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

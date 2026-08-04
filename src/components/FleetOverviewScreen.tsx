import React, { useState, useEffect } from 'react';
import { BusUnit } from '../types';
import { INITIAL_BUSES } from '../data/mockData';
import { BusTelemetryModal } from './BusTelemetryModal';

interface FleetOverviewScreenProps {
  onBackToPortfolio: () => void;
}

export const FleetOverviewScreen: React.FC<FleetOverviewScreenProps> = ({
  onBackToPortfolio,
}) => {
  const [buses, setBuses] = useState<BusUnit[]>(INITIAL_BUSES);
  const [selectedBus, setSelectedBus] = useState<BusUnit | null>(null);
  const [simulating, setSimulating] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [selectedRouteFilter, setSelectedRouteFilter] = useState<string>('ALL');
  const [activeUnitsCount, setActiveUnitsCount] = useState<number>(124);
  const [avgSpeed, setAvgSpeed] = useState<number>(45);
  const [showTraffic, setShowTraffic] = useState<boolean>(true);

  // Live simulation tick to move buses along their routes
  useEffect(() => {
    if (!simulating) return;

    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          // Calculate subtle movement along a loop path
          const speedFactor = (bus.speed / 50) * 0.4 * simSpeed;
          let newX = bus.x + Math.sin((bus.heading * Math.PI) / 180) * speedFactor;
          let newY = bus.y + Math.cos((bus.heading * Math.PI) / 180) * speedFactor;
          let newHeading = bus.heading;

          // Boundary checks & turning
          if (newX > 85 || newX < 15) {
            newHeading = (newHeading + 180) % 360;
            newX = Math.max(15, Math.min(85, newX));
          }
          if (newY > 85 || newY < 15) {
            newHeading = (newHeading + 120) % 360;
            newY = Math.max(15, Math.min(85, newY));
          }

          // Random speed micro-fluctuation
          const speedFluctuation = Math.floor(Math.random() * 3) - 1;
          const nextSpeed = Math.max(30, Math.min(65, bus.speed + speedFluctuation));

          return {
            ...bus,
            x: Number(newX.toFixed(2)),
            y: Number(newY.toFixed(2)),
            heading: newHeading,
            speed: nextSpeed,
          };
        })
      );

      // Micro update average speed
      setAvgSpeed((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return Number((45 + delta).toFixed(0));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [simulating, simSpeed]);

  const handleUpdateBusSpeed = (busId: string, delta: number) => {
    setBuses((prev) =>
      prev.map((b) => (b.id === busId ? { ...b, speed: Math.max(10, b.speed + delta) } : b))
    );
    if (selectedBus && selectedBus.id === busId) {
      setSelectedBus((prev) => (prev ? { ...prev, speed: Math.max(10, prev.speed + delta) } : null));
    }
  };

  const filteredBuses =
    selectedRouteFilter === 'ALL'
      ? buses
      : buses.filter((b) => b.routeId === selectedRouteFilter);

  return (
    <div className="relative w-full h-screen bg-[#F9F7F2] text-[#1A1A1A] overflow-hidden flex flex-col select-none font-['Hanken_Grotesk']">
      {/* Top Header Controls for Editorial Monitor */}
      <header className="bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            title="Return to Project Portfolio"
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#333333] border border-[#1A1A1A] text-xs font-['JetBrains_Mono'] tracking-wider uppercase transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span className="hidden sm:inline">Portfolio View</span>
          </button>
          <div className="h-4 w-px bg-[#1A1A1A]/20" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#1A1A1A] font-bold tracking-[0.2em] uppercase">
              LIVE COMMAND SYSTEM
            </span>
          </div>
        </div>

        {/* Route Filter Selector */}
        <div className="hidden md:flex items-center gap-1 bg-[#E5E2DA] p-1 border border-[#1A1A1A]/15 text-xs font-['JetBrains_Mono']">
          {['ALL', 'ROUTE-A', 'ROUTE-B', 'ROUTE-C', 'ROUTE-D'].map((route) => (
            <button
              key={route}
              onClick={() => setSelectedRouteFilter(route)}
              className={`px-3 py-1 transition-colors cursor-pointer text-[10px] tracking-wider font-bold ${
                selectedRouteFilter === route
                  ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              {route}
            </button>
          ))}
        </div>

        {/* Play/Pause & Speed Simulation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSimulating(!simulating)}
            className={`px-3.5 py-1.5 text-xs font-['JetBrains_Mono'] font-bold tracking-wider uppercase flex items-center gap-1.5 border transition-all cursor-pointer ${
              simulating
                ? 'bg-[#E5E2DA] text-[#1A1A1A] border-[#1A1A1A]/30'
                : 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {simulating ? 'pause' : 'play_arrow'}
            </span>
            <span className="hidden sm:inline">{simulating ? 'PAUSE' : 'RESUME'}</span>
          </button>

          <button
            onClick={() => setSimSpeed(simSpeed === 1 ? 2 : simSpeed === 2 ? 5 : 1)}
            className="px-3 py-1.5 bg-[#E5E2DA] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/20 text-xs font-['JetBrains_Mono'] font-bold tracking-wider cursor-pointer transition-colors"
          >
            {simSpeed}x SPEED
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Left Vertical Nav Rail */}
        <aside className="w-12 sm:w-14 bg-[#E5E2DA] border-r border-[#1A1A1A]/15 flex flex-col items-center py-4 gap-6 z-20">
          <button
            onClick={onBackToPortfolio}
            title="Portfolio Overview"
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#D4D0C5] p-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
          <button
            onClick={onBackToPortfolio}
            title="Home"
            className="bg-[#1A1A1A] text-[#F9F7F2] p-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] icon-fill-1">home</span>
          </button>
          <button
            onClick={() => setSelectedRouteFilter('ALL')}
            title="All Units"
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#D4D0C5] p-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">directions_bus</span>
          </button>
          <button
            onClick={() => setShowTraffic(!showTraffic)}
            title="Toggle Traffic & Routes"
            className={`p-2 transition-colors cursor-pointer ${
              showTraffic ? 'text-[#1A1A1A] bg-[#D4D0C5]' : 'text-[#1A1A1A]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">map</span>
          </button>
          <button
            title="Telemetry Analytics"
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#D4D0C5] p-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">query_stats</span>
          </button>
          <button
            title="System Diagnostics"
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#D4D0C5] p-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </button>
          <button
            title="Settings"
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#D4D0C5] p-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>

          <div className="mt-auto">
            <button
              onClick={onBackToPortfolio}
              title="Exit Monitor"
              className="text-[#1A1A1A]/70 hover:text-[#b91c1c] p-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </aside>

        {/* Map Canvas Section (Center) */}
        <div className="flex-1 relative bg-[#F9F7F2] overflow-hidden">
          {/* Custom Stylized Editorial Vector Map Canvas */}
          <div className="absolute inset-0 bg-[#F9F7F2]">
            {/* Map Grid Patterns */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#EAE7E0" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Stylized Paper Landmass & River shapes */}
              <path
                d="M 100,0 Q 200,300 400,600 T 900,1200 L 0,1200 L 0,0 Z"
                fill="#EAE7E0"
                opacity="0.9"
              />
              <path
                d="M 350,0 Q 450,250 650,550 T 1100,1200 L 1400,1200 L 1400,0 Z"
                fill="#E5E2DA"
                opacity="0.8"
              />
              {/* River vector */}
              <path
                d="M 280,-50 C 350,200 420,400 500,650 C 580,900 700,1100 850,1300"
                fill="none"
                stroke="#D4D0C5"
                strokeWidth="48"
              />

              {/* Road Grid Lines */}
              <g stroke="#1A1A1A" strokeWidth="1.5" opacity="0.15">
                <line x1="5%" y1="20%" x2="95%" y2="80%" />
                <line x1="10%" y1="75%" x2="90%" y2="25%" />
                <line x1="25%" y1="5%" x2="35%" y2="95%" />
                <line x1="65%" y1="5%" x2="75%" y2="95%" />
                <line x1="5%" y1="45%" x2="95%" y2="55%" />
              </g>

              {/* Glowing Bus Route Lines in Editorial Dark Ink */}
              {showTraffic && (
                <g>
                  {/* Route 1 Polyline */}
                  <path
                    d="M 150,120 L 320,280 L 480,380 L 620,520 L 780,680"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="4"
                    opacity="0.8"
                  />
                  <path
                    d="M 150,120 L 320,280 L 480,380 L 620,520 L 780,680"
                    fill="none"
                    stroke="#F9F7F2"
                    strokeWidth="2"
                    className="animate-route-flow"
                  />

                  {/* Route 2 Polyline */}
                  <path
                    d="M 200,650 L 380,500 L 520,380 L 680,240 L 820,120"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="4"
                    opacity="0.8"
                  />
                  <path
                    d="M 200,650 L 380,500 L 520,380 L 680,240 L 820,120"
                    fill="none"
                    stroke="#E5E2DA"
                    strokeWidth="2"
                    className="animate-route-flow"
                  />

                  {/* Intersecting Pulse Telemetry Arcs */}
                  <path
                    d="M 280,350 Q 480,380 680,410"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                </g>
              )}
            </svg>

            {/* Interactive Animated Bus Markers on Map Canvas */}
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                onClick={() => setSelectedBus(bus)}
                style={{
                  left: `${bus.x}%`,
                  top: `${bus.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 cursor-pointer group transition-all duration-700 ease-out"
              >
                {/* Radar pulse aura */}
                <div className="absolute inset-0 -m-3 rounded-full bg-[#1A1A1A]/10 animate-radar pointer-events-none" />

                {/* Bus Marker Capsule */}
                <div className="relative flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] text-[#F9F7F2] border border-[#1A1A1A] shadow-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[16px] text-[#F9F7F2]">
                    directions_bus
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] font-bold tracking-wider whitespace-nowrap">
                    {bus.code}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
                </div>

                {/* Hover Tooltip Preview */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-[#1A1A1A] text-[#F9F7F2] text-xs p-3 shadow-xl whitespace-nowrap font-['JetBrains_Mono'] z-30 border border-[#1A1A1A]">
                  <p className="font-bold text-[#F9F7F2]">{bus.driverName}</p>
                  <p className="text-[#F9F7F2]/80">Speed: {bus.speed} km/h</p>
                  <p className="text-[#F9F7F2]/80">ETA Next Stop: {bus.etaMinutes}m</p>
                  <p className="text-[10px] text-[#F9F7F2]/60 font-bold uppercase tracking-widest mt-1">INSPECT UNIT</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Overlay Bottom Controls */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-[#F9F7F2]/95 border border-[#1A1A1A]/20 p-2.5 backdrop-blur-md text-xs font-['JetBrains_Mono'] shadow-sm">
            <span className="text-[#1A1A1A]/70 uppercase tracking-widest">ACTIVE CORRIDORS:</span>
            <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-[#F9F7F2] font-bold text-[10px] tracking-wider">
              {filteredBuses.length} UNITS TRACKED
            </span>
            <span className="text-[#059669] font-bold flex items-center gap-1 ml-2">
              <span className="material-symbols-outlined text-[14px]">gps_fixed</span> GPS ACTIVE
            </span>
          </div>
        </div>

        {/* Right Telemetry Dashboard Panel */}
        <aside className="w-80 lg:w-96 bg-[#E5E2DA] border-l border-[#1A1A1A]/15 p-5 flex flex-col gap-5 overflow-y-auto z-20 shadow-xl">
          {/* Header Title */}
          <div className="border-b border-[#1A1A1A]/15 pb-3">
            <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-[0.25em] text-[#1A1A1A]/60 block mb-0.5">
              TELEMETRY LOGISTICS
            </span>
            <h2 className="font-['Playfair_Display',serif] text-2xl font-bold italic text-[#1A1A1A]">
              Fleet Overview
            </h2>
          </div>

          {/* Bar Chart Visualization */}
          <div className="bg-[#EAE7E0] border border-[#1A1A1A]/15 p-4 shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] mb-3 text-[#1A1A1A]/70 uppercase tracking-widest">
              <span>HOURLY DISPATCH SPECTRUM</span>
              <span className="text-[#1A1A1A] font-bold">100% CAP</span>
            </div>
            {/* Animated Bar Graph */}
            <div className="h-24 flex items-end justify-between gap-1.5 px-1 pt-2 border-b border-[#1A1A1A]/15">
              {[35, 55, 42, 68, 85, 60, 48, 92, 75, 88, 64, 98].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full bg-[#1A1A1A] group-hover:bg-[#333333] transition-all duration-500"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#1A1A1A]/60 font-['JetBrains_Mono'] mt-2">
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>22:00</span>
            </div>
          </div>

          {/* ACTIVE UNITS Card */}
          <div className="bg-[#F9F7F2] border border-[#1A1A1A]/15 p-4 relative shadow-sm">
            <p className="font-['JetBrains_Mono'] text-[10px] text-[#1A1A1A]/70 uppercase tracking-[0.2em] mb-1">
              ACTIVE UNITS:
            </p>
            <div className="flex items-baseline justify-between">
              <p className="font-['Playfair_Display',serif] text-4xl font-bold italic text-[#1A1A1A]">
                {activeUnitsCount}
              </p>
              <span className="text-[10px] text-[#059669] font-['JetBrains_Mono'] font-bold tracking-widest uppercase">
                ● ALL ONLINE
              </span>
            </div>
            <div className="w-full bg-[#E5E2DA] h-1.5 mt-3 overflow-hidden border border-[#1A1A1A]/15">
              <div className="bg-[#1A1A1A] h-full w-[88%]" />
            </div>
          </div>

          {/* AVG. SPEED Card with Speedometer Gauge */}
          <div className="bg-[#F9F7F2] border border-[#1A1A1A]/15 p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="font-['JetBrains_Mono'] text-[10px] text-[#1A1A1A]/70 uppercase tracking-[0.2em] mb-1">
                AVG. SPEED:
              </p>
              <p className="font-['Playfair_Display',serif] text-3xl font-bold italic text-[#1A1A1A]">
                {avgSpeed} <span className="text-lg font-sans not-italic text-[#1A1A1A]/70">km/h</span>
              </p>
            </div>
            {/* Speedometer Radial Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="#E5E2DA"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="#1A1A1A"
                  strokeWidth="4"
                  strokeDasharray="138"
                  strokeDashoffset="35"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="material-symbols-outlined text-[22px] text-[#1A1A1A] absolute">
                speed
              </span>
            </div>
          </div>

          {/* SYSTEM STATUS Card */}
          <div className="bg-[#1A1A1A] text-[#F9F7F2] p-4 flex items-center justify-between shadow-md relative overflow-hidden">
            <div>
              <p className="font-['JetBrains_Mono'] text-[10px] text-[#F9F7F2]/70 uppercase tracking-[0.2em] mb-1">
                SYSTEM STATUS:
              </p>
              <p className="font-['Playfair_Display',serif] text-2xl font-bold italic text-[#F9F7F2]">
                OPTIMAL
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#F9F7F2]/30 flex items-center justify-center text-[#F9F7F2]">
              <span className="material-symbols-outlined icon-fill-1 text-[24px]">
                verified_user
              </span>
            </div>
          </div>

          {/* Footer Branding Logo */}
          <div className="mt-auto pt-4 border-t border-[#1A1A1A]/15 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center text-[#F9F7F2] font-['Playfair_Display'] font-bold text-xl">
              P
            </div>
            <div>
              <h4 className="font-['Playfair_Display',serif] font-bold text-sm tracking-wider text-[#1A1A1A] italic">
                Precision Engineering
              </h4>
              <p className="text-[10px] text-[#1A1A1A]/60 font-['JetBrains_Mono'] tracking-wider uppercase">
                College Transport Logistics v2.4
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Selected Bus Inspection Modal */}
      {selectedBus && (
        <BusTelemetryModal
          bus={selectedBus}
          onClose={() => setSelectedBus(null)}
          onUpdateBusSpeed={handleUpdateBusSpeed}
        />
      )}
    </div>
  );
};

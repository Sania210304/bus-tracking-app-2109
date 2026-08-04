import React, { useState } from 'react';
import { BusUnit } from '../types';

interface BusTelemetryModalProps {
  bus: BusUnit;
  onClose: () => void;
  onUpdateBusSpeed?: (busId: string, delta: number) => void;
}

export const BusTelemetryModal: React.FC<BusTelemetryModalProps> = ({
  bus,
  onClose,
  onUpdateBusSpeed,
}) => {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'route' | 'driver'>('telemetry');
  const [pinging, setPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);

  const handlePingGps = () => {
    setPinging(true);
    setTimeout(() => {
      setPinging(false);
      setLastPingTime(new Date().toLocaleTimeString());
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#191c1e] border border-[#41474f] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1d2022] border-b border-[#41474f] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#3776ab]/20 border border-[#3776ab]/40 text-[#98cbff]">
              <span className="material-symbols-outlined text-[24px]">directions_bus</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-['Hanken_Grotesk'] text-[#98cbff]">
                  {bus.code}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold bg-[#3776ab] text-[#f5f8ff]">
                  {bus.status}
                </span>
              </div>
              <p className="text-xs text-[#c1c7d0] font-['JetBrains_Mono']">{bus.routeName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#c1c7d0] hover:text-[#98cbff] p-2 hover:bg-[#272a2c] rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#41474f] bg-[#101415] text-xs font-['JetBrains_Mono']">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'telemetry'
                ? 'border-[#98cbff] text-[#98cbff] font-bold bg-[#1d2022]'
                : 'border-transparent text-[#c1c7d0] hover:text-white'
            }`}
          >
            LIVE TELEMETRY
          </button>
          <button
            onClick={() => setActiveTab('route')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'route'
                ? 'border-[#98cbff] text-[#98cbff] font-bold bg-[#1d2022]'
                : 'border-transparent text-[#c1c7d0] hover:text-white'
            }`}
          >
            ROUTE STOPS
          </button>
          <button
            onClick={() => setActiveTab('driver')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'driver'
                ? 'border-[#98cbff] text-[#98cbff] font-bold bg-[#1d2022]'
                : 'border-transparent text-[#c1c7d0] hover:text-white'
            }`}
          >
            DRIVER & VEHICLE
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'telemetry' && (
            <>
              {/* Gauges & Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[#1d2022] border border-[#41474f] rounded-xl p-3">
                  <p className="text-[11px] font-['JetBrains_Mono'] text-[#c1c7d0] uppercase mb-1">
                    Speed
                  </p>
                  <p className="text-2xl font-bold font-['Hanken_Grotesk'] text-[#98cbff]">
                    {bus.speed} <span className="text-xs text-[#c1c7d0]">km/h</span>
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={() => onUpdateBusSpeed?.(bus.id, -5)}
                      className="px-2 py-0.5 bg-[#272a2c] text-xs hover:bg-[#323537] rounded text-white cursor-pointer"
                    >
                      -5
                    </button>
                    <button
                      onClick={() => onUpdateBusSpeed?.(bus.id, 5)}
                      className="px-2 py-0.5 bg-[#3776ab] text-xs hover:bg-[#1d6296] rounded text-white cursor-pointer"
                    >
                      +5
                    </button>
                  </div>
                </div>

                <div className="bg-[#1d2022] border border-[#41474f] rounded-xl p-3">
                  <p className="text-[11px] font-['JetBrains_Mono'] text-[#c1c7d0] uppercase mb-1">
                    Passengers
                  </p>
                  <p className="text-2xl font-bold font-['Hanken_Grotesk'] text-[#98cbff]">
                    {bus.passengers} <span className="text-xs text-[#c1c7d0]">/ {bus.capacity}</span>
                  </p>
                  <div className="w-full bg-[#101415] rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className="bg-[#3776ab] h-full rounded-full transition-all duration-300"
                      style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#1d2022] border border-[#41474f] rounded-xl p-3 col-span-2 sm:col-span-1">
                  <p className="text-[11px] font-['JetBrains_Mono'] text-[#c1c7d0] uppercase mb-1">
                    Fuel & Battery
                  </p>
                  <p className="text-2xl font-bold font-['Hanken_Grotesk'] text-[#98cbff]">
                    {bus.fuelLevel}%
                  </p>
                  <p className="text-[11px] text-[#4285f4] font-['JetBrains_Mono'] mt-1">
                    GPS Lock: {bus.gpsAccuracy}
                  </p>
                </div>
              </div>

              {/* Next Stop & ETA Banner */}
              <div className="bg-[#1d2022] border border-[#3776ab]/50 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#98cbff]" />
                <div>
                  <p className="text-[11px] font-['JetBrains_Mono'] text-[#c1c7d0] uppercase">
                    Approaching Next Stop
                  </p>
                  <p className="text-base font-bold text-[#e0e3e5] font-['Hanken_Grotesk'] mt-0.5">
                    {bus.nextStop}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#c1c7d0] font-['JetBrains_Mono'] block">ETA</span>
                  <span className="text-xl font-bold text-[#98cbff] font-['Hanken_Grotesk']">
                    {bus.etaMinutes} min
                  </span>
                </div>
              </div>

              {/* Python Terminal Log Stream */}
              <div className="bg-[#0b0f10] border border-[#41474f] rounded-xl p-3 font-['JetBrains_Mono'] text-xs">
                <div className="flex items-center justify-between border-b border-[#272a2c] pb-2 mb-2 text-[#8b919a]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4285f4] animate-ping" />
                    PYTHON_LOGGER_DAEMON (PID 8421)
                  </span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="space-y-1 text-[#c1c7d0] text-[11px] font-mono">
                  <p className="text-[#98cbff]">[INFO] SQLite cursor synced position (x={bus.x}%, y={bus.y}%).</p>
                  <p>[INFO] Speed sensor reading = {bus.speed} km/h on CAN bus port 0x04.</p>
                  <p className="text-[#41cd52]">[SUCCESS] Map matching polyline distance deviation &lt; 0.4m.</p>
                  {lastPingTime && (
                    <p className="text-[#38bdf8]">[ACK] Manual GPS Ping responded in 14ms at {lastPingTime}.</p>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'route' && (
            <div className="space-y-3">
              <p className="text-xs text-[#c1c7d0] font-['JetBrains_Mono']">
                Active Corridor Stops for {bus.routeName}:
              </p>
              <div className="space-y-2 border-l-2 border-[#3776ab] pl-4 ml-2">
                <div className="relative flex items-center justify-between bg-[#1d2022] p-2.5 rounded-lg border border-[#41474f]">
                  <span className="absolute -left-[23px] w-3 h-3 rounded-full bg-[#3776ab] border-2 border-[#101415]" />
                  <div>
                    <p className="text-sm font-semibold text-white">Central Quad & Library</p>
                    <p className="text-[11px] text-[#c1c7d0]">Passed 8 mins ago</p>
                  </div>
                  <span className="text-xs text-[#41cd52] font-['JetBrains_Mono']">COMPLETED</span>
                </div>

                <div className="relative flex items-center justify-between bg-[#272a2c] p-2.5 rounded-lg border border-[#98cbff]/50">
                  <span className="absolute -left-[23px] w-3.5 h-3.5 rounded-full bg-[#98cbff] border-2 border-[#101415] animate-pulse" />
                  <div>
                    <p className="text-sm font-bold text-[#98cbff]">Engineering Hall (Next Stop)</p>
                    <p className="text-[11px] text-[#c1c7d0]">ETA: {bus.etaMinutes} mins</p>
                  </div>
                  <span className="text-xs text-[#98cbff] font-['JetBrains_Mono'] font-bold">IN BOUND</span>
                </div>

                <div className="relative flex items-center justify-between bg-[#1d2022] p-2.5 rounded-lg border border-[#41474f]">
                  <span className="absolute -left-[23px] w-3 h-3 rounded-full bg-[#41474f] border-2 border-[#101415]" />
                  <div>
                    <p className="text-sm font-semibold text-[#c1c7d0]">Metro Station Gate 2</p>
                    <p className="text-[11px] text-[#8b919a]">ETA: {bus.etaMinutes + 6} mins</p>
                  </div>
                  <span className="text-xs text-[#8b919a] font-['JetBrains_Mono']">SCHEDULED</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'driver' && (
            <div className="space-y-3">
              <div className="bg-[#1d2022] p-4 rounded-xl border border-[#41474f] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#3776ab] flex items-center justify-center text-white text-xl font-bold">
                  {bus.driverName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{bus.driverName}</h4>
                  <p className="text-xs text-[#c1c7d0] font-['JetBrains_Mono']">Senior Fleet Driver • ID #4892</p>
                  <p className="text-[11px] text-[#41cd52] mt-1 font-['JetBrains_Mono']">Shift Status: Active (4h 20m)</p>
                </div>
              </div>

              <div className="bg-[#101415] p-3 rounded-xl border border-[#41474f] text-xs font-['JetBrains_Mono'] space-y-1.5 text-[#c1c7d0]">
                <div className="flex justify-between">
                  <span>Vehicle Model:</span>
                  <span className="text-white">Volvo B9TL Campus Transit</span>
                </div>
                <div className="flex justify-between">
                  <span>Hardware Telemetry Unit:</span>
                  <span className="text-white">PyRaspberry Pi 4 + SIM800L GPS</span>
                </div>
                <div className="flex justify-between">
                  <span>SQLite Table Ref:</span>
                  <span className="text-[#98cbff]">bus_units.row_id = 101</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#101415] border-t border-[#41474f] p-4 flex gap-3">
          <button
            onClick={handlePingGps}
            disabled={pinging}
            className="flex-1 bg-[#3776ab] hover:bg-[#1d6296] text-[#f5f8ff] py-2.5 px-4 rounded-xl font-['JetBrains_Mono'] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[18px] ${pinging ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{pinging ? 'Pinging Hardware...' : 'Ping GPS Node'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#272a2c] hover:bg-[#323537] text-[#c1c7d0] hover:text-white rounded-xl font-['JetBrains_Mono'] text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

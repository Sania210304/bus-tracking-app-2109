export type TabType = 'portfolio' | 'metrics' | 'stack' | 'contact' | 'fleet-monitor';

export interface BusUnit {
  id: string;
  code: string;
  routeId: string;
  routeName: string;
  driverName: string;
  speed: number; // km/h
  passengers: number;
  capacity: number;
  status: 'OPTIMAL' | 'ELEVATED' | 'MAINTENANCE' | 'DELAYED';
  fuelLevel: number; // percentage
  gpsAccuracy: string; // e.g. "±1.2m"
  nextStop: string;
  etaMinutes: number;
  x: number; // map coordinate 0-100%
  y: number; // map coordinate 0-100%
  heading: number; // degrees
}

export interface BusRoute {
  id: string;
  name: string;
  color: string;
  totalBuses: number;
  stopsCount: number;
  stops: string[];
  distanceKm: number;
  avgTravelTimeMin: number;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  source: string;
  message: string;
}

export interface TechStackItem {
  name: string;
  category: 'Language' | 'API' | 'Database' | 'Logging' | 'GUI';
  description: string;
  icon: string;
  color: string;
  version: string;
}

export interface MetricCardData {
  title: string;
  value: string;
  subtext: string;
  trend: string;
  icon: string;
  highlightColor: string;
}

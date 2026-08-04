import { BusUnit, BusRoute, TelemetryLog, TechStackItem, MetricCardData } from '../types';

export const INITIAL_BUSES: BusUnit[] = [
  {
    id: 'BUS-101',
    code: 'BUS #101',
    routeId: 'ROUTE-A',
    routeName: 'Main Campus - Metro Link',
    driverName: 'Robert Vance',
    speed: 48,
    passengers: 32,
    capacity: 45,
    status: 'OPTIMAL',
    fuelLevel: 88,
    gpsAccuracy: '±0.8m',
    nextStop: 'Central Quad & Library',
    etaMinutes: 3,
    x: 28,
    y: 35,
    heading: 45,
  },
  {
    id: 'BUS-102',
    code: 'BUS #102',
    routeId: 'ROUTE-B',
    routeName: 'North Dorms - Science Complex',
    driverName: 'Sarah Jenkins',
    speed: 42,
    passengers: 41,
    capacity: 50,
    status: 'OPTIMAL',
    fuelLevel: 76,
    gpsAccuracy: '±1.1m',
    nextStop: 'Engineering Hall',
    etaMinutes: 5,
    x: 52,
    y: 22,
    heading: 120,
  },
  {
    id: 'BUS-103',
    code: 'BUS #103',
    routeId: 'ROUTE-C',
    routeName: 'South Tech Park Express',
    driverName: 'Michael Chen',
    speed: 51,
    passengers: 28,
    capacity: 45,
    status: 'OPTIMAL',
    fuelLevel: 92,
    gpsAccuracy: '±0.9m',
    nextStop: 'Innovation Hub',
    etaMinutes: 2,
    x: 65,
    y: 52,
    heading: 210,
  },
  {
    id: 'BUS-104',
    code: 'BUS #104',
    routeId: 'ROUTE-D',
    routeName: 'Faculty Housing - West Gate',
    driverName: 'Elena Rostova',
    speed: 38,
    passengers: 19,
    capacity: 40,
    status: 'OPTIMAL',
    fuelLevel: 81,
    gpsAccuracy: '±1.4m',
    nextStop: 'West Terminal',
    etaMinutes: 6,
    x: 35,
    y: 68,
    heading: 310,
  },
  {
    id: 'BUS-105',
    code: 'BUS #105',
    routeId: 'ROUTE-A',
    routeName: 'Main Campus - Metro Link',
    driverName: 'David Miller',
    speed: 44,
    passengers: 39,
    capacity: 45,
    status: 'ELEVATED',
    fuelLevel: 64,
    gpsAccuracy: '±1.0m',
    nextStop: 'Metro Station Gate 2',
    etaMinutes: 4,
    x: 48,
    y: 42,
    heading: 85,
  }
];

export const BUS_ROUTES: BusRoute[] = [
  {
    id: 'ROUTE-A',
    name: 'Main Campus - Metro Link',
    color: '#98cbff',
    totalBuses: 28,
    stopsCount: 12,
    stops: ['Central Station', 'North Gate', 'Central Quad', 'Library Square', 'Student Union', 'Metro Station Gate 2'],
    distanceKm: 14.2,
    avgTravelTimeMin: 22,
  },
  {
    id: 'ROUTE-B',
    name: 'North Dorms - Science Complex',
    color: '#38bdf8',
    totalBuses: 32,
    stopsCount: 14,
    stops: ['Dorm Quad A', 'Dining Hall', 'BioTech Wing', 'Engineering Hall', 'Planetarium'],
    distanceKm: 18.5,
    avgTravelTimeMin: 28,
  },
  {
    id: 'ROUTE-C',
    name: 'South Tech Park Express',
    color: '#60a5fa',
    totalBuses: 36,
    stopsCount: 8,
    stops: ['Main Campus Loop', 'Business School', 'Research Lab 3', 'Innovation Hub'],
    distanceKm: 22.0,
    avgTravelTimeMin: 31,
  },
  {
    id: 'ROUTE-D',
    name: 'Faculty Housing - West Gate',
    color: '#818cf8',
    totalBuses: 28,
    stopsCount: 10,
    stops: ['Faculty Villas', 'West Terminal', 'Athletics Arena', 'Medical Center'],
    distanceKm: 11.8,
    avgTravelTimeMin: 18,
  }
];

export const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: 'LOG-1001',
    timestamp: '22:19:04',
    level: 'SUCCESS',
    source: 'GPS_SERVICE',
    message: 'High-precision coordinate lock established on 124 active fleet units (±0.9m mean error).',
  },
  {
    id: 'LOG-1002',
    timestamp: '22:18:48',
    level: 'INFO',
    source: 'SQLITE_DB',
    message: 'Batch position commit completed: 1,240 records written to SQLite WAL journal in 4.2ms.',
  },
  {
    id: 'LOG-1003',
    timestamp: '22:18:12',
    level: 'INFO',
    source: 'MAPS_API',
    message: 'Google Maps Directions Matrix refreshed for Route-A. Traffic flow factor: 1.04x normal.',
  },
  {
    id: 'LOG-1004',
    timestamp: '22:17:35',
    level: 'SUCCESS',
    source: 'FLEET_ENGINE',
    message: 'Operational status verified: 99.4% accuracy rating confirmed across all campus corridors.',
  },
  {
    id: 'LOG-1005',
    timestamp: '22:16:50',
    level: 'WARNING',
    source: 'BUS-105',
    message: 'Slight congestion detected near Metro Gate 2. ETA recalculated (+1.5 min).',
  }
];

export const TECH_STACK: TechStackItem[] = [
  {
    name: 'Python 3.11+',
    category: 'Language',
    description: 'Core desktop application engine handling asynchronous telemetry streams, thread-safe queue buffering, and event loops.',
    icon: 'terminal',
    color: '#3776ab',
    version: 'v3.11.8',
  },
  {
    name: 'Google Maps API',
    category: 'API',
    description: 'Real-time geofencing, route polylines rendering, traffic matrix matrix calculations, and snapped-to-road location interpolation.',
    icon: 'map',
    color: '#4285f4',
    version: 'v3.54',
  },
  {
    name: 'SQLite 3 (WAL)',
    category: 'Database',
    description: 'Embedded relational database configured with Write-Ahead Logging for high-concurrency 100Hz telemetry ingestion and offline buffering.',
    icon: 'database',
    color: '#003b57',
    version: 'v3.42',
  },
  {
    name: 'Python Logging',
    category: 'Logging',
    description: 'Structured hierarchical logger with rolling file handlers, automated crash diagnostics, and real-time status output monitoring.',
    icon: 'text_snippet',
    color: '#306998',
    version: 'Standard Lib',
  },
  {
    name: 'PyQt / Tkinter GUI',
    category: 'GUI',
    description: 'Custom desktop command-center UI rendered at 60 FPS with hardware-accelerated graphics and telemetry gauge controls.',
    icon: 'desktop_windows',
    color: '#41cd52',
    version: 'v6.5',
  }
];

export const SYSTEM_METRICS: MetricCardData[] = [
  {
    title: 'Operational Accuracy',
    value: '99%+',
    subtext: 'Verified route adherence & schedule match',
    trend: '+1.2% this month',
    icon: 'verified',
    highlightColor: '#98cbff',
  },
  {
    title: 'Active Fleet Units',
    value: '124',
    subtext: 'Buses monitored concurrently in real-time',
    trend: '100% online',
    icon: 'directions_bus',
    highlightColor: '#38bdf8',
  },
  {
    title: 'Average Fleet Speed',
    value: '45 km/h',
    subtext: 'Optimized speed across campus zones',
    trend: 'Optimal flow',
    icon: 'speed',
    highlightColor: '#60a5fa',
  },
  {
    title: 'Daily Passengers Serviced',
    value: '18,450+',
    subtext: 'Students, faculty & campus visitors',
    trend: '98.6% satisfaction',
    icon: 'groups',
    highlightColor: '#818cf8',
  }
];

export const PYTHON_LOGGING_CODE = `import logging
from logging.handlers import RotatingFileHandler
import sqlite3
import time

# Configure structured Python logging for Fleet Tracking
logger = logging.getLogger("PrecisionEngineering.BusTracker")
logger.setLevel(logging.DEBUG)

# Rotating log handler to ensure 99%+ operational stability
handler = RotatingFileHandler("bus_telemetry.log", maxBytes=10*1024*1024, backupCount=5)
formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)

def record_telemetry(bus_id, lat, lng, speed, status="OPTIMAL"):
    try:
        conn = sqlite3.connect("fleet_data.db", timeout=2.0)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO telemetry (bus_id, timestamp, lat, lng, speed, status) VALUES (?, ?, ?, ?, ?, ?)",
            (bus_id, time.time(), lat, lng, speed, status)
        )
        conn.commit()
        conn.close()
        logger.info(f"Recorded telemetry for {bus_id}: Speed={speed}km/h | Status={status}")
        return True
    except sqlite3.Error as err:
        logger.error(f"SQLite insertion error for {bus_id}: {err}")
        return False
`;

export const SQLITE_SCHEMA_CODE = `-- SQLite Schema for Bus Tracking System
CREATE TABLE IF NOT EXISTS bus_units (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    route_id TEXT NOT NULL,
    driver_name TEXT NOT NULL,
    capacity INTEGER DEFAULT 45,
    status TEXT DEFAULT 'OPTIMAL'
);

CREATE TABLE IF NOT EXISTS telemetry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_id TEXT NOT NULL,
    timestamp REAL NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    speed REAL NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(bus_id) REFERENCES bus_units(id)
);

CREATE INDEX IF NOT EXISTS idx_telemetry_bus_time ON telemetry(bus_id, timestamp);
`;

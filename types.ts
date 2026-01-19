export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  location: { lat: number; lng: number };
  region: string;
  streamUrl?: string;
}

export interface SystemEvent {
  id: string;
  deviceId: string;
  deviceName: string;
  type: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
  timestamp: string;
}

export interface VideoStats {
  date: string;
  events: number;
}

export enum ViewMode {
  SINGLE = 'SINGLE',
  GRID_2X2 = 'GRID_2X2',
  GRID_3X3 = 'GRID_3X3',
}
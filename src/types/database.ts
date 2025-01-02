export interface BusStop {
  id: string;
  name: string;
  previous_stop: string | null;
  next_stop: string | null;
  created_at: string;
}

export interface BusSchedule {
  id: string;
  bus_stop_id: string;
  bus_name: string;
  destination: string;
  arrival_time: string;
  days: string[];
  created_at: string;
  updated_at: string;
}
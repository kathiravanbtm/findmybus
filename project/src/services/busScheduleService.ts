import { supabase } from '../lib/supabase';
import { BusSchedule } from '../types/database';

interface ScheduleData {
  bus_stop_id: string;
  bus_name: string;
  destination: string;
  arrival_time: string;
  days: string[];
}

export const createSchedule = async (data: ScheduleData): Promise<BusSchedule> => {
  const { data: schedule, error } = await supabase
    .from('bus_schedules')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create schedule: ${error.message}`);
  }

  if (!schedule) {
    throw new Error('Failed to create schedule: No data returned');
  }

  return schedule;
};

export const updateSchedule = async (id: string, data: Partial<ScheduleData>): Promise<BusSchedule> => {
  const { data: schedule, error } = await supabase
    .from('bus_schedules')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update schedule: ${error.message}`);
  }

  if (!schedule) {
    throw new Error('Failed to update schedule: No data returned');
  }

  return schedule;
};
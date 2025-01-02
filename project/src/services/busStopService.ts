import { supabase } from '../lib/supabase';
import { BusStop } from '../types/database';

export const createBusStop = async (data: {
  name: string;
  previousStop: string | null;
  nextStop: string | null;
}): Promise<BusStop> => {
  const { data: busStop, error } = await supabase
    .from('bus_stops')
    .insert([{
      name: data.name.trim(),
      previous_stop: data.previousStop?.trim() || null,
      next_stop: data.nextStop?.trim() || null
    }])
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (!busStop) {
    throw new Error('Failed to create bus stop');
  }

  return busStop;
};
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BusStop } from '../types/database';

export const useBusStops = (searchTerm: string = '', refreshTrigger = 0) => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusStops = async () => {
      try {
        setLoading(true);
        const query = supabase
          .from('bus_stops')
          .select('*')
          .order('name');
        
        if (searchTerm) {
          query.ilike('name', `%${searchTerm}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        setBusStops(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBusStops();
  }, [searchTerm, refreshTrigger]);

  return { busStops, loading, error };
};
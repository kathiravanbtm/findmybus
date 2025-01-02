import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { BusSchedule } from '../types/database';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useBusSchedules = (busStopName: string) => {
  const [schedules, setSchedules] = useState<BusSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busStopId, setBusStopId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchWithRetry = async (fn: () => Promise<any>, retries = MAX_RETRIES): Promise<any> => {
    try {
      return await fn();
    } catch (err) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(fn, retries - 1);
      }
      throw err;
    }
  };

  const fetchSchedules = useCallback(async () => {
    if (!busStopName) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // First, get the bus stop ID
      const { data: busStop, error: busStopError } = await fetchWithRetry(() => 
        supabase
          .from('bus_stops')
          .select('id')
          .eq('name', busStopName)
          .single()
      );

      if (busStopError) {
        if (busStopError.code === 'PGRST116') {
          setError('Bus stop not found');
        } else {
          throw busStopError;
        }
        return;
      }

      if (!busStop) {
        setError('Bus stop not found');
        return;
      }

      setBusStopId(busStop.id);

      // Then fetch schedules using the bus stop ID
      const { data, error } = await fetchWithRetry(() =>
        supabase
          .from('bus_schedules')
          .select('*')
          .eq('bus_stop_id', busStop.id)
          .order('arrival_time')
      );

      if (error) throw error;
      setSchedules(data || []);
    } catch (err) {
      console.error('Error fetching schedules:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to the database');
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  }, [busStopName]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules, refreshTrigger]);

  const refreshSchedules = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return { schedules, loading, error, busStopId, refreshSchedules };
};
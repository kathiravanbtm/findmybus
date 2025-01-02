import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSchedule, updateSchedule } from '../services/busScheduleService';
import { validateScheduleData } from '../utils/scheduleValidation';
import { BusSchedule } from '../types/database';

interface ScheduleFormData {
  bus_name: string;
  destination: string;
  time: string;
  period: string;
  days: string[];
}

export const useScheduleManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveSchedule = async (
    formData: ScheduleFormData,
    busStopId: string,
    existingSchedule?: BusSchedule
  ) => {
    try {
      const validationErrors = validateScheduleData(formData);
      if (validationErrors.length > 0) {
        setError(validationErrors.join('\n'));
        return false;
      }

      setLoading(true);
      setError(null);

      const scheduleData = {
        bus_stop_id: busStopId,
        bus_name: formData.bus_name.trim(),
        destination: formData.destination.trim(),
        arrival_time: `${formData.time}:00 ${formData.period}`,
        days: [formData.days[0].trim() || 'EVERY DAY']
      };

      if (existingSchedule) {
        await updateSchedule(existingSchedule.id, scheduleData);
      } else {
        await createSchedule(scheduleData);
      }

      // Force a refresh of the schedule page
      navigate(0);
      return true;
    } catch (err) {
      console.error('Error saving schedule:', err);
      setError(err instanceof Error ? err.message : 'Failed to save schedule');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveSchedule,
    loading,
    error
  };
};
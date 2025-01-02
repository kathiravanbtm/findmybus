import React, { useState } from 'react';
import FormInput from './forms/FormInput';
import TimeInput from './forms/TimeInput';
import { useScheduleManagement } from '../hooks/useScheduleManagement';
import { BusSchedule } from '../types/database';

interface AddRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  busStopId?: string;
  busStopName?: string;
  existingSchedule?: BusSchedule;
}

const AddRouteModal = ({ isOpen, onClose, busStopId, existingSchedule }: AddRouteModalProps) => {
  const { saveSchedule, loading, error } = useScheduleManagement();
  const [formData, setFormData] = useState({
    bus_name: existingSchedule?.bus_name || '',
    destination: existingSchedule?.destination || '',
    time: existingSchedule?.arrival_time?.split(':')[0] || '9',
    period: existingSchedule?.arrival_time?.includes('PM') ? 'PM' : 'AM',
    days: existingSchedule?.days || ['EVERY DAY']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!busStopId) {
      console.error('No bus stop ID provided');
      return;
    }

    const success = await saveSchedule(formData, busStopId, existingSchedule);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-yellow-400 w-full max-w-md mx-4 rounded-3xl overflow-hidden">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center bg-pink-200 py-2 rounded-xl">
            {existingSchedule ? 'UPDATE STOP' : 'ADDING'}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <FormInput
              label="BUS"
              name="bus_name"
              value={formData.bus_name}
              onChange={handleChange}
              placeholder="Bus Name"
            />

            <FormInput
              label="DESTINATION"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
            />

            <TimeInput
              time={formData.time}
              period={formData.period}
              onTimeChange={handleChange}
              onPeriodChange={handleChange}
            />

            <FormInput
              label="DAY"
              name="days"
              value={formData.days[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, days: [e.target.value] }))}
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              className="bg-pink-200 px-6 py-2 rounded-lg hover:bg-pink-300 transition-colors disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'SAVING...' : existingSchedule ? 'UPDATE' : 'CREATE'}
            </button>
            <button 
              className="bg-pink-200 px-6 py-2 rounded-lg hover:bg-pink-300 transition-colors"
              onClick={onClose}
              disabled={loading}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRouteModal;
import React, { useState } from 'react';
import { BusSchedule } from '../types/database';
import FormInput from './forms/FormInput';
import TimeInput from './forms/TimeInput';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: BusSchedule;
  onEdit: (schedule: BusSchedule) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, schedule, onEdit }) => {
  const [formData, setFormData] = useState({
    bus_name: schedule.bus_name,
    destination: schedule.destination,
    time: schedule.arrival_time.split(':')[0],
    period: schedule.arrival_time.includes('PM') ? 'PM' : 'AM',
    days: schedule.days || ['EVERY DAY']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onEdit({
      ...schedule,
      bus_name: formData.bus_name,
      destination: formData.destination,
      arrival_time: `${formData.time}:00 ${formData.period}`,
      days: formData.days
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-yellow-400 w-full max-w-md mx-4 rounded-3xl overflow-hidden">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center bg-pink-200 py-2 rounded-xl">
            Edit Schedule
          </h2>
          
          <div className="space-y-4">
            <FormInput
              label="BUS"
              name="bus_name"
              value={formData.bus_name}
              onChange={handleChange}
              placeholder={schedule.bus_name}
            />

            <FormInput
              label="DESTINATION"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder={schedule.destination}
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
              placeholder={schedule.days?.[0] || 'EVERY DAY'}
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-pink-200 rounded-lg hover:bg-pink-300 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-pink-200 rounded-lg hover:bg-pink-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
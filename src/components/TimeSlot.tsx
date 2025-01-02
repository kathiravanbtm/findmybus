import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BusSchedule } from '../types/database';
import LikeButton from './LikeButton';
import WrongIcon from './WrongIcon';

interface TimeSlotProps {
  schedule: BusSchedule;
  stopName: string;
  isEditMode?: boolean;
}

const TimeSlot = ({ schedule, stopName, isEditMode = false }: TimeSlotProps) => {
  const navigate = useNavigate();

  const formatTime = (timeString: string) => {
    const [time] = timeString.split(' ');
    return time.slice(0, 5);
  };

  const handleEdit = () => {
    navigate(`/schedule/${encodeURIComponent(stopName)}/update`, {
      state: { schedule }
    });
  };

  return (
    <div className="bg-purple-100 p-3 rounded-xl relative">
      {isEditMode && (
        <button 
          onClick={handleEdit}
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          Edit
        </button>
      )}
      
      <div className="font-medium text-gray-800">{formatTime(schedule.arrival_time)}</div>
      <div className="text-sm font-bold text-gray-800 mt-1">{schedule.bus_name}</div>
      <div className="text-xs text-gray-500">to {schedule.destination}</div>
      <div className="text-xs font-medium text-pink-600 mt-1">
        {schedule.days?.[0] || 'EVERY DAY'}
      </div>

      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        <LikeButton />
        <WrongIcon />
      </div>
    </div>
  );
};

export default TimeSlot;
import React from 'react';
import TimeSlot from './TimeSlot';
import { useBusSchedules } from '../hooks/useBusSchedules';

interface TimeTableProps {
  busStopName: string;
  isEditMode?: boolean;
}

const TimeTable = ({ busStopName, isEditMode = false }: TimeTableProps) => {
  const { schedules, loading, error } = useBusSchedules(busStopName);

  if (loading) {
    return <div className="text-center text-gray-500">Loading schedules...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load schedules</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {schedules.map((schedule) => (
        <TimeSlot
          key={schedule.id}
          schedule={schedule}
          stopName={busStopName}
          isEditMode={isEditMode}
        />
      ))}
    </div>
  );
}

export default TimeTable;
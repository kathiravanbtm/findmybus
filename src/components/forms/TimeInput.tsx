import React from 'react';

interface TimeInputProps {
  time: string;
  period: string;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPeriodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeInput = ({ time, period, onTimeChange, onPeriodChange }: TimeInputProps) => {
  return (
    <div className="flex items-center gap-4">
      <label className="w-32 bg-pink-200 p-2 rounded-lg">TIMING</label>
      <input 
        type="number"
        name="time"
        value={time}
        min="1"
        max="12"
        className="w-20 bg-purple-100 p-2 rounded-lg"
        onChange={onTimeChange}
      />
      <select 
        name="period"
        value={period}
        onChange={onPeriodChange}
        className="bg-purple-100 p-2 rounded-lg"
      >
        <option>AM</option>
        <option>PM</option>
      </select>
    </div>
  );
};

export default TimeInput;
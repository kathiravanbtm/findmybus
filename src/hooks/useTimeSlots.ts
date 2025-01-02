import { useState, useEffect } from 'react';
import { BusSchedule } from '../types/busSchedule';
import { getTimeRemaining, parseTime } from '../utils/timeUtils';

export const useTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState<BusSchedule[]>([
    {
      departureTime: '9:00 AM',
      busName: 'Thamothiran Bus',
      destination: 'Tiruvannamalai',
      arrivalTime: ''
    },
    {
      departureTime: '10:30 AM',
      busName: 'Sri Murugan',
      destination: 'Chennai',
      arrivalTime: ''
    },
    {
      departureTime: '12:00 PM',
      busName: 'KPN Travels',
      destination: 'Bangalore',
      arrivalTime: ''
    },
    {
      departureTime: '2:30 PM',
      busName: 'Thamothiran Bus',
      destination: 'Tiruvannamalai',
      arrivalTime: ''
    },
    {
      departureTime: '4:00 PM',
      busName: 'Sri Murugan',
      destination: 'Chennai',
      arrivalTime: ''
    }
  ].sort((a, b) => parseTime(a.departureTime).getTime() - parseTime(b.departureTime).getTime()));

  useEffect(() => {
    const updateTimes = () => {
      setTimeSlots(slots => 
        slots.map(slot => ({
          ...slot,
          arrivalTime: getTimeRemaining(slot.departureTime)
        }))
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000);

    return () => clearInterval(interval);
  }, []);

  return { timeSlots };
};
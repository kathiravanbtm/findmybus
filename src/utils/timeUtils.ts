export const parseTime = (timeStr: string): Date => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  const date = new Date();
  let hour = hours;
  
  if (period === 'PM' && hours !== 12) {
    hour += 12;
  } else if (period === 'AM' && hours === 12) {
    hour = 0;
  }
  
  date.setHours(hour, minutes, 0, 0);
  return date;
};

export const getTimeRemaining = (departureTime: string): string => {
  const now = new Date();
  const departure = parseTime(departureTime);
  
  if (departure < now) {
    departure.setDate(departure.getDate() + 1); // Move to next day
  }
  
  const diffMs = departure.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  
  if (hours === 0) {
    return `${mins}m left`;
  }
  return `${hours}h ${mins}m left`;
};
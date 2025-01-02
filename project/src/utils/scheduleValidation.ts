export const validateScheduleData = (data: {
  bus_name: string;
  destination: string;
  time: string;
}) => {
  const errors: string[] = [];

  if (!data.bus_name.trim()) {
    errors.push('Bus name is required');
  }

  if (!data.destination.trim()) {
    errors.push('Destination is required');
  }

  const timeNum = parseInt(data.time);
  if (isNaN(timeNum) || timeNum < 1 || timeNum > 12) {
    errors.push('Time must be between 1 and 12');
  }

  return errors;
};
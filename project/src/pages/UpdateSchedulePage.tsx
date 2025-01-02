import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import FormInput from '../components/forms/FormInput';
import TimeInput from '../components/forms/TimeInput';
import { updateSchedule } from '../services/busScheduleService';
import { BusSchedule } from '../types/database';

const UpdateSchedulePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stopName } = useParams();
  const schedule = location.state?.schedule as BusSchedule;

  const [formData, setFormData] = useState({
    bus_name: schedule?.bus_name || '',
    destination: schedule?.destination || '',
    time: schedule?.arrival_time?.split(':')[0] || '',
    period: schedule?.arrival_time?.includes('PM') ? 'PM' : 'AM',
    days: schedule?.days || ['EVERY DAY']
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!schedule) return;

    try {
      setLoading(true);
      setError(null);

      await updateSchedule(schedule.id, {
        bus_name: formData.bus_name.trim(),
        destination: formData.destination.trim(),
        arrival_time: `${formData.time}:00 ${formData.period}`,
        days: [formData.days[0].trim() || 'EVERY DAY']
      });

      navigate(`/schedule/${encodeURIComponent(stopName || '')}`);
    } catch (err) {
      console.error('Error updating schedule:', err);
      setError(err instanceof Error ? err.message : 'Failed to update schedule');
    } finally {
      setLoading(false);
    }
  };

  if (!schedule) {
    return (
      <div className="min-h-screen bg-yellow-400">
        <div className="max-w-md mx-auto min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-4 bg-cream rounded-t-3xl">
            <div className="text-center text-red-500 mt-8">Schedule not found</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-400">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-cream rounded-t-3xl">
          <h2 className="text-xl font-semibold text-center bg-pink-200 py-2 rounded-xl mb-6">
            Update Schedule
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FormInput
              label="BUS"
              name="bus_name"
              value={formData.bus_name}
              onChange={handleChange}
              placeholder="Bus name"
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
              placeholder="EVERY DAY"
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button 
              onClick={() => navigate(`/schedule/${encodeURIComponent(stopName || '')}`)}
              className="px-6 py-2 bg-purple-200 rounded-lg hover:bg-purple-300 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdateSchedulePage;
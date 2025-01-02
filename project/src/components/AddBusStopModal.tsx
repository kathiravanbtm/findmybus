import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from './forms/FormInput';
import { createBusStop } from '../services/busStopService';

interface AddBusStopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddBusStopModal = ({ isOpen, onClose, onSuccess }: AddBusStopModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    previousStop: '',
    nextStop: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError('Bus stop name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const busStop = await createBusStop({
        name: formData.name,
        previousStop: formData.previousStop,
        nextStop: formData.nextStop
      });

      onSuccess(); // Trigger refresh of bus stops list
      onClose();
      
      // Navigate to the schedule page for the new bus stop
      navigate(`/schedule/${encodeURIComponent(busStop.name)}`, {
        state: { showAddSchedule: true, isNewStop: true }
      });
    } catch (error) {
      console.error('Error creating bus stop:', error);
      setError(error instanceof Error ? error.message : 'Failed to create bus stop');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-yellow-400 w-full max-w-md mx-4 rounded-3xl overflow-hidden">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center bg-pink-200 py-2 rounded-xl">
            Creating bus stop
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <FormInput
              label="BUS STOP"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Bus stop name..."
            />

            <FormInput
              label="Previous stop"
              name="previousStop"
              value={formData.previousStop}
              onChange={handleChange}
              placeholder="Previous stop..."
            />

            <FormInput
              label="Next Stop"
              name="nextStop"
              value={formData.nextStop}
              onChange={handleChange}
              placeholder="Next stop..."
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              className="bg-pink-200 px-6 py-2 rounded-lg hover:bg-pink-300 transition-colors disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'CREATE'}
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

export default AddBusStopModal;
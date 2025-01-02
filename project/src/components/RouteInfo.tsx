import React, { useState } from 'react';
import AddRouteModal from './AddRouteModal';

interface RouteInfoProps {
  stopName: string;
  busStopId: string | null;
  onEditMode: () => void;
}

const RouteInfo = ({ stopName, busStopId, onEditMode }: RouteInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-pink-100 p-4 rounded-xl flex justify-between items-center">
        <span className="font-medium text-gray-800">{stopName}</span>
        <div className="flex gap-2">
          <button 
            className="bg-pink-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors disabled:opacity-50"
            onClick={() => setIsModalOpen(true)}
            disabled={!busStopId}
          >
            ADD
          </button>
          <button 
            className="bg-pink-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
            onClick={onEditMode}
          >
            EDIT
          </button>
        </div>
      </div>
      
      {busStopId && (
        <AddRouteModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          busStopId={busStopId}
          busStopName={stopName}
        />
      )}
    </div>
  );
}

export default RouteInfo;
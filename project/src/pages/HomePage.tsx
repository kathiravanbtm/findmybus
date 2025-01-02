import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AddBusStopModal from '../components/AddBusStopModal';
import { useBusStops } from '../hooks/useBusStops';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { busStops, loading } = useBusStops(searchTerm, refreshTrigger);

  const handleBusStopAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-yellow-400">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-cream rounded-t-3xl">
          <div className="relative mb-4">
            <input
              type="search"
              placeholder="You are at ?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-full border-2 border-gray-200 pl-4 pr-4 outline-none focus:border-yellow-400"
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : busStops.length === 0 ? (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full text-center text-sm text-pink-600 hover:text-pink-700"
            >
              not found, add stop now
            </button>
          ) : (
            <div className="space-y-2">
              {busStops.map((stop) => (
                <button
                  key={stop.id}
                  onClick={() => navigate(`/schedule/${encodeURIComponent(stop.name)}`)}
                  className="w-full text-left p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition-colors"
                >
                  <span className="font-medium text-gray-800">{stop.name}</span>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>

      <AddBusStopModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleBusStopAdded}
      />
    </div>
  );
}

export default HomePage;
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RouteInfo from '../components/RouteInfo';
import TimeTable from '../components/TimeTable';
import DownloadButton from '../components/DownloadButton';
import { useBusSchedules } from '../hooks/useBusSchedules';

const SchedulePage = () => {
  const { stopName } = useParams();
  const decodedStopName = decodeURIComponent(stopName || '');
  const { busStopId, loading } = useBusSchedules(decodedStopName);
  const [isEditMode, setIsEditMode] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-400">
        <div className="max-w-md mx-auto min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-4 bg-cream rounded-t-3xl">
            <div className="text-center text-gray-500 mt-8">Loading...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-400">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-cream rounded-t-3xl flex flex-col">
          <div className="flex-1">
            <SearchBar />
            <RouteInfo 
              stopName={decodedStopName} 
              busStopId={busStopId}
              onEditMode={() => setIsEditMode(!isEditMode)} 
            />
            <TimeTable 
              busStopName={decodedStopName}
              isEditMode={isEditMode}
            />
          </div>
          <DownloadButton />
        </main>
      </div>
    </div>
  );
}

export default SchedulePage;
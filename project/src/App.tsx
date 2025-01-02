import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import UpdateSchedulePage from './pages/UpdateSchedulePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule/:stopName" element={<SchedulePage />} />
        <Route path="/schedule/:stopName/update" element={<UpdateSchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
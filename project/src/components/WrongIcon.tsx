import React, { useState } from 'react';
import ReportModal from './ReportModal';

const WrongIcon: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-5 h-5 flex items-center justify-center rounded-full bg-red-400/70 hover:bg-red-500/70 transition-colors"
        aria-label="Report incorrect time"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>

      <ReportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default WrongIcon;
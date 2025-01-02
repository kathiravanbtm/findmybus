import React from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const handleReport = () => {
    // Handle report logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm mx-4 rounded-xl overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Report Incorrect Bus
          </h3>
          <p className="text-gray-600 mb-6">
         If you notice any incorrect details, please help us by correcting them or reporting them for removal. Your input is valuable in keeping our information accurate!
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReport}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
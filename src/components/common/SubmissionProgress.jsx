// src/components/common/SubmissionProgress.jsx
import React, { useMemo } from 'react';
import { CheckSquare } from 'lucide-react';

const SubmissionProgress = ({ checklist, onSubmit }) => {
  const progress = useMemo(() => {
    const allItems = Object.values(checklist).flat();
    const totalItems = allItems.length;
    
    if (totalItems === 0) return 0;

    const completedItems = allItems.filter(item => item.status === 'Pass' || item.status === 'Fail').length;
    
    return Math.round((completedItems / totalItems) * 100);
  }, [checklist]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 mt-8 flex flex-col sm:flex-row justify-between items-center sticky bottom-4">
      <div className="flex-grow mr-6 w-full sm:w-auto mb-4 sm:mb-0">
        <h3 className="font-semibold text-slate-700">Overall Progress (<span className="text-violet-600">{progress}%</span>)</h3>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
          <div className="bg-violet-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button
        onClick={onSubmit}
        className="flex items-center justify-center w-full sm:w-auto px-5 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md shadow-green-200 hover:bg-green-600 transition-all transform hover:scale-105 whitespace-nowrap"
      >
        <CheckSquare className="w-5 h-5 mr-2" />
        Finalize & Save Report
      </button>
    </div>
  );
};

export default SubmissionProgress;
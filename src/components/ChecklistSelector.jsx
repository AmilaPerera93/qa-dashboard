// src/components/ChecklistSelector.jsx
import React from 'react';
import { checklistData } from '../utils/constants';

const ChecklistSelector = ({ selectedPhases, setSelectedPhases }) => {
  const handleCheckboxChange = (phase) => {
    setSelectedPhases(prev =>
      prev.includes(phase) ? prev.filter(p => p !== phase) : [...prev, phase]
    );
  };

  const handleSelectAll = () => {
    setSelectedPhases(Object.keys(checklistData));
  };

  const handleClearAll = () => {
    setSelectedPhases([]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <h3 className="text-xl font-semibold mb-4">Select QA Phases for this Assignment</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        <button onClick={handleSelectAll} className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-200 transition-colors shadow-sm">
          Select All
        </button>
        <button onClick={handleClearAll} className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-200 transition-colors shadow-sm">
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(checklistData).map(([phase, { icon: Icon, subtitle }]) => (
          <label key={phase} className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors shadow-sm">
            <input
              type="checkbox"
              checked={selectedPhases.includes(phase)}
              onChange={() => handleCheckboxChange(phase)}
              className="w-5 h-5 text-violet-600 bg-white border-slate-300 rounded focus:ring-violet-500 focus:ring-2 focus:ring-offset-1 transition"
            />
            <div className="ml-4 flex items-start">
              <Icon className="w-6 h-6 mr-3 text-violet-500 flex-shrink-0" />
              <div>
                <span className="font-semibold text-slate-800 text-base">{phase}</span>
                <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ChecklistSelector;
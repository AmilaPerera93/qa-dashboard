// src/components/common/Header.jsx
import React from 'react';
import { User, List } from 'lucide-react';

const Header = ({ activeView, onSetView }) => {
  const isDashboardActive = activeView === 'dashboard' || activeView === 'createAssignment' || activeView === 'performTest';
  const isReportsActive = activeView === 'allReports' || activeView === 'viewReport';

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg shadow-slate-200/60 flex flex-col sm:flex-row justify-between items-center mb-8">
      <div className="flex items-center">
        <img
          src="https://placehold.co/120x50/003366/FFFFFF?text=AIT"
          alt="AIT Services Logo"
          className="h-12 mr-5"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/120x50/cccccc/000000?text=Logo+Error'; }}
        />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            AIT Services
          </h1>
          <p className="text-slate-500 -mt-1">Quality Assurance Dashboard</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <button
          onClick={() => onSetView('dashboard')}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isDashboardActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-white text-slate-600 hover:bg-violet-50 border border-slate-200'}`}
        >
          <User className="w-5 h-5 mr-2" /> My Dashboard
        </button>
        <button
          onClick={() => onSetView('allReports')}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isReportsActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-white text-slate-600 hover:bg-violet-50 border border-slate-200'}`}
        >
          <List className="w-5 h-5 mr-2" /> All Reports
        </button>
      </div>
    </div>
  );
};

export default Header;
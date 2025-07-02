// src/components/common/CurrentUserSelector.jsx
import React from 'react';
import { LogIn } from 'lucide-react';
import { employees } from '../../utils/constants'; // Import employees

const CurrentUserSelector = ({ currentUser, setCurrentUser }) => (
  <div className="flex justify-end mb-4">
    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
      <LogIn className="w-5 h-5 text-slate-500" />
      <span className="text-sm font-medium">Logged in as:</span>
      <select
        value={currentUser}
        onChange={e => setCurrentUser(e.target.value)}
        className="font-semibold text-violet-600 border-none bg-transparent focus:ring-0"
      >
        {employees.map(e => <option key={e} value={e}>{e}</option>)}
      </select>
    </div>
  </div>
);

export default CurrentUserSelector;
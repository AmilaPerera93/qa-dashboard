// src/components/ChecklistPanel.jsx
//import React from 'react';
import { priorities, statuses } from '../utils/constants';

const ChecklistPanel = ({ phase, items, onChange, isReadOnly }) => {
  const statusColorClasses = {
    Pass: 'border-green-300 bg-green-50/50',
    Fail: 'border-red-300 bg-red-50/50',
    'N/A': 'border-slate-200 bg-white'
  };
  
  if (!items || items.length === 0) {
    return (
      <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 text-center py-12">
        <p className="text-slate-500 text-lg">No checklist items configured for this phase.</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <h2 className="text-2xl font-bold mb-4">{phase}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className={`p-4 rounded-xl shadow-sm border ${statusColorClasses[item.status]} transition-all duration-300`}>
            <p className="font-semibold mb-2 text-base text-slate-800">{item.text}</p>
            <textarea
              placeholder="Add notes or metrics..."
              value={item.notes}
              onChange={e => onChange(phase, index, 'notes', e.target.value)}
              readOnly={isReadOnly}
              rows={2}
              className="w-full p-2 border border-slate-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 read-only:bg-slate-100/50 disabled:cursor-not-allowed resize-y transition"
            />
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-slate-600">Priority:</label>
              <select value={item.priority} onChange={e => onChange(phase, index, 'priority', e.target.value)} disabled={isReadOnly} className="py-1 px-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-violet-400 disabled:bg-slate-100/50 disabled:cursor-not-allowed transition">
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <label className="text-sm font-medium text-slate-600 ml-4">Status:</label>
              <select value={item.status} onChange={e => onChange(phase, index, 'status', e.target.value)} disabled={isReadOnly} className="py-1 px-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-violet-400 disabled:bg-slate-100/50 disabled:cursor-not-allowed transition">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistPanel;
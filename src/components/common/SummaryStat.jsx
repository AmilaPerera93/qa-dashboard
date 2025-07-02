// src/components/common/SummaryStat.jsx
import React from 'react';

const SummaryStat = ({ icon: Icon, value, label, color }) => (
  <div className="bg-slate-100 p-4 rounded-lg transition-transform hover:scale-105 shadow-sm border border-slate-100">
    <Icon className={`w-7 h-7 mx-auto mb-2 ${color}`} />
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

export default SummaryStat;
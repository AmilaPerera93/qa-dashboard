// src/components/common/InputField.jsx
import React from 'react';

const InputField = ({ label, icon: Icon, isReadOnly, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <div className="relative">
      <Icon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input type="text" {...props} className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-violet-400 disabled:bg-slate-100 disabled:cursor-not-allowed transition" disabled={isReadOnly} />
    </div>
  </div>
);

export default InputField;
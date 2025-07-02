// src/components/common/QAPhasesNav.jsx
import React from 'react';

const QAPhasesNav = ({ activePhase, setActivePhase, dynamicPhases }) => (
  <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 h-fit">
    <h3 className="text-lg font-semibold mb-2 px-2 text-slate-700">QA Phases</h3>
    <ul className="space-y-1">
      {dynamicPhases.map(({ phase, icon: Icon, subtitle }) => (
        <li key={phase}>
          <button
            onClick={() => setActivePhase(phase)}
            className={`w-full text-left flex items-start p-3 rounded-lg transition-all duration-200 ${activePhase === phase ? 'bg-violet-50 text-violet-700 shadow-sm' : 'hover:bg-slate-100'}`}
          >
            <Icon className={`w-7 h-7 mr-3 mt-0.5 flex-shrink-0 transition-colors ${activePhase === phase ? 'text-violet-600' : 'text-slate-500'}`} />
            <div>
              <p className="font-semibold text-base">{phase}</p>
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default QAPhasesNav;
// src/components/PerformTest.jsx
import React, { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import ProjectDetailsCard from './common/ProjectDetailsCard';
import QAPhasesNav from './common/QAPhasesNav';
import ChecklistPanel from './ChecklistPanel';
import SubmissionProgress from './common/SubmissionProgress';
import { checklistData } from '../utils/constants';

const PerformTest = ({ assignment, onUpdateAssignment, setView }) => {
  const [checklist, setChecklist] = useState(assignment.checklist);
  const [activePhase, setActivePhase] = useState(Object.keys(assignment.checklist)[0]);

  const handleChecklistChange = (phase, index, field, value) => {
    setChecklist(prev => {
      const newChecklist = { ...prev };
      newChecklist[phase][index][field] = value;
      return newChecklist;
    });
  };

  const handleSubmit = () => {
    onUpdateAssignment(assignment.id, checklist);
  };

  // Memoize the phases to be displayed in the navigation based on the assignment's checklist
  const phasesToDisplay = useMemo(() => {
    return Object.keys(assignment.checklist).map(phase => ({
      phase,
      icon: checklistData[phase].icon,
      subtitle: checklistData[phase].subtitle,
    }));
  }, [assignment.checklist]);

  return (
    <div className="space-y-6">
      <button onClick={() => setView('dashboard')} className="flex items-center text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Dashboard
      </button>
      <ProjectDetailsCard details={assignment.details} onChange={() => { }} isReadOnly={true} title="Performing QA Test" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <QAPhasesNav activePhase={activePhase} setActivePhase={setActivePhase} dynamicPhases={phasesToDisplay} />
        <div className="lg:col-span-3">
          <ChecklistPanel phase={activePhase} items={checklist[activePhase]} onChange={handleChecklistChange} isReadOnly={false} />
        </div>
      </div>
      <SubmissionProgress checklist={checklist} onSubmit={handleSubmit} />
    </div>
  );
};

export default PerformTest;
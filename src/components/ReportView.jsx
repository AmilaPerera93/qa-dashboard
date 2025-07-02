// src/components/ReportView.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Link, User, Server, Clock, FileCheck, FileX, List } from 'lucide-react'; // Added FileCheck, FileX, List
import SummaryStat from './common/SummaryStat';
import QAPhasesNav from './common/QAPhasesNav';
import ChecklistPanel from './ChecklistPanel';
import { checklistData } from '../utils/constants';


const ReportHeader = ({ report }) => {
  const { details, checklist, submittedAt } = report;

  const completion = useMemo(() => {
    const allItems = Object.values(checklist).flat();
    if (!allItems.length) return 0;
    const completedItems = allItems.filter(
      item => item.status === 'Pass' || item.status === 'Fail'
    ).length;
    return Math.round((completedItems / allItems.length) * 100);
  }, [checklist]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className='mb-4 sm:mb-0'>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">{details.name}</h2>
          <a href={details.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-violet-600 transition-colors break-all text-sm flex items-center mt-1">
            <Link className="w-4 h-4 mr-1 text-slate-400 flex-shrink-0" />
            {details.url}
          </a>
        </div>
        <div className="text-left sm:text-right text-sm text-slate-600 flex-shrink-0 sm:ml-4">
          <p className="flex items-center"><User className="w-4 h-4 mr-1 text-slate-400" /><span className="font-semibold">Tested by:</span> {details.assignedTo}</p>
          {details.environment && <p className="flex items-center mt-1"><Server className="w-4 h-4 mr-1 text-slate-400" /><span className="font-semibold">Environment:</span> {details.environment}</p>}
          <p className="flex items-center mt-1"><Clock className="w-4 h-4 mr-1 text-slate-400" /><span className="font-semibold">Date:</span> {new Date(submittedAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h3 className="font-semibold text-slate-700 text-lg">Final Score: <span className="text-violet-600">{completion}%</span> Complete</h3>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
          <div className="bg-violet-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const ReportSummaryCard = ({ checklist }) => {
  const stats = useMemo(() => {
    const allItems = Object.values(checklist).flat();
    const total = allItems.length;
    const passed = allItems.filter(i => i.status === 'Pass').length;
    const failed = allItems.filter(i => i.status === 'Fail').length;
    const na = allItems.filter(i => i.status === 'N/A').length;
    return { total, passed, failed, na };
  }, [checklist]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Test Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <SummaryStat icon={FileCheck} value={stats.passed} label="Passed" color="text-green-600" />
        <SummaryStat icon={FileX} value={stats.failed} label="Failed" color="text-red-600" />
        <SummaryStat icon={Clock} value={stats.na} label="Pending (N/A)" color="text-slate-600" />
        <SummaryStat icon={List} value={stats.total} label="Total Items" color="text-blue-600" />
      </div>
    </div>
  );
};

const ReportView = ({ report, onBack }) => {
  const [activePhase, setActivePhase] = useState(() => report ? Object.keys(report.checklist)[0] : null);

  const phasesToDisplay = useMemo(() => {
    if (!report) return [];
    return Object.keys(report.checklist).map(phase => ({
      phase,
      icon: checklistData[phase].icon,
      subtitle: checklistData[phase].subtitle,
    }));
  }, [report]);

  useEffect(() => {
    if (report && activePhase === null) {
      setActivePhase(Object.keys(report.checklist)[0]);
    }
  }, [report, activePhase]);
  
  if (!report) {
    return (
      <div className="text-center p-10">
        <p>No report selected.</p>
        <button onClick={() => onBack()} className="mt-4 text-violet-600 font-semibold">Back to Reports</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => onBack()}
        className="flex items-center text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to All Reports
      </button>
      <ReportHeader report={report} />
      <ReportSummaryCard checklist={report.checklist} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <QAPhasesNav activePhase={activePhase} setActivePhase={setActivePhase} dynamicPhases={phasesToDisplay} />
        <ChecklistPanel
          phase={activePhase}
          items={report.checklist[activePhase]}
          onChange={() => { }}
          isReadOnly={true}
        />
      </div>
    </div>
  );
};

export default ReportView;
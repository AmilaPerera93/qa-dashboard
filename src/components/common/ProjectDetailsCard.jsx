// src/components/common/ProjectDetailsCard.jsx
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { FileText, Link, User, Server } from 'lucide-react';
import { employees } from '../../utils/constants';

const ProjectDetailsCard = ({ details, onChange, isReadOnly, title }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <InputField label="Project Name" icon={FileText} value={details.name} onChange={e => onChange('name', e.target.value)} placeholder="New Website Launch" isReadOnly={isReadOnly} />
      <InputField label="Project URL" icon={Link} value={details.url} onChange={e => onChange('url', e.target.value)} placeholder="https://example.com" isReadOnly={isReadOnly} />
      <SelectField label="Assigned To" icon={User} value={details.assignedTo} onChange={e => onChange('assignedTo', e.target.value)} options={employees} isReadOnly={isReadOnly} />
      <InputField label="Testing Environment" icon={Server} value={details.environment} onChange={e => onChange('environment', e.target.value)} placeholder="Chrome Desktop 125" isReadOnly={isReadOnly} />
    </div>
  </div>
);

export default ProjectDetailsCard;
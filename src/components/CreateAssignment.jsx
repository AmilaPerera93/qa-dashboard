// src/components/CreateAssignment.jsx
import React, { useState } from 'react';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import ProjectDetailsCard from './common/ProjectDetailsCard';
import ChecklistSelector from './ChecklistSelector';
import { checklistData } from '../utils/constants'; // Import checklistData
//import { addDoc, collection } from 'firebase/firestore'; // Import addDoc and collection
//import { db, firebaseConfig } from '../firebase/firebaseConfig'; // Import db and firebaseConfig
import { toast } from 'react-toastify';


const CreateAssignment = ({ onAddAssignment, setView }) => {
  const [details, setDetails] = useState({ name: '', url: '', assignedTo: '', environment: '' });
  const [selectedPhases, setSelectedPhases] = useState(Object.keys(checklistData)); // All selected by default

  const handleCreate = async () => {
    if (!details.name || !details.url || !details.assignedTo || selectedPhases.length === 0) {
      toast.error('Please fill out all fields and select at least one QA phase.');
      return;
    }

    // Create a new checklist object containing only the selected phases
    const newChecklist = selectedPhases.reduce((acc, phase) => {
      acc[phase] = checklistData[phase].items.map(item => ({
        ...item,
        priority: 'Medium',
        status: 'N/A',
      }));
      return acc;
    }, {});

    const newAssignment = {
      details,
      checklist: newChecklist,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onAddAssignment(newAssignment);
  };

  return (
    <div className="space-y-6">
      <button onClick={() => setView('dashboard')} className="flex items-center text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Dashboard
      </button>
      <ProjectDetailsCard details={details} onChange={(field, value) => setDetails(prev => ({ ...prev, [field]: value }))} isReadOnly={false} title="Create New QA Assignment" />
      
      <ChecklistSelector selectedPhases={selectedPhases} setSelectedPhases={setSelectedPhases} />

      <div className="flex justify-end">
        <button onClick={handleCreate} className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 transform hover:scale-105 transition-transform">
          <PlusCircle className="w-5 h-5 mr-2" />
          Create Assignment
        </button>
      </div>
    </div>
  );
};

export default CreateAssignment;
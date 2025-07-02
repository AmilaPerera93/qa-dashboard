// src/components/ReportsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, firebaseConfig } from '../firebase/firebaseConfig';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
 

const ReportsDashboard = ({ onViewReport, onDeleteAssignment }) => {
  const [completedReports, setCompletedReports] = useState([]);

  useEffect(() => {
    if (!db) {
        console.warn("Firestore is not initialized. Cannot fetch reports.");
        return;
    }
    const reportsQuery = query(
      collection(db, `/artifacts/${firebaseConfig.projectId}/reports`),
      where('status', '==', 'complete')
    );

    const unsubscribe = onSnapshot(reportsQuery, (snapshot) => {
      const fetchedReports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedReports.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      setCompletedReports(fetchedReports);
    }, (error) => {
      console.error("Error fetching reports: ", error);
      toast.error("Failed to load completed reports.");
    });

    return () => unsubscribe();
  }, []);

  if (completedReports.length === 0) {
    return (
      <div className="text-center bg-white p-10 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
        <h2 className="text-xl font-semibold">No Completed Reports Found</h2>
        <p className="text-slate-500 mt-2">Finish a test assignment to see it here.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Completed Reports</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="border-b-2 border-slate-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-slate-600">Project Name</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Assigned To</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Submitted At</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Completion</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedReports.map(report => {
              const allItems = Object.values(report.checklist).flat();
              const totalItems = allItems.length;
              const completedItems = allItems.filter(item => item.status === 'Pass' || item.status === 'Fail').length;
              const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
              return (
                <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors even:bg-slate-50">
                  <td className="p-3 font-medium text-slate-800">{report.details.name}</td>
                  <td className="p-3 text-slate-600">{report.details.assignedTo}</td>
                  <td className="p-3 text-slate-500 text-sm">{new Date(report.submittedAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div className="bg-violet-600 h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-500">{completionPercentage}% Complete</span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => onViewReport(report)}
                        className="px-3 py-1 bg-violet-100 text-violet-700 rounded-md font-semibold text-sm hover:bg-violet-200 transition-colors shadow-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this report?")) {
                            onDeleteAssignment(report.id);
                          }
                        }}
                        className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsDashboard;
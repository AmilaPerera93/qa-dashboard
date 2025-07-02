// src/components/MyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Link, User } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, firebaseConfig } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const MyDashboard = ({ currentUser, onPerformAssignment, setView, onDeleteAssignment }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (!db) {
        console.warn("Firestore is not initialized. Cannot fetch assignments.");
        return;
    }
    const assignmentsQuery = query(
      collection(db, `/artifacts/${firebaseConfig.projectId}/reports`),
      where('status', '==', 'pending'),
      where('details.assignedTo', '==', currentUser)
    );

    const unsubscribe = onSnapshot(assignmentsQuery, (snapshot) => {
      const fetchedAssignments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssignments(fetchedAssignments);
    }, (error) => {
      console.error("Error fetching assignments: ", error);
      toast.error("Failed to load your assignments.");
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Pending QA Assignments</h2>
        <button onClick={() => setView('createAssignment')} className="flex items-center px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 transition-all">
          <PlusCircle className="w-5 h-5 mr-2" />
          Create Assignment
        </button>
      </div>
      {assignments.length > 0 ? (
        <div className="space-y-3">
          {assignments.map(assign => (
            <div key={assign.id} className="p-4 rounded-xl shadow-sm border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:from-slate-50 hover:to-slate-100 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-violet-700 text-lg">{assign.details.name}</p>
                  <p className="text-sm text-slate-500 flex items-center mt-1">
                    <Link className="w-4 h-4 mr-1 text-slate-400" />
                    <span className="truncate max-w-[200px] sm:max-w-xs">{assign.details.url}</span>
                  </p>
                </div>
                <p className="text-xs text-slate-400">Assigned: {new Date(assign.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <p className="text-sm text-slate-600 font-medium flex items-center">
                  <User className="w-4 h-4 mr-1 text-slate-400" />
                  {assign.details.assignedTo}
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => onPerformAssignment(assign)}
                    className="px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-green-600 transition-colors transform hover:scale-105"
                  >
                    Start Test
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this assignment?")) {
                        onDeleteAssignment(assign.id);
                      }
                    }}
                    className="p-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-colors transform hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-8 text-lg">You have no pending assignments. Time to create one! 🎉</p>
      )}
    </div>
  );
};

export default MyDashboard;
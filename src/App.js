// src/App.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Firebase config and instances
import { firebaseConfig, db, auth } from './firebase/firebaseConfig';
import { employees } from './utils/constants';

// Import UI Components
import CurrentUserSelector from './components/common/CurrentUserSelector';
import Header from './components/common/Header';
import MyDashboard from './components/MyDashboard';
import CreateAssignment from './components/CreateAssignment';
import ReportsDashboard from './components/ReportsDashboard';
import PerformTest from './components/PerformTest';
import ReportView from './components/ReportView';

// Firebase operations (moved from App.js, kept for direct use where needed)
import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';


const GlobalStyles = () => (
  <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
    `}</style>
);

export default function App() {
  const [view, setView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(employees[0]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [assignmentToPerform, setAssignmentToPerform] = useState(null);
  const [reportToView, setReportToView] = useState(null);

  useEffect(() => {
    if (!auth) return; // Ensure auth is initialized before subscribing
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Anonymous sign-in failed", error);
        }
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const handlePerformAssignment = (assignment) => {
    setAssignmentToPerform(assignment);
    setView('performTest');
  };

  const handleViewReport = (report) => {
    setReportToView(report);
    setView('viewReport');
  };

  const handleAddAssignment = async (newAssignment) => {
    if (!db) {
      alert("Error: Firebase DB is not initialized.");
      console.error("Firestore instance is undefined.");
      return;
    }

    const collectionPath = `/artifacts/${firebaseConfig.projectId}/reports`;

    try {
      console.log("Adding assignment to:", collectionPath);

      await addDoc(collection(db, collectionPath), newAssignment);

      // Success feedback
      // toast.success("✅ Assignment created successfully!"); // Toast handled by component directly now
      console.log("✅ Assignment created and stored.");

      setView('dashboard');
    } catch (error) {
      console.error("❌ Error creating assignment:", error.message);
      // toast.error("❌ Failed to create assignment. Please check console."); // Toast handled by component directly now
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    const docPath = `/artifacts/${firebaseConfig.projectId}/reports/${assignmentId}`;
    try {
      await deleteDoc(doc(db, docPath));
      // toast.success("🗑️ Assignment deleted!"); // Toast handled by component directly now
    } catch (error) {
      console.error("❌ Error deleting assignment:", error.message);
      // toast.error("Failed to delete assignment."); // Toast handled by component directly now
    }
  };

  const handleUpdateAssignment = async (assignmentId, checklist) => {
    if (!db) {
      alert("Database is not configured correctly.");
      return;
    }
    const reportRef = doc(db, `/artifacts/${firebaseConfig.projectId}/reports`, assignmentId);
    try {
      console.log("Submitting report to Firestore...");
      await updateDoc(reportRef, {
        checklist,
        status: 'complete',
        submittedAt: new Date().toISOString()
      });
      // toast.success("🎉 Report submitted successfully!"); // Toast handled by component directly now
      console.log("Report submitted successfully!");
      setView('dashboard');
    } catch (error) {
      console.error("Error submitting report:", error);
      // toast.error("Failed to submit report."); // Toast handled by component directly now
    }
  };

  const renderContent = () => {
    if (!firebaseConfig.apiKey) {
      return (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">Configuration Error</h2>
          <p className="text-slate-600 mt-2">Firebase configuration is missing. Please create a .env file and add your project keys.</p>
        </div>
      );
    }

    if (!isAuthReady) {
      return <div className="text-center p-10">Authenticating...</div>
    }

    switch (view) {
      case 'dashboard':
        return <MyDashboard currentUser={currentUser} onPerformAssignment={handlePerformAssignment} setView={setView} onDeleteAssignment={handleDeleteAssignment} />;
      case 'createAssignment':
        return <CreateAssignment onAddAssignment={handleAddAssignment} setView={setView} />;
      case 'allReports':
        return <ReportsDashboard onViewReport={handleViewReport} onDeleteAssignment={handleDeleteAssignment} />;
      case 'performTest':
        return <PerformTest assignment={assignmentToPerform} onUpdateAssignment={handleUpdateAssignment} setView={setView} />;
      case 'viewReport':
        return <ReportView report={reportToView} onBack={() => setView('allReports')} />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 p-4 sm:p-6 lg:p-8">
      <GlobalStyles />
      <div className="max-w-7xl mx-auto">
        <CurrentUserSelector currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Header activeView={view} onSetView={setView} />
        <main className="fade-in">
          {renderContent()}
        </main>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
}
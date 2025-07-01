import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Link, User, Server, Shield, Zap, DatabaseZap, Accessibility, BarChart, CheckSquare, List, DollarSign, Puzzle, Briefcase, FileCheck, FileX, Clock, ArrowLeft, PlusCircle, LogIn } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
 
//import React, { useState } from 'react';
//import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

//import firebaseConfig from './firebaseConfig';
// --- Firebase Configuration ---

/*// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzpYs-lsl9aySiPaXth2zw_epgv8pmA1Q",
  authDomain: "ait-qa-tool.firebaseapp.com",
  projectId: "ait-qa-tool",
  storageBucket: "ait-qa-tool.firebasestorage.app",
  messagingSenderId: "815363238873",
  appId: "1:815363238873:web:73ad43b48a1a57dd8107c8",
  measurementId: "G-2FP7F86KC2"
};
*/

// Initialize Firebase

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// --- Firebase Configuration ---
// These variables are loaded from your .env file
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let db;
let auth;

// Only initialize if config is valid to prevent errors
if (firebaseConfig.apiKey) {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
    } catch (e) {
        console.error("Error initializing Firebase. Please check your configuration.", e);
    }
}
 

// --- MOCK DATA & CONFIGURATION ---

const employees = ['Amila', 'Rashini', 'Janani', 'Buddhini', 'Bhanuka', 'Pramod', 'Adithya', 'Akash', 'Lasantha'];
const priorities = ['High', 'Medium', 'Low'];
const statuses = ['Pass', 'Fail', 'N/A'];

const checklistData = {
  Security: {
    icon: Shield,
    subtitle: 'Vulnerabilities & protection.',
    items: [
      { text: 'Scan for malware, viruses, and other vulnerabilities in the code and database.', notes: '' },
      { text: 'Update and enforce strong password policies for all user accounts, including administrators.', notes: '' },
      { text: 'Check for Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) vulnerabilities.', notes: '' },
      { text: 'Check for SQL injection vulnerabilities in all database queries.', notes: '' },
      { text: 'Check for insecure direct object references (IDOR).', notes: '' },
      { text: 'Implement security headers such as Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and X-Frame-Options.', notes: '' },
      { text: 'Review and secure user access roles and permissions.', notes: '' },
    ],
  },
  Performance: {
    icon: Zap,
    subtitle: 'Speed and responsiveness.',
    items: [
      { text: 'Analyze page load speed (LCP, FCP, CLS).', notes: 'e.g., Google PageSpeed Insights' },
      { text: 'Optimize images (compression, modern formats).', notes: 'e.g., WebP' },
      { text: 'Minify CSS, JavaScript, and HTML files.', notes: '' },
      { text: 'Enable Gzip compression and browser caching.', notes: '' },
      { text: 'Audit and optimize database queries.', notes: '' },
    ],
  },
  'Backup & Recovery': {
    icon: DatabaseZap,
    subtitle: 'Data safety and restoration.',
    items: [
      { text: 'Verify automated daily or weekly backups are running.', notes: '' },
      { text: 'Perform a successful test data restoration from backup.', notes: '' },
      { text: 'Confirm off-site storage for backups.', notes: '' },
      { text: 'Document the full disaster recovery procedure.', notes: '' },
    ],
  },
  'UX & Accessibility': {
    icon: Accessibility,
    subtitle: 'User-friendliness for all.',
    items: [
      { text: 'Test responsive design on mobile, tablet, and desktop.', notes: '' },
      { text: 'Ensure keyboard-only navigation is logical and complete.', notes: '' },
      { text: 'Validate color contrast meets WCAG AA standards.', notes: '' },
      { text: 'Check for proper use of ARIA roles and landmarks.', notes: '' },
      { text: 'Verify all forms have clear labels and error messages.', notes: '' },
    ],
  },
  'SEO & Analytics': {
    icon: BarChart,
    subtitle: 'Search visibility and tracking.',
    items: [
      { text: 'Verify correct implementation of Google Analytics / Tag Manager.', notes: '' },
      { text: 'Check for and fix broken internal and external links (404s).', notes: '' },
      { text: 'Ensure meta titles, descriptions, and H1 tags are optimized.', notes: '' },
      { text: 'Validate robots.txt for correct indexing rules.', notes: '' },
      { text: 'Submit and verify XML sitemap in Google Search Console.', notes: '' },
    ],
  },
    'Project Management': {
    icon: Briefcase,
    subtitle: 'Handover and documentation.',
    items: [
        { text: 'Finalize and share all project documentation.', notes: '' },
        { text: 'Provide client training on using the new system.', notes: '' },
        { text: 'Hand over all credentials and ownership securely.', notes: '' },
    ],
  },
  'Cost & Budget': {
    icon: DollarSign,
    subtitle: 'Financial planning and review.',
    items: [
        { text: 'Review hosting and domain renewal costs.', notes: '' },
        { text: 'Audit third-party service and plugin subscription fees.', notes: '' },
        { text: 'Analyze cost-benefit of current tools and platforms.', notes: '' },
    ],
  },
  'Platform Maintenance': {
      icon: Puzzle,
      subtitle: 'Updates and compatibility.',
      items: [
          { text: 'Update CMS core to the latest version (e.g., WordPress).', notes: '' },
          { text: 'Update all plugins, themes, and extensions.', notes: '' },
          { text: 'Test for compatibility issues after updates in a staging environment.', notes: '' },
      ],
  },
  'Legal & Compliance': {
      icon: FileText,
      subtitle: 'Adherence to regulations.',
      items: [
          { text: 'Ensure Privacy Policy is up-to-date and accessible.', notes: '' },
          { text: 'Verify GDPR/CCPA compliance for user data handling.', notes: '' },
          { text: 'Check that all image and content licenses are valid.', notes: '' },
      ],
  },
};

const initialChecklistState = Object.entries(checklistData).reduce((acc, [phase, data]) => {
  acc[phase] = data.items.map((item) => ({
    ...item,
    priority: 'Medium',
    status: 'N/A',
  }));
  return acc;
}, {});

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

// --- MAIN APP COMPONENT ---

export default function App() {
  const [view, setView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(employees[0]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [assignmentToPerform, setAssignmentToPerform] = useState(null);
  const [reportToView, setReportToView] = useState(null);

  useEffect(() => {
    if (!auth) return;
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
        alert("Database is not configured correctly.");
        return;
    }
    try {
        await addDoc(collection(db, `/artifacts/${firebaseConfig.projectId}/reports`), newAssignment);
        console.log("Assignment created successfully!");
        setView('dashboard');
    } catch (error) {
        console.error("Error creating assignment:", error);
        alert("Failed to create assignment.");
    }
  };

  const handleUpdateAssignment = async (assignmentId, checklist) => {
    if (!db) {
        alert("Database is not configured correctly.");
        return;
    }
    const reportRef = doc(db, `/artifacts/${firebaseConfig.projectId}/reports`, assignmentId);
    try {
        await updateDoc(reportRef, {
            checklist,
            status: 'complete',
            submittedAt: new Date().toISOString()
        });
        console.log("Report submitted successfully!");
        setView('dashboard');
    } catch (error) {
        console.error("Error submitting report:", error);
        alert("Failed to submit report.");
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
        return <MyDashboard currentUser={currentUser} onPerformAssignment={handlePerformAssignment} setView={setView} />;
      case 'createAssignment':
        return <CreateAssignment onAddAssignment={handleAddAssignment} setView={setView} />;
      case 'allReports':
        return <ReportsDashboard onViewReport={handleViewReport} />;
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
      </div>
    </div>
  );
}


// --- UI COMPONENTS ---

const CurrentUserSelector = ({ currentUser, setCurrentUser }) => (
    <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
            <LogIn className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-medium">Logged in as:</span>
            <select
                value={currentUser}
                onChange={e => setCurrentUser(e.target.value)}
                className="font-semibold text-violet-600 border-none bg-transparent focus:ring-0"
            >
                {employees.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
        </div>
    </div>
);


const Header = ({ activeView, onSetView }) => {
    const isDashboardActive = activeView === 'dashboard' || activeView === 'createAssignment' || activeView === 'performTest';
    const isReportsActive = activeView === 'allReports' || activeView === 'viewReport';

    return (
    <div className="bg-white p-4 rounded-xl shadow-lg shadow-slate-200/60 flex flex-col sm:flex-row justify-between items-center mb-8">
      <div className="flex items-center">
        <img 
            src="https://placehold.co/120x50/003366/FFFFFF?text=AIT" 
            alt="AIT Services Logo" 
            className="h-12 mr-5"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/120x50/cccccc/000000?text=Logo+Error'; }}
        />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            AIT Services
          </h1>
          <p className="text-slate-500 -mt-1">Quality Assurance Dashboard</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <button 
          onClick={() => onSetView('dashboard')}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isDashboardActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-white text-slate-600 hover:bg-violet-50 border border-slate-200'}`}
        >
          <User className="w-5 h-5 mr-2" /> My Dashboard
        </button>
        <button 
          onClick={() => onSetView('allReports')}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isReportsActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-white text-slate-600 hover:bg-violet-50 border border-slate-200'}`}
        >
          <List className="w-5 h-5 mr-2" /> All Reports
        </button>
      </div>
    </div>
  );
};

const MyDashboard = ({ currentUser, onPerformAssignment, setView }) => {
    const [assignments, setAssignments] = useState([]);
    
    useEffect(() => {
        if (!db) return;
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
                        <div key={assign.id} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center hover:bg-slate-50 transition-colors">
                            <div>
                                <p className="font-semibold text-violet-700">{assign.details.name}</p>
                                <p className="text-sm text-slate-500">{new Date(assign.createdAt).toLocaleDateString()}</p>
                            </div>
                            <button onClick={() => onPerformAssignment(assign)} className="px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600">
                                Start Test
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-500 text-center py-8">You have no pending assignments. Great job!</p>
            )}
        </div>
    );
};

const CreateAssignment = ({ onAddAssignment, setView }) => {
    const [details, setDetails] = useState({ name: '', url: '', assignedTo: '', environment: '' });
    
    const handleCreate = () => {
        if (!details.name || !details.url || !details.assignedTo) {
          alert('Please fill out all fields.');
          return;
        }

        const newAssignment = {
            details,
            checklist: initialChecklistState,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        onAddAssignment(newAssignment);
    };
    
    return (
        <div className="space-y-6">
            <button onClick={() => setView('dashboard')} className="flex items-center text-sm font-semibold text-slate-600 hover:text-violet-700">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
            </button>
            <ProjectDetailsCard details={details} onChange={(field, value) => setDetails(prev => ({ ...prev, [field]: value }))} isReadOnly={false} title="Create New QA Assignment" />
            <div className="flex justify-end">
                <button onClick={handleCreate} className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700">Create Assignment</button>
            </div>
        </div>
    );
};

const PerformTest = ({ assignment, onUpdateAssignment, setView }) => {
    const [checklist, setChecklist] = useState(assignment.checklist);
    const [activePhase, setActivePhase] = useState(Object.keys(checklistData)[0]);


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

    return (
        <div className="space-y-6">
             <button onClick={() => setView('dashboard')} className="flex items-center text-sm font-semibold text-slate-600 hover:text-violet-700">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
            </button>
            <ProjectDetailsCard details={assignment.details} onChange={() => {}} isReadOnly={true} title="Performing QA Test"/>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <QAPhasesNav activePhase={activePhase} setActivePhase={setActivePhase} />
                <div className="lg:col-span-3">
                   <ChecklistPanel phase={activePhase} items={checklist[activePhase]} onChange={handleChecklistChange} isReadOnly={false} />
                </div>
            </div>
            <SubmissionProgress checklist={checklist} onSubmit={handleSubmit} />
        </div>
    );
};

const ReportView = ({ report, onBack }) => {
  const [activePhase, setActivePhase] = useState(Object.keys(checklistData)[0]);

  if (!report) {
    return (
      <div className="text-center p-10">
        <p>No report selected.</p>
        <button onClick={onBack} className="mt-4 text-violet-600 font-semibold">Back to Reports</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to All Reports
      </button>
      <ReportHeader report={report} />
      <ReportSummaryCard checklist={report.checklist} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <QAPhasesNav activePhase={activePhase} setActivePhase={setActivePhase} />
        <ChecklistPanel
          phase={activePhase}
          items={report.checklist[activePhase]}
          onChange={() => {}}
          isReadOnly={true}
        />
      </div>
    </div>
  );
};

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
                    <a href={details.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-violet-600 transition-colors break-all">{details.url}</a>
                </div>
                <div className="text-left sm:text-right text-sm text-slate-600 flex-shrink-0 sm:ml-4">
                    <p><span className="font-semibold">Tested by:</span> {details.assignedTo}</p>
                    {details.environment && <p><span className="font-semibold">Environment:</span> {details.environment}</p>}
                    <p><span className="font-semibold">Date:</span> {new Date(submittedAt).toLocaleString()}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-700">Final Score: {completion}% Complete</h3>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
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

const SummaryStat = ({ icon: Icon, value, label, color }) => (
    <div className="bg-slate-100 p-4 rounded-lg transition-transform hover:scale-105">
        <Icon className={`w-7 h-7 mx-auto mb-2 ${color}`} />
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
    </div>
);


const SubmissionProgress = ({ checklist, onSubmit }) => {
    const progress = useMemo(() => {
        const allItems = Object.values(checklist).flat();
        if (!allItems.length) return 0;
        const completedItems = allItems.filter(item => item.status === 'Pass' || item.status === 'Fail').length;
        return Math.round((completedItems / allItems.length) * 100);
    }, [checklist]);

    return (
         <div className="bg-white p-4 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 mt-8 flex flex-col sm:flex-row justify-between items-center sticky bottom-4">
            <div className="flex-grow mr-6 w-full sm:w-auto mb-4 sm:mb-0">
                <h3 className="font-semibold text-slate-700">Overall Progress ({progress}%)</h3>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
                    <div className="bg-violet-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <button 
                onClick={onSubmit} 
                className="flex items-center justify-center w-full sm:w-auto px-5 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md shadow-green-200 hover:bg-green-600 transition-all transform hover:scale-105 whitespace-nowrap"
            >
                <CheckSquare className="w-5 h-5 mr-2" />
                Finalize & Save Report
            </button>
        </div>
    );
};

const ProjectDetailsCard = ({ details, onChange, isReadOnly, title }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <InputField label="Project Name" icon={FileText} value={details.name} onChange={e => onChange('name', e.target.value)} placeholder="New Website Launch" isReadOnly={isReadOnly}/>
      <InputField label="Project URL" icon={Link} value={details.url} onChange={e => onChange('url', e.target.value)} placeholder="https://example.com" isReadOnly={isReadOnly}/>
      <SelectField label="Assigned To" icon={User} value={details.assignedTo} onChange={e => onChange('assignedTo', e.target.value)} options={employees} isReadOnly={isReadOnly}/>
      <InputField label="Testing Environment" icon={Server} value={details.environment} onChange={e => onChange('environment', e.target.value)} placeholder="Chrome Desktop 125" isReadOnly={isReadOnly}/>
    </div>
  </div>
);

const InputField = ({ label, icon: Icon, isReadOnly, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <div className="relative">
      <Icon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input type="text" {...props} className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-violet-400 disabled:bg-slate-100 transition" disabled={isReadOnly}/>
    </div>
  </div>
);

const SelectField = ({ label, icon: Icon, value, onChange, options, isReadOnly }) => (
   <div>
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <div className="relative">
      <Icon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <select value={value} onChange={onChange} disabled={isReadOnly} className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-violet-400 appearance-none disabled:bg-slate-100 transition">
        <option value="" disabled>Select...</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);


const QAPhasesNav = ({ activePhase, setActivePhase }) => (
  <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 h-fit">
    <h3 className="text-lg font-semibold mb-2 px-2">QA Phases</h3>
    <ul className="space-y-1">
      {Object.entries(checklistData).map(([phase, { icon: Icon, subtitle }]) => (
        <li key={phase}>
          <button 
            onClick={() => setActivePhase(phase)}
            className={`w-full text-left flex items-start p-3 rounded-lg transition-all duration-200 ${activePhase === phase ? 'bg-violet-50 text-violet-700' : 'hover:bg-slate-100'}`}
          >
            <Icon className={`w-6 h-6 mr-3 mt-0.5 flex-shrink-0 transition-colors ${activePhase === phase ? 'text-violet-600' : 'text-slate-500'}`} />
            <div>
              <p className="font-semibold">{phase}</p>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ChecklistPanel = ({ phase, items, onChange, isReadOnly }) => (
  <div className="lg:col-span-3">
    <h2 className="text-2xl font-bold mb-4">{phase}</h2>
    <div className="space-y-4">
      {items.map((item, index) => {
        const statusColorClasses = {
            Pass: 'border-green-300 bg-green-50/50',
            Fail: 'border-red-300 bg-red-50/50',
            'N/A': 'border-slate-200 bg-white'
        };
        return (
          <div key={index} className={`p-4 rounded-xl shadow-sm border ${statusColorClasses[item.status]} transition-all duration-300`}>
            <p className="font-semibold mb-2">{item.text}</p>
            <textarea
              placeholder="Add notes or metrics..."
              value={item.notes}
              onChange={e => onChange(phase, index, 'notes', e.target.value)}
              readOnly={isReadOnly}
              className="w-full p-2 border border-slate-300 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 read-only:bg-slate-100/50 transition"
            />
            <div className="flex items-center space-x-4">
              <select value={item.priority} onChange={e => onChange(phase, index, 'priority', e.target.value)} disabled={isReadOnly} className="py-1 px-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-violet-400 disabled:bg-slate-100/50 transition">
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select value={item.status} onChange={e => onChange(phase, index, 'status', e.target.value)} disabled={isReadOnly} className="py-1 px-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-violet-400 disabled:bg-slate-100/50 transition">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )
      })}
    </div>
  </div>
);

const ReportsDashboard = ({ onViewReport }) => {
    const [completedReports, setCompletedReports] = useState([]);

    useEffect(() => {
        if (!db) return;
        const reportsQuery = query(
            collection(db, `/artifacts/${firebaseConfig.projectId}/reports`),
            where('status', '==', 'complete')
        );

        const unsubscribe = onSnapshot(reportsQuery, (snapshot) => {
            const fetchedReports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            fetchedReports.sort((a,b) => new Date(b.submittedAt) - new Date(a.submittedAt));
            setCompletedReports(fetchedReports);
        }, (error) => {
            console.error("Error fetching reports: ", error);
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
            <table className="w-full text-left">
            <thead className="border-b-2 border-slate-200">
                <tr>
                <th className="p-3 text-sm font-semibold text-slate-600">Project Name</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Assigned To</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Submitted At</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Status</th>
                <th className="p-3 text-sm font-semibold text-slate-600"></th>
                </tr>
            </thead>
            <tbody>
                {completedReports.map(report => {
                    const allItems = Object.values(report.checklist).flat();
                    const passedCount = allItems.filter(i => i.status === 'Pass').length;
                    const failedCount = allItems.filter(i => i.status === 'Fail').length;
                    return (
                        <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium">{report.details.name}</td>
                        <td className="p-3 text-slate-600">{report.details.assignedTo}</td>
                        <td className="p-3 text-slate-600">{new Date(report.submittedAt).toLocaleDateString()}</td>
                        <td className="p-3">
                            <span className="text-green-600 font-medium">{passedCount} Passed</span>, <span className="text-red-600 font-medium">{failedCount} Failed</span>
                        </td>
                        <td className="p-3 text-right">
                            <button onClick={() => onViewReport(report)} className="font-semibold text-violet-600 hover:text-violet-800">View</button>
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

import React, { useState, useMemo } from 'react';

// --- ICONS ---
const CheckCircleIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const PlusCircleIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const FileTextIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ChevronLeftIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const HomeIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ShieldIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const ZapIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const RotateCwIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>;
const UsersIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const BarChart2Icon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const ClipboardIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const PackageIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const BookOpenIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;

// --- MOCK DATA & CONFIG ---
const EMPLOYEES = ["Amila", "Rashini", "Pramod", "Janani", "Adithya", "Buddhini","Bhanuka", "Lasantha", "Akash"];
const getInitialChecklistData = () => {
    // This data structure is now based on the uploaded CSV files.
    const checklistTemplate = [
        {
            id: 'security', title: 'Security', description: 'Vulnerabilities & protection.', icon: ShieldIcon,
            items: [
                { id: 'sec-1', text: 'Scan for malware and vulnerabilities.', priority: 'High', status: 'N/A', notes: 'e.g., Wordfence, Sucuri' },
                { id: 'sec-2', text: 'Update security certificates and SSL.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'sec-3', text: 'Review user access and permissions.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'sec-4', text: 'Monitor logs and block suspicious IPs.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'sec-5', text: 'Enforce strong password policies.', priority: 'High', status: 'N/A', notes: '' },
            ],
        },
        {
            id: 'performance', title: 'Performance', description: 'Speed and responsiveness.', icon: ZapIcon,
            items: [
                { id: 'perf-1', text: 'Test website loading speed on mobile & desktop.', priority: 'High', status: 'N/A', notes: 'Tools: PageSpeed Insights' },
                { id: 'perf-2', text: 'Compress image files.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'perf-3', text: 'Minify CSS, JavaScript, and HTML.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'perf-4', text: 'Turn on browser caching.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'perf-5', text: 'Check server usage stats to avoid slowdowns.', priority: 'Low', status: 'N/A', notes: '' },
            ],
        },
        {
            id: 'backup', title: 'Backup & Recoverability', description: 'Data safety and restoration.', icon: RotateCwIcon,
            items: [
                { id: 'backup-1', text: 'Make full backups regularly.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'backup-2', text: 'Test the backup restoration process.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'backup-3', text: 'Store backups in multiple off-site locations.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'backup-4', text: 'Document the steps for restoring the website.', priority: 'Low', status: 'N/A', notes: '' },
            ],
        },
        {
            id: 'ux', title: 'UX & Accessibility', description: 'User-friendliness for all.', icon: UsersIcon,
            items: [
                { id: 'ux-1', text: 'All links and buttons have clear, descriptive text.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'ux-2', text: 'Provide text alternatives for non-text content (alt tags).', priority: 'High', status: 'N/A', notes: '' },
                { id: 'ux-3', text: 'Ensure sufficient color contrast between text and background.', priority: 'High', status: 'N/A', notes: 'Tool: WCAG Color Checker' },
                { id: 'ux-4', text: 'All site functionality is keyboard navigable.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'ux-5', text: 'Content has a logical and semantic heading structure.', priority: 'Low', status: 'N/A', notes: '' },
            ],
        },
        {
            id: 'seo', title: 'SEO & Analytics', description: 'Search visibility and tracking.', icon: BarChart2Icon,
            items: [
                { id: 'seo-1', text: 'Canonical URLs are set correctly to avoid duplicate content.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'seo-2', text: 'robots.txt file and XML sitemap are correct and accessible.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'seo-3', text: 'Verify Google Analytics/other tracking codes are installed and collecting data.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'seo-4', text: 'Check bounce rates and track conversion rates.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'seo-5', text: 'Structured data (Schema) is implemented and valid.', priority: 'Medium', status: 'N/A', notes: 'Tool: Schema Markup Validator' },
            ],
        },
        {
            id: 'legal', title: 'Legal & Compliance', description: 'Policies and regulations.', icon: BookOpenIcon,
            items: [
                { id: 'legal-1', text: 'Privacy Policy is present, up-to-date, and easily accessible.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'legal-2', text: 'Terms of Service are present and accessible.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'legal-3', text: 'Cookie consent banner is implemented correctly (if applicable).', priority: 'High', status: 'N/A', notes: '' },
                { id: 'legal-4', text: 'Ensure compliance with GDPR/CCPA regulations.', priority: 'High', status: 'N/A', notes: '' },
            ],
        },
        {
            id: 'platform', title: 'Platform & Updates', description: 'Core system maintenance.', icon: PackageIcon,
            items: [
                { id: 'platform-1', text: 'Keep CMS, plugins, and themes updated.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'platform-2', text: 'Test everything after updates to ensure nothing breaks.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'platform-3', text: 'Optimize database tables.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'platform-4', text: 'Delete spam comments and unused data.', priority: 'Low', status: 'N/A', notes: '' },
            ],
        },
        {
            id: 'pm', title: 'Project Management', description: 'Handover and documentation.', icon: ClipboardIcon,
            items: [
                { id: 'pm-1', text: 'Keep a record of security incidents and how they were handled.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'pm-2', text: 'Update security protocols to prevent recurring problems.', priority: 'Medium', status: 'N/A', notes: '' },
                { id: 'pm-3', text: 'Create monthly security reports.', priority: 'Low', status: 'N/A', notes: '' },
                 { id: 'pm-4', text: 'Client handover documentation is prepared and delivered.', priority: 'High', status: 'N/A', notes: '' },
                { id: 'pm-5', text: 'Final project sign-off has been obtained from the client.', priority: 'High', status: 'N/A', notes: '' },
            ],
        },
    ];

  return checklistTemplate.map(section => ({
    ...section,
    items: section.items.map(item => ({...item}))
  }));
};

// --- UI COMPONENTS ---
const ProgressBar = ({ value, small = false }) => {
    const percentage = Math.round(value * 100);
    return (<div className={`w-full bg-gray-200 dark:bg-gray-700/50 rounded-full ${small ? 'h-1.5' : 'h-2.5'}`}><div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${percentage}%`, height: small ? '0.375rem' : '0.625rem' }}></div></div>);
};

const ChecklistItem = ({ item, onUpdate, isReadOnly = false }) => {
    const statusClasses = {'Pass': 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-500','Fail': 'bg-rose-50 dark:bg-rose-900/40 border-rose-500','N/A': 'bg-gray-100 dark:bg-gray-800/60 border-gray-400'};
    const priorityClasses = {'High': 'border-rose-500','Medium': 'border-amber-500','Low': 'border-sky-500'};
    const priorityText = {'High': 'text-rose-500','Medium': 'text-amber-500','Low': 'text-sky-500'};
    return (
        <div className={`p-4 rounded-lg transition-colors duration-300 border-l-4 ${statusClasses[item.status]}`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-grow mr-4">
                    <p className="text-gray-800 dark:text-gray-200">{item.text}</p>
                    {isReadOnly && <p className={`text-xs font-semibold mt-1 ${priorityText[item.priority]}`}>PRIORITY: {item.priority.toUpperCase()}</p>}
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0 flex-shrink-0">
                    {!isReadOnly && (
                        <select value={item.priority} onChange={(e) => onUpdate(item.id, 'priority', e.target.value)} className={`w-28 p-2 border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 border-l-4 ${priorityClasses[item.priority]}`}><option>High</option><option>Medium</option><option>Low</option></select>
                    )}
                    {isReadOnly ? (<span className={`px-3 py-1 text-sm font-medium rounded-full ${item.status === 'Pass' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : item.status === 'Fail' ? 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}`}>{item.status}</span>) : (
                        <select value={item.status} onChange={(e) => onUpdate(item.id, 'status', e.target.value)} className="w-28 p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"><option>N/A</option><option>Pass</option><option>Fail</option></select>
                    )}
                </div>
            </div>
            {(item.notes || !isReadOnly) && (<input type="text" value={item.notes} onChange={isReadOnly ? undefined : (e) => onUpdate(item.id, 'notes', e.target.value)} readOnly={isReadOnly} placeholder={isReadOnly && !item.notes ? "No notes provided" : "Add notes or metrics..."} className={`w-full p-2 mt-2 bg-transparent text-sm placeholder-gray-400 dark:placeholder-gray-500 ${isReadOnly ? 'border-b border-transparent focus:ring-0' : 'border-b border-gray-300 dark:border-gray-600 focus:ring-0 focus:border-indigo-500'}`}/>)}
        </div>
    );
};

// --- PAGE & VIEW COMPONENTS ---
const ChecklistView = ({ onFinalize }) => {
    const [projectDetails, setProjectDetails] = useState({ name: 'New Website Launch', url: 'https://example.com', date: new Date().toISOString().slice(0, 10), assignedTo: EMPLOYEES[0], testingEnv: 'Chrome Desktop 125' });
    const [checklist, setChecklist] = useState(getInitialChecklistData());
    const [activeSectionId, setActiveSectionId] = useState(checklist[0].id);

    const handleProjectDetailChange = (field, value) => setProjectDetails(prev => ({ ...prev, [field]: value }));
    const handleUpdateItem = (sectionId, itemId, field, value) => {
        setChecklist(prev => prev.map(section => section.id === sectionId ? { ...section, items: section.items.map(item => item.id === itemId ? { ...item, [field]: value } : item) } : section));
    };

    const overallProgress = useMemo(() => {
        const allItems = checklist.flatMap(section => section.items);
        if (allItems.length === 0) return 0;
        const checkedItems = allItems.filter(item => item.status !== 'N/A').length;
        return checkedItems / allItems.length;
    }, [checklist]);
    
    const activeSection = useMemo(() => checklist.find(s => s.id === activeSectionId), [checklist, activeSectionId]);

    return (
        <>
            <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-lg p-6 mb-8 backdrop-blur-sm border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New QA Report Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Project Name</label><input type="text" value={projectDetails.name} onChange={e => handleProjectDetailChange('name', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"/></div>
                    <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Project URL</label><input type="text" value={projectDetails.url} onChange={e => handleProjectDetailChange('url', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"/></div>
                    <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Assigned To</label><select value={projectDetails.assignedTo} onChange={e => handleProjectDetailChange('assignedTo', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500">{EMPLOYEES.map(e => <option key={e}>{e}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Testing Environment</label><input type="text" value={projectDetails.testingEnv} onChange={e => handleProjectDetailChange('testingEnv', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"/></div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-lg flex flex-col md:flex-row min-h-[500px] backdrop-blur-sm border border-white/20">
                <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 p-4"><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">QA Phases</h3><div className="space-y-2">{checklist.map(section => { const sectionProgress = section.items.filter(i => i.status !== 'N/A').length / section.items.length; const Icon = section.icon; return (<button key={section.id} onClick={() => setActiveSectionId(section.id)} className={`w-full text-left p-3 rounded-lg transition ${activeSectionId === section.id ? 'bg-indigo-100 dark:bg-indigo-900/70' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}><div className="flex items-center"><Icon className={`w-6 h-6 mr-3 ${activeSectionId === section.id ? 'text-indigo-500' : 'text-gray-400'}`}/><div><p className="font-semibold text-gray-800 dark:text-gray-200">{section.title}</p><p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p></div></div><div className="mt-2"><ProgressBar value={isNaN(sectionProgress)?0:sectionProgress} small={true}/></div></button>);})}</div></div>
                <div className="w-full md:w-2/3 p-6">{activeSection && (<div><div className="flex justify-between items-center mb-4"><h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeSection.title}</h3></div><div className="space-y-4">{activeSection.items.map(item => (<ChecklistItem key={item.id} item={item} onUpdate={(itemId, field, value) => handleUpdateItem(activeSectionId, itemId, field, value)}/>))}</div></div>)}</div>
            </div>

            <div className="mt-8 p-4 bg-white dark:bg-slate-800/60 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-center backdrop-blur-sm border border-white/20">
                <div><h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Overall Progress ({Math.round(overallProgress * 100)}%)</h3><div className="w-full sm:w-64"><ProgressBar value={overallProgress}/></div></div>
                <button onClick={() => onFinalize({ id: Date.now(), submittedAt: new Date().toISOString(), projectDetails, checklist, overallProgress })} className="w-full sm:w-auto mt-4 sm:mt-0 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-green-700 transition transform hover:scale-105 shadow-lg"><CheckCircleIcon className="w-5 h-5"/><span>Finalize & Save Report</span></button>
            </div>
        </>
    );
};

const ReportsView = ({ reports, onSelectReport }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredReports = useMemo(() => {
        if (!searchTerm) return reports;
        return reports.filter(r => r.projectDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.projectDetails.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [reports, searchTerm]);

    return (
        <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All QA Reports</h2>
                <input type="text" placeholder="Filter by project or user..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-1/3 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500" />
            </div>
            {filteredReports.length === 0 ? (<p className="text-center text-gray-500 dark:text-gray-400 py-8">No reports match your search.</p>) : (
                <div className="space-y-4">{filteredReports.sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt)).map(report => (
                    <div key={report.id} onClick={() => onSelectReport(report)} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border border-transparent hover:border-indigo-300">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div><h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">{report.projectDetails.name}</h3><p className="text-sm text-gray-600 dark:text-gray-400">{report.projectDetails.url}</p></div>
                            <div className="text-sm text-gray-500 dark:text-gray-500 mt-2 sm:mt-0 text-left sm:text-right"><p>Tested by: <span className="font-semibold text-gray-700 dark:text-gray-300">{report.projectDetails.assignedTo}</span></p><p>{new Date(report.submittedAt).toLocaleDateString()}</p></div>
                        </div>
                    </div>
                ))}</div>
            )}
        </div>
    );
};

const ReportDetailView = ({ report }) => {
    const SectionSummary = ({ items }) => {
        const pass = items.filter(i => i.status === 'Pass').length;
        const fail = items.filter(i => i.status === 'Fail').length;
        const na = items.filter(i => i.status === 'N/A').length;
        return (<div className="flex space-x-4 text-sm font-medium"><div className="flex items-center space-x-1.5"><CheckCircleIcon className="w-4 h-4 text-emerald-500" /><span className="text-gray-600 dark:text-gray-300">{pass} Passed</span></div><div className="flex items-center space-x-1.5"><PlusCircleIcon className="w-4 h-4 text-rose-500" /><span className="text-gray-600 dark:text-gray-300">{fail} Failed</span></div><div className="flex items-center space-x-1.5"><FileTextIcon className="w-4 h-4 text-gray-500" /><span className="text-gray-600 dark:text-gray-300">{na} N/A</span></div></div>)
    };
    return (
        <div className="bg-white dark:bg-slate-800/60 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">{report.projectDetails.name}</h2>
                        <a href={report.projectDetails.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">{report.projectDetails.url}</a>
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4"><p>Tested by: <strong className="text-gray-700 dark:text-gray-200">{report.projectDetails.assignedTo}</strong></p><p>Environment: <strong className="text-gray-700 dark:text-gray-200">{report.projectDetails.testingEnv}</strong></p><p>Date: {new Date(report.submittedAt).toLocaleString()}</p></div>
                </div>
                <div className="mt-4"><h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Final Score: {Math.round(report.overallProgress * 100)}% Complete</h3><ProgressBar value={report.overallProgress}/></div>
            </div>
            <div className="space-y-8">{report.checklist.map(section => (
                <section key={section.id}>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                        <SectionSummary items={section.items} />
                    </div>
                    <div className="space-y-4">{section.items.map(item => <ChecklistItem key={item.id} item={item} isReadOnly={true}/>)}</div>
                </section>
            ))}</div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [reports, setReports] = useState([]);
    const [activeView, setActiveView] = useState('checklist');
    const [selectedReport, setSelectedReport] = useState(null);

    const handleFinalizeReport = (report) => { setReports(prev => [report, ...prev]); setActiveView('reports'); };
    const handleSelectReport = (report) => { setSelectedReport(report); setActiveView('reportDetail'); };
    
    const renderActiveView = () => {
        switch(activeView) {
            case 'reports': return <ReportsView reports={reports} onSelectReport={handleSelectReport}/>;
            case 'reportDetail': return selectedReport ? <ReportDetailView report={selectedReport}/> : <p>Report not found.</p>;
            default: return <ChecklistView onFinalize={handleFinalizeReport}/>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-sans">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-100 via-transparent to-purple-100 dark:from-indigo-900/30 dark:via-transparent dark:to-purple-900/30 -z-10"></div>
            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div><h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center"><span className="font-light">AIT Australia</span><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 ml-2">QA Dashboard</span></h1><p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Comprehensive checklists and historical reports.</p></div>
                    <nav className="flex space-x-2 mt-4 sm:mt-0"><button onClick={()=>setActiveView('checklist')} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${activeView === 'checklist' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/70 dark:bg-slate-800/80 hover:bg-gray-200 dark:hover:bg-slate-700 backdrop-blur-sm'}`}><HomeIcon className="w-5 h-5"/> <span>Checklist</span></button><button onClick={()=>setActiveView('reports')} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${activeView.includes('report') ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/70 dark:bg-slate-800/80 hover:bg-gray-200 dark:hover:bg-slate-700 backdrop-blur-sm'}`}><FileTextIcon className="w-5 h-5"/> <span>All Reports</span></button>{activeView === 'reportDetail' && (<button onClick={()=>setActiveView('reports')} className="flex items-center px-2 py-2 rounded-lg bg-white/70 dark:bg-slate-800/80 hover:bg-gray-200 dark:hover:bg-slate-700 backdrop-blur-sm transition"><ChevronLeftIcon className="w-5 h-5"/></button>)}</nav>
                </header>
                {renderActiveView()}
                <footer className="text-center mt-12 text-gray-400 dark:text-gray-500 text-sm"><p>&copy; {new Date().getFullYear()} AIT Australia - All Rights Reserved.</p></footer>
            </div>
        </div>
    );
}

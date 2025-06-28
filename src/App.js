import React, { useState, useEffect, useCallback } from 'react';

// --- MOCK DATA & CONFIG ---
const MOCK_USERS = {
    'producer@trueleaf.com': { password: 'password123', role: 'producer', name: 'S. Perera' },
    'consumer@trueleaf.com': { password: 'password123', role: 'consumer', name: 'Alex' },
};

const ICONS = {
    'Harvesting': 'fa-leaf', 'Withering': 'fa-wind', 'Rolling': 'fa-cogs',
    'Fermentation': 'fa-vial', 'Drying': 'fa-fire', 'Sorting & Grading': 'fa-sort-amount-down',
    'Packaging': 'fa-box-open', 'Exporting': 'fa-globe-asia', 'default': 'fa-check-circle'
};

// --- HELPER & UTILITY FUNCTIONS ---
async function simpleHash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

// --- FUTURISTIC UI COMPONENTS ---

const AnimatedCard = ({ children, className = '', delay = 0 }) => (
    <div 
        className={`will-change-transform animate-fade-in-up ${className}`}
        style={{ animationDelay: `${delay}ms` }}
    >
        {children}
    </div>
);

const LoginPage = ({ onLogin, errorMessage, setErrorMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const user = MOCK_USERS[email];
        if (user && user.password === password) {
            onLogin(user);
        } else {
            setErrorMessage('Invalid email or password.');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ease-in-out">
            <div className="w-full max-w-md">
                <AnimatedCard delay={100}>
                    <div className="text-center mb-8">
                        <svg className="h-16 w-16 text-green-800 mx-auto mb-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 10a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10z" />  <path d="M10 8a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />  <path d="M7 11h1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2 -2v-1a2 2 0 0 1 2 -2h1" /></svg>
                        <h1 className="text-4xl font-extrabold text-green-800">TrueLeaf</h1>
                        <p className="text-gray-600 mt-2">Ceylon Tea Authenticity Platform</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard delay={200}>
                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200/50">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-lg bg-white/50 border-gray-300 shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-300" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-lg bg-white/50 border-gray-300 shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-300" required />
                            </div>
                            {errorMessage && <p className="text-sm text-red-600 text-center animate-fade-in">{errorMessage}</p>}
                            <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.98]">Login</button>
                        </form>
                    </div>
                </AnimatedCard>
                 <AnimatedCard delay={300}>
                    <div className="mt-6 text-center text-sm text-gray-500 p-4 bg-white/50 backdrop-blur-xl rounded-lg border border-gray-200/50">
                        <p className="font-bold">Mock Logins:</p>
                        <p>Producer: <span className="font-mono bg-gray-200 px-1 rounded">producer@trueleaf.com</span></p>
                        <p>Consumer: <span className="font-mono bg-gray-200 px-1 rounded">consumer@trueleaf.com</span></p>
                        <p>Password for both: <span className="font-mono bg-gray-200 px-1 rounded">password123</span></p>
                    </div>
                 </AnimatedCard>
            </div>
        </div>
    );
};

const Header = ({ user, onLogout }) => (
    <AnimatedCard>
        <header className="sticky top-0 z-50 py-4 backdrop-blur-xl bg-white/80 border-b border-gray-200/80">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                     <svg className="h-10 w-10 text-green-800" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 10a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10z" />  <path d="M10 8a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />  <path d="M7 11h1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2 -2v-1a2 2 0 0 1 2 -2h1" /></svg>
                    <h1 className="text-3xl font-extrabold text-green-800">TrueLeaf</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-600 text-sm hidden md:block">Welcome, {user.name} <span className="text-gray-400">({user.role})</span></span>
                    <button onClick={onLogout} className="bg-red-100 text-red-700 font-bold py-2 px-4 rounded-lg hover:bg-red-200 active:bg-red-300 transition-colors duration-200 ease-in-out text-sm border border-red-200/50 transform active:scale-95">Logout</button>
                </div>
            </div>
        </header>
    </AnimatedCard>
);

const TabButton = ({ id, label, icon, activeTab, onClick }) => (
    <button
        className={`relative py-4 px-6 block font-bold text-sm md:text-base transition-all duration-300 ease-in-out focus:outline-none ${activeTab === id ? 'text-green-700' : 'text-gray-500 hover:text-green-600'}`}
        onClick={() => onClick(id)}
    >
        <i className={`fas ${icon} mr-2`}></i>{label}
        {activeTab === id && <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-full animate-fade-in"></span>}
    </button>
);


const Modal = ({ message, show, onClose }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm transform transition-all scale-100 animate-modal-pop">
                <p className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: message }}></p>
                <button onClick={onClose} className="mt-6 bg-green-600 text-white py-2 px-10 rounded-full hover:bg-green-700 font-bold transform transition-transform duration-150 active:scale-95">OK</button>
            </div>
        </div>
    );
};

const TimelineItem = ({ block, index }) => {
    const isAiBlock = block.type === 'AI_ANALYSIS';
    const iconClass = ICONS[block.event] || ICONS.default;

    return (
        <AnimatedCard delay={index * 100} className={`relative mb-10 pl-12`}>
             <div className={`absolute left-0 top-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg ${isAiBlock ? 'bg-blue-500' : 'bg-green-600'}`}>
                <i className={`fas ${iconClass}`}></i>
            </div>
            {isAiBlock ? (
                <>
                    <div className="flex items-center mb-1"><span className="bg-blue-100 text-blue-800 text-sm font-bold mr-2 px-3 py-1 rounded-full flex items-center shadow-sm"><i className="fas fa-brain mr-2"></i> {block.event}</span></div>
                    <div className="p-4 rounded-lg bg-white/50 border border-gray-200/80 shadow-inner"><p className="text-gray-800 font-bold text-lg">{block.quality}</p><p className="text-gray-600">AI Confidence: {block.confidence}</p></div>
                </>
            ) : (
                <>
                    <div className="flex items-center mb-1"><span className="bg-green-100 text-green-800 text-sm font-bold mr-2 px-3 py-1 rounded-full flex items-center shadow-sm"><i className={`fas ${iconClass} mr-2`}></i> {block.event}</span></div>
                    <div className="p-4 rounded-lg bg-white/50 border border-gray-200/80 shadow-inner"><p className="text-gray-800"><strong className="font-semibold">Location:</strong> {block.location}</p><p className="text-gray-800"><strong className="font-semibold">Operator:</strong> {block.operator}</p>{block.iot && (<div className="mt-3 pt-3 border-t border-gray-200/80"><p className="text-sm font-bold text-purple-700"><i className="fas fa-satellite-dish mr-2"></i>IoT Sensor Data (In-Transit)</p><p className="text-xs text-purple-600 font-semibold">Temperature: {block.iot.temperature} | Humidity: {block.iot.humidity}</p></div>)}</div>
                </>
            )}
            <p className="text-xs text-gray-500 mt-2">{new Date(block.timestamp).toLocaleString()}</p>
        </AnimatedCard>
    );
};

const ActionButton = ({ onClick, children, className }) => (
    <button onClick={onClick} className={`w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.98] ${className}`}>
        {children}
    </button>
);

const Dashboard = ({ user, onLogout, appState }) => {
    const { blockchain, setBlockchain, inputs, setInputs, modal, setModal } = appState;
    const [activeTab, setActiveTab] = useState('consumer');
    const [timeline, setTimeline] = useState({ id: '', data: [] });
    const [imagePreview, setImagePreview] = useState(null);

    const showMessage = (message) => setModal({ show: true, message });
    const handleInputChange = (e) => setInputs(prev => ({ ...prev, [e.target.id]: e.target.value }));

    const displayTimeline = useCallback(() => {
        const batchId = inputs.verifyBatchId.trim();
        if (!batchId) { showMessage('Please enter a Batch ID to verify.'); setTimeline({ id: '', data: [] }); return; }
        const chain = blockchain[batchId];
        const data = (chain && chain.length > 1) ? chain.slice(1) : [];
        setTimeline({ id: batchId, data });
    }, [inputs.verifyBatchId, blockchain, setModal]);

    const createGenesisBlock = async (batchId) => {
        if (!blockchain[batchId]) {
            const genesisBlock = { type: 'GENESIS', event: 'Batch Created', location: 'System', operator: 'TrueLeaf Platform', timestamp: new Date().toISOString(), previousHash: '0'.repeat(16), hash: await simpleHash('Genesis' + batchId) };
            setBlockchain(prev => ({...prev, [batchId]: [genesisBlock]}));
        }
    };
    
    const addBlock = async () => {
        const { batchId, event, location, operator } = inputs;
        if (!batchId || !event || !location || !operator) { showMessage('Please fill out all fields.'); return; }
        await createGenesisBlock(batchId);
        const currentChain = blockchain[batchId] || [await (async () => { const g = { type: 'GENESIS', hash: await simpleHash('Genesis' + batchId) }; return g; })()];
        const previousBlock = currentChain[currentChain.length - 1];
        const newBlockData = { type: 'EVENT', event, location, operator, timestamp: new Date().toISOString(), previousHash: previousBlock.hash };
        newBlockData.hash = await simpleHash(JSON.stringify(newBlockData) + previousBlock.hash);
        setBlockchain(prev => ({...prev, [batchId]: [...(prev[batchId] || []), newBlockData]}));
        setInputs(prev => ({...prev, location: '', operator: ''}));
        showMessage(`Event '${event}' added to batch '${batchId}'.`);
    };

    const runAIAnalysis = async () => {
        const { aiBatchId } = inputs;
        if (!aiBatchId) { showMessage('Please enter a Batch ID.'); return; }
        if (!imagePreview) { showMessage('Please upload an image.'); return; }
        await createGenesisBlock(aiBatchId);
        setModal({ show: true, message: '<i class="fas fa-brain fa-spin mr-2"></i> AI is analyzing...' });
        await new Promise(resolve => setTimeout(resolve, 1500));
        const grades = ["Premium Grade", "High Grade", "Standard Grade"], quality = grades[Math.floor(Math.random() * grades.length)], confidence = (Math.random() * (99.8 - 92.5) + 92.5).toFixed(2);
        const currentChain = blockchain[aiBatchId] || [await (async () => { const g = { type: 'GENESIS', hash: await simpleHash('Genesis' + aiBatchId) }; return g; })()];
        const previousBlock = currentChain[currentChain.length - 1];
        const aiBlockData = { type: 'AI_ANALYSIS', event: 'AI Quality Check', quality, confidence: `${confidence}%`, timestamp: new Date().toISOString(), previousHash: previousBlock.hash };
        aiBlockData.hash = await simpleHash(JSON.stringify(aiBlockData) + previousBlock.hash);
        setBlockchain(prev => ({...prev, [aiBatchId]: [...(prev[aiBatchId] || []), aiBlockData]}));
        setModal({ show: true, message: `AI Analysis Complete! <br>Result: <strong class="text-blue-600">${quality}</strong>`});
    };
    
    const addIoTData = () => {
        const { iotBatchId, temperature, humidity } = inputs;
        if (!iotBatchId || !temperature || !humidity) { showMessage('Please provide all IoT fields.'); return; }
        setBlockchain(prev => {
            const chain = prev[iotBatchId];
            if (!chain) { showMessage(`Batch ID '${iotBatchId}' not found.`); return prev; }
            const lastEventIndex = chain.map(b => b.type).lastIndexOf('EVENT');
            if (lastEventIndex === -1) { showMessage(`No 'EVENT' block found to attach IoT data to.`); return prev; }
            const newChain = [...chain];
            newChain[lastEventIndex] = { ...newChain[lastEventIndex], iot: { temperature: `${temperature}°C`, humidity: `${humidity}%` }};
            showMessage(`IoT data added to batch '${iotBatchId}'.`);
            return {...prev, [iotBatchId]: newChain};
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };
    
    useEffect(() => {
        if (blockchain[inputs.verifyBatchId]) displayTimeline();
    }, [blockchain, inputs.verifyBatchId, displayTimeline]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header user={user} onLogout={onLogout} />
            <main className="container mx-auto p-4 md:p-8 max-w-7xl">
                <AnimatedCard delay={100}>
                    <div className="mb-8 flex justify-center bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-lg max-w-lg mx-auto">
                        <TabButton id="consumer" label="Consumer" icon="fa-qrcode" activeTab={activeTab} onClick={setActiveTab} />
                        {user.role === 'producer' && <>
                            <TabButton id="producer" label="Producer" icon="fa-industry" activeTab={activeTab} onClick={setActiveTab} />
                            <TabButton id="ai" label="AI & IoT" icon="fa-cogs" activeTab={activeTab} onClick={setActiveTab} />
                        </>}
                    </div>
                </AnimatedCard>
                
                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <AnimatedCard delay={200}>
                            {activeTab === 'consumer' && (<div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200/50"><h2 className="text-2xl font-bold mb-4">Verify Your Tea</h2><p className="text-gray-600 mb-6 text-sm">Enter the Batch ID to see its journey.</p><div className="space-y-4"><label htmlFor="verifyBatchId" className="block text-sm font-semibold text-gray-700">Batch ID</label><input type="text" id="verifyBatchId" value={inputs.verifyBatchId} onChange={handleInputChange} className="mt-1 block w-full rounded-lg" /><ActionButton onClick={displayTimeline} className="bg-gradient-to-r from-green-600 to-emerald-700 focus:ring-green-500"><i className="fas fa-check-circle mr-2"></i>Verify</ActionButton></div></div>)}
                            {activeTab === 'producer' && user.role === 'producer' && (<div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Add Supply Chain Event</h2><div className="space-y-4"><div><label htmlFor="batchId">Batch ID</label><input type="text" id="batchId" value={inputs.batchId} onChange={handleInputChange} className="mt-1 w-full rounded-lg"/></div><div><label htmlFor="event">Stage</label><select id="event" value={inputs.event} onChange={handleInputChange} className="mt-1 w-full rounded-lg"><option>Harvesting</option><option>Withering</option><option>Rolling</option><option>Fermentation</option><option>Drying</option><option>Sorting & Grading</option><option>Packaging</option><option>Exporting</option></select></div><div><label htmlFor="location">Location</label><input type="text" id="location" value={inputs.location} onChange={handleInputChange} className="mt-1 w-full rounded-lg"/></div><div><label htmlFor="operator">Operator</label><input type="text" id="operator" value={inputs.operator} onChange={handleInputChange} className="mt-1 w-full rounded-lg"/></div><ActionButton onClick={addBlock} className="bg-gradient-to-r from-green-600 to-emerald-700 focus:ring-green-500"><i className="fas fa-plus-circle mr-2"></i>Add Event</ActionButton></div></div>)}
                            {activeTab === 'ai' && user.role === 'producer' && (<div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl"><h2 className="text-2xl font-bold mb-4">AI & IoT Inputs</h2><div className="space-y-6"><div><h3 className="font-bold text-lg text-blue-700 mb-2">AI Leaf Analysis</h3><div className="space-y-4 p-4 bg-blue-50/70 rounded-lg border border-blue-200/50"><label>Batch ID</label><input type="text" id="aiBatchId" value={inputs.aiBatchId} onChange={handleInputChange} className="w-full rounded-lg"/><div><label htmlFor="imageUpload" className="w-full cursor-pointer bg-white text-blue-700 font-semibold p-2 rounded-lg border-2 border-dashed flex items-center justify-center hover:bg-blue-100 hover:border-blue-500 transition-colors"><i className="fas fa-upload mr-2"></i><span>{imagePreview ? 'Change' : 'Upload'} Image</span></label><input id="imageUpload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload}/></div>{imagePreview && <div className="text-center"><img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded-lg shadow-md"/></div>}<ActionButton onClick={runAIAnalysis} className="bg-gradient-to-r from-blue-600 to-indigo-700 focus:ring-blue-500"><i className="fas fa-brain mr-2"></i>Analyze</ActionButton></div></div><div><h3 className="font-bold text-lg text-purple-700 mb-2">IoT Sensor Data</h3><div className="space-y-4 p-4 bg-purple-50/70 rounded-lg border border-purple-200/50"><label>Batch ID</label><input type="text" id="iotBatchId" value={inputs.iotBatchId} onChange={handleInputChange} className="w-full rounded-lg"/><div className="flex gap-4"><div className="w-1/2"><label>Temp (°C)</label><input type="number" id="temperature" value={inputs.temperature} onChange={handleInputChange} className="w-full rounded-lg"/></div><div className="w-1/2"><label>Humidity (%)</label><input type="number" id="humidity" value={inputs.humidity} onChange={handleInputChange} className="w-full rounded-lg"/></div></div><ActionButton onClick={addIoTData} className="bg-gradient-to-r from-purple-600 to-fuchsia-700 focus:ring-purple-500"><i className="fas fa-satellite-dish mr-2"></i>Add Data</ActionButton></div></div></div></div>)}
                        </AnimatedCard>
                    </div>
                    
                    <div className="lg:col-span-3">
                        <AnimatedCard delay={300}>
                            <div className="bg-white/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-xl min-h-full border border-gray-200/50">
                                <h2 className="text-2xl font-bold mb-8 border-b border-gray-200/80 pb-4">Journey for Batch: <span className="text-green-800">{timeline.id}</span></h2>
                                {timeline.data.length > 0 ? (
                                    <div className="relative pl-2">
                                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-blue-200 to-purple-200"></div>
                                        {timeline.data.map((block, index) => (<TimelineItem key={index} block={block} index={index}/>))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-16"><i className="fas fa-search-location text-6xl mb-4 text-gray-400"></i><p className="text-xl font-bold">{timeline.id ? "No Data Found" : "Awaiting Verification"}</p><p className="text-sm">{timeline.id ? "Check ID or add events." : "Enter a Batch ID."}</p></div>
                                )}
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </main>
            <Modal show={modal.show} message={modal.message} onClose={() => setModal({ show: false, message: '' })} />
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes modal-pop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
                .animate-modal-pop { animation: modal-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            `}</style>
        </div>
    );
};


export default function App() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [appState, setAppState] = useState({
        blockchain: {},
        inputs: {
            verifyBatchId: '', batchId: '', event: 'Harvesting', location: '', operator: '',
            aiBatchId: '', iotBatchId: '', temperature: '', humidity: ''
        },
        modal: { show: false, message: '' }
    });

    const setBlockchain = (updater) => setAppState(prev => ({...prev, blockchain: typeof updater === 'function' ? updater(prev.blockchain) : updater }));
    const setInputs = (updater) => setAppState(prev => ({...prev, inputs: typeof updater === 'function' ? updater(prev.inputs) : updater }));
    const setModal = (updater) => setAppState(prev => ({...prev, modal: typeof updater === 'function' ? updater(prev.modal) : updater }));

    useEffect(() => {
        const init = async () => {
            const demoId = 'CEY-EST-2025-001';
            let tempChain = [];
            let genesisBlock = { type: 'GENESIS', timestamp: new Date('2025-06-27T08:00:00Z').toISOString(), previousHash: '0'.repeat(16), hash: await simpleHash('Genesis' + demoId) };
            tempChain.push(genesisBlock);
            let prevHash = genesisBlock.hash;
            
            let block1 = { type: 'EVENT', event: 'Harvesting', location: 'Pedro Tea Estate', operator: 'S. Perera', timestamp: new Date('2025-06-27T10:30:00Z').toISOString(), previousHash: prevHash };
            block1.hash = await simpleHash(JSON.stringify(block1) + prevHash);
            tempChain.push(block1); prevHash = block1.hash;
            
            let block2 = { type: 'AI_ANALYSIS', event: 'AI Quality Check', quality: 'Premium Grade', confidence: '98.7%', timestamp: new Date('2025-06-27T15:00:00Z').toISOString(), previousHash: prevHash };
            block2.hash = await simpleHash(JSON.stringify(block2) + prevHash);
            tempChain.push(block2); prevHash = block2.hash;
            
            let block3 = { type: 'EVENT', event: 'Exporting', location: 'Port of Colombo', operator: 'Global Shippers', iot: { temperature: '24.1°C', humidity: '70%' }, timestamp: new Date('2025-06-28T14:00:00Z').toISOString(), previousHash: prevHash };
            block3.hash = await simpleHash(JSON.stringify(block3) + prevHash);
            tempChain.push(block3);

            setBlockchain({ [demoId]: tempChain });
            setInputs(prev => ({ ...prev, verifyBatchId: demoId, batchId: demoId, aiBatchId: demoId, iotBatchId: demoId }));
        };
        init();
    }, []);

    if (!user) {
        return <LoginPage onLogin={setUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />;
    }

    return <Dashboard 
                user={user} 
                onLogout={() => setUser(null)} 
                appState={{ ...appState, setBlockchain, setInputs, setModal }} 
            />;
}

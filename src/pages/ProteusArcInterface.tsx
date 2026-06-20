import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Terminal as TerminalIcon, 
  User, 
  BookOpen, 
  Activity, 
  FileText, 
  History, 
  Info, 
  ArrowRight,
  Database,
  BrainCircuit,
  TrendingUp,
  Download,
  AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import gsap from "gsap";

interface LogEntry {
  timestamp: string;
  patientId: string;
  imaging: string;
  cogscore: string;
  status: "Success" | "Failed";
}

interface ResultsData {
  patientId: string;
  timestamp: string;
  imaging: string;
  cogscore: string;
  eegAnalysis: string;
  confidence: number;
  status: string;
}

export default function ProteusArcInterface() {
  const [activeTab, setActiveTab] = useState<"guide" | "run" | "results" | "logs">("run");
  
  // Input fields state
  const [patientId, setPatientId] = useState("");
  const [imagingFile, setImagingFile] = useState("");
  const [cogScore, setCogScore] = useState("");

  // Calculation Run simulation state
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // GSAP Refs
  const headerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Results & Logs State (stored in session/local state)
  const [resultsList, setResultsList] = useState<ResultsData[]>([]);
  const [logsList, setLogsList] = useState<LogEntry[]>([
    {
      timestamp: "2026-06-19 14:23:10",
      patientId: "sub01",
      imaging: "sub01-06192026",
      cogscore: "sub01-08",
      status: "Success"
    },
    {
      timestamp: "2026-06-19 16:45:32",
      patientId: "sub02",
      imaging: "sub02-06192026",
      cogscore: "sub02-12",
      status: "Success"
    }
  ]);

  // Entrance GSAP animation on mount
  useEffect(() => {
    // Header slide down
    gsap.fromTo(headerRef.current, 
      { y: -80, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    // Content container slide up
    gsap.fromTo(contentContainerRef.current, 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // GSAP transition when tab changes
  useEffect(() => {
    gsap.fromTo(contentContainerRef.current, 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);

  // Scroll terminal to bottom & slight pulse animation on new terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (terminalRef.current && terminalOutput.length > 0) {
      gsap.fromTo(terminalRef.current,
        { borderColor: "rgba(56, 189, 248, 0.4)" },
        { borderColor: "rgba(30, 41, 59, 1)", duration: 0.3 }
      );
    }
  }, [terminalOutput]);

  const runSimulation = () => {
    if (!patientId || !imagingFile || !cogScore) {
      alert("Please fill in all Patient fields before running the algorithm.");
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setTerminalOutput([
      `[${new Date().toLocaleTimeString()}] Initializing Proteus Arc analysis engine...`,
      `[${new Date().toLocaleTimeString()}] Connected to EEG pipeline socket.`,
    ]);

    const logs = [
      { t: 10, msg: `[TIMESTAMP] Loading patient record data for [ID: ${patientId}]...` },
      { t: 25, msg: `[TIMESTAMP] Fetching and parsing EEG imaging dataset [FILE: ${imagingFile}]...` },
      { t: 40, msg: `[TIMESTAMP] Performing signal bandpass filtering (0.5Hz - 45Hz)...` },
      { t: 55, msg: `[TIMESTAMP] Normalizing signal amplitude and epoching events...` },
      { t: 70, msg: `[TIMESTAMP] Correlating patient cognitive score parameter [SCORE: ${cogScore}] with EEG spectral power density...` },
      { t: 85, msg: `[TIMESTAMP] Running neural network classification model for early-stage markers...` },
      { t: 95, msg: `[TIMESTAMP] Compiling diagnostic statistical confidence levels...` },
      { t: 100, msg: `[TIMESTAMP] Proteus Arc calculation completed successfully. Results outputted.` }
    ];

    logs.forEach((step) => {
      setTimeout(() => {
        const timeStr = new Date().toLocaleTimeString();
        const formattedMsg = step.msg.replace("[TIMESTAMP]", `[${timeStr}]`);
        setTerminalOutput((prev) => [...prev, formattedMsg]);
        setProgress(step.t);

        if (step.t === 100) {
          setIsRunning(false);
          // Add to results
          const newResult: ResultsData = {
            patientId,
            timestamp: new Date().toLocaleString(),
            imaging: imagingFile,
            cogscore: cogScore,
            eegAnalysis: "Spectral density indicates mild deceleration in alpha/theta ratios, characteristic of early biomarkers.",
            confidence: Math.round(84 + Math.random() * 12),
            status: "Completed"
          };
          setResultsList((prev) => [newResult, ...prev]);

          // Add to logs
          const newLog: LogEntry = {
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            patientId,
            imaging: imagingFile,
            cogscore: cogScore,
            status: "Success"
          };
          setLogsList((prev) => [newLog, ...prev]);
          
          // Switch to results tab automatically to view results
          setTimeout(() => {
            setActiveTab("results");
          }, 800);
        }
      }, step.t * 60); // Total run duration is 6 seconds
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#1E293B] font-serif antialiased pb-12 selection:bg-blue-100">
      {/* Sleek Top Navbar */}
      <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-[#D2D6DC] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 select-none">
            <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-1.5 overflow-hidden">
              <img 
                src="/images/proteus-logo.png" 
                alt="Proteus Arc Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#0B1E3F] uppercase font-serif">Proteus Arc</h1>
              <p className="text-[10px] text-blue-600 font-sans font-semibold tracking-widest uppercase">Diagnostic Suite</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-1 font-serif">
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === "guide"
                  ? "bg-[#0B1E3F] text-white shadow-sm"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              Quick Guide
            </button>
            <button
              onClick={() => setActiveTab("run")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === "run"
                  ? "bg-[#0B1E3F] text-white shadow-sm"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-gray-100"
              }`}
            >
              <Activity className="w-4 h-4 text-blue-500" />
              Testing Run
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === "results"
                  ? "bg-[#0B1E3F] text-white shadow-sm"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-gray-100"
              }`}
            >
              <FileText className="w-4 h-4 text-blue-500" />
              Results
              {resultsList.length > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-sans font-bold">
                  {resultsList.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === "logs"
                  ? "bg-[#0B1E3F] text-white shadow-sm"
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-gray-100"
              }`}
            >
              <History className="w-4 h-4 text-blue-500" />
              Logs
            </button>
          </nav>

          {/* User profile capsule (recreating the blue/indigo pill header) */}
          <div className="flex items-center bg-[#0B1E3F] text-white px-5 py-2.5 rounded-full shadow-md select-none font-serif">
            <span className="text-sm font-medium mr-3">
              Welcome, <span className="font-bold text-blue-300">admin</span>
            </span>
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-inner">
              <User className="w-4 h-4 text-[#0B1E3F]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* TABS CONTAINER */}
        <div ref={contentContainerRef} className="transition-all duration-300">
          
          {/* TAB 1: HOW TO USE */}
          {activeTab === "guide" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#D2D6DC] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#0B1E3F] mb-2 flex items-center gap-2 font-serif">
                  <Info className="w-5 h-5 text-blue-600" />
                  Algorithm Quick Guide
                </h2>
                <p className="text-sm text-gray-500 max-w-2xl mb-8 leading-relaxed">
                  A high-level operations manual detailing sample preparation, parameter ranges, and neural network diagnostics for clinical use cases.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1 */}
                  <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 font-bold rounded-lg flex items-center justify-center mb-4 font-serif">
                      1
                    </div>
                    <h3 className="font-bold text-[#0B1E3F] mb-2 text-sm uppercase tracking-wide font-serif">Patient Setup</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      Initialize patient recording files inside your standard repository. Ensure a valid Patient ID identifier is assigned matching database conventions.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 font-bold rounded-lg flex items-center justify-center mb-4 font-serif">
                      2
                    </div>
                    <h3 className="font-bold text-[#0B1E3F] mb-2 text-sm uppercase tracking-wide font-serif">Data Upload</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      Select or drag-and-drop the matching patient's high-resolution EEG wave imaging file. Input patient cognitive baseline scores if applicable.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 font-bold rounded-lg flex items-center justify-center mb-4 font-serif">
                      3
                    </div>
                    <h3 className="font-bold text-[#0B1E3F] mb-2 text-sm uppercase tracking-wide font-serif">Execute & Analyze</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      Run calculation metrics. Monitor logs stream dynamically. Check classification confidence levels inside the Results panel upon completion.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide font-serif">Regulatory Note</h4>
                    <p className="text-[11px] text-blue-700 leading-relaxed mt-1 font-sans">
                      Proteus Arc is currently designed for clinical research evaluation. Always cross-verify statistical confidence ratings with primary raw EEG spectral parameters before diagnostic conclusions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TESTING RUN */}
          {activeTab === "run" && (
            <div className="space-y-8">
              {/* Form Card */}
              <div className="bg-white rounded-2xl border border-[#D2D6DC] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#0B1E3F] mb-6 font-serif">Start a Calculation Run</h2>
                
                {/* Inputs Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 font-serif">
                  
                  {/* Patient Id */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-[#4B5563] z-10 font-serif">
                      Patient Id *
                    </label>
                    <Input
                      type="text"
                      disabled={isRunning}
                      placeholder="e.g. sub04"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full h-12 bg-white border border-[#CBD5E1] rounded-lg px-4 text-sm focus:border-blue-600 focus:ring-blue-600 transition-all font-medium text-[#111827] font-serif"
                    />
                  </div>

                  {/* Patient's Imaging */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-[#4B5563] z-10 font-serif">
                      Patient's Imaging *
                    </label>
                    <Input
                      type="text"
                      disabled={isRunning}
                      placeholder="e.g. sub04-09232016"
                      value={imagingFile}
                      onChange={(e) => setImagingFile(e.target.value)}
                      className="w-full h-12 bg-white border border-[#CBD5E1] rounded-lg px-4 text-sm focus:border-blue-600 focus:ring-blue-600 transition-all font-medium text-[#111827] font-serif"
                    />
                  </div>

                  {/* Patient's Cogscore */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-[#4B5563] z-10 font-serif">
                      Patient's Cogscore *
                    </label>
                    <Input
                      type="text"
                      disabled={isRunning}
                      placeholder="e.g. sub04-09"
                      value={cogScore}
                      onChange={(e) => setCogScore(e.target.value)}
                      className="w-full h-12 bg-white border border-[#CBD5E1] rounded-lg px-4 text-sm focus:border-blue-600 focus:ring-blue-600 transition-all font-medium text-[#111827] font-serif"
                    />
                  </div>

                </div>

                {/* Start Run Button */}
                <div className="flex items-center justify-between">
                  <Button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className={`h-11 px-8 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 font-serif ${
                      isRunning 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                        : "bg-[#0B1E3F] text-white hover:bg-opacity-95 shadow-sm active:scale-95"
                    }`}
                  >
                    {isRunning ? "Running..." : "Start Run"}
                  </Button>

                  {isRunning && (
                    <div className="flex items-center space-x-2 text-xs text-blue-600 font-semibold font-serif">
                      <span className="animate-pulse">Processing algorithm calculations</span>
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress & Terminal output */}
              <div className="grid grid-cols-1 gap-6">
                
                {/* Progress Bar Container */}
                {(isRunning || progress > 0) && (
                  <div className="bg-white rounded-xl border border-[#D2D6DC] p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xs font-bold text-[#0B1E3F] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Algorithm Completion Progress
                      </h3>
                      <span className="text-xs font-bold text-blue-600 font-sans">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2.5 bg-gray-100 rounded-full text-blue-600" />
                  </div>
                )}

                {/* Terminal Console */}
                <div ref={terminalRef} className="bg-[#091124] rounded-2xl border border-[#1E293B] shadow-lg overflow-hidden flex flex-col transition-all duration-300">
                  {/* Terminal Header */}
                  <div className="bg-[#0E172C] px-6 py-4 border-b border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TerminalIcon className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-bold font-mono tracking-wider text-gray-300 uppercase">
                        Execution Console
                      </span>
                    </div>
                    <div className="flex space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-6 font-mono text-xs text-sky-400 space-y-2 h-64 overflow-y-auto bg-[#050B18]">
                    {terminalOutput.length === 0 ? (
                      <div className="text-gray-500 italic text-center py-12">
                        No active computations. Fill out client data and click 'Start Run' to monitor real-time neural logs.
                      </div>
                    ) : (
                      terminalOutput.map((log, index) => {
                        let colorClass = "text-sky-400";
                        if (log.includes("completed")) colorClass = "text-emerald-400 font-bold";
                        if (log.includes("Connecting") || log.includes("Initializing")) colorClass = "text-blue-400";
                        return (
                          <div key={index} className={`leading-relaxed whitespace-pre-wrap ${colorClass}`}>
                            {log}
                          </div>
                        );
                      })
                    )}
                    <div ref={terminalEndRef} />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: RESULTS */}
          {activeTab === "results" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#D2D6DC] p-8 shadow-sm font-serif">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#0B1E3F] mb-1 flex items-center gap-2 font-serif">
                      <BrainCircuit className="w-5 h-5 text-blue-600" />
                      Diagnostic Calculation Results
                    </h2>
                    <p className="text-xs text-gray-500 font-serif">
                      View recent calculated classifications and statistics for completed Proteus Arc operations.
                    </p>
                  </div>
                </div>

                {resultsList.length === 0 ? (
                  <div className="text-center py-20 bg-[#F8FAFC] rounded-xl border border-dashed border-[#CBD5E1]">
                    <Database className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                    <h3 className="text-sm font-bold text-[#334155] uppercase tracking-wide font-serif">No Results Available</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto font-serif">
                      Run the algorithm inside the "Testing Run" tab first to generate medical diagnostic results.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 font-serif">
                    {resultsList.map((res, i) => (
                      <div key={i} className="border border-[#E2E8F0] rounded-xl p-6 hover:shadow-md transition-all duration-200 bg-white">
                        {/* Header Details */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                              Patient ID: {res.patientId}
                            </span>
                            <span className="ml-3 text-xs text-gray-400 font-sans">{res.timestamp}</span>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500">Confidence Metric:</span>
                            <span className="text-sm font-bold text-emerald-600 font-sans">{res.confidence}%</span>
                          </div>
                        </div>

                        {/* Calculations Output grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-2 font-serif">Input Settings</h4>
                            <div className="space-y-1 bg-[#F8FAFC] p-3 rounded-lg border border-gray-150 text-xs">
                              <p className="text-[#334155]"><strong className="text-gray-500 font-serif">EEG Recording:</strong> {res.imaging}</p>
                              <p className="text-[#334155]"><strong className="text-gray-500 font-serif">Cognitive Score:</strong> {res.cogscore}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-2 font-serif">Algorithm Diagnostics</h4>
                            <div className="space-y-1 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50 text-xs">
                              <p className="text-emerald-900 leading-relaxed font-medium">
                                {res.eegAnalysis}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Export bar */}
                        <div className="flex justify-end mt-4 pt-3 border-t border-gray-50">
                          <button className="text-xs text-blue-600 hover:text-blue-800 font-bold uppercase tracking-wider flex items-center gap-1.5 font-serif">
                            <Download className="w-3.5 h-3.5" />
                            Export Data Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: LOGS */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#D2D6DC] p-8 shadow-sm font-serif">
                <h2 className="text-xl font-bold text-[#0B1E3F] mb-2 flex items-center gap-2 font-serif">
                  <History className="w-5 h-5 text-blue-600" />
                  Operation Run Logs
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-serif">
                  Complete historical archive of patient algorithm sessions processed on this workspace machine.
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
                  <table className="min-w-full divide-y divide-[#E2E8F0] text-left text-xs text-[#334155]">
                    <thead className="bg-[#F8FAFC] text-[10px] font-bold uppercase tracking-wider text-gray-500 font-serif">
                      <tr>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4">Patient ID</th>
                        <th className="px-6 py-4">EEG Input Target</th>
                        <th className="px-6 py-4">Cognitive Profile</th>
                        <th className="px-6 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] bg-white font-medium">
                      {logsList.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-mono">{log.timestamp}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-[#0B1E3F] font-bold">{log.patientId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono">{log.imaging}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono">{log.cogscore}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-100 font-sans">
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

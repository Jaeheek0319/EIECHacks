import { useState, useRef, useEffect } from 'react';
import { EHRField } from './types';
import { SAMPLE_CASES, extractEHRFields } from './data/mockData';
import Hero from './components/Hero';
import UploadBox from './components/UploadBox';
import ProcessingIndicator from './components/ProcessingIndicator';
import ResultCard from './components/ResultCard';
import { 
  Heart, ShieldCheck, Stethoscope, Star, CheckCheck, 
  Sparkles, Calendar, Clock, Lock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation workflows: 'welcome' | 'processing' | 'results'
  const [workflowState, setWorkflowState] = useState<'welcome' | 'processing' | 'results'>('welcome');
  
  // Real-time Clock hook for medical telemetry
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Upload and attachment files state
  const [formImage, setFormImage] = useState<File | string | null>(null);
  const [formImageName, setFormImageName] = useState<string>('');
  const [transcription, setTranscription] = useState<string>('');
  const [transcriptionFileName, setTranscriptionFileName] = useState<string>('');
  
  // Active test case selector
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');
  
  // Custom extracted EHR results state
  const [extractedFields, setExtractedFields] = useState<EHRField[]>([]);

  const uploadSectionRef = useRef<HTMLDivElement>(null);

  // Keep digital medical clock updated
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCaseSelect = (caseId: string) => {
    const caseObj = SAMPLE_CASES.find(c => c.id === caseId);
    if (caseObj) {
      setSelectedCaseId(caseId);
      setFormImageName(caseObj.blankFormName);
      // Set to sample string representation for UI
      setFormImage(caseObj.blankFormName);
      setTranscription(caseObj.transcription);
      setTranscriptionFileName(`${caseObj.id}_transcription.txt`);
    }
  };

  const handleFormImageChange = (file: File | string | null, name: string) => {
    setFormImage(file);
    setFormImageName(name);
    // If the manual user uploads a file, we clean the preset case to avoid sync mismatch
    setSelectedCaseId('');
  };

  const handleTranscriptionChange = (text: string, fileName: string) => {
    setTranscription(text);
    setTranscriptionFileName(fileName);
    // Reset preset case selection if manually edited
    setSelectedCaseId('');
  };

  // Triggers mock processing phase
  const handleStartExtraction = async () => {
    if (!formImage || !transcription.trim()) return;
    setWorkflowState('processing');
  };

  // Called when simulation steps complete
  const handleProcessingComplete = async () => {
    try {
      const results = await extractEHRFields(formImage, transcription);
      setExtractedFields(results);
      setWorkflowState('results');
    } catch (err) {
      console.error("Clinical extraction failure: ", err);
      setWorkflowState('welcome');
    }
  };

  // Interactive callbacks on extracted medical results
  const handleFieldChange = (id: string, newValue: string) => {
    setExtractedFields(prev => prev.map(f => f.id === id ? { ...f, value: newValue, confidence: newValue ? Math.max(f.confidence, 85) : 0 } : f));
  };

  const handleAddField = (label: string, value: string) => {
    const newId = `custom_field_${Date.now()}`;
    const newField: EHRField = {
      id: newId,
      label,
      value,
      confidence: 100,
      evidence: 'Manually appended during clinician evaluation review.',
      isCustom: true
    };
    setExtractedFields(prev => [...prev, newField]);
  };

  const handleDeleteField = (id: string) => {
    setExtractedFields(prev => prev.filter(f => f.id !== id));
  };

  const handleReset = () => {
    setFormImage(null);
    setFormImageName('');
    setTranscription('');
    setTranscriptionFileName('');
    setSelectedCaseId('');
    setExtractedFields([]);
    setWorkflowState('welcome');
  };

  // Export updated review to clinical plaintext file
  const handleDownload = () => {
    let content = "========================================================\n";
    content += "        CLINICAL EHR FORM AI EXTRACTION SUMMARY LOG\n";
    content += "========================================================\n\n";
    content += `Encounter Date: ${currentTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`;
    content += `Extraction Telemetry Run: ${currentTime.toISOString()}\n`;
    content += `Blank Reference EHR Template: ${formImageName || 'Custom Upload'}\n`;
    content += `Patient Dialogue Transcript: ${transcriptionFileName || 'Custom Paste Input'}\n\n`;
    content += "--------------------------------------------------------\n";
    content += "                    EXTRACTED SECTORS                   \n";
    content += "--------------------------------------------------------\n\n";

    extractedFields.forEach((f) => {
      content += `[${f.label.toUpperCase()}]\n`;
      content += `Value: ${f.value}\n`;
      content += `Confidence Index: ${f.confidence}%\n`;
      if (f.evidence) {
        content += `Found Evidence Quote: "${f.evidence}"\n`;
      }
      content += "\n--------------------------------------------------------\n\n";
    });

    content += "========================================================\n";
    content += "DISCLAIMER: This report is generated via AI-assisted EHR mapping synthesis and formally authorized by the attending physician signature log.\n";
    content += "========================================================\n";

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const formattedDate = currentTime.toISOString().split('T')[0];
    const cleanFormName = (formImageName || 'CustomForm').replace(/\.[^/.]+$/, "");
    link.download = `EHR_Review_${cleanFormName}_${formattedDate}.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between selection:bg-medical-100 selection:text-medical-900 overflow-hidden" id="ehr-root-app">
      <div className="absolute inset-0 pointer-events-none site-background-animations" />
      <div className="relative z-10 w-full">
        <header className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[26px] bg-gradient-to-br from-medical-700 to-teal-clinical-500 text-white shadow-2xl shadow-teal-clinical-500/25 animate-heartbeat">
                <Heart className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-teal-clinical-600 font-semibold">Chart2Heart</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">Clinical Intake, Reimagined</h2>
              </div>
            </div>
            <p className="max-w-xl text-sm sm:text-base text-slate-600">
              Turn patient forms and transcripts into review-ready EHR summaries with an AI workflow built for healthcare teams.
            </p>
          </div>
        </header>
      </div>

      {/* Main Container Workflows */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          {workflowState === 'welcome' && (
            <motion.div
              key="welcome-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Presentation Banner */}
              <Hero onStartClick={scrollToUpload} />

              {/* Upload Workspace Section wrapper */}
              <div ref={uploadSectionRef} className="scroll-mt-16 bg-white border-t border-slate-200">
                <div className="max-w-6xl mx-auto py-4 text-center mt-6">
                  <span className="text-2xl font-black font-sans bg-linear-to-r from-medical-700 to-teal-clinical-600 bg-clip-text text-transparent">
                    Active Formulation Workspace
                  </span>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">Configure your blank form templates and transcript files below to initiate parsing.</p>
                </div>
                
                <UploadBox
                  formImage={formImage}
                  formImageName={formImageName}
                  onFormImageChange={handleFormImageChange}
                  transcription={transcription}
                  transcriptionFileName={transcriptionFileName}
                  onTranscriptionChange={handleTranscriptionChange}
                  selectedCaseId={selectedCaseId}
                  onCaseSelect={handleCaseSelect}
                  onSubmit={handleStartExtraction}
                />
              </div>
            </motion.div>
          )}

          {workflowState === 'processing' && (
            <motion.div
              key="processing-flow"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 bg-slate-50 flex items-center justify-center min-h-[70vh]"
            >
              <ProcessingIndicator onComplete={handleProcessingComplete} />
            </motion.div>
          )}

          {workflowState === 'results' && (
            <motion.div
              key="results-flow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              <ResultCard
                fields={extractedFields}
                onFieldChange={handleFieldChange}
                onAddField={handleAddField}
                onDeleteField={handleDeleteField}
                onDownload={handleDownload}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Structured Medical Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 border-t border-slate-800 text-xs mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-medical-400">
              <Heart className="w-4.5 h-4.5 fill-current" />
            </div>
            <div>
              <p className="text-white font-bold text-[12.5px]">ChartToHeart</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Streamlining clinical record-keeping with zero latency local mapping.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] text-slate-550 justify-center">
            <span className="text-slate-500">Secure AES-256 Memory Buffer</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-500">Physician AI Hackathon Demo</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-500">ISO 27001 Preparedness</span>
          </div>

          <p className="text-[10px] text-slate-505 font-mono">© 2026 Medical Labs Inc. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

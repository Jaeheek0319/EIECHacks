import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { SAMPLE_CASES } from '../data/mockData';
import { 
  Upload, FileText, ImageIcon, ShieldCheck, Check, Trash2, 
  HelpCircle, ChevronRight, FileHeart, Stethoscope 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadBoxProps {
  formImage: File | string | null;
  formImageName: string;
  onFormImageChange: (file: File | string | null, name: string) => void;
  
  transcription: string;
  transcriptionFileName: string;
  onTranscriptionChange: (text: string, fileName: string) => void;
  
  selectedCaseId: string;
  onCaseSelect: (caseId: string) => void;
  onSubmit: () => void;
}

export default function UploadBox({
  formImage,
  formImageName,
  onFormImageChange,
  transcription,
  transcriptionFileName,
  onTranscriptionChange,
  selectedCaseId,
  onCaseSelect,
  onSubmit
}: UploadBoxProps) {
  const [dragFormActive, setDragFormActive] = useState(false);
  const [dragTransActive, setDragTransActive] = useState(false);
  
  const formInputRef = useRef<HTMLInputElement>(null);
  const transInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag Events for Form Image
  const handleFormDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragFormActive(true);
    } else if (e.type === 'dragleave') {
      setDragFormActive(false);
    }
  };

  const handleFormDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragFormActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFormImageChange(file, file.name);
      }
    }
  };

  const handleFormFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFormImageChange(file, file.name);
    }
  };

  // Handle Drag Events for Transcription file
  const handleTransDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragTransActive(true);
    } else if (e.type === 'dragleave') {
      setDragTransActive(false);
    }
  };

  const handleTransDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTransActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onTranscriptionChange(event.target.result as string, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTransFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onTranscriptionChange(event.target.result as string, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  // Preset Selectors
  const triggerCaseSelection = (caseId: string) => {
    onCaseSelect(caseId);
  };

  const clearFormFile = () => {
    onFormImageChange(null, '');
    if (formInputRef.current) formInputRef.current.value = '';
  };

  const clearTransFile = () => {
    onTranscriptionChange('', '');
    if (transInputRef.current) transInputRef.current.value = '';
  };

  const isFormUploaded = formImage !== null;
  const isTransUploaded = transcription.trim().length > 0;
  const canSubmit = isFormUploaded && isTransUploaded;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-10" id="ehr-upload-section">
      
      {/* Clinician Presets Bar */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-medical-50 text-medical-600">
                <Stethoscope className="w-4 h-4" />
              </span>
              <h2 className="font-bold text-slate-800 text-sm tracking-tight">Physician Interactive Sandbox Demo</h2>
            </div>
            <p className="text-xs text-slate-500">Need sample clinical data? Choose an pre-loaded clinic encounter case study below to instantly populate both forms.</p>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {SAMPLE_CASES.map((c) => {
              const isActive = selectedCaseId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => triggerCaseSelection(c.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer border ${
                    isActive 
                      ? 'bg-medical-600 text-white border-medical-600 shadow-md ring-2 ring-medical-100' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <FileHeart className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-medical-500'}`} />
                  <span>{c.name}</span>
                  {isActive && <Check className="w-3 h-3 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Upload Area Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Column 1: EHR Blank Form Form Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-medical-600 text-white text-xs font-bold font-mono">1</span>
              Blank EHR Template Image
            </label>
            {isFormUploaded && (
              <button 
                onClick={clearFormFile}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <div
            onDragEnter={handleFormDrag}
            onDragOver={handleFormDrag}
            onDragLeave={handleFormDrag}
            onDrop={handleFormDrop}
            onClick={() => !isFormUploaded && formInputRef.current?.click()}
            className={`relative min-h-[340px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
              isFormUploaded 
                ? 'border-emerald-500 bg-emerald-50/10 hover:bg-emerald-50/20' 
                : dragFormActive 
                  ? 'border-medical-500 bg-medical-50/40 ring-4 ring-medical-100' 
                  : 'border-slate-300 hover:border-medical-400 bg-white hover:bg-slate-50/50'
            }`}
          >
            <input
              type="file"
              ref={formInputRef}
              onChange={handleFormFileSelect}
              accept="image/*"
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {isFormUploaded ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">EHR Form Loaded Successfully</h4>
                    <p className="text-xs text-emerald-600 font-semibold font-mono mt-1">{formImageName}</p>
                    <p className="text-xs text-slate-400 mt-2">Ready to parse form structure</p>
                  </div>

                  {/* EHR Form Thumbnail Frame Mock */}
                  <div className="mt-4 p-2 bg-slate-50 rounded-xl border border-slate-200 shadow-inner max-w-xs w-full">
                    <div className="aspect-[4/3] bg-white rounded-lg flex flex-col justify-start p-4 text-left font-mono relative overflow-hidden">
                      <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-100 rounded w-full" />
                        <div className="h-3 bg-slate-100 rounded w-5/6" />
                        <div className="h-3 bg-slate-100 rounded w-4/5" />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <div className="h-5 bg-gradient-to-r from-medical-100 to-medical-200 rounded w-16" />
                        <div className="h-5 bg-teal-clinical-100 rounded w-20" />
                      </div>
                      
                      <div className="absolute top-0 right-0 p-1 bg-medical-500 text-white text-[9px] font-bold rounded-bl">
                        SCAN READY
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-medical-50 text-medical-600 flex items-center justify-center border border-medical-200 shadow-xs">
                    <ImageIcon className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Drag & drop your Blank EHR Form image here</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG, or WEBP formats up to 10MB</p>
                  </div>
                  
                  <span className="text-xs font-semibold px-4 py-2 bg-medical-100 text-medical-700 rounded-lg hover:bg-medical-200 transition-colors">
                    Browse File
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Column 2: Transcription Text Paste or Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-medical-600 text-white text-xs font-bold font-mono">2</span>
              Patient-Doctor Transcription
            </label>
            {isTransUploaded && (
              <button 
                onClick={clearTransFile}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <div
            onDragEnter={handleTransDrag}
            onDragOver={handleTransDrag}
            onDragLeave={handleTransDrag}
            onDrop={handleTransDrop}
            className={`border rounded-2xl p-5 bg-white transition-all duration-200 ${
              isTransUploaded 
                ? 'border-emerald-500 ring-2 ring-emerald-50' 
                : dragTransActive 
                  ? 'border-teal-clinical-500 bg-teal-clinical-50/10 ring-4 ring-teal-clinical-100' 
                  : 'border-slate-300'
            }`}
          >
            {/* Split Options: Drag File or Paste Text Area */}
            {!isTransUploaded ? (
              <div className="space-y-4">
                <div 
                  onClick={() => transInputRef.current?.click()}
                  className="border border-dashed border-slate-300 hover:border-teal-clinical-500 rounded-xl py-8 px-4 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="file"
                    ref={transInputRef}
                    onChange={handleTransFileSelect}
                    accept=".txt,.doc,.docx"
                    className="hidden"
                  />
                  <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">Drag transcription file (.txt) here or <span className="text-medical-600 underline">browse</span></p>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2.5 text-slate-400 font-semibold">Or Paste Conversation Directly</span>
                  </div>
                </div>

                <textarea
                  value={transcription}
                  onChange={(e) => onTranscriptionChange(e.target.value, 'Pasted Transcript Text')}
                  placeholder="Paste physician narration, consultation logs, or dialogue transcript here..."
                  className="w-full min-h-[120px] max-h-[220px] p-3 text-xs border border-slate-200 rounded-xl focus:border-medical-500 focus:ring-1 focus:ring-medical-500 focus:outline-hidden font-mono"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="p-2 bg-slate-200 text-slate-600 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate">{transcriptionFileName || 'Custom Transcription Document'}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{transcription.split('\n').length} dialogue lines loaded</p>
                  </div>
                  <Check className="w-5 h-5 text-emerald-500 ml-auto flex-shrink-0" />
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Transcription Dialogue Panel</span>
                  <textarea
                    value={transcription}
                    onChange={(e) => onTranscriptionChange(e.target.value, transcriptionFileName || 'Edited Paste Text')}
                    className="w-full h-36 p-3 text-xs border border-slate-200 rounded-xl focus:border-medical-500 focus:ring-1 focus:ring-medical-500 focus:outline-hidden font-mono text-slate-700 bg-slate-50/50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HIPAA / GDPR Privacy Notification Frame */}
      <div className="mt-8 bg-sky-50/50 p-4 rounded-xl border border-sky-100 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-medical-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-medical-900 font-semibold" id="privacy-notice">HIPAA / Clinical Compliance & Secure Architecture Notice</p>
          <p className="text-[11px] text-medical-700/90 mt-0.5 leading-relaxed">
            Your files are processed securely. This demo does not permanently store uploaded medical documents. Files stay entirely inside active memory buffers and are cleared automatically upon reloading.
          </p>
        </div>
      </div>

      {/* Main Trigger Call to Action */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`flex items-center gap-2 px-8 py-4 font-bold rounded-2xl shadow-md transition-all duration-300 cursor-pointer text-sm tracking-wide transform ${
            canSubmit 
              ? 'bg-gradient-to-r from-medical-600 to-teal-clinical-600 text-white hover:from-medical-700 hover:to-teal-clinical-700 hover:-translate-y-0.5 shadow-medical-500/10' 
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
          id="btn-trigger-extraction"
        >
          <span>Initialize EHR AI Extraction</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

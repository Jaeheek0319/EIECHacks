import { useEffect, useState } from 'react';
import { ProgressStep } from '../types';
import { Heart, Check, Loader2, Play, Search, Network, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessingIndicatorProps {
  onComplete: () => void;
}

export default function ProcessingIndicator({ onComplete }: ProcessingIndicatorProps) {
  const [steps, setSteps] = useState<ProgressStep[]>([
    { id: 'read-form', label: 'Reading EHR form fields', description: 'Parsing structural sections and key-value anchors from blank document...', status: 'idle' },
    { id: 'analyze-trans', label: 'Analyzing patient-doctor transcription', description: 'Evaluating dialogues, removing voice fillers, and matching patient statements...', status: 'idle' },
    { id: 'match-fields', label: 'Matching information to form fields', description: 'Pairing medical terms with clinical evidence and generating confidence parameters...', status: 'idle' },
    { id: 'generate-doc', label: 'Synthesizing downloadable text file', description: 'Arranging final reviewed output aligned to professional medical formatting schemas...', status: 'idle' }
  ]);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage-based simulation representing different clinical checks
    const timeouts: NodeJS.Timeout[] = [];

    // Begin first check
    setSteps(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: 'running' } : s));
    setProgress(15);
    
    // Complete first check, Start second
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => {
        if (idx === 0) return { ...s, status: 'completed' };
        if (idx === 1) return { ...s, status: 'running' };
        return s;
      }));
      setProgress(40);
    }, 900));

    // Complete second check, Start third
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => {
        if (idx === 1) return { ...s, status: 'completed' };
        if (idx === 2) return { ...s, status: 'running' };
        return s;
      }));
      setProgress(70);
    }, 1800));

    // Complete third, Start fourth
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => {
        if (idx === 2) return { ...s, status: 'completed' };
        if (idx === 3) return { ...s, status: 'running' };
        return s;
      }));
      setProgress(90);
    }, 2800));

    // Complete everything
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map(s => ({ ...s, status: 'completed' })));
      setProgress(100);
      onComplete();
    }, 3600));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center" id="processing-indicator-section">
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-xl relative overflow-hidden">
        
        {/* Subtle glowing backgrounds */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-medical-100/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-clinical-100/20 rounded-full blur-2xl" />

        {/* Pulsing Heartbeat Visualizer Header */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="relative">
            {/* Pulsing ring layers */}
            <div className="absolute inset-0 bg-rose-400/20 rounded-full animate-ping scale-150" />
            <div className="absolute -inset-2 bg-rose-400/10 rounded-full animate-pulse" />
            
            <div className="relative w-16 h-16 rounded-full bg-linear-to-tr from-rose-500 to-rose-400 flex items-center justify-center shadow-md animate-heartbeat">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Active EHR Extracting Engine</h3>
            <p className="text-xs text-slate-500 font-medium">Please wait while the Clinical AI digests your intake parameters</p>
          </div>
        </div>

        {/* Interactive Double Scanner Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left">
          
          {/* EHR Sheet Scan Block */}
          <div className="relative border border-slate-200/80 rounded-2xl bg-slate-50 p-4 h-48 overflow-hidden shadow-inner">
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-medical-500 to-transparent shadow-md shadow-medical-500/80 animate-scan z-10" />
            
            <div className="space-y-3 font-mono text-[10px] text-slate-400 select-none">
              <div className="flex items-center gap-1.5 text-slate-600 font-bold border-b border-slate-200 pb-1.5 uppercase tracking-wider">
                <Search className="w-3.5 h-3.5 text-medical-500" />
                <span>Blank Form Matrix</span>
              </div>
              <div className="h-3 bg-slate-200/80 rounded w-1/3" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-3.5 bg-slate-200/50 rounded col-span-2" />
                <div className="h-3.5 bg-medical-100 rounded text-center text-[8px] font-bold text-medical-600 py-0.5">PATIENT_ID</div>
              </div>
              <div className="h-3 bg-slate-200/50 rounded w-4/5" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-3.5 bg-slate-200/50 rounded" />
                <div className="h-3.5 bg-teal-clinical-100 rounded text-center text-[8px] font-bold text-teal-clinical-600 py-0.5">CHIEF_COMPLAINT</div>
              </div>
              <div className="h-3.5 bg-slate-200/50 rounded w-full" />
            </div>
            
            <div className="absolute inset-0 bg-radial from-transparent to-slate-50/60 pointer-events-none" />
          </div>

          {/* Transcript Diagnostic Stream */}
          <div className="relative border border-slate-200/80 rounded-2xl bg-zinc-950 p-4 h-48 overflow-hidden shadow-lg">
            <div className="space-y-2.5 font-mono text-[9px] text-slate-300">
              <div className="flex items-center gap-1.5 text-teal-400 font-bold border-b border-zinc-800 pb-1.5 uppercase tracking-wider">
                <Network className="w-3.5 h-3.5" />
                <span>Text NLP Analyzer</span>
              </div>
              
              <p className="text-[10px] text-zinc-500 leading-none">STREAM TOKENS INCOMING...</p>
              
              <div className="space-y-1.5 text-emerald-400/90 leading-tight">
                <p className="truncate"><span className="text-blue-400">Dr. Miller:</span> Mr. Henderson chest discomfort...</p>
                <p className="truncate"><span className="text-orange-400">Match:</span> symptoms [CHEST_DISCOMFORT]</p>
                <p className="truncate"><span className="text-blue-400">Dr. Miller:</span> Prescribing Metoprolol Succinate 25mg...</p>
                <p className="truncate"><span className="text-orange-400">Match:</span> therapy [METOPROLOL] CONF: 97%</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-2 text-rose-500/80 text-[10px] font-bold uppercase animate-pulse">
              ● SEGMENTING
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Overall Process Integrity</span>
            <span className="font-mono text-medical-600">{progress}%</span>
          </div>
          <div className="h-3 w-full bg-slate-150 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-xs">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              className="h-full bg-gradient-to-r from-medical-500 via-teal-clinical-500 to-emerald-500 rounded-full shadow-inner"
            />
          </div>
        </div>

        {/* Real-time Step Checklists */}
        <div className="max-w-xl mx-auto space-y-4">
          {steps.map((s, idx) => (
            <div 
              key={s.id}
              className={`flex items-start gap-3.5 p-3 rounded-2xl border transition-all duration-300 ${
                s.status === 'completed'
                  ? 'bg-emerald-50/40 border-emerald-100 text-emerald-950'
                  : s.status === 'running'
                    ? 'bg-medical-50/50 border-medical-200 text-slate-900 shadow-sm animate-pulse'
                    : 'bg-slate-50/30 border-transparent text-slate-400'
              }`}
            >
              <div className="mt-0.5">
                {s.status === 'completed' ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                ) : s.status === 'running' ? (
                  <Loader2 className="w-5 h-5 text-medical-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold text-[10px] font-mono">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="text-left flex-1 min-w-0">
                <h4 className="text-xs font-bold tracking-tight">{s.label}</h4>
                <p className={`text-[10px] mt-0.5 truncate ${
                  s.status === 'completed' 
                    ? 'text-emerald-700 font-medium' 
                    : s.status === 'running' 
                      ? 'text-medical-600' 
                      : 'text-slate-400'
                }`}>
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

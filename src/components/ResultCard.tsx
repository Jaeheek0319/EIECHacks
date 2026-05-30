import { useState, FormEvent } from 'react';
import { EHRField } from '../types';
import { 
  FileDown, ArrowLeftRight, Check, AlertCircle, Edit3, Save, 
  HelpCircle, MessageSquare, ShieldAlert, Plus, Trash2, 
  RefreshCw, FileText, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResultCardProps {
  fields: EHRField[];
  onFieldChange: (id: string, value: string) => void;
  onAddField: (label: string, value: string) => void;
  onDeleteField: (id: string) => void;
  onDownload: () => void;
  onReset: () => void;
}

export default function ResultCard({
  fields,
  onFieldChange,
  onAddField,
  onDeleteField,
  onDownload,
  onReset
}: ResultCardProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  
  // Custom field variables
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const startEditing = (field: EHRField) => {
    setEditingId(field.id);
    setTempValue(field.value);
  };

  const saveEditing = (id: string) => {
    onFieldChange(id, tempValue);
    setEditingId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleAddNewField = (e: FormEvent) => {
    e.preventDefault();
    if (newLabel.trim() && newValue.trim()) {
      onAddField(newLabel.trim(), newValue.trim());
      setNewLabel('');
      setNewValue('');
      setShowAddModal(false);
    }
  };

  // Helper for rendering confidence score styling
  const getConfidenceBadge = (score: number) => {
    if (score >= 90) {
      return (
        <span className="confidence-pill conf-high">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{score}% Confirmed</span>
        </span>
      );
    } else if (score >= 60) {
      return (
        <span className="confidence-pill conf-med">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>{score}% Moderate</span>
        </span>
      );
    } else {
      return (
        <span className="confidence-pill conf-low">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Not Found in Transcript</span>
        </span>
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-10" id="results-extractor-display">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-150 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-clinical-50 text-teal-teal-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Clinical Extraction Output</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Structured EHR Review Panel</h2>
          <p className="text-xs text-slate-500 mt-1">Review, modify, or add fields parsed from patient-doctor dialogue files before compiling.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-all hover:bg-slate-50 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Parse Another Case</span>
          </button>
          
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-medical-600 to-teal-clinical-600 hover:from-medical-700 hover:to-teal-clinical-700 rounded-xl shadow-md cursor-pointer transition-all transform hover:-translate-y-0.5"
            id="download-ehr-txt"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Text File</span>
          </button>
        </div>
      </div>

      {/* Grid containing Clinical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <AnimatePresence mode="popLayout">
          {fields.map((field) => {
            const isEditing = editingId === field.id;
            return (
              <motion.div
                layout
                key={field.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`bg-white border rounded-2xl p-5 shadow-xs transition-all duration-300 relative group flex flex-col justify-between ${
                  isEditing 
                    ? 'border-medical-500 ring-2 ring-medical-50 shadow-md' 
                    : 'border-slate-200 hover:border-slate-350 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 tracking-wide uppercase">{field.label}</h4>
                      <div className="mt-1.5">{getConfidenceBadge(field.confidence)}</div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveEditing(field.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors pointer-events-auto cursor-pointer"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors pointer-events-auto cursor-pointer"
                            title="Cancel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(field)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-medical-600 hover:bg-medical-50 transition-colors cursor-pointer"
                            title="Edit value"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {field.isCustom && (
                            <button
                              onClick={() => onDeleteField(field.id)}
                              className="p-1.5 rounded-lg text-slate-405 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete custom criteria"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Main Value Display */}
                  <div className="mb-4">
                    {isEditing ? (
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full text-xs font-semibold p-3 border border-medical-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-medical-500 bg-medical-50/20 font-sans"
                        rows={3}
                        autoFocus
                      />
                    ) : (
                      <p className={`text-xs whitespace-pre-line font-medium leading-relaxed ${
                        field.confidence === 0 ? 'text-slate-400 italic' : 'text-slate-800'
                      }`}>
                        {field.value}
                      </p>
                    )}
                  </div>
                </div>

                {/* Evidence Quote Frame */}
                {field.evidence && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/80 mt-auto text-[10.5px] leading-relaxed text-slate-600 relative">
                    <div className="absolute top-2 right-2 text-slate-300">
                      <MessageSquare className="w-3 h-3" />
                    </div>
                    <span className="font-bold text-[9px] uppercase tracking-wide text-slate-400 block mb-1">Transcript Alignment Quote</span>
                    <span className="italic">“{field.evidence}”</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Create Custom Category Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="border-2 border-dashed border-slate-350 hover:border-medical-400 rounded-2xl p-6 min-h-[180px] bg-sky-50/5 hover:bg-medical-50/10 transition-colors flex flex-col items-center justify-center gap-3 text-center cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-medical-50 group-hover:bg-medical-100 text-medical-600 flex items-center justify-center transition-colors">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-800">Add Custom EHR Category</h5>
            <p className="text-[10px] text-slate-500 mt-0.5">Append extra criteria or custom checklist items mapping other details.</p>
          </div>
        </button>
      </div>

      {/* Add Custom EHR Category Modal/Drawer */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/45 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-1">Append Custom Category</h3>
              <p className="text-[11px] text-slate-500 mb-4">Create your own specific header to map custom symptoms, notes, or patient scores.</p>

              <form onSubmit={handleAddNewField} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Category Title</label>
                  <input
                    type="text"
                    required
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="e.g. Blood Pressure, Past Surgical History"
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-medical-505 focus:ring-1 focus:ring-medical-505 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Category Content / Clinical Findings</label>
                  <textarea
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Input findings or manual observations parsed..."
                    rows={3}
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-medical-505 focus:ring-1 focus:ring-medical-505 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-medical-600 rounded-xl hover:bg-medical-700 cursor-pointer"
                  >
                    Append Section
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Visual File Generation Confirmation Banner */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-clinical-50 text-teal-clinical-600 flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Export Final Medical Dictation Log</h4>
            <p className="text-[10px] text-slate-500">Compiles the clinical review logs, including confirmation states and citations, into structured .txt formats.</p>
          </div>
        </div>
        
        <button
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 cursor-pointer shadow-xs transition-colors"
        >
          <FileDown className="w-4 h-4" />
          <span>Compile & Download</span>
        </button>
      </div>

    </div>
  );
}

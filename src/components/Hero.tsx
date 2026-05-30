import { motion } from 'motion/react';
import { FileHeart, ArrowRight, Activity, ClipboardCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-medical-50 via-white to-teal-clinical-50 border-b border-sky-100">
      {/* Decorative architectural background graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-medical-200/20 to-teal-clinical-100/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sky-100/20 to-medical-50/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          
          {/* Diagnostic Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-medical-50 border border-medical-200 text-medical-700 text-xs font-semibold tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 text-medical-600" />
            <span>Next-Generation Patient Intake AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-clinical-500 animate-ping" />
          </motion.div>

          {/* Main Title Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight text-slate-900 max-w-4xl leading-tight sm:leading-none"
            id="app-hero-title"
          >
            Chart2Heart turns patient conversations into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-medical-600 to-teal-clinical-600 bg-clip-text text-transparent">
              structured EHR notes
            </span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-light leading-relaxed"
          >
            Upload a blank EHR form and a patient-doctor transcription. Our AI extracts the right information and organizes it into a downloadable text document.
          </motion.p>

          {/* Call to action & Bullet Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <button
              onClick={onStartClick}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-medical-600 to-teal-clinical-500 hover:from-medical-700 hover:to-teal-clinical-600 text-white font-semibold rounded-xl shadow-lg shadow-medical-500/20 hover:shadow-xl hover:shadow-medical-600/30 transition-all duration-200 cursor-pointer text-sm tracking-wide transform hover:-translate-y-0.5 active:translate-y-0"
              id="cta-start-extracting"
            >
              Start Extracting
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-xs text-slate-500 font-medium">No credit card or accounts required</span>
          </motion.div>

          {/* Value Props Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-10"
          >
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-100 flex items-start gap-4 text-left shadow-sm hover:border-medical-200 transition-colors">
              <div className="p-2.5 rounded-xl bg-medical-50 text-medical-600">
                <FileHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Visual Form Analysis</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Reads structured EHR templates to detect target checklist headings automatically.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-100 flex items-start gap-4 text-left shadow-sm hover:border-medical-200 transition-colors">
              <div className="p-2.5 rounded-xl bg-teal-clinical-100/50 text-teal-clinical-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Conversational Mapping</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Strips conversational filler to isolate patient symptoms, diagnoses, and medications.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-100 flex items-start gap-4 text-left shadow-sm hover:border-teal-clinical-100 transition-colors">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Physician Oversight</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Review transcript evidence and confidence metrics, then make clinical corrections before saving.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

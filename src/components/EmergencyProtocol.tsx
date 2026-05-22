import { motion } from 'framer-motion';
import { AlertOctagon, Phone, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useCountry } from '../utils/countryStore';

interface EmergencyProtocolProps {
  foodName: string;
  symptoms: string[];
  timeToSymptoms?: string;
  emergencySteps: string[];
}

export default function EmergencyProtocol({ foodName, symptoms, timeToSymptoms, emergencySteps }: EmergencyProtocolProps) {
  const { hotlines, flag } = useCountry();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl overflow-hidden border-2 border-danger/30"
      role="alert"
      aria-labelledby="emergency-title"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-danger via-danger to-danger-dark px-8 py-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center animate-pulse-danger">
            <AlertOctagon className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 id="emergency-title" className="text-xl sm:text-2xl font-black text-white">⚠️ EMERGENCY PROTOCOL</h3>
            <p className="text-sm text-white/80 mt-1">What to do if your pet ate {foodName.toLowerCase()}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-danger-light to-white p-6 sm:p-8 space-y-6">
        {/* Emergency Hotlines */}
        <div className="bg-white rounded-xl p-6 border border-danger/20 shadow-sm">
          <h4 className="font-bold text-danger-dark flex items-center gap-3 mb-4 text-lg">
            <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-danger" aria-hidden="true" />
            </div>
            Emergency Hotlines (24/7)
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {hotlines.map((hotline, idx) => (
              <a
                key={idx}
                href={hotline.tel}
                className="flex items-center gap-4 p-4 bg-danger-light/50 rounded-xl hover:bg-danger-light transition-colors group"
                aria-label={`Call ${hotline.name}: ${hotline.number}`}
              >
                <span className="text-2xl" aria-hidden="true">{flag}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-danger-dark">{hotline.name}</p>
                  <p className="text-xs text-danger-dark/70 font-extrabold">{hotline.number}</p>
                  <p className="text-[10px] text-danger-dark/60 mt-0.5 leading-tight">{hotline.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-danger opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Time to symptoms */}
        {timeToSymptoms && (
          <div className="flex items-center gap-5 p-5 bg-white rounded-xl border border-danger/20 shadow-sm">
            <div className="w-12 h-12 bg-danger-light rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-danger" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-danger-dark">Symptoms typically appear within:</p>
              <p className="text-xl font-black text-danger">{timeToSymptoms}</p>
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="bg-white rounded-xl p-6 border border-danger/20 shadow-sm">
          <h4 className="font-black text-danger-dark mb-5 flex items-center gap-2 text-lg">
            🚨 WHAT TO DO NOW
          </h4>
          <ol className="space-y-4">
            {emergencySteps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-danger to-danger-dark text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {i + 1}
                </span>
                <p className="text-sm text-text-primary leading-relaxed flex-1 pt-1">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Symptoms Watch List */}
        <div className="bg-white rounded-xl p-6 border border-danger/20 shadow-sm">
          <h4 className="font-bold text-danger-dark mb-4 flex items-center gap-2 text-lg">
            👁️ Symptoms to Watch For
          </h4>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom) => (
              <span 
                key={symptom} 
                className="flex items-center gap-2 px-4 py-2 bg-danger-light text-danger-dark rounded-full text-sm font-medium border border-danger/20"
              >
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
                {symptom}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-danger-dark/60 text-center">
          ⏱️ Time is critical. Do not wait for symptoms to appear before seeking help.
        </p>
      </div>
    </motion.section>
  );
}

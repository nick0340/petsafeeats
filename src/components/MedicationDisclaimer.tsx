import { AlertOctagon, Phone, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface MedicationDisclaimerProps {
  medicationName: string;
}

export default function MedicationDisclaimer({ medicationName }: MedicationDisclaimerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl border-2 border-danger bg-gradient-to-br from-danger via-danger to-danger-dark text-white"
    >
      {/* Pulsing background effect */}
      <div className="absolute inset-0 bg-danger animate-pulse opacity-20" />
      
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-danger">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              ⚠️ CRITICAL WARNING — HUMAN MEDICATION
            </h3>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              <strong>{medicationName}</strong> is a human medication that is <strong>EXTREMELY DANGEROUS</strong> to pets. 
              This tool provides information only — <strong>if your pet ingested any medication, call a veterinarian or poison control IMMEDIATELY.</strong>
            </p>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <a
            href="tel:+18557647661"
            className="flex items-center justify-center gap-3 bg-white text-danger font-bold py-4 px-5 rounded-xl hover:bg-white/90 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Pet Poison Helpline: (855) 764-7661</span>
          </a>
          <a
            href="tel:+18884264435"
            className="flex items-center justify-center gap-3 bg-white/20 text-white font-bold py-4 px-5 rounded-xl hover:bg-white/30 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>ASPCA: (888) 426-4435</span>
          </a>
        </div>

        <div className="mt-6 bg-white/10 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-white/80 flex items-start gap-2">
            <AlertOctagon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Disclaimer:</strong> This tool is for educational purposes only. 
              It is NOT a substitute for professional veterinary advice. 
              Never give human medications to pets unless specifically directed by a veterinarian.
              In case of emergency, always contact a qualified veterinary professional immediately.
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

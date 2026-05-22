import { CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SafetyLevel, PetType } from '../data/foods';
import { getPetById } from '../data/pets';

interface VerdictCardProps {
  foodName: string;
  foodEmoji: string;
  pet: PetType;
  safety: SafetyLevel;
  summary: string;
}

export default function VerdictCard({ foodName, foodEmoji, pet, safety, summary }: VerdictCardProps) {
  const petLabel = getPetById(pet).plural;

  const config = {
    safe: {
      bg: 'bg-gradient-to-br from-safe-light via-white to-safe-light/50',
      border: 'border-safe/20',
      icon: CheckCircle,
      iconColor: 'text-safe',
      badge: 'bg-gradient-to-r from-safe to-emerald-600 text-white shadow-lg shadow-safe/30',
      badgeText: '✓ SAFE TO EAT',
      pulseClass: 'animate-pulse-safe',
      title: `Yes! ${petLabel} Can Eat ${foodName}`,
      iconBg: 'bg-safe/10',
    },
    caution: {
      bg: 'bg-gradient-to-br from-caution-light via-white to-caution-light/50',
      border: 'border-caution/20',
      icon: AlertTriangle,
      iconColor: 'text-caution',
      badge: 'bg-gradient-to-r from-caution to-amber-600 text-white shadow-lg shadow-caution/30',
      badgeText: '⚠ USE CAUTION',
      pulseClass: '',
      title: `${petLabel} Can Eat ${foodName} With Caution`,
      iconBg: 'bg-caution/10',
    },
    toxic: {
      bg: 'bg-gradient-to-br from-danger-light via-white to-danger-light/50',
      border: 'border-danger/20',
      icon: XCircle,
      iconColor: 'text-danger',
      badge: 'bg-gradient-to-r from-danger to-rose-600 text-white shadow-lg shadow-danger/30',
      badgeText: '☠ TOXIC — DO NOT FEED',
      pulseClass: 'animate-pulse-danger',
      title: `No! ${petLabel} Cannot Eat ${foodName}`,
      iconBg: 'bg-danger/10',
    },
  };

  const c = config[safety];
  const Icon = c.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative rounded-3xl ${c.bg} border-2 ${c.border} p-8 sm:p-10 lg:p-12 overflow-hidden`}
      aria-labelledby="verdict-title"
    >
      {/* Background decoration */}
      <div className="absolute top-6 right-6 text-8xl sm:text-9xl opacity-10 select-none pointer-events-none" aria-hidden="true">
        {foodEmoji}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Safety Badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`${c.badge} px-6 py-2.5 rounded-full text-sm font-bold tracking-wide`}
          role="status"
          aria-live="polite"
        >
          {c.badgeText}
        </motion.span>

        {/* Icon - centered */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
          className={`mt-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full ${c.iconBg} flex items-center justify-center ${c.pulseClass}`}
          aria-hidden="true"
        >
          <Icon className={`w-12 h-12 sm:w-14 sm:h-14 ${c.iconColor}`} strokeWidth={2.5} />
        </motion.div>

        {/* Food Emoji + Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <span className="text-5xl sm:text-6xl" aria-hidden="true">{foodEmoji}</span>
          <h1 id="verdict-title" className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary leading-tight">
            {c.title}
          </h1>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed"
        >
          {summary}
        </motion.p>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-text-muted bg-white/80 px-5 py-2.5 rounded-full border border-slate-100"
        >
          <Shield className="w-4 h-4 text-brand" aria-hidden="true" />
          <span>Verified by veterinary professionals</span>
        </motion.div>
      </div>
    </motion.article>
  );
}

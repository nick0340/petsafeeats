import { motion } from 'framer-motion';
import { Ruler, CheckCircle } from 'lucide-react';
import type { DosageInfo } from '../data/foods';

interface DosageTableProps {
  dosage: DosageInfo;
  foodName: string;
}

export default function DosageTable({ dosage, foodName }: DosageTableProps) {
  const sizes = [
    { label: 'Small', weight: '< 10 kg (22 lbs)', emoji: '🐕', amount: dosage.small, color: 'bg-blue-50 border-blue-100' },
    { label: 'Medium', weight: '10-25 kg (22-55 lbs)', emoji: '🐕‍🦺', amount: dosage.medium, color: 'bg-purple-50 border-purple-100' },
    { label: 'Large', weight: '> 25 kg (55 lbs)', emoji: '🦮', amount: dosage.large, color: 'bg-orange-50 border-orange-100' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-soft rounded-2xl overflow-hidden"
      role="region"
      aria-labelledby="dosage-title"
    >
      <div className="px-8 py-6 bg-gradient-to-r from-safe/5 to-transparent border-b border-slate-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-safe to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <Ruler className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 id="dosage-title" className="font-bold text-text-primary text-lg">Safe Dosage Guide</h3>
          <p className="text-sm text-text-secondary">Maximum recommended {foodName.toLowerCase()} per serving</p>
        </div>
      </div>

      {/* Responsive Cards/Table */}
      <div className="p-6 sm:p-8">
        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {sizes.map((size, i) => (
            <motion.div
              key={size.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`p-5 rounded-xl border ${size.color}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl" aria-hidden="true">{size.emoji}</span>
                <div>
                  <p className="font-bold text-text-primary text-lg">{size.label}</p>
                  <p className="text-xs text-text-secondary">{size.weight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-slate-100">
                <CheckCircle className="w-5 h-5 text-safe flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold text-safe-dark">{size.amount}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="bg-slate-50">
                <th scope="col" className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider rounded-l-xl">Pet Size</th>
                <th scope="col" className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Weight Range</th>
                <th scope="col" className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider rounded-r-xl">Maximum Safe Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sizes.map((size, i) => (
                <motion.tr
                  key={size.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl" aria-hidden="true">{size.emoji}</span>
                      <span className="font-semibold text-text-primary">{size.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-text-secondary">{size.weight}</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-safe-light text-safe-dark rounded-lg text-sm font-semibold border border-safe/20">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      {size.amount}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-8 py-5 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-text-muted flex items-center gap-2">
          <span aria-hidden="true">💡</span>
          <span>Treats should make up no more than 10% of your pet's daily caloric intake.</span>
        </p>
      </div>
    </motion.div>
  );
}

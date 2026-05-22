import { useState, useEffect } from 'react';
import { Calculator, Scale, AlertTriangle, Info, ShieldAlert, Skull, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SafetyLevel, PetType } from '../data/foods';
import { getPetById } from '../data/pets';

interface ToxicityCalculatorProps {
  foodName: string;
  safety: SafetyLevel;
  toxicComponent?: string;
  selectedPet?: PetType;
  isMedication?: boolean;
}

// Detect if user is likely in US/UK for default units
function getDefaultUnit(): 'kg' | 'lbs' {
  try {
    const locale = navigator.language || 'en-US';
    const imperialCountries = ['en-US', 'en-GB', 'en-CA', 'en-AU'];
    return imperialCountries.some(c => locale.startsWith(c.split('-')[0])) ? 'lbs' : 'kg';
  } catch {
    return 'lbs'; // Default to lbs for US market
  }
}

const chocolateFactors = {
  white: 0.01,
  milk: 2.0,
  dark: 5.5,
  baking: 16.0,
  cocoa: 26.0,
};

export default function ToxicityCalculator({ foodName, safety, toxicComponent, selectedPet = 'dogs', isMedication = false }: ToxicityCalculatorProps) {
  const [unit, setUnit] = useState<'kg' | 'lbs'>(() => getDefaultUnit());
  const petInfo = getPetById(selectedPet);
  
  // Set default weight when pet changes
  const [weight, setWeight] = useState(() => {
    const defWeight = petInfo.defaultWeightKg;
    return unit === 'lbs' ? Math.round(defWeight * 2.20462) : defWeight;
  });

  const [quantity, setQuantity] = useState(5);
  
  // Chocolate state
  const [chocolateType, setChocolateType] = useState<'white' | 'milk' | 'dark' | 'baking' | 'cocoa'>('milk');
  
  // Medication state
  const [pills, setPills] = useState(1);
  const [mgPerPill, setMgPerPill] = useState(200);

  useEffect(() => {
    const defWeight = petInfo.defaultWeightKg;
    setWeight(unit === 'lbs' ? Math.round(defWeight * 2.20462) : defWeight);
  }, [selectedPet]);

  // Update weight when unit changes
  const toggleUnit = () => {
    if (unit === 'kg') {
      setUnit('lbs');
      setWeight(Math.round(weight * 2.20462));
    } else {
      setUnit('kg');
      setWeight(Math.round(weight * 0.453592));
    }
  };

  const weightInKg = unit === 'lbs' ? weight * 0.453592 : weight;

  const maxWeightKg = petInfo.maxWeightKg;
  const maxWeight = unit === 'lbs' ? Math.round(maxWeightKg * 2.20462) : maxWeightKg;
  
  // Clamp weight if unit switch or pet switch overflows
  const clampedWeight = Math.max(1, Math.min(weight, maxWeight));
  const activeWeightInKg = unit === 'lbs' ? clampedWeight * 0.453592 : clampedWeight;

  const nameLower = foodName.toLowerCase();
  
  // Absolute toxins that represent immediate critical danger
  const isAbsoluteToxin = 
    nameLower === 'grapes' || 
    nameLower === 'raisins' || 
    nameLower === 'macadamia nuts' || 
    (nameLower === 'acetaminophen' && selectedPet === 'cats');

  const isChocolate = nameLower === 'chocolate';

  // Calculate specialized risk
  const getChocolateRisk = (dose: number): { level: 'Low' | 'Medium' | 'High' | 'Critical'; description: string } => {
    if (dose < 20) {
      return { 
        level: 'Low', 
        description: `Dose: ${dose.toFixed(1)} mg/kg. Mild or no symptoms expected. Your pet may experience slight stomach upset.` 
      };
    }
    if (dose < 40) {
      return { 
        level: 'Medium', 
        description: `Dose: ${dose.toFixed(1)} mg/kg. Mild to moderate toxicity. Symptoms like vomiting, diarrhea, rapid breathing, and high heart rate are likely. Consult a vet.` 
      };
    }
    if (dose < 60) {
      return { 
        level: 'High', 
        description: `Dose: ${dose.toFixed(1)} mg/kg. Serious toxicity. High risk of muscle tremors, arrhythmias, or seizures. Contact emergency veterinary clinics immediately!` 
      };
    }
    return { 
      level: 'Critical', 
      description: `Dose: ${dose.toFixed(1)} mg/kg. LETHAL CONCENTRATION. Extreme risk of cardiovascular collapse, severe seizures, and death. Rush to the nearest emergency clinic NOW!` 
    };
  };

  const getMedicationRisk = (dose: number): { level: 'Low' | 'Medium' | 'High' | 'Critical'; description: string } => {
    if (dose < 20) {
      return { 
        level: 'Low', 
        description: `Dose: ${dose.toFixed(1)} mg/kg. Mild exposure. Monitor your pet for vomiting, lethargy, or loss of appetite. Call your vet for advice.` 
      };
    }
    if (dose < 100) {
      return { 
        level: 'Medium', 
        description: `Dose: ${dose.toFixed(1)} mg/kg. Moderate toxicity. High risk of gastrointestinal irritation, bleeding, or ulceration. Contact your veterinarian.` 
      };
    }
    if (dose < 300) {
      return { 
        level: 'High', 
        description: `Dose: ${dose.toFixed(1)} mg/kg. Severe toxicity. Imminent risk of acute kidney failure and gastric perforation. Seek immediate veterinary attention.` 
      };
    }
    return { 
      level: 'Critical', 
      description: `Dose: ${dose.toFixed(1)} mg/kg. CRITICAL OVERDOSE. High threat of central nervous system depression, seizures, shock, and multi-organ failure. Immediate emergency intervention is required!` 
    };
  };

  const calculateRisk = (): { level: 'Low' | 'Medium' | 'High' | 'Critical'; color: string; description: string } => {
    if (isChocolate) {
      const dose = (quantity * chocolateFactors[chocolateType]) / activeWeightInKg;
      const res = getChocolateRisk(dose);
      return { ...res, color: res.level === 'Low' ? 'safe' : res.level === 'Medium' ? 'caution' : 'danger' };
    }

    if (isMedication) {
      const dose = (pills * mgPerPill) / activeWeightInKg;
      const res = getMedicationRisk(dose);
      return { ...res, color: res.level === 'Low' ? 'safe' : res.level === 'Medium' ? 'caution' : 'danger' };
    }

    if (safety === 'safe') {
      const ratio = quantity / (activeWeightInKg * 5);
      if (ratio < 0.5) return { level: 'Low', color: 'safe', description: `This amount is within safe limits for your ${petInfo.name.toLowerCase()}'s size.` };
      if (ratio < 1) return { level: 'Medium', color: 'caution', description: `Approaching the limit. Monitor your ${petInfo.name.toLowerCase()} for any signs of digestive upset.` };
      return { level: 'High', color: 'danger', description: `This exceeds healthy feeding amounts for a ${clampedWeight}${unit} pet. Reduce the portion.` };
    }
    
    if (safety === 'caution') {
      const ratio = quantity / (activeWeightInKg * 2);
      if (ratio < 0.3) return { level: 'Low', color: 'safe', description: 'A small, accidental bite may be tolerated, but monitor closely for symptoms.' };
      if (ratio < 0.7) return { level: 'Medium', color: 'caution', description: 'Concerning quantity. Likely to cause mild digestive issues or discomfort. Consider contacting your vet.' };
      return { level: 'High', color: 'danger', description: 'High probability of moderate to severe symptoms. Contact your veterinarian.' };
    }
    
    const ratio = quantity / activeWeightInKg;
    if (ratio < 0.5) return { level: 'Medium', color: 'caution', description: `Even tiny amounts of ${foodName.toLowerCase()} carry toxicity risks for ${petInfo.plural.toLowerCase()}. Please consult a vet.` };
    if (ratio < 2) return { level: 'High', color: 'danger', description: `Dangerous dose for a ${clampedWeight}${unit} ${petInfo.name.toLowerCase()}. Seek veterinary evaluation immediately.` };
    return { level: 'Critical', color: 'danger', description: `LIFE-THREATENING EMERGENCY DOSE. Extreme danger of organ damage. Rush to the nearest emergency clinic now!` };
  };

  const risk = calculateRisk();

  const riskColors = {
    Low: { bg: 'bg-safe-light', text: 'text-safe-dark', bar: 'bg-gradient-to-r from-safe to-emerald-500', width: '25%', badge: 'bg-safe text-white' },
    Medium: { bg: 'bg-caution-light', text: 'text-caution-dark', bar: 'bg-gradient-to-r from-caution to-amber-500', width: '50%', badge: 'bg-caution text-white' },
    High: { bg: 'bg-danger-light', text: 'text-danger-dark', bar: 'bg-gradient-to-r from-danger to-rose-500', width: '75%', badge: 'bg-danger text-white' },
    Critical: { bg: 'bg-danger', text: 'text-white', bar: 'bg-gradient-to-r from-danger-dark to-danger', width: '100%', badge: 'bg-danger-dark text-white' },
  };

  const rc = riskColors[risk.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-soft rounded-2xl overflow-hidden shadow-xl border border-slate-100/50"
      role="region"
      aria-labelledby="calculator-title"
    >
      <div className="px-8 py-6 bg-gradient-to-r from-brand/10 to-transparent border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center shadow-md">
            <Calculator className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 id="calculator-title" className="font-bold text-text-primary text-lg">Toxicity Risk Calculator</h3>
            <p className="text-sm text-text-secondary">Clinical weight and ingestion analyzer for your {petInfo.name}</p>
          </div>
        </div>
        {isChocolate && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> Specialized Toxin Mode
          </span>
        )}
        {isMedication && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200 animate-pulse">
            <Activity className="w-3.5 h-3.5" /> Clinical Dosage Mode
          </span>
        )}
      </div>

      <div className="p-8 space-y-8">
        <AnimatePresence mode="wait">
          {isAbsoluteToxin ? (
            <motion.div
              key="absolute-toxin"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-inner"
            >
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto animate-bounce shadow-md">
                <Skull className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-red-700 uppercase tracking-wide">⚠️ ABSOLUTE TOXIN - NO SAFE DOSE</h4>
                <p className="text-red-800 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  A single {nameLower === 'acetaminophen' ? 'pill' : 'grape, raisin, or macadamia nut'} contains highly variable amounts of active toxins and can trigger sudden kidney failure, liver collapse, or severe neurological shock in {petInfo.plural.toLowerCase()}.
                </p>
              </div>
              
              <div className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl max-w-md mx-auto shadow-md transition-all">
                <p className="font-extrabold text-lg flex items-center justify-center gap-2">
                  <ShieldAlert className="w-5 h-5 animate-pulse" /> CRITICAL EMERGENCY
                </p>
                <p className="text-xs text-red-100 mt-1">Ingestion is considered an immediate clinical emergency. Sliders are locked.</p>
              </div>
              
              <p className="text-xs font-semibold text-red-600/70">
                Please refer to the Veterinary Emergency Hotlines above or immediately drive to your nearest animal ER clinic!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="normal-calc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Unit Toggle Switch */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-3 bg-slate-50 p-1.5 rounded-full border border-slate-100 shadow-inner">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${unit === 'kg' ? 'bg-white text-brand shadow-sm border border-slate-100' : 'text-text-muted'}`} onClick={() => unit !== 'kg' && toggleUnit()}>
                    Kilograms (kg)
                  </span>
                  <button
                    onClick={toggleUnit}
                    className="relative w-12 h-6 bg-brand rounded-full cursor-pointer transition-all focus:ring-2 focus:ring-brand/50 focus:outline-none"
                    aria-label={`Switch to ${unit === 'kg' ? 'pounds' : 'kilograms'}`}
                    role="switch"
                    aria-checked={unit === 'lbs'}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: unit === 'lbs' ? '24px' : '2px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${unit === 'lbs' ? 'bg-white text-brand shadow-sm border border-slate-100' : 'text-text-muted'}`} onClick={() => unit !== 'lbs' && toggleUnit()}>
                    Pounds (lbs)
                  </span>
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <label className="flex items-center justify-between text-sm font-semibold text-text-primary mb-3">
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                      <Scale className="w-4 h-4 text-brand" aria-hidden="true" />
                    </div>
                    Pet's Weight
                  </span>
                  <span className="text-xs font-semibold text-text-muted">Species max: {maxWeight} {unit}</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0.1}
                    step={maxWeightKg < 2 ? 0.05 : 1}
                    max={maxWeight}
                    value={clampedWeight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand"
                    aria-label={`Pet weight: ${clampedWeight} ${unit}`}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{maxWeightKg < 2 ? '0.1' : '1'} {unit}</span>
                    <div className="bg-brand/5 px-4 py-2 rounded-xl border border-brand/10 flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-brand">{clampedWeight}</span>
                      <span className="text-xs font-bold text-brand-dark">{unit}</span>
                      <span className="text-[10px] text-text-muted ml-1.5">
                        ({unit === 'lbs' ? `${activeWeightInKg.toFixed(2)} kg` : `${(clampedWeight * 2.20462).toFixed(1)} lbs`})
                      </span>
                    </div>
                    <span className="text-xs text-text-muted">{maxWeight} {unit}</span>
                  </div>
                </div>
              </div>

              {/* Chocolate Custom Form */}
              {isChocolate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 bg-amber-50/50 p-5 rounded-2xl border border-amber-200/50"
                >
                  <label className="block text-sm font-semibold text-amber-900">
                    🍫 Select Chocolate Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(Object.keys(chocolateFactors) as Array<keyof typeof chocolateFactors>).map((type) => (
                      <button
                        key={type}
                        onClick={() => setChocolateType(type)}
                        className={`px-3 py-2 text-xs font-bold rounded-xl border capitalize transition-all ${
                          chocolateType === type
                            ? 'bg-amber-800 text-white border-amber-800 shadow-md shadow-amber-900/10'
                            : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-100/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <div className="text-[11px] text-amber-700/80 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Theobromine factor: {chocolateFactors[chocolateType]} mg/g ({chocolateType === 'white' ? 'negligible hazard' : chocolateType === 'cocoa' ? 'concentrated high hazard' : 'standard hazard'})</span>
                  </div>
                </motion.div>
              )}

              {/* Medication Custom Form */}
              {isMedication && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-5 bg-purple-50/50 p-5 rounded-2xl border border-purple-200/50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pills slider */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider">
                        💊 Pills Consumed
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={pills}
                        onChange={(e) => setPills(Number(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-full appearance-none cursor-pointer accent-purple-700"
                      />
                      <div className="flex justify-between items-center text-xs font-extrabold text-purple-800">
                        <span>1 Pill</span>
                        <span className="bg-purple-100 px-2.5 py-1 rounded-md">{pills} {pills === 1 ? 'Pill' : 'Pills'}</span>
                        <span>10 Pills</span>
                      </div>
                    </div>

                    {/* Pill strength number input */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider">
                        🧪 Strength per Pill (mg)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min={1}
                          max={2000}
                          value={mgPerPill}
                          onChange={(e) => setMgPerPill(Math.max(1, Number(e.target.value)))}
                          className="w-full px-4 py-2 bg-white border border-purple-200 rounded-xl text-purple-950 font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-bold text-purple-400">mg</span>
                      </div>
                      <p className="text-[10px] text-purple-600/80">Typical adult dose: 200mg, infant dose: 50-100mg.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quantity Input (Hidden for Medication) */}
              {!isMedication && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                    <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                      <Info className="w-4 h-4 text-brand" aria-hidden="true" />
                    </div>
                    Quantity Consumed (grams/ounces)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={250}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand"
                    aria-label={`Quantity consumed: ${quantity} grams`}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-text-muted">1g</span>
                    <div className="bg-brand/5 px-4 py-2 rounded-xl border border-brand/10 flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-brand">{quantity}</span>
                      <span className="text-xs font-bold text-brand-dark">g</span>
                      <span className="text-[10px] text-text-muted ml-1.5">
                        ({(quantity * 0.035274).toFixed(2)} oz)
                      </span>
                    </div>
                    <span className="text-xs text-text-muted">250g</span>
                  </div>
                </div>
              )}

              {/* Toxic Component */}
              {toxicComponent && !isChocolate && !isMedication && (
                <div className="flex items-start gap-4 p-5 bg-danger-light rounded-xl border border-danger/20">
                  <div className="w-10 h-10 bg-danger/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-danger" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-danger-dark">Toxic Component</p>
                    <p className="text-sm text-danger-dark/80 mt-1">{toxicComponent}</p>
                  </div>
                </div>
              )}

              {/* Risk Result */}
              <div 
                className={`rounded-2xl p-6 ${rc.bg} border shadow-sm transition-all`}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-semibold ${rc.text}`}>Estimated Risk Level</span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold ${rc.badge} shadow-sm border`}>
                    {risk.level}
                  </span>
                </div>
                
                {/* Risk Bar */}
                <div className="h-3 bg-white/60 rounded-full overflow-hidden mb-4 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: rc.width }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full ${rc.bar} rounded-full`}
                  />
                </div>
                
                <p className={`text-sm ${rc.text} font-medium leading-relaxed`}>
                  {risk.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-text-muted text-center leading-relaxed">
          ⚠️ <strong>Disclaimer:</strong> This calculator provides clinical estimates based on standardized toxicological databases and should NEVER replace professional veterinary diagnostics. Ingestion response is highly dependent on species, age, and individual health history.
        </p>
      </div>
    </motion.div>
  );
}

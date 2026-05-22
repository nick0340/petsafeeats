import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { getPetData, type FoodItem, type PetType } from '../data/foods';
import { getPetById } from '../data/pets';

interface RelatedFoodsProps {
  foods: FoodItem[];
  pet: PetType;
  onSelect: (food: FoodItem, pet: PetType) => void;
}

export default function RelatedFoods({ foods, pet, onSelect }: RelatedFoodsProps) {
  if (foods.length === 0) return null;

  const safetyConfig = {
    safe: { bg: 'bg-safe-light/30', text: 'text-safe-dark', border: 'border-safe/10', badge: 'bg-safe text-white' },
    caution: { bg: 'bg-caution-light/30', text: 'text-caution-dark', border: 'border-caution/10', badge: 'bg-caution text-white' },
    toxic: { bg: 'bg-danger-light/30', text: 'text-danger-dark', border: 'border-danger/10', badge: 'bg-danger text-white' },
  };

  return (
    <aside 
      className="card-soft rounded-2xl overflow-hidden"
      aria-labelledby="related-title"
    >
      <div className="px-6 py-5 bg-gradient-to-r from-blue-500/5 to-transparent border-b border-slate-100 flex items-center gap-4">
        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <HelpCircle className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 id="related-title" className="font-bold text-text-primary">People Also Asked</h3>
          <p className="text-xs text-text-secondary mt-0.5">Related food safety questions</p>
        </div>
      </div>
      
      <nav className="p-4 space-y-3" aria-label="Related food safety questions">
        {foods.map((food, i) => {
          const data = getPetData(food, pet);
          const sc = safetyConfig[data.safety];
          return (
            <motion.button
              key={food.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => onSelect(food, pet)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border ${sc.border} ${sc.bg} hover:shadow-md transition-all text-left cursor-pointer group`}
              aria-label={`Can ${getPetById(pet).plural.toLowerCase()} eat ${food.name}? - ${data.safety}`}
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{food.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-primary text-sm leading-tight">
                  Can {getPetById(pet).plural.toLowerCase()} eat {food.name.toLowerCase()}?
                </p>
                <p className="text-[11px] text-text-secondary truncate mt-1">{data.summary}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${sc.badge}`}>
                  {data.safety}
                </span>
                <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </div>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}

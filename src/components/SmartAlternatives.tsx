import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { getSafeAlternatives, getPetData, type FoodItem, type PetType } from '../data/foods';
import { getPetById } from '../data/pets';

interface SmartAlternativesProps {
  food: FoodItem;
  pet: PetType;
  onSelect: (food: FoodItem, pet: PetType) => void;
}

export default function SmartAlternatives({ food, pet, onSelect }: SmartAlternativesProps) {
  const alternatives = getSafeAlternatives(food, pet);
  const petInfo = getPetById(pet);
  
  // Only show for toxic or caution foods
  if (getPetData(food, pet).safety === 'safe' || alternatives.length === 0) {
    return null;
  }

  const categoryLabels: Record<string, string> = {
    fruits: 'Fruit',
    vegetables: 'Vegetable',
    meats: 'Protein',
    dairy: 'Dairy',
    grains: 'Grain',
    nuts: 'Nut',
    sweets: 'Sweet Treat',
    seafood: 'Seafood',
    beverages: 'Beverage',
    medications: 'Medicine',
    other: 'Food',
  };

  const categoryLabel = categoryLabels[food.category] || 'Food';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-soft rounded-2xl overflow-hidden"
      aria-labelledby="alternatives-title"
    >
      <div className="px-8 py-6 bg-gradient-to-r from-safe/10 to-transparent border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-safe to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 id="alternatives-title" className="font-bold text-text-primary text-lg">
              Safe {categoryLabel} Alternatives for {petInfo.plural}
            </h3>
            <p className="text-sm text-text-secondary">
              Instead of {food.name.toLowerCase()}, try these {petInfo.name.toLowerCase()}-safe options
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {alternatives.map((alt, i) => (
            <motion.button
              key={alt.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => onSelect(alt, pet)}
              className="card-soft bg-safe-light/30 border-safe/20 rounded-xl p-5 text-center cursor-pointer group"
              aria-label={`${alt.name} is safe for ${petInfo.plural.toLowerCase()} — learn more`}
            >
              <span className="text-4xl block mb-3" aria-hidden="true">{alt.emoji}</span>
              <p className="font-bold text-safe-dark text-sm mb-2">{alt.name}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-safe">
                <CheckCircle className="w-3 h-3" aria-hidden="true" />
                <span>Safe for {petInfo.plural}</span>
              </div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-brand flex items-center justify-center gap-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-xs text-text-muted text-center mt-4">
          💡 These {categoryLabel.toLowerCase()}s are verified safe for {petInfo.plural.toLowerCase()}
        </p>
      </div>
    </motion.section>
  );
}

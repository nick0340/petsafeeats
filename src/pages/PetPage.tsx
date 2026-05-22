import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, AlertTriangle, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SearchBar from '../components/SearchBar';
import NewsletterSignup from '../components/NewsletterSignup';
import AdSlot from '../components/AdSlot';
import { foodDatabase, getPetData, categories, type FoodItem, type PetType } from '../data/foods';
import { getPetById } from '../data/pets';

interface PetPageProps {
  pet: PetType;
  onSelectFood: (food: FoodItem, pet: PetType) => void;
  onNavigate: (page: string, data?: Record<string, string>) => void;
}

export default function PetPage({ pet, onSelectFood, onNavigate }: PetPageProps) {
  const petInfo = getPetById(pet);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pet]);

  const safeFoods = foodDatabase.filter(f => getPetData(f, pet).safety === 'safe');
  const cautionFoods = foodDatabase.filter(f => getPetData(f, pet).safety === 'caution');
  const toxicFoods = foodDatabase.filter(f => getPetData(f, pet).safety === 'toxic');

  const safetyConfig = {
    safe: { bg: 'bg-safe-light/30', border: 'border-safe/10', badge: 'bg-safe text-white', label: 'SAFE' },
    caution: { bg: 'bg-caution-light/30', border: 'border-caution/10', badge: 'bg-caution text-white', label: 'CAUTION' },
    toxic: { bg: 'bg-danger-light/30', border: 'border-danger/10', badge: 'bg-danger text-white', label: 'TOXIC' },
  };

  const renderFoodGrid = (foods: FoodItem[], safety: 'safe' | 'caution' | 'toxic') => {
    const sc = safetyConfig[safety];
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {foods.map((food, i) => (
          <motion.button
            key={food.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.03 * i }}
            whileHover={{ scale: 1.05, y: -4 }}
            onClick={() => onSelectFood(food, pet)}
            className={`card-soft ${sc.bg} rounded-xl p-5 text-center cursor-pointer`}
            aria-label={`${food.name} is ${sc.label.toLowerCase()} for ${petInfo.plural.toLowerCase()}`}
          >
            <span className="text-3xl sm:text-4xl block mb-3" aria-hidden="true">{food.emoji}</span>
            <p className="font-bold text-text-primary text-sm">{food.name}</p>
            <span className={`inline-block mt-3 ${sc.badge} text-xs px-3 py-1.5 rounded-full font-bold`}>
              {sc.label}
            </span>
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Breadcrumbs
        items={[{ label: petInfo.plural }]}
        onNavigate={onNavigate}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-light to-white section-spacing">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${petInfo.color} ${petInfo.colorTo} rounded-2xl flex items-center justify-center shadow-lg`}>
                <span className="text-3xl" aria-hidden="true">{petInfo.emoji}</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary">
              Food Safety Guide for {petInfo.plural}
            </h1>
            <p className="text-text-secondary max-w-[600px] mx-auto mt-5 mb-10">
              Complete database of safe and toxic foods for {petInfo.plural.toLowerCase()}. Search any food to find out instantly.
            </p>
            <SearchBar onSelect={onSelectFood} variant="hero" showTrending={false} />
          </div>
        </div>
      </section>

      <div className="container-main pb-20">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
            <span aria-hidden="true">📂</span> Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('category', { category: cat.id })}
                className="card-soft rounded-xl p-5 text-center cursor-pointer group"
                aria-label={`Browse ${cat.name} foods for ${petInfo.plural.toLowerCase()}`}
              >
                <span className="text-3xl block mb-3" aria-hidden="true">{cat.emoji}</span>
                <p className="font-semibold text-text-primary text-sm flex items-center justify-center gap-1 group-hover:text-brand transition-colors">
                  {cat.name}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Toxic Foods */}
        <section className="mb-16" aria-labelledby="toxic-heading">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-danger" aria-hidden="true" />
            </div>
            <div>
              <h2 id="toxic-heading" className="text-2xl font-bold text-danger-dark">Toxic Foods ({toxicFoods.length})</h2>
              <p className="text-sm text-text-secondary mt-1">Never feed these to your {petInfo.name.toLowerCase()}</p>
            </div>
          </div>
          {renderFoodGrid(toxicFoods, 'toxic')}
        </section>

        <AdSlot variant="inline" />

        {/* Caution Foods */}
        {cautionFoods.length > 0 && (
          <section className="my-16" aria-labelledby="caution-heading">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-caution/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-caution" aria-hidden="true" />
              </div>
              <div>
                <h2 id="caution-heading" className="text-2xl font-bold text-caution-dark">Use Caution ({cautionFoods.length})</h2>
                <p className="text-sm text-text-secondary mt-1">These foods require careful consideration</p>
              </div>
            </div>
            {renderFoodGrid(cautionFoods, 'caution')}
          </section>
        )}

        {/* Safe Foods */}
        <section className="my-16" aria-labelledby="safe-heading">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-safe/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-safe" aria-hidden="true" />
            </div>
            <div>
              <h2 id="safe-heading" className="text-2xl font-bold text-safe-dark">Safe Foods ({safeFoods.length})</h2>
              <p className="text-sm text-text-secondary mt-1">These foods are safe for your {petInfo.name.toLowerCase()} in moderation</p>
            </div>
          </div>
          {renderFoodGrid(safeFoods, 'safe')}
        </section>

        {/* Newsletter */}
        <div className="max-w-2xl mx-auto mt-16">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}

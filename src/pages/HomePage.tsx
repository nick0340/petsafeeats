import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Search as SearchIcon, Users, ArrowRight, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import NewsletterSignup from '../components/NewsletterSignup';
import AdSlot from '../components/AdSlot';
import { foodDatabase, categories, type FoodItem, type PetType } from '../data/foods';
import { allPets } from '../data/pets';

interface HomePageProps {
  onSelectFood: (food: FoodItem, pet: PetType) => void;
  onNavigate: (page: string, data?: Record<string, string>) => void;
}

export default function HomePage({ onSelectFood, onNavigate }: HomePageProps) {
  const toxicFoods = foodDatabase.filter(f => f.pets.dogs.safety === 'toxic' || f.pets.cats.safety === 'toxic');
  const safeFoods = foodDatabase.filter(f => f.pets.dogs.safety === 'safe');

  return (
    <div>
      {/* Hero Section - Centered with proper spacing */}
      <section className="relative bg-gradient-to-b from-brand-light via-white to-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-16 left-[10%] text-7xl opacity-[0.06]">🐕</div>
          <div className="absolute top-32 right-[15%] text-6xl opacity-[0.06]">🐈</div>
          <div className="absolute bottom-24 left-[20%] text-5xl opacity-[0.06]">🍎</div>
          <div className="absolute bottom-16 right-[25%] text-6xl opacity-[0.06]">🥕</div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-safe/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        {/* Hero content - max-width: 800px, centered, section-spacing */}
        <div className="container-main section-spacing">
          <div className="max-w-[800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Trust badge */}
              <div className="flex items-center justify-center mb-6">
                <span className="inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-brand px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm border border-slate-100">
                  <Shield className="w-4 h-4" aria-hidden="true" />
                  Trusted by 10,000+ Pet Parents
                </span>
              </div>

              {/* Main heading - Bold and clear hierarchy */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-[1.1] tracking-tight">
                Can Your Pet Eat
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand via-safe to-brand">
                  That Food? 🤔
                </span>
              </h1>
              
              {/* Subtitle - max-width: 600px, centered */}
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-text-secondary max-w-[600px] mx-auto leading-relaxed">
                Instantly check if any food is <span className="text-safe font-semibold">safe</span> or <span className="text-danger font-semibold">toxic</span> for your dog, cat, rabbit, bird & more. Expert-verified and always free.
              </p>
            </motion.div>

            {/* Search Bar - margin-top: 2.5rem (40px) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10"
            >
              <SearchBar onSelect={onSelectFood} variant="hero" showTrending={true} />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              {[
                { icon: SearchIcon, label: 'Foods Checked', value: '200+' },
                { icon: Users, label: 'Pet Parents', value: '10K+' },
                { icon: Star, label: 'Accuracy Rate', value: '99.9%' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-center w-10 h-10 bg-brand/10 rounded-lg">
                    <stat.icon className="w-5 h-5 text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-text-primary leading-tight">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Perfect 3-column grid with gap-2rem */}
      <section className="bg-white section-spacing">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              How It Works
            </h2>
            <p className="mt-4 text-text-secondary max-w-lg mx-auto">
              Get instant answers about pet food safety in three simple steps
            </p>
          </div>

          {/* 3-column grid: gap-2rem (32px), equal height cards with h-full */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grid-equal-height">
            {[
              {
                icon: SearchIcon,
                title: 'Search Any Food',
                description: 'Type any food name to instantly check if it\'s safe for your beloved pet.',
                color: 'from-blue-500 to-blue-600',
                step: '01',
              },
              {
                icon: Zap,
                title: 'Get Instant Verdict',
                description: 'See a clear green, yellow, or red verdict with detailed safety information.',
                color: 'from-safe to-emerald-600',
                step: '02',
              },
              {
                icon: Heart,
                title: 'Keep Them Safe',
                description: 'Follow our dosage guidelines and emergency protocols to protect your pet.',
                color: 'from-danger to-rose-600',
                step: '03',
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.15 }}
                className="relative card-soft rounded-2xl p-8 h-full flex flex-col"
              >
                {/* Step number */}
                <span className="absolute top-6 right-6 text-5xl font-black text-slate-100">{step.step}</span>
                
                {/* Icon - centered within container */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense-Ready Slot */}
      <div className="container-main py-6">
        <AdSlot variant="banner" />
      </div>

      {/* Browse by Pet — shows all 7 pet types */}
      <section className="bg-slate-50 section-spacing">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">Browse by Pet</h2>
            <p className="mt-4 text-text-secondary">Choose your pet to see food safety guides</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {allPets.map((pet, i) => (
              <motion.button
                key={pet.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('pet', { pet: pet.id })}
                className="card-soft rounded-2xl p-6 text-center cursor-pointer group h-full relative overflow-hidden"
                aria-label={`View food safety guide for ${pet.plural}`}
              >
                {!pet.hasFullData && (
                  <span className="absolute top-3 right-3 text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                    Coming Soon
                  </span>
                )}
                <span className="text-5xl sm:text-6xl block mb-4" aria-hidden="true">{pet.emoji}</span>
                <h3 className="text-lg font-bold text-text-primary flex items-center justify-center gap-1.5">
                  {pet.plural}
                  <ArrowRight className="w-4 h-4 text-brand opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                </h3>
                {pet.hasFullData && (
                  <span className="inline-block mt-3 text-xs font-medium text-brand bg-brand/10 px-3 py-1 rounded-full">
                    {foodDatabase.length}+ foods
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Dangerous Foods Alert */}
      <section className="bg-white section-spacing">
        <div className="container-main">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 bg-danger-light px-5 py-2.5 rounded-full mb-5">
              <AlertTriangle className="w-5 h-5 text-danger" aria-hidden="true" />
              <span className="text-sm font-semibold text-danger-dark">Critical Information</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Most Dangerous Foods
            </h2>
            <p className="mt-4 text-text-secondary max-w-lg mx-auto">These common foods can be deadly for pets — avoid them at all costs</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {toxicFoods.slice(0, 5).map((food, i) => (
              <motion.button
                key={food.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => onSelectFood(food, 'dogs')}
                className="card-soft bg-danger-light/30 border-danger/10 rounded-xl p-6 text-center cursor-pointer"
                aria-label={`${food.name} is toxic - click to learn more`}
              >
                <span className="text-4xl sm:text-5xl block mb-3" aria-hidden="true">{food.emoji}</span>
                <p className="font-bold text-danger-dark text-sm">{food.name}</p>
                <span className="inline-block mt-3 bg-danger text-white text-xs px-3 py-1.5 rounded-full font-bold">
                  ☠️ TOXIC
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center gap-2 bg-safe-light px-5 py-2.5 rounded-full mb-5">
              <CheckCircle className="w-5 h-5 text-safe" aria-hidden="true" />
              <span className="text-sm font-semibold text-safe-dark">Safe Options</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">
              Safe & Healthy Alternatives
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {safeFoods.slice(0, 5).map((food, i) => (
                <motion.button
                  key={food.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  onClick={() => onSelectFood(food, 'dogs')}
                  className="card-soft bg-safe-light/30 border-safe/10 rounded-xl p-6 text-center cursor-pointer"
                  aria-label={`${food.name} is safe - click to learn more`}
                >
                  <span className="text-4xl sm:text-5xl block mb-3" aria-hidden="true">{food.emoji}</span>
                  <p className="font-bold text-safe-dark text-sm">{food.name}</p>
                  <span className="inline-block mt-3 bg-safe text-white text-xs px-3 py-1.5 rounded-full font-bold">
                    ✓ SAFE
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 section-spacing">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">Browse by Category</h2>
            <p className="mt-4 text-text-secondary">Explore food safety by food type</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={() => onNavigate('category', { category: cat.id })}
                className={`card-soft rounded-xl p-5 text-center cursor-pointer group relative overflow-hidden ${
                  cat.isHighRisk ? 'bg-danger-light/30 border-danger/20' : ''
                }`}
                aria-label={`Browse ${cat.name}`}
              >
                {cat.isHighRisk && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full animate-pulse" />
                )}
                <span className="text-3xl sm:text-4xl block mb-3" aria-hidden="true">{cat.emoji}</span>
                <p className={`font-semibold text-sm transition-colors ${
                  cat.isHighRisk 
                    ? 'text-danger-dark group-hover:text-danger' 
                    : 'text-text-primary group-hover:text-brand'
                }`}>
                  {cat.name}
                </p>
                {cat.isHighRisk && (
                  <span className="text-[10px] text-danger-dark bg-danger/10 px-2 py-0.5 rounded-full mt-2 inline-block font-medium">
                    ⚠️ High Risk
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense slot before newsletter */}
      <div className="container-main py-6 bg-white">
        <AdSlot variant="inline" />
      </div>

      {/* Newsletter */}
      <section className="bg-white section-spacing">
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}

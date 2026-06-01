"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BookOpen, Share2, Bookmark, AlertOctagon } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import VerdictCard from '../../components/VerdictCard';
import ToxicityCalculator from '../../components/ToxicityCalculator';
import DosageTable from '../../components/DosageTable';
import EmergencyProtocol from '../../components/EmergencyProtocol';
import FAQSection from '../../components/FAQSection';
import RelatedFoods from '../../components/RelatedFoods';
import SmartAlternatives from '../../components/SmartAlternatives';
import MedicationDisclaimer from '../../components/MedicationDisclaimer';
import AffiliateProductGrid from '../../components/AffiliateProductGrid';
import SidebarEssentials from '../../components/SidebarEssentials';
import PetSwitcher from '../../components/PetSwitcher';
import AdSlot from '../../components/AdSlot';
import NewsletterSignup from '../../components/NewsletterSignup';
import { getFoodBySlug, getRelatedFoods, isMedication, getPetData, generatePetFaqs, type FoodItem, type PetType } from '../../data/foods';
import { getPetById } from '../../data/pets';
import { useCountry } from '../../utils/countryStore';

export default function FoodDetailPage({ params }: { params: { pet: string, food: string } }) {
  const router = useRouter();
  const pet = params.pet as PetType;
  const foodSlug = params.food;
  
  const food = getFoodBySlug(foodSlug);
  
  useEffect(() => {
    if (!food || !getPetById(pet)) {
      router.push('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [food, pet, router]);

  if (!food || !getPetById(pet)) return null;

  const petData = getPetData(food, pet);
  const petInfo = getPetById(pet);
  const relatedFoods = getRelatedFoods(food);
  const isHumanMedication = isMedication(food);
  const { hotlines, flag } = useCountry();

  const petName = petInfo.plural;
  const categoryName = food.category.charAt(0).toUpperCase() + food.category.slice(1);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Can ${petName} Eat ${food.name}? ${petData.safety === 'safe' ? "Yes, It's Safe!" : petData.safety === 'toxic' ? "No, It's Toxic!" : "With Caution"}`,
    description: petData.summary,
    author: { '@type': 'Organization', name: 'PetSafe Eats' },
    publisher: { '@type': 'Organization', name: 'PetSafe Eats' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://petsafeeats.com/can-${pet}-eat-${food.slug}`,
    },
  };

  const faqJsonLd = food.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: food.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // Handler: when the user picks a different pet in the switcher, re-navigate
  const handlePetChange = (newPet: PetType) => {
    router.push(`/can-${newPet}-eat-${food.slug}`);
  };

  // We are missing the onSelectFood prop for components like RelatedFoods.
  // We'll create a local wrapper.
  const handleSelectFood = (selectedFood: FoodItem, selectedPet: PetType) => {
    router.push(`/can-${selectedPet}-eat-${selectedFood.slug}`);
  };

  return (
    <div>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumbs — Home > Pet > Category > Food */}
      <Breadcrumbs
        items={[
          { label: petName, path: `/${pet}` },
          { label: categoryName, path: `/category/${food.category}` },
          { label: food.name },
        ]}
      />

      {/* Medication Disclaimer */}
      {isHumanMedication && (
        <div className="container-main mb-8">
          <MedicationDisclaimer medicationName={food.name} />
        </div>
      )}

      {/* IMMEDIATE ACTION PLAN — toxic non-medication foods */}
      {petData.safety === 'toxic' && petData.emergencySteps && !isHumanMedication && (
        <div className="container-main mb-8">
          <div className="bg-gradient-to-r from-danger to-danger-dark text-white rounded-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center animate-pulse-danger">
                  <AlertOctagon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black">⚠️ IMMEDIATE ACTION PLAN</h2>
                  <p className="text-white/80 text-sm mt-1">
                    If your {petInfo.name.toLowerCase()} ate {food.name.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {hotlines.map((hotline, idx) => (
                  <a
                    key={idx}
                    href={hotline.tel}
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span className="text-2xl" aria-hidden="true">{flag}</span>
                    <div>
                      <p className="font-bold">{hotline.name}</p>
                      <p className="text-white/80 text-sm font-extrabold">{hotline.number}</p>
                      <p className="text-white/60 text-[10px] leading-tight mt-0.5">{hotline.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6 bg-white/10 rounded-xl p-5">
                <p className="font-bold text-lg mb-4">🚨 Do This NOW:</p>
                <ol className="space-y-3">
                  {petData.emergencySteps.slice(0, 3).map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-7 h-7 bg-white text-danger rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                      <span className="text-white/90">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-main pb-20">
        {/* Pet Switcher — all 7 pets, scrollable, same component everywhere */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Is {food.name} safe for…
            </p>
            <PetSwitcher selected={pet} onChange={handlePetChange} size="sm" />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 hover:shadow-md transition-all cursor-pointer flex items-center justify-center" aria-label="Share this page">
              <Share2 className="w-4 h-4 text-text-secondary" aria-hidden="true" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 hover:shadow-md transition-all cursor-pointer flex items-center justify-center" aria-label="Bookmark this page">
              <Bookmark className="w-4 h-4 text-text-secondary" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content — 3 cols on desktop */}
          <div className="lg:col-span-3 space-y-8">
            {/* Verdict Card */}
            <VerdictCard
              foodName={food.name}
              foodEmoji={food.emoji}
              pet={pet}
              safety={petData.safety}
              summary={petData.summary}
            />

            {/* Detailed Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-soft rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-brand" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Detailed Information</h2>
              </div>
              <p className="text-text-secondary leading-relaxed">{petData.details}</p>
            </motion.div>

            {!petInfo.hasFullData && (
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 flex gap-4 items-start animate-fade-in">
                <div className="text-2xl mt-0.5">🔒</div>
                <div>
                  <h4 className="font-bold text-amber-900">Veterinary Database Under Review</h4>
                  <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                    Our team of certified veterinarians is actively reviewing food safety research for {petInfo.plural.toLowerCase()}. Full interactive calculators, safe dosages, and alternative food grids will be unlocked as soon as scientific consensus is published.
                  </p>
                </div>
              </div>
            )}

            {petInfo.hasFullData && (
              <>
                {/* Smart Safe Alternatives — only for toxic/caution */}
                {(petData.safety === 'toxic' || petData.safety === 'caution') && !isHumanMedication && (
                  <SmartAlternatives food={food} pet={pet} onSelect={handleSelectFood} />
                )}

                {/* Mobile: Affiliate Products */}
                {!isHumanMedication && (
                  <div className="lg:hidden">
                    <AffiliateProductGrid petType={pet} foodCategory={food.category} />
                  </div>
                )}

                <AdSlot variant="inline" />

                {/* Emergency Protocol */}
                {(petData.safety === 'toxic' || (petData.safety === 'caution' && petData.symptoms)) && petData.emergencySteps && petData.symptoms && (
                  <EmergencyProtocol
                    foodName={food.name}
                    symptoms={petData.symptoms}
                    timeToSymptoms={petData.timeToSymptoms}
                    emergencySteps={petData.emergencySteps}
                  />
                )}

                {/* Dosage Table */}
                {petData.dosage && !isHumanMedication && (
                  <DosageTable dosage={petData.dosage} foodName={food.name} />
                )}

                {/* Toxicity Calculator */}
                <ToxicityCalculator
                  foodName={food.name}
                  safety={petData.safety}
                  toxicComponent={petData.toxicComponent}
                  selectedPet={pet}
                  isMedication={isHumanMedication}
                />

                {/* FAQs — dynamically generated for the selected pet */}
                <FAQSection
                  faqs={generatePetFaqs(food, pet, petInfo.plural, petInfo.name)}
                  foodName={food.name}
                  petType={petName}
                />

                {/* Desktop: Affiliate Products */}
                {!isHumanMedication && (
                  <div className="hidden lg:block">
                    <AffiliateProductGrid petType={pet} foodCategory={food.category} />
                  </div>
                )}
              </>
            )}

            {/* Newsletter — mobile */}
            <div className="lg:hidden">
              <NewsletterSignup />
            </div>
          </div>

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block space-y-8">
            <SidebarEssentials />
            {!isHumanMedication && petInfo.hasFullData && (
              <RelatedFoods foods={relatedFoods} pet={pet} onSelect={handleSelectFood} />
            )}
            <AdSlot variant="sidebar" />
            <NewsletterSignup />
          </aside>
        </div>
      </div>
    </div>
  );
}

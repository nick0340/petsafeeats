import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  foodName: string;
  petType: string;
}

export default function FAQSection({ faqs, foodName, petType }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section 
      className="card-soft rounded-2xl overflow-hidden"
      aria-labelledby="faq-title"
    >
      <div className="px-8 py-6 bg-gradient-to-r from-purple-500/5 to-transparent border-b border-slate-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <HelpCircle className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 id="faq-title" className="font-bold text-text-primary text-lg">Frequently Asked Questions</h3>
          <p className="text-sm text-text-secondary">
            Common questions about {petType.toLowerCase()} and {foodName.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-8 py-5 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="font-semibold text-text-primary text-sm pr-4">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center"
              >
                <ChevronDown className="w-5 h-5 text-text-muted" aria-hidden="true" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  id={`faq-answer-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <div className="bg-slate-50 rounded-xl p-5 border-l-4 border-brand">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* JSON-LD FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

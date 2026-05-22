import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, ChevronDown, ExternalLink } from 'lucide-react';
import { foodDatabase, getPetData, type FoodItem, type PetType } from '../data/foods';
import { getPetById, allPets } from '../data/pets';
import { essentialProducts, dogProducts, catProducts, type AffiliateProduct } from '../data/affiliateProducts';
import { countryStore } from '../utils/countryStore';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  affiliateCard?: AffiliateProduct;
  foodCard?: { food: FoodItem; pet: PetType };
  timestamp: Date;
}

// ─── Local search helpers ────────────────────────────────────────────────────

function searchLocalFood(query: string): FoodItem | undefined {
  const q = query.toLowerCase();
  return foodDatabase.find(f =>
    q.includes(f.name.toLowerCase()) || q.includes(f.slug)
  );
}

function findAffiliateProduct(query: string, pet: PetType): AffiliateProduct | undefined {
  const q = query.toLowerCase();
  const isProductQuery = /treat|food|toy|kit|balm|gear|buy|recommend|product|shop|essential|emergency kit/i.test(q);
  if (!isProductQuery) return undefined;

  const isEmergency = /emergency|first aid|poison/i.test(q);
  if (isEmergency) return essentialProducts[0]; // Pet First Aid Kit

  const pool = pet === 'cats' ? catProducts : dogProducts;
  // Match by keyword
  const matched = pool.find(p =>
    q.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()) ||
    p.tags.some(t => q.includes(t.toLowerCase()))
  );
  return matched || pool[0];
}

function detectPetInQuery(query: string, fallback: PetType): PetType {
  const q = query.toLowerCase();
  for (const p of allPets) {
    if (q.includes(p.name.toLowerCase()) || q.includes(p.plural.toLowerCase())) {
      return p.id;
    }
  }
  return fallback;
}

// ─── Gemini response with offline fallback ──────────────────────────────────

async function generateResponse(
  query: string,
  selectedPet: PetType,
): Promise<{ text: string; food?: FoodItem; pet?: PetType; affiliate?: AffiliateProduct }> {
  const pet = detectPetInQuery(query, selectedPet);
  const petInfo = getPetById(pet);

  // Step 1: Search local database first (always prefer structured verified local data)
  const food = searchLocalFood(query);

  if (food) {
    const data = getPetData(food, pet);
    const safetyEmoji = data.safety === 'safe' ? '✅' : data.safety === 'caution' ? '⚠️' : '🚫';

    let response = `${safetyEmoji} **${food.name}** is **${data.safety.toUpperCase()}** for ${petInfo.plural.toLowerCase()}.\n\n${data.summary}`;

    if (data.safety === 'toxic' && data.emergencySteps) {
      const activeHotlines = countryStore.getHotlines();
      response += `\n\n🚨 **If your ${petInfo.name.toLowerCase()} already ate this**, contact your vet or the emergency line immediately:`;
      activeHotlines.forEach(h => {
        response += `\n📞 **${h.name}:** ${h.number}`;
      });
    }

    if (data.dosage) {
      response += `\n\n📏 **Safe dosage:** Small: ${data.dosage.small} · Medium: ${data.dosage.medium} · Large: ${data.dosage.large}`;
    }

    return { text: response, food, pet };
  }

  // Step 2: Check for affiliate / product queries
  const affiliate = findAffiliateProduct(query, pet);
  if (affiliate) {
    return {
      text: `Great question! Based on your ${petInfo.name.toLowerCase()}'s needs, I'd recommend the **${affiliate.name}**. It's rated ${affiliate.rating}⭐ by ${affiliate.reviews} pet parents and is ${affiliate.isPrime ? 'eligible for Prime shipping' : 'available on Amazon'}.\n\n${affiliate.description}`,
      affiliate,
    };
  }

  const q = query.toLowerCase();

  // Step 3: Check for emergency queries
  if (/emergency|poison|ate something|help/i.test(q)) {
    const activeHotlines = countryStore.getHotlines();
    let response = `🚨 **If this is an emergency, please call your local poison control line immediately:**\n\n`;
    activeHotlines.forEach(h => {
      response += `📞 **${h.name}:** ${h.number} (${h.description})\n`;
    });
    response += `\nDo NOT wait for symptoms to appear. Do NOT induce vomiting unless directed by a vet. Note what your ${petInfo.name.toLowerCase()} ate, the quantity, and when it occurred.`;
    return {
      text: response,
      affiliate: essentialProducts[0],
    };
  }

  // Step 4: Check for general help queries
  if (/how.*(use|work|tool)/i.test(q)) {
    return {
      text: `Happy to help! Here's how to use PetSafe Eats:\n\n1️⃣ **Select your pet** from the tabs at the top (Dog, Cat, Rabbit, etc.)\n2️⃣ **Search any food** in the search bar\n3️⃣ **Get an instant verdict** — Safe ✅, Caution ⚠️, or Toxic 🚫\n4️⃣ **Check the dosage table** for safe amounts\n5️⃣ **Use the toxicity calculator** by entering your pet's weight\n\nYou can also browse by category or ask me anything right here! 🐾`,
    };
  }

  // Step 5: Live Gemini API Query with Offline Fallback
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    try {
      const systemPrompt = `You are an expert Pet Nutritionist powered by PetSafe Eats.
You provide safe, medically conservative advice regarding what foods pets can eat.

CRITICAL RULES:
1. Prioritize "Safety First". If a dangerous or toxic item is mentioned, urge the user to contact a veterinarian immediately.
2. If the user mentions a food that is toxic, suggest they consider essential safety products like the Pet First Aid Kit or Activated Emergency Charcoal from their affiliate options.
3. The user's active country is ${countryStore.getCurrentName()} ${countryStore.getCurrentFlag()}.
   The localized emergency hotlines for this country are:
   ${countryStore.getHotlines().map(h => `- ${h.name}: ${h.number} (${h.description})`).join('\n')}
   If there is a toxicity concern or emergency, ALWAYS display these exact numbers clearly!
4. Keep your responses concise (under 3-4 short paragraphs), professional, and highly reassuring but clear about safety risks.
5. Emphasize that human foods should be introduced carefully, and when in doubt, veterinary consultation is the best course of action.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: query }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 400,
          },
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const isHighRisk = /toxic|poison|danger|emergency|deadly|fatality|harmful/i.test(text.toLowerCase());
          return {
            text,
            affiliate: isHighRisk ? essentialProducts[0] : undefined,
          };
        }
      }
    } catch (e) {
      console.error('Gemini API call failed, falling back to local engine', e);
    }
  }

  // Step 6: Local Offline Fallback
  return {
    text: `As a pet nutrition expert, here's what I know about "${query}" for ${petInfo.plural.toLowerCase()}:\n\nI don't have this specific item in my verified database yet, so I'd recommend consulting your veterinarian for a definitive answer. When in doubt, it's always safer to avoid feeding unfamiliar foods to your ${petInfo.name.toLowerCase()}.\n\n💡 **Tip:** Try searching for common foods like "grapes", "chicken", or "chocolate" to see detailed safety reports.`,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

interface ChatAssistantProps {
  currentPet: PetType;
}

export default function ChatAssistant({ currentPet }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const petInfo = getPetById(currentPet);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasUnread(false);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await generateResponse(text, currentPet);

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: result.text,
        affiliateCard: result.affiliate,
        foodCard: result.food && result.pet ? { food: result.food, pet: result.pet } : undefined,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMsg]);
      if (!isOpen) setHasUnread(true);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I had trouble processing that. Please try again or search directly on the site.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [currentPet, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const chips = [
    { label: '🚨 Is this an emergency?', query: 'Is this an emergency? My pet ate something bad' },
    { label: `🍖 Safe treats for my ${petInfo.name}`, query: `Find safe treats for my ${petInfo.name.toLowerCase()}` },
    { label: '❓ How to use this tool?', query: 'How do I use this tool?' },
  ];

  return (
    <>
      {/* ── Floating Action Button ─────────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-brand to-safe text-white rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:shadow-2xl group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        style={{ boxShadow: '0 8px 30px rgba(15,118,110,0.35)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sparkles className="w-6 h-6 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
            1
          </span>
        )}
      </motion.button>

      {/* ── Chat Window ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
            style={{ maxHeight: '500px', boxShadow: '0 25px 60px rgba(0,0,0,0.18)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand to-brand-dark text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">PetSafe Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
                    <span className="text-[11px] text-white/70">Online · Powered by AI</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4" style={{ minHeight: '200px' }}>
              {/* Welcome message */}
              {messages.length === 0 && !isTyping && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-brand" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100 max-w-[85%]">
                      <p className="text-sm text-text-primary leading-relaxed">
                        Hi there! 🐾 I'm your <strong>PetSafe Assistant</strong>. I can help you check if a food is safe for your {petInfo.name.toLowerCase()}, find treats, or guide you through an emergency.
                      </p>
                      <p className="text-xs text-text-muted mt-2">Ask me anything or tap a suggestion below:</p>
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-2 pl-11">
                    {chips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => sendMessage(chip.query)}
                        className="px-3.5 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-text-secondary hover:border-brand hover:text-brand hover:shadow-md transition-all cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === 'user'
                      ? 'bg-brand text-white'
                      : 'bg-brand/10'
                  }`}>
                    {msg.role === 'user'
                      ? <User className="w-4 h-4" />
                      : <Bot className="w-4 h-4 text-brand" />
                    }
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'items-end' : ''}`}>
                    <div className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-brand text-white rounded-2xl rounded-tr-md'
                        : 'bg-white text-text-primary rounded-2xl rounded-tl-md border border-slate-100'
                    }`}>
                      {/* Render markdown-like bold */}
                      {msg.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                          {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                            part.startsWith('**') && part.endsWith('**')
                              ? <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>
                              : <span key={j}>{part}</span>
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Food verdict card */}
                    {msg.foodCard && (
                      <div className={`rounded-xl border p-3 text-xs ${
                        getPetData(msg.foodCard.food, msg.foodCard.pet).safety === 'safe'
                          ? 'bg-safe-light border-safe/20'
                          : getPetData(msg.foodCard.food, msg.foodCard.pet).safety === 'caution'
                          ? 'bg-caution-light border-caution/20'
                          : 'bg-danger-light border-danger/20'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{msg.foodCard.food.emoji}</span>
                          <div>
                            <p className="font-bold text-text-primary">{msg.foodCard.food.name}</p>
                            <p className="text-text-secondary capitalize">{getPetData(msg.foodCard.food, msg.foodCard.pet).safety} for {getPetById(msg.foodCard.pet).plural.toLowerCase()}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Affiliate card */}
                    {msg.affiliateCard && (
                      <a
                        href={msg.affiliateCard.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-brand/30 transition-all"
                      >
                        <span className="text-2xl">{msg.affiliateCard.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-text-primary truncate">{msg.affiliateCard.name}</p>
                          <p className="text-[11px] text-text-muted">{msg.affiliateCard.price} · ⭐ {msg.affiliateCard.rating}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                      </a>
                    )}

                    {/* Timestamp */}
                    <p className={`text-[10px] text-text-muted ${msg.role === 'user' ? 'text-right' : ''}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-brand" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-brand/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-brand/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-brand/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-text-muted">PetSafe Assistant is thinking…</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 bg-white border-t border-slate-100 flex items-center gap-2 flex-shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about any food for your ${petInfo.name.toLowerCase()}…`}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 placeholder:text-text-muted transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-gradient-to-br from-brand to-safe text-white rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

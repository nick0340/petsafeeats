import { useRef, useEffect, useState, useCallback } from 'react';
import { allPets } from '../data/pets';
import type { PetType } from '../data/foods';

interface PetSwitcherProps {
  selected: PetType;
  onChange: (pet: PetType) => void;
  size?: 'sm' | 'md';
}

export default function PetSwitcher({ selected, onChange, size = 'md' }: PetSwitcherProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tabWidth, setTabWidth] = useState(0);

  const isSmall = size === 'sm';

  // Measure widest button once and force all buttons to that width
  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const buttons = el.querySelectorAll<HTMLElement>('[data-pet]');
    let max = 0;
    // Temporarily remove fixed width so natural width can be measured
    buttons.forEach((b) => { b.style.width = 'auto'; });
    buttons.forEach((b) => { max = Math.max(max, b.offsetWidth); });
    if (max > 0) setTabWidth(max);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, size]);

  // Scroll selected tab into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const btn = el.querySelector(`[data-pet="${selected}"]`) as HTMLElement | null;
    if (btn) {
      btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [selected]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
      role="tablist"
      aria-label="Select pet type"
    >
      {allPets.map((pet) => {
        const isActive = selected === pet.id;
        return (
          <button
            key={pet.id}
            data-pet={pet.id}
            onClick={() => onChange(pet.id)}
            role="tab"
            aria-selected={isActive}
            aria-label={pet.plural}
            style={tabWidth > 0 ? { width: tabWidth, minWidth: tabWidth } : undefined}
            className={`
              flex items-center justify-center gap-1.5 rounded-full font-semibold
              transition-all cursor-pointer whitespace-nowrap flex-shrink-0
              ${isSmall ? 'py-2 text-xs' : 'py-2.5 text-sm'}
              ${isActive
                ? `bg-gradient-to-r ${pet.color} ${pet.colorTo} text-white shadow-lg`
                : 'bg-white text-text-secondary hover:bg-slate-50 hover:shadow-md border border-slate-100'
              }
            `}
          >
            <span className={isSmall ? 'text-base' : 'text-lg'} aria-hidden="true">{pet.emoji}</span>
            <span>{pet.plural}</span>
            {!pet.hasFullData && !isActive && (
              <span className="text-[8px] bg-amber-100 text-amber-700 px-1 py-0.5 rounded-full font-bold leading-none ml-0.5">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, TrendingUp, AlertCircle } from 'lucide-react';
import { foodDatabase, getPetData, type FoodItem, type PetType } from '../data/foods';
import PetSwitcher from './PetSwitcher';
import { getPetById } from '../data/pets';

interface SearchBarProps {
  onSelect: (food: FoodItem, pet: PetType) => void;
  variant?: 'hero' | 'sticky';
  showTrending?: boolean;
}

const trendingSearches = [
  { name: 'Grapes', emoji: '🍇', slug: 'grapes' },
  { name: 'Chocolate', emoji: '🍫', slug: 'chocolate' },
  { name: 'Chicken', emoji: '🍗', slug: 'chicken' },
  { name: 'Xylitol', emoji: '🍬', slug: 'xylitol' },
  { name: 'Avocado', emoji: '🥑', slug: 'avocado' },
];

export default function SearchBar({ onSelect, variant = 'hero', showTrending = true }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetType>('dogs');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Real-time filtering with case insensitivity
  const performSearch = useCallback((searchQuery: string) => {
    if (!getPetById(selectedPet).hasFullData) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const trimmedQuery = searchQuery.trim().toLowerCase();
    
    if (trimmedQuery.length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // Search through all foods - case insensitive
    const found = foodDatabase.filter(food => {
      const nameMatch = food.name.toLowerCase().includes(trimmedQuery);
      const categoryMatch = food.category.toLowerCase().includes(trimmedQuery);
      const slugMatch = food.slug.toLowerCase().includes(trimmedQuery);
      return nameMatch || categoryMatch || slugMatch;
    });

    // Sort results: exact matches first, then partial matches
    found.sort((a, b) => {
      const aExact = a.name.toLowerCase() === trimmedQuery;
      const bExact = b.name.toLowerCase() === trimmedQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      const aStarts = a.name.toLowerCase().startsWith(trimmedQuery);
      const bStarts = b.name.toLowerCase().startsWith(trimmedQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      return a.name.localeCompare(b.name);
    });

    setResults(found);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, []);

  // Handle input change with real-time filtering
  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          handleSelectFood(results[highlightedIndex]);
        } else if (results.length === 1) {
          handleSelectFood(results[0]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Handle food selection
  const handleSelectFood = (food: FoodItem) => {
    if (!getPetById(selectedPet).hasFullData) return;
    onSelect(food, selectedPet);
    setQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle trending click
  const handleTrendingClick = (slug: string) => {
    if (!getPetById(selectedPet).hasFullData) return;
    const food = foodDatabase.find(f => f.slug === slug);
    if (food) {
      handleSelectFood(food);
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const safetyColor = (safety: string) => {
    switch (safety) {
      case 'safe': return 'bg-safe/10 text-safe-dark border border-safe/20';
      case 'caution': return 'bg-caution/10 text-caution-dark border border-caution/20';
      case 'toxic': return 'bg-danger/10 text-danger-dark border border-danger/20';
      default: return '';
    }
  };

  const isHero = variant === 'hero';

  return (
    <div ref={containerRef} className="relative w-full max-w-[600px] mx-auto">
      {/* Multi-Pet Selector — horizontally scrollable, same on desktop & mobile */}
      {/* Hidden in the sticky variant to save space */}
      {isHero && (
        <div className="mb-5">
          <PetSwitcher selected={selectedPet} onChange={setSelectedPet} size="md" />
        </div>
      )}

      {/* Search Input */}
      <div 
        className={`relative flex items-center bg-white rounded-full search-glow transition-all ${
          !getPetById(selectedPet).hasFullData ? 'opacity-65 bg-slate-50 border-slate-200' : ''
        } ${
          isHero
            ? 'border-2 border-slate-100'
            : 'border border-slate-200'
        }`}
      >
        <div className={`${isHero ? 'ml-6' : 'ml-4'} flex items-center justify-center`}>
          <Search 
            className={`${isHero ? 'w-5 h-5' : 'w-4 h-4'} text-text-muted`}
            aria-hidden="true"
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          disabled={!getPetById(selectedPet).hasFullData}
          placeholder={
            getPetById(selectedPet).hasFullData 
              ? `Can ${getPetById(selectedPet).plural.toLowerCase()} eat...`
              : `Searches locked: ${getPetById(selectedPet).plural.toLowerCase()} database under review 🔒`
          }
          className={`w-full bg-transparent outline-none text-text-primary placeholder:text-text-muted font-medium ${
            !getPetById(selectedPet).hasFullData ? 'cursor-not-allowed text-text-muted' : ''
          } ${
            isHero
              ? 'px-4 py-5 text-lg'         /* hero: tall & large */
              : 'px-3 py-2.5 text-sm'        /* sticky: compact */
          }`}
          aria-label={`Search if ${selectedPet} can eat a food`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-results"
          aria-activedescendant={highlightedIndex >= 0 ? `result-${highlightedIndex}` : undefined}
          role="combobox"
          autoComplete="off"
        />
        {query && getPetById(selectedPet).hasFullData && (
          <button
            onClick={handleClear}
            className={`${isHero ? 'mr-5 p-2' : 'mr-3 p-1.5'} rounded-full hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center`}
            aria-label="Clear search"
          >
            <X className={`${isHero ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-text-muted`} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Trending Searches - Chips */}
      {showTrending && isHero && !isOpen && getPetById(selectedPet).hasFullData && (
        <div className="mt-6 animate-fade-in">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="flex items-center justify-center gap-1.5 text-xs text-text-muted font-medium">
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              Trending:
            </span>
            {trendingSearches.map((item) => (
              <button
                key={item.slug}
                onClick={() => handleTrendingClick(item.slug)}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-full text-xs font-medium text-text-secondary hover:text-text-primary hover:shadow-md transition-all cursor-pointer"
                aria-label={`Check if ${selectedPet} can eat ${item.name}`}
              >
                <span aria-hidden="true">{item.emoji}</span>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div 
          id="search-results"
          className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in-up"
          role="listbox"
          aria-label="Search results"
        >
          <div className="p-2 max-h-80 overflow-y-auto">
            {results.map((food, index) => {
              const petData = getPetData(food, selectedPet);
              const isHighlighted = index === highlightedIndex;
              return (
                <button
                  key={food.id}
                  id={`result-${index}`}
                  onClick={() => handleSelectFood(food)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-colors text-left cursor-pointer ${
                    isHighlighted ? 'bg-slate-50' : 'hover:bg-slate-50'
                  }`}
                  role="option"
                  aria-selected={isHighlighted}
                >
                  <span className="text-3xl flex-shrink-0" aria-hidden="true">{food.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary">
                      Can {getPetById(selectedPet).plural.toLowerCase()} eat {food.name.toLowerCase()}?
                    </p>
                    <p className="text-sm text-text-secondary truncate mt-0.5">{petData.summary}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase flex-shrink-0 ${safetyColor(petData.safety)}`}>
                    {petData.safety}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results State */}
      {isOpen && query.length > 0 && results.length === 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center z-50 animate-fade-in"
          role="alert"
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-slate-50 rounded-full">
            <AlertCircle className="w-8 h-8 text-text-muted" aria-hidden="true" />
          </div>
          <p className="font-semibold text-text-primary text-lg">Food not found</p>
          <p className="text-sm text-text-secondary mt-2 max-w-xs mx-auto">
            We haven't analyzed "<span className="font-medium">{query}</span>" yet. Please consult a vet or try another search.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-text-muted">Try searching for: grapes, chicken, chocolate, or blueberries</p>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import HomePage from './pages/HomePage';
import FoodDetailPage from './pages/FoodDetailPage';
import PetPage from './pages/PetPage';
import AllFoodsPage from './pages/AllFoodsPage';
import SearchBar from './components/SearchBar';
import { getFoodBySlug, getPetData, type FoodItem, type PetType } from './data/foods';
import { getPetById } from './data/pets';

interface AppState {
  page: string;
  data: Record<string, string>;
  food?: FoodItem;
  pet?: PetType;
}

// Parse URL path for programmatic SEO routing
function parseUrl(): AppState {
  const path = window.location.pathname;
  
  // Match /can-[pet]-eat-[food]
  const petFoodMatch = path.match(/\/can-([a-z-]+)-eat-([a-z-]+)/);
  if (petFoodMatch) {
    const pet = petFoodMatch[1] as PetType;
    const foodSlug = petFoodMatch[2];
    const food = getFoodBySlug(foodSlug);
    if (food) {
      return { page: 'food-detail', data: {}, food, pet };
    }
  }
  
  // Match /[pet-type]
  const petMatch = path.match(/^\/(dogs|cats|rabbits|guinea-pigs|hamsters|birds|bearded-dragons)$/);
  if (petMatch) {
    return { page: 'pet', data: { pet: petMatch[1] }, pet: petMatch[1] as PetType };
  }
  
  // Match /foods
  if (path === '/foods') {
    return { page: 'foods', data: {} };
  }
  
  // Match /category/[category]
  const categoryMatch = path.match(/\/category\/([a-z]+)/);
  if (categoryMatch) {
    return { page: 'category', data: { category: categoryMatch[1] } };
  }
  
  return { page: 'home', data: {} };
}

// Build URL for navigation
function buildUrl(page: string, data?: Record<string, string>, food?: FoodItem, pet?: PetType): string {
  if (page === 'food-detail' && food && pet) {
    return `/can-${pet}-eat-${food.slug}`;
  }
  if (page === 'pet' && data?.pet) {
    return `/${data.pet}`;
  }
  if (page === 'foods') {
    return '/foods';
  }
  if (page === 'category' && data?.category) {
    return `/category/${data.category}`;
  }
  return '/';
}

export default function App() {
  const [state, setState] = useState<AppState>(() => parseUrl());
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Handle popstate for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setState(parseUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle scroll for mobile sticky search
  useEffect(() => {
    const handleScroll = () => {
      if (state.page === 'home') {
        setShowMobileSearch(window.scrollY > 400);
      } else {
        setShowMobileSearch(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state.page]);

  const handleNavigate = useCallback((page: string, data?: Record<string, string>) => {
    const newState = { page, data: data || {}, food: undefined, pet: undefined };
    setState(newState);
    
    const url = buildUrl(page, data);
    window.history.pushState(null, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectFood = useCallback((food: FoodItem, pet: PetType) => {
    const newState = { page: 'food-detail', data: {}, food, pet };
    setState(newState);
    
    const url = buildUrl('food-detail', {}, food, pet);
    window.history.pushState(null, '', url);
    
    // Update document title for SEO
    const petName = getPetById(pet).plural;
    const safetyVerdict = getPetData(food, pet).safety === 'safe' ? 'Yes!' : getPetData(food, pet).safety === 'toxic' ? 'No!' : 'Maybe...';
    document.title = `Can ${petName} Eat ${food.name}? ${safetyVerdict} | PetSafe Eats`;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update title on page change
  useEffect(() => {
    if (state.page === 'home') {
      document.title = 'PetSafe Eats - Can Your Pet Eat That? | Pet Food Safety Guide';
    } else if (state.page === 'pet') {
      const petName = getPetById((state.data.pet || 'dogs') as PetType).plural;
      document.title = `Food Safety Guide for ${petName} | PetSafe Eats`;
    } else if (state.page === 'foods' || state.page === 'category') {
      document.title = 'All Foods - Pet Food Safety Database | PetSafe Eats';
    }
  }, [state.page, state.data]);

  const renderPage = () => {
    switch (state.page) {
      case 'home':
        return (
          <HomePage
            onSelectFood={handleSelectFood}
            onNavigate={handleNavigate}
          />
        );
      case 'food-detail':
        if (state.food && state.pet) {
          return (
            <FoodDetailPage
              food={state.food}
              pet={state.pet}
              onSelectFood={handleSelectFood}
              onNavigate={handleNavigate}
            />
          );
        }
        return <HomePage onSelectFood={handleSelectFood} onNavigate={handleNavigate} />;
      case 'pet':
        return (
          <PetPage
            pet={(state.data.pet as PetType) || 'dogs'}
            onSelectFood={handleSelectFood}
            onNavigate={handleNavigate}
          />
        );
      case 'foods':
        return (
          <AllFoodsPage
            onSelectFood={handleSelectFood}
            onNavigate={handleNavigate}
          />
        );
      case 'category':
        return (
          <AllFoodsPage
            onSelectFood={handleSelectFood}
            onNavigate={handleNavigate}
            initialCategory={state.data.category}
          />
        );
      default:
        return <HomePage onSelectFood={handleSelectFood} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-lexend flex flex-col">
      <Header onNavigate={handleNavigate} currentPage={state.page} />
      
      {/* Mobile Sticky Search - compact, only on homepage when scrolled */}
      {showMobileSearch && (
        <div className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-lg px-3 py-2 md:hidden animate-slide-down">
          <SearchBar onSelect={handleSelectFood} variant="sticky" showTrending={false} />
        </div>
      )}

      <main className="flex-1" role="main">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* AI Chat Assistant — sticky on all pages */}
      <ChatAssistant currentPet={(state.pet || (state.data.pet as PetType) || 'dogs')} />
    </div>
  );
}

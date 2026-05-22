export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  emoji: string;
  rating: number;
  reviews: string;
  amazonUrl: string;
  isPrime: boolean;
  category: 'treats' | 'gear' | 'health' | 'essentials' | 'food';
  petType: 'dogs' | 'cats' | 'both';
  tags: string[];
}

// Recommended products for dogs
export const dogProducts: AffiliateProduct[] = [
  {
    id: 'dog-1',
    name: 'Blue Buffalo Life Protection Formula',
    description: 'Natural adult dry dog food with real chicken & brown rice, high-quality protein',
    price: '$54.98',
    originalPrice: '$64.99',
    image: '🦴',
    emoji: '🦴',
    rating: 4.7,
    reviews: '142,300+',
    amazonUrl: '#',
    isPrime: true,
    category: 'food',
    petType: 'dogs',
    tags: ['Best Seller', 'Natural'],
  },
  {
    id: 'dog-2',
    name: 'Wellness CORE Grain-Free Dog Food',
    description: 'High protein, grain-free dry food with deboned turkey & chicken',
    price: '$62.99',
    originalPrice: '$72.99',
    image: '🥩',
    emoji: '🥩',
    rating: 4.6,
    reviews: '28,500+',
    amazonUrl: '#',
    isPrime: true,
    category: 'food',
    petType: 'dogs',
    tags: ['Grain-Free', 'High Protein'],
  },
  {
    id: 'dog-3',
    name: 'Greenies Original Dental Dog Treats',
    description: 'Natural dental treats that fight plaque and tartar for fresh breath',
    price: '$29.98',
    originalPrice: '$34.99',
    image: '🪥',
    emoji: '🪥',
    rating: 4.8,
    reviews: '185,200+',
    amazonUrl: '#',
    isPrime: true,
    category: 'treats',
    petType: 'dogs',
    tags: ['Top Rated', 'Dental Health'],
  },
  {
    id: 'dog-4',
    name: 'KONG Classic Dog Toy',
    description: 'Durable rubber toy for fetch, chew, and treat-stuffing for hours of fun',
    price: '$14.99',
    image: '🎾',
    emoji: '🎾',
    rating: 4.8,
    reviews: '98,400+',
    amazonUrl: '#',
    isPrime: true,
    category: 'gear',
    petType: 'dogs',
    tags: ['Best Seller', 'Durable'],
  },
  {
    id: 'dog-5',
    name: 'Zuke\'s Mini Naturals Training Treats',
    description: 'Soft, small training treats with real chicken - perfect for training',
    price: '$12.99',
    image: '🍖',
    emoji: '🍖',
    rating: 4.7,
    reviews: '45,600+',
    amazonUrl: '#',
    isPrime: true,
    category: 'treats',
    petType: 'dogs',
    tags: ['Training', 'Low Calorie'],
  },
  {
    id: 'dog-6',
    name: 'Milk-Bone MaroSnacks Dog Treats',
    description: 'Tasty treats with real bone marrow for a flavor dogs love',
    price: '$8.99',
    image: '🦴',
    emoji: '🦴',
    rating: 4.6,
    reviews: '67,800+',
    amazonUrl: '#',
    isPrime: true,
    category: 'treats',
    petType: 'dogs',
    tags: ['Value Pack', 'Crunchy'],
  },
];

// Recommended products for cats
export const catProducts: AffiliateProduct[] = [
  {
    id: 'cat-1',
    name: 'Purina Fancy Feast Gourmet Wet Food',
    description: 'Gourmet wet cat food variety pack with real seafood and poultry',
    price: '$24.99',
    originalPrice: '$29.99',
    image: '🐟',
    emoji: '🐟',
    rating: 4.7,
    reviews: '131,400+',
    amazonUrl: '#',
    isPrime: true,
    category: 'food',
    petType: 'cats',
    tags: ['Best Seller', 'Variety Pack'],
  },
  {
    id: 'cat-2',
    name: 'Blue Buffalo Tastefuls Indoor Cat Food',
    description: 'Natural indoor adult dry cat food with real chicken',
    price: '$31.98',
    originalPrice: '$36.99',
    image: '🍗',
    emoji: '🍗',
    rating: 4.5,
    reviews: '22,800+',
    amazonUrl: '#',
    isPrime: true,
    category: 'food',
    petType: 'cats',
    tags: ['Indoor Formula', 'Natural'],
  },
  {
    id: 'cat-3',
    name: 'Greenies Feline SmartBites Treats',
    description: 'Healthy cat treats for skin & fur with salmon flavor',
    price: '$8.49',
    image: '🐱',
    emoji: '🐱',
    rating: 4.6,
    reviews: '32,100+',
    amazonUrl: '#',
    isPrime: true,
    category: 'treats',
    petType: 'cats',
    tags: ['Skin & Coat', 'Salmon'],
  },
  {
    id: 'cat-4',
    name: 'Temptations Classic Cat Treats',
    description: 'Crunchy outside, soft inside treats cats can\'t resist',
    price: '$14.99',
    originalPrice: '$17.99',
    image: '😺',
    emoji: '😺',
    rating: 4.8,
    reviews: '156,200+',
    amazonUrl: '#',
    isPrime: true,
    category: 'treats',
    petType: 'cats',
    tags: ['Top Rated', 'Irresistible'],
  },
  {
    id: 'cat-5',
    name: 'PetSafe ScoopFree Self-Cleaning Litter Box',
    description: 'Automatic self-cleaning litter box with disposable trays',
    price: '$169.95',
    image: '🚽',
    emoji: '🚽',
    rating: 4.3,
    reviews: '28,900+',
    amazonUrl: '#',
    isPrime: true,
    category: 'gear',
    petType: 'cats',
    tags: ['Self-Cleaning', 'Premium'],
  },
  {
    id: 'cat-6',
    name: 'Catit Senses 2.0 Food Tree',
    description: 'Interactive slow feeder that stimulates natural hunting instincts',
    price: '$19.99',
    image: '🌳',
    emoji: '🌳',
    rating: 4.4,
    reviews: '12,300+',
    amazonUrl: '#',
    isPrime: true,
    category: 'gear',
    petType: 'cats',
    tags: ['Interactive', 'Slow Feeder'],
  },
];

// Essential products for both pets (sidebar)
export const essentialProducts: AffiliateProduct[] = [
  {
    id: 'ess-1',
    name: 'Pet First Aid Kit',
    description: 'Complete 75-piece first aid kit for dogs and cats with vet-approved supplies',
    price: '$29.99',
    image: '🩹',
    emoji: '🩹',
    rating: 4.8,
    reviews: '15,200+',
    amazonUrl: '#',
    isPrime: true,
    category: 'essentials',
    petType: 'both',
    tags: ['Emergency', 'Must-Have'],
  },
  {
    id: 'ess-2',
    name: 'Musher\'s Secret Paw Balm',
    description: 'All-natural paw protection wax for hot pavement, snow, and rough terrain',
    price: '$18.99',
    image: '🐾',
    emoji: '🐾',
    rating: 4.7,
    reviews: '42,100+',
    amazonUrl: '#',
    isPrime: true,
    category: 'health',
    petType: 'both',
    tags: ['Paw Care', 'All-Natural'],
  },
  {
    id: 'ess-3',
    name: 'Pet MD Ear Cleaner Wipes',
    description: 'Gentle ear cleansing wipes that remove wax and debris, alcohol-free',
    price: '$12.99',
    image: '👂',
    emoji: '👂',
    rating: 4.6,
    reviews: '28,700+',
    amazonUrl: '#',
    isPrime: true,
    category: 'health',
    petType: 'both',
    tags: ['Ear Care', 'Gentle'],
  },
  {
    id: 'ess-4',
    name: 'Vet\'s Best Enzymatic Toothpaste',
    description: 'Natural toothpaste for dogs and cats with fresh breath formula',
    price: '$9.99',
    image: '🦷',
    emoji: '🦷',
    rating: 4.5,
    reviews: '35,400+',
    amazonUrl: '#',
    isPrime: true,
    category: 'health',
    petType: 'both',
    tags: ['Dental Care', 'Enzymatic'],
  },
  {
    id: 'ess-5',
    name: 'Activated Charcoal for Pets',
    description: 'Emergency toxin absorber - consult vet before use',
    price: '$14.99',
    image: '⚫',
    emoji: '⚫',
    rating: 4.4,
    reviews: '8,900+',
    amazonUrl: '#',
    isPrime: true,
    category: 'essentials',
    petType: 'both',
    tags: ['Emergency', 'Vet Recommended'],
  },
];

// Get products by pet type
export function getProductsByPetType(petType: 'dogs' | 'cats'): AffiliateProduct[] {
  return petType === 'dogs' ? dogProducts : catProducts;
}

// Get essential products
export function getEssentialProducts(): AffiliateProduct[] {
  return essentialProducts;
}

// Get recommended products based on food category
export function getRecommendedProducts(
  petType: 'dogs' | 'cats',
  foodCategory?: string,
  limit: number = 6
): AffiliateProduct[] {
  const products = getProductsByPetType(petType);
  
  // If food category is provided, prioritize relevant products
  if (foodCategory) {
    const categoryMap: Record<string, string[]> = {
      'fruits': ['treats', 'food'],
      'vegetables': ['treats', 'food'],
      'meats': ['food', 'treats'],
      'sweets': ['treats', 'health'],
      'medications': ['essentials', 'health'],
    };
    
    const relevantCategories = categoryMap[foodCategory] || ['treats', 'food'];
    const sorted = [...products].sort((a, b) => {
      const aRelevant = relevantCategories.includes(a.category) ? 0 : 1;
      const bRelevant = relevantCategories.includes(b.category) ? 0 : 1;
      return aRelevant - bRelevant;
    });
    
    return sorted.slice(0, limit);
  }
  
  return products.slice(0, limit);
}

import { motion } from 'framer-motion';
import { ExternalLink, Star, Truck, ShieldCheck, Tag } from 'lucide-react';
import { getRecommendedProducts, type AffiliateProduct } from '../data/affiliateProducts';

interface AffiliateProductGridProps {
  petType: string;
  foodCategory?: string;
}

export default function AffiliateProductGrid({ petType, foodCategory }: AffiliateProductGridProps) {
  const safePetType = (petType === 'cats' ? 'cats' : 'dogs') as 'dogs' | 'cats';
  const products = getRecommendedProducts(safePetType, foodCategory, 6);

  return (
    <section className="mt-12" aria-labelledby="recommended-products-title">
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 
              id="recommended-products-title" 
              className="text-2xl sm:text-3xl font-bold text-text-primary"
            >
              🛒 Highly Recommended Treats & Gear
            </h2>
            <p className="text-text-secondary mt-2">
              Vet-approved products for your {petType === 'dogs' ? 'dog' : 'cat'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-safe" />
            <span>Affiliate links support our free service</span>
          </div>
        </div>
      </div>

      {/* Product Grid - 3 columns on desktop, 2 on tablet, 1-2 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
        <span className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-prime" />
          Free Prime Shipping
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-safe" />
          Vet Recommended
        </span>
        <span className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amazon fill-amazon" />
          Top Rated Products
        </span>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: AffiliateProduct;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.a
      href={product.amazonUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="affiliate-card rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer group"
      aria-label={`${product.name} - ${product.price} on Amazon`}
    >
      {/* Product Image Area */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center min-h-[140px]">
        <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </span>
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full text-text-primary border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Prime Badge */}
        {product.isPrime && (
          <div className="absolute top-3 right-3 bg-prime text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            <Truck className="w-3 h-3" />
            Prime
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-amazon fill-amazon'
                    : 'text-slate-200 fill-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-primary">{product.rating}</span>
          <span className="text-xs text-text-muted">({product.reviews})</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-text-primary leading-tight mb-2 line-clamp-2 group-hover:text-brand transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-text-primary">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-text-muted line-through">{product.originalPrice}</span>
          )}
          {product.originalPrice && (
            <span className="bg-danger-light text-danger-dark text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Save
            </span>
          )}
        </div>

        {/* CTA Button */}
        <button className="w-full btn-amazon py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 group-hover:shadow-lg transition-all">
          View on Amazon
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.a>
  );
}

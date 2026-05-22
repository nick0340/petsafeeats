import { motion } from 'framer-motion';
import { ExternalLink, Star, Truck, Package, ShieldCheck } from 'lucide-react';
import { getEssentialProducts, type AffiliateProduct } from '../data/affiliateProducts';

export default function SidebarEssentials() {
  const products = getEssentialProducts();

  return (
    <aside 
      className="hidden lg:block card-soft rounded-2xl overflow-hidden"
      aria-labelledby="essentials-title"
    >
      <div className="px-5 py-4 bg-gradient-to-r from-brand/5 to-transparent border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center shadow-md">
            <Package className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 id="essentials-title" className="font-bold text-text-primary">Pet Essentials</h3>
            <p className="text-xs text-text-secondary">Must-have items</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {products.slice(0, 4).map((product, index) => (
          <EssentialCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Trust badge */}
      <div className="px-4 pb-4 pt-1">
        <div className="flex items-center justify-center gap-2 text-xs text-text-muted bg-slate-50 rounded-lg py-2">
          <ShieldCheck className="w-3.5 h-3.5 text-safe" />
          <span>Vet-approved products</span>
        </div>
      </div>
    </aside>
  );
}

interface EssentialCardProps {
  product: AffiliateProduct;
  index: number;
}

function EssentialCard({ product, index }: EssentialCardProps) {
  return (
    <motion.a
      href={product.amazonUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="block p-3 rounded-xl border border-slate-100 hover:border-brand/30 hover:shadow-lg bg-white transition-all group"
      aria-label={`${product.name} - ${product.price}`}
    >
      <div className="flex items-start gap-3">
        {/* Product Image */}
        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <span className="text-2xl">{product.emoji}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Tags */}
          <div className="flex items-center gap-1.5 mb-1">
            {product.isPrime && (
              <span className="bg-prime/10 text-prime text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Truck className="w-2.5 h-2.5" />
                Prime
              </span>
            )}
            {product.tags[0] && (
              <span className="bg-safe/10 text-safe-dark text-[9px] font-semibold px-1.5 py-0.5 rounded">
                {product.tags[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <p className="font-semibold text-sm text-text-primary leading-tight line-clamp-2 group-hover:text-brand transition-colors">
            {product.name}
          </p>

          {/* Rating & Price */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amazon fill-amazon" />
              <span className="text-xs font-semibold text-text-primary">{product.rating}</span>
            </div>
            <span className="text-sm font-bold text-brand">{product.price}</span>
          </div>
        </div>
      </div>

      {/* View button on hover */}
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-brand flex items-center justify-center gap-1 bg-brand/5 rounded-lg py-1.5">
          View on Amazon <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </motion.a>
  );
}

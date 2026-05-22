import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  page?: string;
  data?: Record<string, string>;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: string, data?: Record<string, string>) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  // JSON-LD for breadcrumbs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://petsafeeats.com/',
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.page && { item: `https://petsafeeats.com/${item.page}` }),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className="container-main py-5 overflow-x-auto scrollbar-hide"
      >
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center justify-center gap-2 text-text-muted hover:text-brand transition-colors cursor-pointer px-2 py-1.5 rounded-lg hover:bg-slate-50"
              aria-label="Go to home page"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" aria-hidden="true" />
              {item.page ? (
                <button
                  onClick={() => onNavigate(item.page!, item.data)}
                  className="text-text-muted hover:text-brand transition-colors cursor-pointer px-2 py-1.5 rounded-lg hover:bg-slate-50 whitespace-nowrap"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-text-primary font-medium px-2 py-1.5 whitespace-nowrap" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

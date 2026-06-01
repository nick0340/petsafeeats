"use client";

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
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
        ...(item.path && { item: `https://petsafeeats.com${item.path}` }),
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
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-text-muted hover:text-brand transition-colors cursor-pointer px-2 py-1.5 rounded-lg hover:bg-slate-50"
              aria-label="Go to home page"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" aria-hidden="true" />
              {item.path ? (
                <Link
                  href={item.path}
                  className="text-text-muted hover:text-brand transition-colors cursor-pointer px-2 py-1.5 rounded-lg hover:bg-slate-50 whitespace-nowrap"
                >
                  {item.label}
                </Link>
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

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, PawPrint, Heart, ChevronRight } from 'lucide-react';
import { useCountry, type CountryCode } from '../utils/countryStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { country, setCountry } = useCountry();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container-main">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0"
            aria-label="PetSafe Eats Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-safe to-brand rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <PawPrint className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg font-bold text-text-primary leading-tight tracking-tight">
                PetSafe<span className="text-safe">Eats</span>
              </span>
              <span className="text-[10px] text-text-muted font-medium -mt-0.5 hidden sm:block">Pet Food Safety Guide</span>
            </div>
          </Link>

          {/* Desktop Nav — clean: just All Foods */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className={`flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                pathname === '/'
                  ? 'bg-brand/10 text-brand'
                  : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'
              }`}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>
            <Link
              href="/foods"
              className={`flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                pathname === '/foods'
                  ? 'bg-brand/10 text-brand'
                  : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'
              }`}
              aria-current={pathname === '/foods' ? 'page' : undefined}
            >
              All Foods
            </Link>
          </nav>

          {/* Right side: CTA + mobile hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Country Selector dropdown */}
            <div className="relative inline-block text-left">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-text-primary pl-2.5 pr-7 py-1.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/30 cursor-pointer shadow-sm transition-all"
                aria-label="Select emergency hotline region"
              >
                <option value="US">🇺🇸 US</option>
                <option value="UK">🇬🇧 UK</option>
                <option value="CA">🇨🇦 CA</option>
                <option value="AU">🇦🇺 AU</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-text-muted">
                <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            <Link
              href="/"
              className="hidden sm:flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-safe text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              aria-label="Save a Pet"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span>Save a Pet</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — simple links only */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-100 bg-white animate-slide-down"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container-main py-3 space-y-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'All Foods', path: '/foods' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  pathname === item.path ? 'bg-brand/10 text-brand' : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'
                }`}
              >
                {item.label}
                <ChevronRight className="w-4 h-4 opacity-40" aria-hidden="true" />
              </Link>
            ))}
            
            {/* Mobile Country Selector */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-slate-100 mt-2">
              <span className="text-xs font-semibold text-text-secondary">Hotline Region:</span>
              <div className="relative inline-block text-left">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as CountryCode)}
                  className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-text-primary pl-2.5 pr-7 py-1.5 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer shadow-sm transition-all"
                  aria-label="Select Country"
                >
                  <option value="US">🇺🇸 US</option>
                  <option value="UK">🇬🇧 UK</option>
                  <option value="CA">🇨🇦 CA</option>
                  <option value="AU">🇦🇺 AU</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-text-muted">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-safe text-white px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer"
              >
                <Heart className="w-4 h-4" aria-hidden="true" />
                Save a Pet
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

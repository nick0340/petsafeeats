"use client";

import React from 'react';
import Link from 'next/link';
import { PawPrint, Heart, Shield, Mail, Phone } from 'lucide-react';
import { useCountry, type CountryCode } from '../utils/countryStore';
import AdSlot from './AdSlot';

export default function Footer() {
  const { country, setCountry } = useCountry();

  // Dynamic hotlines object base on country selection
  const hotlines: Record<CountryCode, { name: string; number: string; link: string }> = {
    US: { name: "Pet Poison Helpline", number: "(855) 764-7661", link: "tel:+18557647661" },
    UK: { name: "VPIS United Kingdom", number: "01202 509000", link: "tel:+441202509000" },
    CA: { name: "Pet Poison Helpline CA", number: "(855) 764-7661", link: "tel:+18557647661" },
    AU: { name: "Animal Poisons Helpline", number: "1300 869 738", link: "tel:+611300869738" }
  };

  const activeHotline = hotlines[country] || hotlines['US'];

  return (
    <footer className="bg-text-primary text-white mt-20" role="contentinfo">
      {/* AdSense slot in footer */}
      <div className="border-b border-white/10">
        <div className="container-main py-8">
          <AdSlot variant="banner" />
        </div>
      </div>

      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-5 cursor-pointer group text-left inline-flex"
              aria-label="PetSafe Eats Home"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-safe to-brand rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <PawPrint className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">
                PetSafe<span className="text-safe">Eats</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Your trusted resource for pet food safety. Expert-verified information to keep your furry friends safe and healthy.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Veterinarian reviewed content</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Dogs', path: '/dogs' },
                { label: 'Cats', path: '/cats' },
                { label: 'All Foods', path: '/foods' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className="text-sm text-white/60 hover:text-safe transition-colors cursor-pointer text-left inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular Searches */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">Popular Searches</h4>
            <ul className="space-y-3">
              {[
                'Can dogs eat grapes?',
                'Can cats eat chocolate?',
                'Can dogs eat chicken?',
                'Can cats eat tuna?',
              ].map(q => (
                <li key={q}>
                  <span className="text-sm text-white/60">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">Emergency Hotlines</h4>
            
            {/* Country Selector dropdown */}
            <div className="relative inline-block text-left mb-4">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                className="appearance-none bg-white/10 hover:bg-white/20 border border-white/10 text-white pl-2.5 pr-7 py-1.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safe/30 cursor-pointer transition-all"
                aria-label="Select emergency hotline region"
              >
                <option value="US">🇺🇸 US</option>
                <option value="UK">🇬🇧 UK</option>
                <option value="CA">🇨🇦 CA</option>
                <option value="AU">🇦🇺 AU</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-white/60">
                <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            <ul className="space-y-3">
              <li>
                <span className="text-xs text-white/40 block mb-1">{activeHotline.name}</span>
                <a 
                  href={activeHotline.link} 
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-safe font-bold transition-colors"
                  aria-label={`Call ${activeHotline.name}`}
                >
                  <Phone className="w-4 h-4 text-red-400" aria-hidden="true" />
                  <span>{activeHotline.number}</span>
                </a>
              </li>
              <li className="pt-2">
                <a 
                  href="mailto:hello@petsafeeats.com" 
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-safe transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} PetSafe Eats. All rights reserved. Not a substitute for veterinary advice.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" aria-hidden="true" /> for pet parents everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
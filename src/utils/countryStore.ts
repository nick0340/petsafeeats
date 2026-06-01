"use client";

import { useState, useEffect } from 'react';

export type CountryCode = 'US' | 'UK' | 'CA' | 'AU';

export interface HotlineInfo {
  name: string;
  number: string;
  tel: string;
  description: string;
}

export const countryDetails: Record<CountryCode, { name: string; flag: string; hotlines: HotlineInfo[] }> = {
  US: {
    name: 'United States',
    flag: '🇺🇸',
    hotlines: [
      {
        name: 'Pet Poison Helpline',
        number: '(855) 764-7661',
        tel: 'tel:+18557647661',
        description: '24/7 expert assistance (consultation fee applies)',
      },
      {
        name: 'ASPCA Poison Control',
        number: '(888) 426-4435',
        tel: 'tel:+18884264435',
        description: 'ASPCA 24-hour emergency animal poison hotline',
      },
    ],
  },
  CA: {
    name: 'Canada',
    flag: '🇨🇦',
    hotlines: [
      {
        name: 'Pet Poison Helpline',
        number: '(855) 764-7661',
        tel: 'tel:+18557647661',
        description: '24/7 expert assistance (consultation fee applies)',
      },
      {
        name: 'ASPCA Poison Control',
        number: '(888) 426-4435',
        tel: 'tel:+18884264435',
        description: '24-hour emergency veterinary toxicologists',
      },
    ],
  },
  UK: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    hotlines: [
      {
        name: 'Animal PoisonLine',
        number: '01202 509000',
        tel: 'tel:+441202509000',
        description: '24/7 triage service for UK pet owners (fees apply)',
      },
    ],
  },
  AU: {
    name: 'Australia',
    flag: '🇦🇺',
    hotlines: [
      {
        name: 'Animal Poisons Helpline',
        number: '1300 869 738',
        tel: 'tel:+611300869738',
        description: 'Free, registered charity-run 24/7 poisoning service',
      },
    ],
  },
};

// Automatic detection of user's region
function detectUserCountry(): CountryCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('London') || tz.includes('Europe/London')) return 'UK';
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Australia')) return 'AU';
    if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Canada')) return 'CA';

    const lang = navigator.language || '';
    if (lang.endsWith('GB') || lang.startsWith('en-GB')) return 'UK';
    if (lang.endsWith('AU') || lang.startsWith('en-AU')) return 'AU';
    if (lang.endsWith('CA') || lang.startsWith('en-CA')) return 'CA';
  } catch (e) {
    // Ignore timezone retrieval errors
  }
  return 'US';
}

// Simple state management pub-sub pattern
let currentCountry: CountryCode = (() => {
  try {
    const saved = localStorage.getItem('petsafe-selected-country');
    if (saved && (saved === 'US' || saved === 'UK' || saved === 'CA' || saved === 'AU')) {
      return saved as CountryCode;
    }
  } catch {}
  return detectUserCountry();
})();

const listeners = new Set<(country: CountryCode) => void>();

export const countryStore = {
  getCountry(): CountryCode {
    return currentCountry;
  },
  
  setCountry(country: CountryCode) {
    if (country === currentCountry) return;
    currentCountry = country;
    try {
      localStorage.setItem('petsafe-selected-country', country);
    } catch {}
    listeners.forEach(listener => listener(currentCountry));
  },
  
  subscribe(listener: (country: CountryCode) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getHotlines(): HotlineInfo[] {
    return countryDetails[currentCountry].hotlines;
  },

  getCurrentFlag(): string {
    return countryDetails[currentCountry].flag;
  },

  getCurrentName(): string {
    return countryDetails[currentCountry].name;
  }
};

export function useCountry() {
  const [country, setCountryState] = useState<CountryCode>(() => countryStore.getCountry());
  
  useEffect(() => {
    return countryStore.subscribe((newCountry) => {
      setCountryState(newCountry);
    });
  }, []);
  
  return {
    country,
    setCountry: (newCountry: CountryCode) => countryStore.setCountry(newCountry),
    hotlines: countryDetails[country].hotlines,
    flag: countryDetails[country].flag,
    name: countryDetails[country].name,
  };
}

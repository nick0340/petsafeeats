import type { PetType } from './foods';

export interface PetDefinition {
  id: PetType;
  name: string;
  plural: string;
  emoji: string;
  color: string;          // tailwind gradient from
  colorTo: string;        // tailwind gradient to
  bgLight: string;        // light background
  hasFullData: boolean;    // whether we have full food data for this pet
  maxWeightKg: number;    // biological maximum weight in kg
  defaultWeightKg: number; // typical average weight in kg
}

export const allPets: PetDefinition[] = [
  {
    id: 'dogs',
    name: 'Dog',
    plural: 'Dogs',
    emoji: '🐕',
    color: 'from-amber-500',
    colorTo: 'to-orange-600',
    bgLight: 'bg-amber-50',
    hasFullData: true,
    maxWeightKg: 80,
    defaultWeightKg: 10,
  },
  {
    id: 'cats',
    name: 'Cat',
    plural: 'Cats',
    emoji: '🐈',
    color: 'from-purple-500',
    colorTo: 'to-violet-600',
    bgLight: 'bg-purple-50',
    hasFullData: true,
    maxWeightKg: 12,
    defaultWeightKg: 5,
  },
  {
    id: 'rabbits',
    name: 'Rabbit',
    plural: 'Rabbits',
    emoji: '🐇',
    color: 'from-pink-400',
    colorTo: 'to-rose-500',
    bgLight: 'bg-pink-50',
    hasFullData: false,
    maxWeightKg: 5,
    defaultWeightKg: 2,
  },
  {
    id: 'guinea-pigs',
    name: 'Guinea Pig',
    plural: 'Guinea Pigs',
    emoji: '🐹',
    color: 'from-orange-400',
    colorTo: 'to-amber-500',
    bgLight: 'bg-orange-50',
    hasFullData: false,
    maxWeightKg: 1.5,
    defaultWeightKg: 1,
  },
  {
    id: 'hamsters',
    name: 'Hamster',
    plural: 'Hamsters',
    emoji: '🐹',
    color: 'from-yellow-400',
    colorTo: 'to-amber-500',
    bgLight: 'bg-yellow-50',
    hasFullData: false,
    maxWeightKg: 0.3,
    defaultWeightKg: 0.15,
  },
  {
    id: 'birds',
    name: 'Bird',
    plural: 'Birds',
    emoji: '🦜',
    color: 'from-sky-400',
    colorTo: 'to-blue-500',
    bgLight: 'bg-sky-50',
    hasFullData: false,
    maxWeightKg: 1.5,
    defaultWeightKg: 0.3,
  },
  {
    id: 'bearded-dragons',
    name: 'Bearded Dragon',
    plural: 'Bearded Dragons',
    emoji: '🦎',
    color: 'from-lime-500',
    colorTo: 'to-green-600',
    bgLight: 'bg-lime-50',
    hasFullData: false,
    maxWeightKg: 0.8,
    defaultWeightKg: 0.4,
  },
];

export function getPetById(id: PetType): PetDefinition {
  return allPets.find(p => p.id === id) || allPets[0];
}

export function getPetsWithData(): PetDefinition[] {
  return allPets.filter(p => p.hasFullData);
}

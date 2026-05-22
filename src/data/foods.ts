export type SafetyLevel = 'safe' | 'caution' | 'toxic';
export type PetType = 'dogs' | 'cats' | 'rabbits' | 'guinea-pigs' | 'hamsters' | 'birds' | 'bearded-dragons';
export type FoodCategory = 'fruits' | 'vegetables' | 'meats' | 'dairy' | 'grains' | 'nuts' | 'sweets' | 'seafood' | 'beverages' | 'medications' | 'other';

export interface DosageInfo {
  small: string; // <10kg / <22lbs
  medium: string; // 10-25kg / 22-55lbs
  large: string; // >25kg / >55lbs
}

export interface FoodItem {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  category: FoodCategory;
  isMedication?: boolean;
  pets: {
    dogs: {
      safety: SafetyLevel;
      summary: string;
      details: string;
      toxicComponent?: string;
      symptoms?: string[];
      dosage?: DosageInfo;
      timeToSymptoms?: string;
      emergencySteps?: string[];
    };
    cats: {
      safety: SafetyLevel;
      summary: string;
      details: string;
      toxicComponent?: string;
      symptoms?: string[];
      dosage?: DosageInfo;
      timeToSymptoms?: string;
      emergencySteps?: string[];
    };
  };
  alternatives: string[];
  faqs: { question: string; answer: string }[];
}

export const foodDatabase: FoodItem[] = [
  {
    id: '1',
    name: 'Grapes',
    slug: 'grapes',
    emoji: '🍇',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Grapes are extremely toxic to dogs and can cause acute kidney failure.',
        details: 'Even a small amount of grapes or raisins can be fatal to dogs. The exact toxic substance in grapes hasn\'t been identified, but it can cause rapid kidney failure. All types of grapes (red, green, seedless, with seeds, commercial, or homegrown) are equally dangerous. Raisins, currants, and grape juice are also toxic.',
        toxicComponent: 'Unknown compound (tartaric acid suspected)',
        symptoms: ['Vomiting', 'Diarrhea', 'Lethargy', 'Loss of appetite', 'Abdominal pain', 'Decreased urination', 'Kidney failure'],
        timeToSymptoms: '6-12 hours',
        emergencySteps: [
          'Do NOT wait for symptoms to appear',
          'Call your veterinarian or Pet Poison Helpline (855-764-7661) immediately',
          'Do NOT induce vomiting unless directed by a vet',
          'Bring the packaging or a sample of the grapes to the vet',
          'Your pet may need IV fluids and kidney monitoring for 48-72 hours'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Grapes are toxic to cats and can cause kidney damage.',
        details: 'While cats are less likely to eat grapes than dogs, they are equally susceptible to grape toxicity. Even a single grape can potentially cause kidney failure in cats. All grape products including raisins and currants should be kept away from cats.',
        toxicComponent: 'Unknown compound (tartaric acid suspected)',
        symptoms: ['Vomiting', 'Diarrhea', 'Lethargy', 'Decreased urination', 'Kidney failure'],
        timeToSymptoms: '6-24 hours',
        emergencySteps: [
          'Contact your veterinarian immediately',
          'Do NOT induce vomiting unless directed by a vet',
          'Monitor for signs of kidney distress',
          'Emergency IV fluids may be required'
        ],
      },
    },
    alternatives: ['blueberries', 'watermelon', 'apples', 'bananas', 'strawberries'],
    faqs: [
      { question: 'How many grapes are toxic to dogs?', answer: 'There is no known safe amount. Even a single grape can potentially cause kidney failure in some dogs. The toxic dose varies between individual dogs and is unpredictable.' },
      { question: 'What about raisins?', answer: 'Raisins are even more dangerous than grapes because they are concentrated. They contain the same toxic substance in a more concentrated form.' },
      { question: 'My dog ate a grape, what should I do?', answer: 'Contact your veterinarian or the Pet Poison Helpline immediately, even if your dog seems fine. Early treatment dramatically improves outcomes.' },
    ],
  },
  {
    id: '2',
    name: 'Blueberries',
    slug: 'blueberries',
    emoji: '🫐',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Blueberries are a safe and healthy superfood for dogs, packed with antioxidants.',
        details: 'Blueberries are one of the best fruit treats for dogs. They are low in calories and high in fiber, vitamin C, vitamin K, and antioxidants. The small size makes them a perfect training treat. Frozen blueberries make an excellent summer treat.',
        dosage: {
          small: '5-8 blueberries per day',
          medium: '8-12 blueberries per day',
          large: '12-20 blueberries per day',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Blueberries are safe for cats in moderation and provide beneficial antioxidants.',
        details: 'Cats can safely eat blueberries as an occasional treat. While cats are obligate carnivores and don\'t need fruit, blueberries can be a healthy low-calorie snack. Cut them in half to prevent choking.',
        dosage: {
          small: '2-3 blueberries per day',
          medium: '3-5 blueberries per day',
          large: '5-8 blueberries per day',
        },
      },
    },
    alternatives: ['strawberries', 'raspberries', 'watermelon', 'apples'],
    faqs: [
      { question: 'Can dogs eat blueberries every day?', answer: 'Yes, blueberries can be given daily as part of a balanced diet. However, treats should make up no more than 10% of your dog\'s daily caloric intake.' },
      { question: 'Are frozen blueberries safe for dogs?', answer: 'Yes! Frozen blueberries are a great summer treat. Just be mindful of the quantity and ensure they are plain without added sugars.' },
    ],
  },
  {
    id: '3',
    name: 'Chocolate',
    slug: 'chocolate',
    emoji: '🍫',
    category: 'sweets',
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Chocolate is highly toxic to dogs. Dark chocolate and baking chocolate are the most dangerous.',
        details: 'Chocolate contains theobromine and caffeine, both of which are toxic to dogs. Dogs metabolize theobromine much more slowly than humans. The darker and more bitter the chocolate, the more dangerous it is. Baker\'s chocolate and dark chocolate contain the highest levels of theobromine. White chocolate has minimal theobromine but is still unhealthy due to fat and sugar content.',
        toxicComponent: 'Theobromine and Caffeine',
        symptoms: ['Vomiting', 'Diarrhea', 'Rapid breathing', 'Increased heart rate', 'Seizures', 'Muscle tremors', 'Heart failure'],
        timeToSymptoms: '2-12 hours',
        emergencySteps: [
          'Note the type and amount of chocolate consumed',
          'Call your vet or Pet Poison Helpline (855-764-7661) immediately',
          'Do NOT induce vomiting unless instructed by a veterinarian',
          'Bring chocolate packaging to the vet for theobromine calculation',
          'Treatment may include induced vomiting, activated charcoal, and IV fluids'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Chocolate is toxic to cats due to theobromine and caffeine.',
        details: 'Cats are even more sensitive to theobromine than dogs. Fortunately, cats rarely eat chocolate due to their inability to taste sweetness. However, if ingested, even small amounts can be dangerous.',
        toxicComponent: 'Theobromine and Caffeine',
        symptoms: ['Vomiting', 'Diarrhea', 'Rapid breathing', 'Muscle tremors', 'Seizures'],
        timeToSymptoms: '2-12 hours',
        emergencySteps: [
          'Contact your veterinarian immediately',
          'Note the type and estimated amount consumed',
          'Do NOT induce vomiting unless directed by a vet',
          'Monitor for symptoms over the next 12 hours'
        ],
      },
    },
    alternatives: ['carob-treats', 'peanut-butter', 'bananas', 'apples'],
    faqs: [
      { question: 'How much chocolate is toxic to dogs?', answer: 'It depends on the type. As little as 1 ounce of dark chocolate per pound of body weight can be lethal. Milk chocolate is toxic at about 1 ounce per pound. White chocolate is least toxic but still harmful.' },
      { question: 'What type of chocolate is most dangerous?', answer: 'Baking chocolate and dark chocolate are the most dangerous, containing 130-450mg of theobromine per ounce. Milk chocolate contains about 44-58mg per ounce.' },
    ],
  },
  {
    id: '4',
    name: 'Chicken',
    slug: 'chicken',
    emoji: '🍗',
    category: 'meats',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Cooked, boneless chicken is an excellent protein source for dogs.',
        details: 'Plain cooked chicken (boiled, baked, or grilled) without seasoning is one of the best protein sources for dogs. It\'s highly digestible and often used in bland diets for dogs with upset stomachs. Always remove bones, skin, and avoid using garlic, onion, or heavy seasonings. Never feed raw chicken due to salmonella risk.',
        dosage: {
          small: '30-50g per meal',
          medium: '50-100g per meal',
          large: '100-200g per meal',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Cooked chicken is safe and nutritious for cats as they are obligate carnivores.',
        details: 'Chicken is an excellent protein source for cats. As obligate carnivores, cats thrive on animal protein. Serve it plain, cooked, and boneless. Avoid raw chicken due to bacteria risk. Remove the skin and any seasoning.',
        dosage: {
          small: '20-30g per meal',
          medium: '30-50g per meal',
          large: '50-80g per meal',
        },
      },
    },
    alternatives: ['turkey', 'salmon', 'lean-beef'],
    faqs: [
      { question: 'Can dogs eat raw chicken?', answer: 'While some advocate for raw diets, the FDA and most veterinarians advise against raw chicken due to Salmonella and other bacterial contamination risks.' },
      { question: 'Can dogs eat chicken bones?', answer: 'Never give dogs cooked chicken bones as they can splinter and cause choking, internal injuries, or blockages. Raw bones are less likely to splinter but still carry risks.' },
    ],
  },
  {
    id: '5',
    name: 'Onions',
    slug: 'onions',
    emoji: '🧅',
    category: 'vegetables',
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Onions are toxic to dogs and can cause hemolytic anemia.',
        details: 'All parts of the onion plant are toxic to dogs, including the flesh, leaves, juice, and processed powders. Onions contain N-propyl disulfide, which damages red blood cells, leading to hemolytic anemia. This applies to all forms: raw, cooked, fried, powdered, or dehydrated. Garlic, leeks, chives, and shallots are also in the Allium family and equally toxic.',
        toxicComponent: 'N-propyl disulfide (thiosulfate)',
        symptoms: ['Lethargy', 'Weakness', 'Pale gums', 'Fainting', 'Reddish/brown urine', 'Decreased appetite', 'Elevated heart rate'],
        timeToSymptoms: '1-3 days',
        emergencySteps: [
          'Contact your vet even if a small amount was consumed',
          'Symptoms may take days to appear — don\'t wait',
          'Blood tests may be needed to check for anemia',
          'Treatment may include blood transfusion in severe cases',
          'Remove all Allium-family foods from pet\'s access'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Onions are extremely toxic to cats — even more so than dogs.',
        details: 'Cats are even more susceptible to onion toxicity than dogs. A very small amount can cause significant red blood cell damage. All forms of onion are dangerous, including onion powder commonly found in baby food and other processed foods.',
        toxicComponent: 'N-propyl disulfide (thiosulfate)',
        symptoms: ['Lethargy', 'Pale gums', 'Orange to dark red urine', 'Weakness', 'Rapid breathing'],
        timeToSymptoms: '1-3 days',
        emergencySteps: [
          'Seek immediate veterinary attention',
          'Cats need lower doses to become ill compared to dogs',
          'Blood work will be necessary',
          'Hospitalization may be required'
        ],
      },
    },
    alternatives: ['carrots', 'green-beans', 'zucchini', 'sweet-potatoes'],
    faqs: [
      { question: 'How much onion is toxic to dogs?', answer: 'As little as 15-30 grams per kilogram of body weight can cause dangerous changes in blood chemistry. Even small amounts over time can build up toxicity.' },
      { question: 'Is cooked onion safe for dogs?', answer: 'No. Cooking does not destroy the toxic compounds in onions. All forms — raw, cooked, powdered, dehydrated — are dangerous.' },
    ],
  },
  {
    id: '6',
    name: 'Carrots',
    slug: 'carrots',
    emoji: '🥕',
    category: 'vegetables',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Carrots are safe, nutritious, and excellent for dental health in dogs.',
        details: 'Carrots are a fantastic low-calorie snack for dogs. They are rich in beta-carotene, fiber, vitamin K1, and potassium. Raw carrots also help clean teeth and massage gums. Cooked carrots are easier to digest. Always cut into appropriate sizes to prevent choking, especially for small breeds.',
        dosage: {
          small: '1-2 baby carrots per day',
          medium: '2-4 baby carrots per day',
          large: '4-6 baby carrots per day',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Cooked carrots are safe for cats as an occasional treat.',
        details: 'While cats don\'t nutritionally need vegetables, cooked carrots are safe and can provide some beneficial fiber. Always cook carrots until soft before giving to cats, as raw carrots can be a choking hazard. Cut into very small pieces.',
        dosage: {
          small: '1 teaspoon cooked, diced',
          medium: '1-2 teaspoons cooked, diced',
          large: '1 tablespoon cooked, diced',
        },
      },
    },
    alternatives: ['green-beans', 'sweet-potatoes', 'pumpkin', 'peas'],
    faqs: [
      { question: 'Can dogs eat raw carrots?', answer: 'Yes! Raw carrots are safe and make great crunchy treats. They also help clean teeth. Just cut them to an appropriate size for your dog.' },
      { question: 'Are carrots good for puppies?', answer: 'Yes, carrots are excellent for teething puppies. Frozen carrots can soothe sore gums. Always supervise to prevent choking.' },
    ],
  },
  {
    id: '7',
    name: 'Peanut Butter',
    slug: 'peanut-butter',
    emoji: '🥜',
    category: 'nuts',
    pets: {
      dogs: {
        safety: 'caution',
        summary: 'Peanut butter is safe ONLY if it doesn\'t contain xylitol. Always check the label!',
        details: 'Most peanut butter is safe for dogs and is a great source of protein, healthy fats, and vitamins B and E. However, some brands contain xylitol (birch sugar), an artificial sweetener that is extremely toxic to dogs. Always read the ingredients list carefully. Choose unsalted, unsweetened, natural peanut butter. Use in moderation due to high calorie and fat content.',
        toxicComponent: 'Xylitol (in some brands)',
        symptoms: ['If xylitol present: Vomiting', 'Hypoglycemia', 'Seizures', 'Liver failure'],
        dosage: {
          small: '½ teaspoon per day',
          medium: '1 teaspoon per day',
          large: '1 tablespoon per day',
        },
      },
      cats: {
        safety: 'caution',
        summary: 'Small amounts of xylitol-free peanut butter are safe, but cats don\'t benefit from it.',
        details: 'Peanut butter is not toxic to cats (if xylitol-free), but it offers no nutritional benefit. Cats are obligate carnivores and don\'t need plant-based proteins. The sticky texture can also be a choking hazard. If given, use only a tiny amount.',
        dosage: {
          small: '¼ teaspoon occasionally',
          medium: '¼ teaspoon occasionally',
          large: '½ teaspoon occasionally',
        },
      },
    },
    alternatives: ['bananas', 'pumpkin', 'sweet-potatoes'],
    faqs: [
      { question: 'Which peanut butter brands are safe for dogs?', answer: 'Look for brands with only peanuts (and maybe salt) in the ingredients. Avoid any brand listing xylitol, birch sugar, or artificial sweeteners. Popular safe brands include Teddie, Smucker\'s Natural, and 365 Everyday Value.' },
      { question: 'How much peanut butter can a dog have?', answer: 'As a general rule, treats should make up no more than 10% of your dog\'s daily calories. For a small dog, that\'s about ½ teaspoon; for a large dog, about 1 tablespoon.' },
    ],
  },
  {
    id: '8',
    name: 'Watermelon',
    slug: 'watermelon',
    emoji: '🍉',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Seedless watermelon flesh is a hydrating, nutritious summer treat for dogs.',
        details: 'Watermelon is 92% water, making it a fantastic hydrating treat on hot days. It\'s rich in vitamins A, B6, and C, plus potassium. Remove all seeds (which can cause intestinal blockage) and the rind (which can cause GI upset). Seedless watermelon is the safest option. Frozen watermelon cubes make excellent summer treats.',
        dosage: {
          small: '1-2 small cubes',
          medium: '2-4 cubes',
          large: '4-6 cubes',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Watermelon is safe for cats and can help with hydration.',
        details: 'Cats can safely eat small amounts of seedless watermelon flesh. It can be particularly helpful for cats that don\'t drink enough water. Remove all seeds and rind. Most cats aren\'t particularly interested in fruit, so don\'t be surprised if your cat declines.',
        dosage: {
          small: '1 small cube',
          medium: '1-2 small cubes',
          large: '2-3 small cubes',
        },
      },
    },
    alternatives: ['blueberries', 'strawberries', 'cantaloupe', 'apples'],
    faqs: [
      { question: 'Can dogs eat watermelon rind?', answer: 'No, the rind is tough and difficult to digest. It can cause gastrointestinal upset, blockage, or choking. Only feed the pink flesh.' },
      { question: 'Can dogs eat watermelon seeds?', answer: 'Seeds should be removed. While one or two swallowed seeds likely won\'t cause harm, too many can cause intestinal blockage, especially in smaller dogs.' },
    ],
  },
  {
    id: '9',
    name: 'Avocado',
    slug: 'avocado',
    emoji: '🥑',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'caution',
        summary: 'The flesh is mildly safe in small amounts, but the pit, skin, and leaves are toxic.',
        details: 'Avocados contain persin, a fungicidal toxin. While the flesh contains only small amounts and is unlikely to cause serious issues in dogs, the pit, skin, and leaves contain higher concentrations. The biggest danger is the pit, which can cause choking or intestinal blockage. The high fat content can also trigger pancreatitis.',
        toxicComponent: 'Persin',
        symptoms: ['Vomiting', 'Diarrhea', 'Abdominal pain', 'Difficulty breathing (large amounts)'],
        dosage: {
          small: 'Avoid or max 1 teaspoon flesh',
          medium: '1-2 teaspoons flesh occasionally',
          large: '1 tablespoon flesh occasionally',
        },
      },
      cats: {
        safety: 'toxic',
        summary: 'Avocado is toxic to cats due to persin content.',
        details: 'Cats are more sensitive to persin than dogs. All parts of the avocado should be kept away from cats, including the flesh. Even small amounts can cause gastrointestinal distress and potentially more serious issues.',
        toxicComponent: 'Persin',
        symptoms: ['Vomiting', 'Diarrhea', 'Difficulty breathing', 'Fluid around the heart'],
        timeToSymptoms: '12-24 hours',
        emergencySteps: [
          'Remove any remaining avocado from access',
          'Contact your veterinarian',
          'Monitor for breathing difficulties',
          'Watch for gastrointestinal symptoms'
        ],
      },
    },
    alternatives: ['bananas', 'pumpkin', 'sweet-potatoes', 'blueberries'],
    faqs: [
      { question: 'Can dogs eat guacamole?', answer: 'No. Guacamole typically contains onion and garlic, both of which are toxic to dogs, on top of the avocado concerns.' },
      { question: 'What if my dog ate an avocado pit?', answer: 'The pit is a serious choking and blockage hazard. Contact your vet immediately. X-rays may be needed to determine if the pit needs to be surgically removed.' },
    ],
  },
  {
    id: '10',
    name: 'Rice',
    slug: 'rice',
    emoji: '🍚',
    category: 'grains',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Plain cooked rice is safe and commonly recommended for dogs with upset stomachs.',
        details: 'White rice is a staple of the bland diet recommended by veterinarians for dogs with GI issues. It\'s easy to digest and provides energy. Brown rice is also safe and has more fiber and nutrients. Always serve plain, without seasonings, butter, or sauces. Rice should supplement, not replace, a complete dog food diet.',
        dosage: {
          small: '¼ cup cooked per meal',
          medium: '½ cup cooked per meal',
          large: '¾-1 cup cooked per meal',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Small amounts of cooked rice are safe for cats but offer limited nutritional value.',
        details: 'Cooked plain rice is safe for cats and can help with digestive issues. However, as obligate carnivores, cats don\'t need grains in their diet. Use only as an occasional supplement, not a regular food source.',
        dosage: {
          small: '1 tablespoon cooked per meal',
          medium: '2 tablespoons cooked per meal',
          large: '2-3 tablespoons cooked per meal',
        },
      },
    },
    alternatives: ['oatmeal', 'sweet-potatoes', 'pumpkin'],
    faqs: [
      { question: 'Is white or brown rice better for dogs?', answer: 'White rice is better for upset stomachs as it\'s easier to digest. Brown rice has more nutrients and fiber but is harder to digest. Both are safe.' },
      { question: 'How should I cook rice for my dog?', answer: 'Cook rice in plain water without any salt, butter, seasonings, or oils. Let it cool to room temperature before serving.' },
    ],
  },
  {
    id: '11',
    name: 'Salmon',
    slug: 'salmon',
    emoji: '🐟',
    category: 'seafood',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Cooked salmon is excellent for dogs, rich in omega-3 fatty acids.',
        details: 'Cooked salmon is one of the best foods for dogs. It\'s packed with omega-3 fatty acids (EPA and DHA) that support skin health, coat quality, immune function, and joint health. Always cook thoroughly to kill parasites. Never feed raw or undercooked salmon, as it can contain Neorickettsia helminthoeca, which causes salmon poisoning disease — potentially fatal to dogs.',
        dosage: {
          small: '30-50g cooked per serving',
          medium: '50-100g cooked per serving',
          large: '100-150g cooked per serving',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Cooked salmon is safe and nutritious for cats in moderation.',
        details: 'Cats love salmon and it provides excellent omega-3 fatty acids. Always serve cooked, never raw. Remove all bones. Don\'t rely on salmon as the sole protein source as it doesn\'t provide complete nutrition on its own. Avoid smoked salmon due to high sodium content.',
        dosage: {
          small: '15-30g cooked per serving',
          medium: '30-50g cooked per serving',
          large: '50-80g cooked per serving',
        },
      },
    },
    alternatives: ['chicken', 'turkey', 'sardines'],
    faqs: [
      { question: 'Can dogs eat raw salmon?', answer: 'No! Raw salmon can contain a parasite (Nanophyetus salmincola) infected with Neorickettsia helminthoeca, causing salmon poisoning disease, which is often fatal if untreated. Always cook salmon thoroughly.' },
      { question: 'Can dogs eat salmon skin?', answer: 'Cooked salmon skin is safe in small amounts and contains concentrated omega-3s. However, it\'s high in fat, so give it sparingly.' },
    ],
  },
  {
    id: '12',
    name: 'Apples',
    slug: 'apples',
    emoji: '🍎',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Apple slices (without seeds or core) are a safe, crunchy treat for dogs.',
        details: 'Apples are an excellent low-calorie treat for dogs. They provide vitamins A and C, fiber, and help clean teeth. Always remove the seeds (which contain cyanide compounds) and the core. Cut into manageable slices. Green and red apples are both safe.',
        dosage: {
          small: '1-2 thin slices',
          medium: '2-3 slices',
          large: '3-4 slices',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Apple flesh is safe for cats in small amounts, but remove seeds and core.',
        details: 'Plain apple flesh is non-toxic to cats. However, most cats aren\'t interested in fruit. If your cat enjoys apple, serve small pieces without seeds, core, or skin. The seeds contain amygdalin, which releases cyanide when digested.',
        dosage: {
          small: '1 small piece occasionally',
          medium: '1-2 small pieces occasionally',
          large: '2-3 small pieces occasionally',
        },
      },
    },
    alternatives: ['blueberries', 'watermelon', 'bananas', 'pears'],
    faqs: [
      { question: 'Are apple seeds toxic to dogs?', answer: 'Apple seeds contain amygdalin, which releases cyanide when chewed and digested. A few seeds are unlikely to cause harm, but it\'s best to always remove them.' },
      { question: 'Can dogs eat applesauce?', answer: 'Plain, unsweetened applesauce is safe. Avoid brands with added sugar, artificial sweeteners (especially xylitol), or spices.' },
    ],
  },
  {
    id: '13',
    name: 'Bananas',
    slug: 'bananas',
    emoji: '🍌',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Bananas are a safe, potassium-rich treat for dogs when given in moderation.',
        details: 'Bananas are packed with potassium, vitamins, biotin, fiber, and copper. They are low in cholesterol and sodium but high in sugar, so they should be given as a treat, not a staple. The peel is not toxic but is difficult to digest and should be removed.',
        dosage: {
          small: '2-3 small slices per day',
          medium: '½ banana per day',
          large: '½-1 banana per day',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Bananas are safe for cats in very small amounts as an occasional treat.',
        details: 'Bananas are not toxic to cats, but they are high in sugar and cats don\'t need fruit in their diet. A small piece occasionally won\'t cause harm. Some cats may enjoy the texture, while others will show no interest.',
        dosage: {
          small: '1 thin slice occasionally',
          medium: '1-2 thin slices occasionally',
          large: '2-3 thin slices occasionally',
        },
      },
    },
    alternatives: ['blueberries', 'watermelon', 'apples', 'pumpkin'],
    faqs: [
      { question: 'Can dogs eat banana peels?', answer: 'Banana peels are not toxic but are very difficult to digest and could cause a blockage. Always peel the banana before giving it to your dog.' },
      { question: 'Are bananas good for dogs with diarrhea?', answer: 'Yes, bananas can help settle an upset stomach. The fiber helps regulate digestion, and they contain pectin which helps absorb water in the intestines.' },
    ],
  },
  {
    id: '14',
    name: 'Garlic',
    slug: 'garlic',
    emoji: '🧄',
    category: 'vegetables',
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Garlic is toxic to dogs — 5x more potent than onions.',
        details: 'Garlic belongs to the Allium family and is approximately 5 times more toxic than onions to dogs. It contains thiosulfate, which damages red blood cells and leads to hemolytic anemia. All forms of garlic are dangerous: raw, cooked, powdered, or in supplements. Garlic powder is especially dangerous because it\'s more concentrated.',
        toxicComponent: 'Thiosulfate',
        symptoms: ['Lethargy', 'Pale gums', 'Elevated heart rate', 'Collapse', 'Dark-colored urine', 'Weakness'],
        timeToSymptoms: '1-5 days',
        emergencySteps: [
          'Contact your veterinarian immediately',
          'Note the amount and form of garlic consumed',
          'Symptoms may be delayed — monitor for up to 5 days',
          'Blood tests to check for anemia may be needed',
          'Severe cases may require blood transfusion'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Garlic is highly toxic to cats and can be life-threatening.',
        details: 'Cats are even more sensitive to garlic toxicity than dogs. Even very small amounts can cause significant red blood cell damage. All forms of garlic should be completely avoided.',
        toxicComponent: 'Thiosulfate',
        symptoms: ['Weakness', 'Pale gums', 'Discolored urine', 'Rapid breathing', 'Collapse'],
        timeToSymptoms: '1-5 days',
        emergencySteps: [
          'Seek immediate veterinary care',
          'Even tiny amounts are dangerous for cats',
          'Hospitalization may be necessary',
          'Blood transfusion may be required in severe cases'
        ],
      },
    },
    alternatives: ['parsley', 'basil', 'carrots'],
    faqs: [
      { question: 'Is garlic powder more dangerous than raw garlic?', answer: 'Yes! Garlic powder is more concentrated and therefore more toxic per gram than raw garlic. Even small amounts in seasonings can be harmful.' },
      { question: 'What about garlic supplements for dogs?', answer: 'Despite some holistic claims, veterinary science does not support garlic supplementation. The risks far outweigh any potential benefits.' },
    ],
  },
  {
    id: '15',
    name: 'Eggs',
    slug: 'eggs',
    emoji: '🥚',
    category: 'other',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Cooked eggs are a nutritious, protein-rich food for dogs.',
        details: 'Eggs are a complete source of amino acids and are packed with protein, fatty acids, vitamins, and minerals. They can help settle upset stomachs and are great for dogs with sensitive digestive systems. Always cook eggs fully — scrambled, boiled, or poached — without oil, butter, salt, or seasonings.',
        dosage: {
          small: '½ egg per day',
          medium: '1 egg per day',
          large: '1-2 eggs per day',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Cooked eggs are safe and nutritious for cats.',
        details: 'Eggs provide excellent protein and essential amino acids for cats. Always serve fully cooked to avoid salmonella risk and biotin deficiency (raw egg whites contain avidin). Scrambled or hard-boiled without seasoning is best.',
        dosage: {
          small: '¼ egg per day',
          medium: '½ egg per day',
          large: '½-1 egg per day',
        },
      },
    },
    alternatives: ['chicken', 'salmon', 'turkey'],
    faqs: [
      { question: 'Can dogs eat raw eggs?', answer: 'It\'s not recommended. Raw eggs carry Salmonella risk and raw egg whites contain avidin, which interferes with biotin absorption. Cook eggs for maximum safety and nutrition.' },
      { question: 'Can dogs eat eggshells?', answer: 'Yes! Ground eggshells are a source of calcium. Bake them at 300°F for 10 minutes, then grind into a fine powder. Sprinkle a small amount on food.' },
    ],
  },
  {
    id: '16',
    name: 'Strawberries',
    slug: 'strawberries',
    emoji: '🍓',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Strawberries are safe and contain an enzyme that helps whiten teeth.',
        details: 'Strawberries are full of fiber, vitamin C, and antioxidants. They also contain malic acid, an enzyme that can help whiten your dog\'s teeth. Cut them into small pieces to prevent choking. Avoid canned strawberries or those in syrup, as they contain too much sugar.',
        dosage: {
          small: '1-2 strawberries per day',
          medium: '3-4 strawberries per day',
          large: '5-6 strawberries per day',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Strawberries are safe for cats in small amounts.',
        details: 'Cats can safely eat small pieces of strawberry. However, cats can\'t taste sweetness, so most won\'t be interested. If your cat enjoys them, cut into tiny pieces and offer sparingly.',
        dosage: {
          small: '½ strawberry',
          medium: '1 strawberry',
          large: '1-2 strawberries',
        },
      },
    },
    alternatives: ['blueberries', 'raspberries', 'watermelon', 'apples'],
    faqs: [
      { question: 'Can dogs eat strawberry tops?', answer: 'While strawberry leaves are not toxic, they can be difficult to digest. It\'s best to remove the tops and serve only the fruit.' },
    ],
  },
  {
    id: '17',
    name: 'Xylitol',
    slug: 'xylitol',
    emoji: '🍬',
    category: 'sweets',
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Xylitol is EXTREMELY toxic to dogs — even tiny amounts can be fatal.',
        details: 'Xylitol (birch sugar) is one of the most dangerous substances for dogs. It causes a rapid, massive release of insulin, leading to life-threatening hypoglycemia (low blood sugar). Higher doses can cause liver failure and death. It\'s found in sugar-free gum, candy, baked goods, some peanut butters, toothpaste, and medications.',
        toxicComponent: 'Xylitol (birch sugar / E967)',
        symptoms: ['Vomiting', 'Weakness', 'Staggering', 'Collapse', 'Seizures', 'Liver failure', 'Death'],
        timeToSymptoms: '15-30 minutes',
        emergencySteps: [
          'THIS IS A LIFE-THREATENING EMERGENCY',
          'Call your vet or Pet Poison Helpline (855-764-7661) IMMEDIATELY',
          'Do NOT induce vomiting unless directed',
          'If your dog is conscious, rub corn syrup on gums for blood sugar',
          'Rush to the nearest emergency vet clinic',
          'Time is critical — symptoms can progress to liver failure within hours'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Xylitol is toxic to cats, though cats rarely seek out sweet foods.',
        details: 'Cats appear to be less sensitive to xylitol than dogs, but it is still considered toxic. Cats rarely consume xylitol-containing products because they can\'t taste sweetness, but if ingested, it should be treated as an emergency.',
        toxicComponent: 'Xylitol (birch sugar / E967)',
        symptoms: ['Vomiting', 'Lethargy', 'Loss of coordination'],
        timeToSymptoms: '30-60 minutes',
        emergencySteps: [
          'Contact your veterinarian',
          'Monitor closely for signs of hypoglycemia',
          'Seek immediate veterinary care'
        ],
      },
    },
    alternatives: ['honey', 'pumpkin', 'natural-treats'],
    faqs: [
      { question: 'How much xylitol is toxic to dogs?', answer: 'As little as 0.1g per kilogram of body weight can cause hypoglycemia. For liver failure, the toxic dose is approximately 0.5g/kg. A single piece of sugar-free gum can contain 0.3-1.5g of xylitol.' },
      { question: 'Where is xylitol commonly found?', answer: 'Sugar-free gum, candy, mints, baked goods, some peanut butters (check labels!), sugar-free jelly/jam, toothpaste, mouthwash, chewable vitamins, and some medications.' },
    ],
  },
  {
    id: '18',
    name: 'Sweet Potatoes',
    slug: 'sweet-potatoes',
    emoji: '🍠',
    category: 'vegetables',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Cooked sweet potatoes are an excellent source of fiber and vitamins for dogs.',
        details: 'Sweet potatoes are a superfood for dogs. They\'re packed with dietary fiber, beta-carotene, vitamins A, C, and B6, potassium, calcium, and iron. Always serve cooked (baked, boiled, or steamed) without any seasonings, butter, or marshmallows. Never feed raw sweet potato as it\'s difficult to digest.',
        dosage: {
          small: '1-2 tablespoons per meal',
          medium: '2-3 tablespoons per meal',
          large: '¼ cup per meal',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Cooked sweet potatoes are safe for cats in small amounts.',
        details: 'Plain cooked sweet potato is non-toxic to cats and can provide some fiber and vitamins. However, cats are obligate carnivores and don\'t need starchy vegetables. Use only as an occasional treat in small amounts.',
        dosage: {
          small: '1 teaspoon per serving',
          medium: '1-2 teaspoons per serving',
          large: '1 tablespoon per serving',
        },
      },
    },
    alternatives: ['pumpkin', 'carrots', 'green-beans', 'peas'],
    faqs: [
      { question: 'Raw vs cooked sweet potato for dogs?', answer: 'Always cook sweet potatoes before feeding to dogs. Raw sweet potatoes are hard to digest and can cause intestinal blockage. Baking or steaming preserves the most nutrients.' },
    ],
  },
  {
    id: '19',
    name: 'Milk',
    slug: 'milk',
    emoji: '🥛',
    category: 'dairy',
    pets: {
      dogs: {
        safety: 'caution',
        summary: 'Many dogs are lactose intolerant. Small amounts may be okay for some dogs.',
        details: 'Many adult dogs are lactose intolerant and lack sufficient lactase enzyme to digest milk properly. Small amounts of milk may be tolerated by some dogs, but it can cause digestive upset including gas, bloating, diarrhea, and vomiting in lactose-intolerant dogs. Goat\'s milk is often better tolerated. Never give large quantities.',
        symptoms: ['Gas', 'Bloating', 'Diarrhea', 'Vomiting', 'Abdominal pain'],
        dosage: {
          small: '1-2 tablespoons max',
          medium: '2-4 tablespoons max',
          large: '¼ cup max',
        },
      },
      cats: {
        safety: 'caution',
        summary: 'Contrary to popular belief, most adult cats are lactose intolerant.',
        details: 'Despite the stereotype, most adult cats are lactose intolerant. Kittens produce lactase to digest their mother\'s milk, but production decreases after weaning. Cow\'s milk can cause digestive upset. If you want to give your cat a milk treat, use specially formulated cat milk (lactose-free).',
        symptoms: ['Diarrhea', 'Vomiting', 'Stomach cramps', 'Bloating'],
        dosage: {
          small: '1 tablespoon max (cat milk)',
          medium: '1-2 tablespoons max (cat milk)',
          large: '2 tablespoons max (cat milk)',
        },
      },
    },
    alternatives: ['plain-yogurt', 'goats-milk', 'bone-broth'],
    faqs: [
      { question: 'Can kittens drink cow milk?', answer: 'No. Cow\'s milk doesn\'t have the right nutritional balance for kittens and can cause diarrhea. Use kitten milk replacer (KMR) formulated specifically for kittens.' },
    ],
  },
  {
    id: '20',
    name: 'Pumpkin',
    slug: 'pumpkin',
    emoji: '🎃',
    category: 'vegetables',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Plain canned pumpkin is a digestive superfood for dogs — great for both diarrhea and constipation.',
        details: 'Pumpkin is a veterinarian-recommended food for digestive health. It\'s rich in soluble fiber which helps regulate digestion in both directions — it can help with both diarrhea and constipation. Use plain canned pumpkin (NOT pumpkin pie mix, which contains harmful spices). It\'s also low in calories and high in beta-carotene, vitamin A, potassium, and iron.',
        dosage: {
          small: '1-2 teaspoons per meal',
          medium: '1-2 tablespoons per meal',
          large: '2-4 tablespoons per meal',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Plain pumpkin is great for cats\' digestive health, especially hairballs.',
        details: 'Pumpkin is excellent for cats with digestive issues. The fiber helps with constipation, diarrhea, and can help prevent hairballs. Use plain canned pumpkin only — never pumpkin pie mix. Start with small amounts and increase gradually.',
        dosage: {
          small: '½ teaspoon per meal',
          medium: '1 teaspoon per meal',
          large: '1-2 teaspoons per meal',
        },
      },
    },
    alternatives: ['sweet-potatoes', 'carrots', 'green-beans'],
    faqs: [
      { question: 'Canned vs fresh pumpkin for dogs?', answer: 'Plain canned pumpkin (100% pumpkin, no spices) is actually more convenient and consistent. Fresh pumpkin must be cooked first. NEVER use pumpkin pie filling, which contains xylitol, nutmeg, and other harmful ingredients.' },
    ],
  },
  // HUMAN MEDICATIONS - New Category
  {
    id: '21',
    name: 'Ibuprofen',
    slug: 'ibuprofen',
    emoji: '💊',
    category: 'medications',
    isMedication: true,
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Ibuprofen (Advil, Motrin) is EXTREMELY TOXIC to dogs and can cause death.',
        details: 'Ibuprofen is an NSAID pain reliever that is highly toxic to dogs. Even a single pill can cause serious harm to a small dog. It damages the stomach lining, causes kidney failure, and can lead to neurological problems. Dogs metabolize NSAIDs differently than humans, making standard doses deadly. NEVER give human pain medications to pets.',
        toxicComponent: 'Ibuprofen (NSAID)',
        symptoms: ['Vomiting (often bloody)', 'Diarrhea (dark/bloody)', 'Loss of appetite', 'Abdominal pain', 'Lethargy', 'Increased thirst', 'Kidney failure', 'Seizures', 'Coma'],
        timeToSymptoms: '2-6 hours',
        emergencySteps: [
          'THIS IS A LIFE-THREATENING EMERGENCY — ACT NOW',
          'Call Pet Poison Helpline (855-764-7661) or your emergency vet IMMEDIATELY',
          'Note the strength (mg) and number of pills ingested',
          'Do NOT induce vomiting unless directed by a professional',
          'Time is critical — kidney damage can occur within hours',
          'Bring the medication bottle to the vet'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Ibuprofen is DEADLY to cats — even tiny amounts can be fatal.',
        details: 'Cats are EXTREMELY sensitive to ibuprofen — far more than dogs. A single tablet can kill a cat. Cats lack the liver enzyme (glucuronyl transferase) needed to metabolize NSAIDs. This causes rapid organ failure. There is NO safe dose of ibuprofen for cats.',
        toxicComponent: 'Ibuprofen (NSAID)',
        symptoms: ['Vomiting', 'Not eating', 'Bloody stool', 'Weakness', 'Pale gums', 'Kidney failure', 'Death'],
        timeToSymptoms: '1-4 hours',
        emergencySteps: [
          'EXTREME EMERGENCY — EVERY MINUTE COUNTS',
          'Rush to emergency vet clinic IMMEDIATELY',
          'Call ahead so they can prepare',
          'Do NOT wait for symptoms',
          'Cats can die from a single pill',
          'Aggressive decontamination and supportive care needed'
        ],
      },
    },
    alternatives: [],
    faqs: [
      { question: 'Can I give my dog Advil for pain?', answer: 'NEVER. Ibuprofen (Advil, Motrin) is toxic to dogs. Contact your vet for pet-safe pain medications like carprofen or meloxicam, which are prescribed at proper doses.' },
      { question: 'My dog ate one ibuprofen pill. Is that dangerous?', answer: 'Yes, even one pill can be dangerous, especially for small dogs. Contact your vet or poison control immediately. The toxic dose for dogs is 25-50 mg/kg, but kidney damage can occur at lower doses.' },
    ],
  },
  {
    id: '22',
    name: 'Acetaminophen',
    slug: 'acetaminophen',
    emoji: '💊',
    category: 'medications',
    isMedication: true,
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Acetaminophen (Tylenol) is toxic to dogs and causes liver damage.',
        details: 'Acetaminophen (Tylenol, Paracetamol) is toxic to dogs. While dogs are slightly more tolerant than cats, it can still cause liver failure, damage to red blood cells, and death. Signs may not appear for 1-4 days. NEVER give Tylenol to dogs — there are safer, vet-prescribed alternatives.',
        toxicComponent: 'Acetaminophen',
        symptoms: ['Lethargy', 'Swelling of face/paws', 'Difficulty breathing', 'Vomiting', 'Brown/gray gums', 'Dark urine', 'Jaundice', 'Liver failure'],
        timeToSymptoms: '1-4 hours (may be delayed)',
        emergencySteps: [
          'Contact your veterinarian or poison control IMMEDIATELY',
          'Note the strength and number of pills consumed',
          'Do NOT wait for symptoms — liver damage can be silent',
          'Treatment with N-acetylcysteine (NAC) may be needed',
          'IV fluids and liver protectants will likely be required'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Acetaminophen (Tylenol) is DEADLY to cats — there is NO safe dose.',
        details: 'Cats CANNOT metabolize acetaminophen AT ALL. Even a fraction of a pill can be fatal. It destroys red blood cells (methemoglobinemia) and causes liver failure. Cats\' faces and paws swell, and they develop blue/brown gums. Death can occur within 24-72 hours without aggressive treatment.',
        toxicComponent: 'Acetaminophen',
        symptoms: ['Brown/muddy gums', 'Facial swelling', 'Paw swelling', 'Difficulty breathing', 'Lethargy', 'Vomiting', 'Death'],
        timeToSymptoms: '1-2 hours',
        emergencySteps: [
          'EXTREME EMERGENCY — RUSH TO VET IMMEDIATELY',
          'Call ahead to emergency clinic',
          '1/4 of a Tylenol tablet can kill a cat',
          'Do NOT wait — methemoglobinemia progresses rapidly',
          'Oxygen therapy and N-acetylcysteine treatment required',
          'Blood transfusion may be necessary'
        ],
      },
    },
    alternatives: [],
    faqs: [
      { question: 'Is Tylenol safe for cats?', answer: 'ABSOLUTELY NOT. There is NO safe dose of acetaminophen/Tylenol for cats. Even a tiny amount (1/4 tablet) can be lethal. Cats lack the enzyme needed to metabolize it.' },
      { question: 'What can I give my pet for pain?', answer: 'NEVER give human medications. Contact your vet for pet-safe options. Dogs may be prescribed carprofen (Rimadyl) or meloxicam. Cats have very limited safe options — only a vet can advise.' },
    ],
  },
  {
    id: '23',
    name: 'Aspirin',
    slug: 'aspirin',
    emoji: '💊',
    category: 'medications',
    isMedication: true,
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Aspirin is toxic to dogs and should only be given under strict veterinary supervision.',
        details: 'While low-dose aspirin is occasionally prescribed by vets for specific conditions, it is generally toxic to dogs when given without professional guidance. Aspirin damages the stomach lining, causes GI bleeding, and can lead to kidney damage. Enteric-coated or buffered aspirin is NOT safer. Never give aspirin without explicit vet instructions.',
        toxicComponent: 'Acetylsalicylic acid',
        symptoms: ['Vomiting (may be bloody)', 'Diarrhea', 'Loss of appetite', 'Stomach ulcers', 'Weakness', 'Increased thirst', 'Bleeding disorders'],
        timeToSymptoms: '4-6 hours',
        emergencySteps: [
          'Contact your veterinarian immediately',
          'Note the dose given and time',
          'Watch for signs of GI bleeding (dark stool, vomiting blood)',
          'Do NOT give more aspirin',
          'Stomach protectants may be prescribed'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Aspirin is highly toxic to cats — cats metabolize it extremely slowly.',
        details: 'Cats are VERY sensitive to aspirin because they lack the liver enzyme to break it down. A single dose can last 3-5 days in a cat\'s system (vs hours in humans). This leads to accumulation and toxicity. Symptoms include GI ulcers, liver damage, bone marrow suppression, and death.',
        toxicComponent: 'Acetylsalicylic acid',
        symptoms: ['Vomiting', 'Loss of appetite', 'Lethargy', 'GI bleeding', 'Anemia', 'Liver damage', 'Neurological signs'],
        timeToSymptoms: '4-6 hours (may accumulate over days)',
        emergencySteps: [
          'Contact emergency vet immediately',
          'Cats cannot process aspirin like other animals',
          'Single dose toxicity is possible',
          'Liver and kidney function tests needed',
          'Supportive care and monitoring required'
        ],
      },
    },
    alternatives: [],
    faqs: [
      { question: 'Can I give my dog baby aspirin?', answer: 'No, not without veterinary guidance. While some vets prescribe low-dose aspirin for specific conditions, self-medicating is dangerous. The wrong dose can cause stomach ulcers, kidney damage, or bleeding disorders.' },
    ],
  },
  {
    id: '24',
    name: 'Antihistamines',
    slug: 'antihistamines',
    emoji: '💊',
    category: 'medications',
    isMedication: true,
    pets: {
      dogs: {
        safety: 'caution',
        summary: 'Some antihistamines (like Benadryl) may be safe at proper doses, but ONLY under vet guidance.',
        details: 'Diphenhydramine (Benadryl) is sometimes used in dogs for allergies or anxiety, but dosing is critical and some formulations contain toxic additives like xylitol or pseudoephedrine. Never give combination cold medicines. The typical dog dose is 1mg per pound, but ALWAYS consult your vet first. Other antihistamines (like cetirizine) have different safety profiles.',
        toxicComponent: 'Depends on formulation — watch for xylitol, decongestants',
        symptoms: ['If overdosed: Sedation', 'Agitation', 'Rapid heart rate', 'Dry mouth', 'Urinary retention', 'Seizures'],
        dosage: {
          small: 'Consult vet — typically 12.5-25mg',
          medium: 'Consult vet — typically 25-50mg',
          large: 'Consult vet — typically 50-100mg',
        },
      },
      cats: {
        safety: 'caution',
        summary: 'Some antihistamines can be used in cats, but ONLY with veterinary dosing.',
        details: 'Diphenhydramine (Benadryl) and chlorpheniramine may be used in cats for allergies, but the dose must be calculated by a vet. Cats are more sensitive and the margin for error is smaller. NEVER give liquid formulations (often contain propylene glycol, toxic to cats) or combination products.',
        toxicComponent: 'Propylene glycol in liquids, xylitol in some formulations',
        symptoms: ['If overdosed: Extreme sedation', 'Agitation', 'Dilated pupils', 'Rapid heart rate', 'Seizures'],
        dosage: {
          small: 'Consult vet — typically 1-2mg',
          medium: 'Consult vet — typically 2-4mg',
          large: 'Consult vet — typically 2-4mg',
        },
      },
    },
    alternatives: [],
    faqs: [
      { question: 'Can I give my dog Benadryl for allergies?', answer: 'Potentially, but ONLY after consulting your vet. The dose is about 1mg per pound of body weight, given 2-3 times daily. Ensure the product contains ONLY diphenhydramine — no decongestants, pain relievers, or artificial sweeteners.' },
      { question: 'Is children\'s Benadryl safe for pets?', answer: 'Be very careful — liquid formulations often contain xylitol (toxic to dogs) or propylene glycol (toxic to cats). Stick to plain tablets and consult your vet for proper dosing.' },
    ],
  },
  {
    id: '25',
    name: 'Antidepressants',
    slug: 'antidepressants',
    emoji: '💊',
    category: 'medications',
    isMedication: true,
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Human antidepressants (SSRIs, SNRIs) are toxic to dogs and can cause serotonin syndrome.',
        details: 'Antidepressants like Prozac (fluoxetine), Zoloft (sertraline), Lexapro, Effexor, and Cymbalta are highly toxic to dogs. They can cause serotonin syndrome — a life-threatening condition with seizures, hyperthermia, and cardiac problems. Some antidepressants are prescribed by vets at MUCH lower doses for behavioral issues, but human doses are dangerous.',
        toxicComponent: 'SSRIs, SNRIs, TCAs',
        symptoms: ['Agitation', 'Vomiting', 'Tremors', 'Seizures', 'High body temperature', 'Rapid heart rate', 'Dilated pupils', 'Disorientation', 'Coma'],
        timeToSymptoms: '1-3 hours',
        emergencySteps: [
          'Contact poison control or emergency vet IMMEDIATELY',
          'Note the medication name, strength, and amount ingested',
          'Serotonin syndrome can be life-threatening',
          'Do NOT induce vomiting without professional guidance',
          'Aggressive cooling and anti-seizure medications may be needed'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Human antidepressants are toxic to cats and can cause severe neurological symptoms.',
        details: 'Cats are very sensitive to antidepressants. SSRIs like fluoxetine and sertraline cause serotonin syndrome, which includes seizures, hyperthermia, and potentially death. TCAs (amitriptyline, etc.) cause heart arrhythmias and seizures. Even small exposures require immediate veterinary attention.',
        toxicComponent: 'SSRIs, SNRIs, TCAs',
        symptoms: ['Agitation', 'Vocalization', 'Dilated pupils', 'Tremors', 'Seizures', 'High temperature', 'Cardiac arrhythmias'],
        timeToSymptoms: '30 minutes - 3 hours',
        emergencySteps: [
          'EMERGENCY — seek vet care immediately',
          'Note exact medication and amount',
          'Serotonin syndrome progresses rapidly',
          'Active cooling may be needed',
          'Seizure control and cardiac monitoring required'
        ],
      },
    },
    alternatives: [],
    faqs: [
      { question: 'My dog ate my antidepressant. What should I do?', answer: 'Contact Pet Poison Helpline (855-764-7661) or your emergency vet IMMEDIATELY. Note the medication name, dose, and estimated amount consumed. Serotonin syndrome can develop within hours and is life-threatening.' },
    ],
  },
  {
    id: '26',
    name: 'ADHD Medications',
    slug: 'adhd-medications',
    emoji: '💊',
    category: 'medications',
    isMedication: true,
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'ADHD medications (Adderall, Ritalin, Vyvanse) are EXTREMELY toxic to dogs.',
        details: 'Amphetamines and methylphenidate-based ADHD medications cause severe stimulant toxicity in dogs. Even one pill can cause life-threatening symptoms including seizures, cardiac arrest, and death. These medications cause hyperactivity, hyperthermia, seizures, and heart failure. Extended-release formulations are especially dangerous as they continue releasing medication.',
        toxicComponent: 'Amphetamines, Methylphenidate',
        symptoms: ['Extreme hyperactivity', 'Panting', 'Drooling', 'Tremors', 'High temperature', 'Rapid/irregular heartbeat', 'Seizures', 'Collapse', 'Death'],
        timeToSymptoms: '30 minutes - 2 hours',
        emergencySteps: [
          'THIS IS A CRITICAL EMERGENCY',
          'Rush to emergency vet IMMEDIATELY',
          'Call ahead so they can prepare',
          'Extended-release pills continue releasing — time critical',
          'Cardiac monitoring essential',
          'Active cooling and sedation may be needed'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'ADHD medications cause severe toxicity in cats — often fatal.',
        details: 'Cats are extremely sensitive to amphetamines and similar stimulants. A single pill of Adderall, Ritalin, or Vyvanse can be fatal to a cat. These drugs cause extreme agitation, hyperthermia, seizures, and heart failure. There is no antidote — supportive care must be immediate and aggressive.',
        toxicComponent: 'Amphetamines, Methylphenidate',
        symptoms: ['Extreme agitation', 'Dilated pupils', 'Rapid breathing', 'High temperature', 'Seizures', 'Heart arrhythmias', 'Death'],
        timeToSymptoms: '15-60 minutes',
        emergencySteps: [
          'LIFE-THREATENING EMERGENCY',
          'Rush to vet immediately — do not wait',
          'Even partial ingestion is dangerous',
          'Sedation and cooling required',
          'Cardiac support essential'
        ],
      },
    },
    alternatives: [],
    faqs: [
      { question: 'How toxic is Adderall to dogs?', answer: 'Extremely toxic. The toxic dose can be as low as 0.5-1mg per pound of body weight. A single 10mg pill can cause severe symptoms in a small dog. Seek emergency care immediately.' },
    ],
  },
  {
    id: '27',
    name: 'Sleep Aids',
    slug: 'sleep-aids',
    emoji: '💊',
    category: 'medications',
    isMedication: true,
    pets: {
      dogs: {
        safety: 'toxic',
        summary: 'Sleep medications (Ambien, Lunesta, melatonin gummies) are toxic to dogs.',
        details: 'Prescription sleep aids like zolpidem (Ambien), eszopiclone (Lunesta), and even OTC options can be toxic. Paradoxically, instead of sedation, dogs often experience agitation, disorientation, and aggression. Melatonin gummies often contain xylitol, which is deadly. High doses cause severe sedation, respiratory depression, and coma.',
        toxicComponent: 'Zolpidem, Eszopiclone, or Xylitol in gummies',
        symptoms: ['Agitation (paradoxical)', 'Wobbling', 'Disorientation', 'Aggression', 'Severe sedation', 'Slow breathing', 'Coma'],
        timeToSymptoms: '30 minutes - 2 hours',
        emergencySteps: [
          'Contact vet or poison control immediately',
          'Note the medication and amount',
          'Check if product contains xylitol (emergency)',
          'Monitor breathing rate',
          'Supportive care likely needed'
        ],
      },
      cats: {
        safety: 'toxic',
        summary: 'Sleep medications are dangerous to cats and can cause severe sedation or paradoxical reactions.',
        details: 'Sleep aids affect cats unpredictably. Some cause extreme sedation and respiratory depression, while others cause agitation and disorientation. Cats are smaller and more sensitive, so even low doses can be dangerous. Products containing xylitol are especially hazardous.',
        toxicComponent: 'Various sedative compounds, potentially xylitol',
        symptoms: ['Extreme sedation', 'Difficulty walking', 'Slow breathing', 'OR agitation/disorientation', 'Vomiting'],
        timeToSymptoms: '30-90 minutes',
        emergencySteps: [
          'Contact vet immediately',
          'Monitor breathing closely',
          'Keep cat warm and quiet',
          'IV fluids may be needed for prolonged sedation'
        ],
      },
    },
    alternatives: [],
    faqs: [
      { question: 'Is melatonin safe for dogs?', answer: 'Plain melatonin (without xylitol or other additives) may be safe at very low doses under vet guidance. However, NEVER give melatonin gummies — they often contain xylitol, which is deadly to dogs. Always use plain melatonin tablets approved by your vet.' },
    ],
  },
  // Additional foods
  {
    id: '28',
    name: 'Green Beans',
    slug: 'green-beans',
    emoji: '🫛',
    category: 'vegetables',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Green beans are a healthy, low-calorie treat and great for weight management.',
        details: 'Green beans are an excellent snack for dogs. They\'re low in calories but high in fiber, vitamins K and C, and manganese. Many vets recommend green beans as a diet food — you can replace up to 50% of a dog\'s regular food with green beans to help with weight loss. Serve plain: steamed, boiled, or raw (cut small).',
        dosage: {
          small: '1-2 tablespoons per meal',
          medium: '2-4 tablespoons per meal',
          large: '¼-½ cup per meal',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Green beans are safe for cats but offer limited appeal to obligate carnivores.',
        details: 'Cooked green beans are non-toxic to cats and can provide fiber. However, cats are obligate carnivores and typically aren\'t interested in vegetables. If your cat enjoys them, offer small amounts as an occasional treat.',
        dosage: {
          small: '1 teaspoon',
          medium: '1-2 teaspoons',
          large: '1 tablespoon',
        },
      },
    },
    alternatives: ['carrots', 'pumpkin', 'sweet-potatoes', 'peas'],
    faqs: [
      { question: 'Can dogs eat canned green beans?', answer: 'Yes, but choose low-sodium or no-salt-added varieties. Rinse canned beans to remove excess sodium. Fresh or frozen (thawed) are the healthiest options.' },
    ],
  },
  {
    id: '29',
    name: 'Raspberries',
    slug: 'raspberries',
    emoji: '🫐',
    category: 'fruits',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Raspberries are safe in moderation — they contain natural xylitol but only in trace amounts.',
        details: 'Raspberries are safe for dogs and rich in antioxidants, fiber, and vitamin C. They contain trace amounts of natural xylitol, but you\'d need to feed cups of raspberries to reach toxic levels. Stick to a few berries as an occasional treat. They\'re also anti-inflammatory, which may help older dogs with joint issues.',
        dosage: {
          small: '2-3 raspberries',
          medium: '4-6 raspberries',
          large: '8-10 raspberries',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Raspberries are safe for cats in small amounts.',
        details: 'Cats can eat a few raspberries without issues. The trace xylitol is not a concern at normal treat quantities. Most cats aren\'t interested in fruit, but if yours enjoys raspberries, a few occasionally is fine.',
        dosage: {
          small: '1 raspberry',
          medium: '1-2 raspberries',
          large: '2-3 raspberries',
        },
      },
    },
    alternatives: ['blueberries', 'strawberries', 'watermelon', 'apples'],
    faqs: [],
  },
  {
    id: '30',
    name: 'Turkey',
    slug: 'turkey',
    emoji: '🦃',
    category: 'meats',
    pets: {
      dogs: {
        safety: 'safe',
        summary: 'Plain cooked turkey is safe and nutritious — avoid seasoned or processed turkey.',
        details: 'Plain, cooked turkey meat is an excellent protein source for dogs. Remove all skin (high in fat), bones (can splinter), and avoid seasoned or processed turkey (deli meat). Never feed turkey cooked with onions, garlic, or heavy seasonings. The dark meat is fattier; white meat is leaner.',
        dosage: {
          small: '30-50g per meal',
          medium: '50-100g per meal',
          large: '100-200g per meal',
        },
      },
      cats: {
        safety: 'safe',
        summary: 'Plain cooked turkey is a healthy treat for cats.',
        details: 'Cats can safely enjoy plain, cooked turkey as it\'s a good protein source. Remove skin, bones, and avoid seasoning. Don\'t give processed turkey or deli meat due to high sodium and additives.',
        dosage: {
          small: '20-30g per meal',
          medium: '30-50g per meal',
          large: '50-80g per meal',
        },
      },
    },
    alternatives: ['chicken', 'salmon', 'eggs'],
    faqs: [
      { question: 'Can dogs eat turkey bones?', answer: 'NO. Cooked turkey bones splinter easily and can cause choking, internal injuries, or intestinal blockage. Keep all turkey bones away from pets, especially during holidays.' },
    ],
  },
];

export const categories: { id: FoodCategory; name: string; emoji: string; isHighRisk?: boolean }[] = [
  { id: 'fruits', name: 'Fruits', emoji: '🍎' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥦' },
  { id: 'meats', name: 'Meats', emoji: '🥩' },
  { id: 'dairy', name: 'Dairy', emoji: '🧀' },
  { id: 'grains', name: 'Grains', emoji: '🌾' },
  { id: 'nuts', name: 'Nuts & Seeds', emoji: '🥜' },
  { id: 'sweets', name: 'Sweets', emoji: '🍬' },
  { id: 'seafood', name: 'Seafood', emoji: '🐟' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤' },
  { id: 'medications', name: 'Human Medications', emoji: '💊', isHighRisk: true },
  { id: 'other', name: 'Other', emoji: '🍽️' },
];

export function getFoodBySlug(slug: string): FoodItem | undefined {
  return foodDatabase.find(f => f.slug === slug);
}

export function searchFoods(query: string): FoodItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return foodDatabase.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.category.toLowerCase().includes(q) ||
    f.slug.toLowerCase().includes(q)
  );
}

export function getFoodsByCategory(category: FoodCategory): FoodItem[] {
  return foodDatabase.filter(f => f.category === category);
}

export function getRelatedFoods(food: FoodItem, _pet?: PetType): FoodItem[] {
  const alternativeSlugs = food.alternatives;
  const alternatives = foodDatabase.filter(f => alternativeSlugs.includes(f.slug));
  if (alternatives.length >= 4) return alternatives.slice(0, 5);
  
  const sameCategoryFoods = foodDatabase.filter(
    f => f.category === food.category && f.id !== food.id && !alternativeSlugs.includes(f.slug)
  );
  return [...alternatives, ...sameCategoryFoods].slice(0, 5);
}

// Get safe alternatives for toxic/caution foods based on category
export function getSafeAlternatives(food: FoodItem, pet: PetType): FoodItem[] {
  // Get foods from same category that are safe
  const sameCategorySafe = foodDatabase.filter(f => 
    f.category === food.category && 
    getPetData(f, pet).safety === 'safe' && 
    f.id !== food.id
  );
  
  // Also get from specified alternatives
  const specifiedAlternatives = food.alternatives
    .map(slug => foodDatabase.find(f => f.slug === slug))
    .filter((f): f is FoodItem => f !== undefined && getPetData(f, pet).safety === 'safe');
  
  // Combine and dedupe
  const combined = [...specifiedAlternatives, ...sameCategorySafe];
  const unique = Array.from(new Map(combined.map(f => [f.id, f])).values());
  
  return unique.slice(0, 4);
}

// Check if food is a medication
export function isMedication(food: FoodItem): boolean {
  return food.category === 'medications' || food.isMedication === true;
}

// Generate pet-specific FAQs by:
// 1. Adapting the static FAQs (replace dog/cat references with selected pet)
// 2. Adding dynamic pet-specific questions
export function generatePetFaqs(
  food: FoodItem,
  pet: PetType,
  petPluralLabel: string,
  petSingularLabel: string,
): { question: string; answer: string }[] {
  const data = getPetData(food, pet);
  const pl = petPluralLabel.toLowerCase();   // "hamsters"
  const sl = petSingularLabel.toLowerCase(); // "hamster"
  const fn = food.name.toLowerCase();        // "grapes"

  // 1. Adapt static FAQs — swap dog/cat references with selected pet
  const adapted = food.faqs.map(faq => ({
    question: faq.question
      .replace(/\bdogs?\b/gi, (m) => m[0] === m[0].toUpperCase() ? capitalize(m.length > 3 ? pl : sl) : (m.length > 3 ? pl : sl))
      .replace(/\bcats?\b/gi, (m) => m[0] === m[0].toUpperCase() ? capitalize(m.length > 3 ? pl : sl) : (m.length > 3 ? pl : sl)),
    answer: faq.answer
      .replace(/\bdogs\b/gi, pl)
      .replace(/\bdog\b/gi, sl)
      .replace(/\bcats\b/gi, pl)
      .replace(/\bcat\b/gi, sl),
  }));

  // 2. Build dynamic pet-specific questions based on safety
  const dynamic: { question: string; answer: string }[] = [];

  // Always add the core safety question
  dynamic.push({
    question: `Is ${fn} safe for ${pl}?`,
    answer: data.summary,
  });

  // Dosage question if data exists
  if (data.dosage) {
    dynamic.push({
      question: `How much ${fn} can a ${sl} eat?`,
      answer: `For small ${pl}: ${data.dosage.small}. For medium ${pl}: ${data.dosage.medium}. For large ${pl}: ${data.dosage.large}. Treats should make up no more than 10% of your ${sl}'s daily caloric intake.`,
    });
  }

  // Toxicity signs if toxic/caution with symptoms
  if ((data.safety === 'toxic' || data.safety === 'caution') && data.symptoms && data.symptoms.length > 0) {
    dynamic.push({
      question: `What are the signs of ${fn} toxicity in ${pl}?`,
      answer: `If your ${sl} eats ${fn}, watch for these symptoms: ${data.symptoms.join(', ')}. ${data.timeToSymptoms ? `Symptoms typically appear within ${data.timeToSymptoms}.` : ''} Contact your veterinarian immediately if you notice any of these signs.`,
    });
  }

  // Emergency question for toxic items
  if (data.safety === 'toxic') {
    dynamic.push({
      question: `What should I do if my ${sl} ate ${fn}?`,
      answer: data.emergencySteps
        ? data.emergencySteps.join(' ')
        : `Contact your veterinarian or the Pet Poison Helpline (855-764-7661) immediately. Do not wait for symptoms to appear.`,
    });
  }

  // Merge: dynamic first (always relevant), then adapted statics (deduplicated)
  const dynamicQuestions = new Set(dynamic.map(d => d.question.toLowerCase()));
  const deduped = adapted.filter(a => !dynamicQuestions.has(a.question.toLowerCase()));

  return [...dynamic, ...deduped];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Type for the per-pet data block
export type PetFoodData = FoodItem['pets']['dogs'];

// Helper that resolves pet data, falling back to dogs for pets
// that don't have dedicated data yet.  Generates appropriate
// generic text so the UI still reads naturally.
export function getPetData(food: FoodItem, pet: PetType): PetFoodData {
  if (pet === 'dogs') return food.pets.dogs;
  if (pet === 'cats') return food.pets.cats;

  const unverifiedPets: PetType[] = ['rabbits', 'guinea-pigs', 'hamsters', 'birds', 'bearded-dragons'];
  if (unverifiedPets.includes(pet)) {
    const petLabel = pet.replace('-', ' ');
    const petLabelPlural = pet === 'bearded-dragons' ? 'bearded dragons' : pet.replace('-', ' ') + 's';
    return {
      safety: 'caution',
      summary: 'Data Under Review by Vets. For safety reasons, please consult your veterinarian before feeding.',
      details: `Our veterinary nutritionists are currently compiling and reviewing the safety database for ${petLabelPlural}. Until verified, do not feed ${food.name.toLowerCase()} or any other human foods to your ${petLabel} without direct veterinary guidance.`,
      emergencySteps: [
        'Do not feed this item.',
        'Consult your veterinarian for species-specific advice.'
      ],
      symptoms: []
    };
  }

  // For all other pets fall back to the dogs data as a baseline,
  // but swap the name token so the summary reads correctly.
  const base = { ...food.pets.dogs };
  // Replace "dogs" / "dog" references with the generic pet label
  const petLabel = pet.replace('-', ' ');
  base.summary = base.summary
    .replace(/\bdogs\b/gi, petLabel)
    .replace(/\bdog\b/gi, petLabel);
  base.details = base.details
    .replace(/\bdogs\b/gi, petLabel)
    .replace(/\bdog\b/gi, petLabel);
  return base;
}

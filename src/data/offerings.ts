/**
 * Content for the IV Lounge and Smoothie Bike pages, taken from the existing
 * Mintirho website. Unverifiable metrics from the legacy Smoothie Bike page
 * ("+200% Energy", "100% Fresh", response time promises) and its fictional
 * reviews are deliberately omitted.
 *
 * Copy style: visible text never contains hyphens or dashes.
 */

export const ivLounge = {
  intro:
    "Our IV lounge offers a range of intravenous therapies designed to replenish, rejuvenate and revive your body. Whether you're looking to boost your energy, enhance your immune system, recover from a workout, or simply hydrate, our team provides tailored IV treatments in a relaxing and comfortable environment.",
  drips: [
    'Energy',
    'Anti Inflammatory',
    'Colds & Flu',
    'JetFuel',
    'Lymph Drainage',
    'Weight Loss',
    'Anti Aging',
    'Anti Stress',
    'Libido',
    'Menopause',
    "Myers' Cocktail",
    'Detox',
    'Hangover',
    'Liver Detox',
    'Sport Injury & Recovery',
    'Glutathione',
    'Rheumatoid Arthritis',
    'Anti Acne',
    'HIV Immune Booster',
  ],
  /** A few drips from the list above, shown on the homepage. */
  highlights: ['JetFuel', "Myers' Cocktail", 'Energy', 'Anti Inflammatory'],
  brochure: {
    href: '/docs/mintirho-iv-drip-brochure.pdf',
    label: 'Download the IV drip brochure',
    size: 'PDF, 11.6 MB',
  },
  // Source: Mintirho's IV Lounge flyer (legacy img/IV/IV_Ad.webp).
  paymentNote:
    'We only accept cash payments for orders. No medical aids accepted. Payment is made upfront to confirm your order.',
  bookingSubject: 'IV Lounge booking enquiry',
};

export const smoothieBike = {
  brand: 'Pedal & Blend',
  invitation:
    'We warmly invite you to experience the fun and healthy way to blend your own smoothies. Come and try it today!',
  intro:
    'Our smoothie bikes let you blend healthy drinks using your own pedal power. It’s fitness, nutrition and fun in one experience.',
  steps: [
    {
      title: 'Choose your fruit',
      body: 'Select from our fresh ingredients: berries, tropical fruit and more.',
    },
    {
      title: 'Pedal to blend',
      body: 'Start pedalling and watch your ingredients turn into a smooth drink.',
    },
    {
      title: 'Enjoy',
      body: 'Sip your fresh creation, made with your own energy.',
    },
  ],
  benefits: [
    {
      title: 'Movement',
      body: 'The blender is powered by pedalling, so every smoothie starts with a little exercise.',
    },
    {
      title: 'Fresh nutrition',
      body: 'Smoothies are blended on the spot from fresh fruit that each person chooses.',
    },
    {
      title: 'Fun',
      body: 'An activity people enjoy taking part in together.',
    },
    {
      title: 'Memorable',
      body: 'Guests remember making their own. It’s more than handing out a drink.',
    },
  ],
  occasions: ['Events', 'Parties', 'Regular sessions'],
  closing:
    'For anyone seeking a fun experience that supports physical wellness and encourages nutritious choices.',
  whatsappMessage: 'Hi, I am interested in your smoothie bike service',
};

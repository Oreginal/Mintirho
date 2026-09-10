/**
 * Single source of truth for Mintirho's business details.
 *
 * Every value here is taken from the existing Mintirho website
 * (mintirhohcs.co.za). Do not add facts that cannot be verified with the client.
 *
 * Copy style: visible text never contains hyphens or dashes.
 */

export interface Client {
  name: string;
  logo?: ImageMetadata;
}

export interface Testimonial {
  quote: string;
  name: string;
  source: string;
}

const address = {
  street: 'Suite 3, 65 Clinton Road',
  suburb: 'New Redruth',
  city: 'Alberton',
  postalCode: '1448',
  region: 'Gauteng',
  country: 'ZA',
} as const;

export const site = {
  name: 'Mintirho Healthcare and Consulting Services',
  shortName: 'Mintirho',
  legalName: 'Mintirho Healthcare and Consulting Services (Pty) Ltd',
  url: 'https://www.mintirhohcs.co.za',

  registered: { iso: '2014-09', display: 'September 2014' },
  operational: { iso: '2015-04', display: 'April 2015' },
  /** Not displayed anywhere: removed from the site at the client's request. */
  ownership: {
    summary: '100% Black owned',
    detail: '65% black women owned and 35% black men owned',
  },

  phones: {
    office: { display: '(011) 021 2821', href: 'tel:+27110212821', e164: '+27110212821' },
    mobile: { display: '+27 81 049 8443', href: 'tel:+27810498443', e164: '+27810498443' },
  },
  whatsappNumber: '27810498443',

  emails: {
    admin: 'admin@mintirhohcs.co.za',
    ivLounge: 'ivlounge@mintirhohcs.co.za',
  },

  address,
  addressLines: [address.street, `${address.suburb}, ${address.city}, ${address.postalCode}`],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Suite 3, 65 Clinton Road, New Redruth, Alberton, 1448'),

  hours: {
    display: 'Monday to Friday, 9am to 6pm',
    short: 'Mon to Fri, 9am to 6pm',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },

  socials: [
    {
      label: 'Facebook',
      handle: '@mintirhohcs',
      icon: 'facebook',
      href: 'https://www.facebook.com/mintirhohcs',
    },
    {
      label: 'Instagram',
      handle: '@mintirho_healthcare',
      icon: 'instagram',
      href: 'https://www.instagram.com/mintirho_healthcare',
    },
  ],

  /**
   * Accreditation label on the homepage hero, added at the client's request
   * (from the Stitch design). Confirm it is accurate, and ideally name the
   * accrediting body, before the site goes live.
   */
  accreditation: 'Accredited practice',

  /**
   * Client organisations. Intentionally empty: the legacy About page listed
   * client names in a hidden section with placeholder copy. Add entries only
   * once Mintirho confirms they may be published. The About page renders a
   * clients strip automatically when this array has items.
   */
  clients: [] as Client[],
} as const;

/**
 * Reviews from Mintirho's Google Business profile, limited to reviews with text.
 * Quoted as written; emoji and Google's truncation marks removed, names capitalised.
 * Star ratings and dates are deliberately not shown (they go stale).
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'The service was exceptional! I would definitely recommend this facility to my family and friends!',
    name: 'Khumbuzile Mbuqe',
    source: 'Google review',
  },
  {
    quote: 'What a great service. Medicals for 10 employees completed in 2 hours.',
    name: 'Thami Matebula',
    source: 'Google review',
  },
  {
    quote: 'Excellent, professional and efficient services.',
    name: 'Faiyaz Buys',
    source: 'Google review',
  },
  {
    quote: 'Very efficient and professional service.',
    name: 'Manna Headoffice',
    source: 'Google review',
  },
  {
    quote: 'Thank you so much for taking care of me. Your service is absolutely outstanding.',
    name: 'Beauty4Ashies Brow & Nail Bar',
    source: 'Google review',
  },
  {
    quote: 'Thank you so much for the experience. I had a lot of fun.',
    name: 'Lepina Mogorosi',
    source: 'Google review',
  },
];

/** Mintirho's Google Business profile (reviews tab). */
export const reviews = {
  url: 'https://www.google.com/maps/place/Mintirho+Healthcare+And+Consulting+Services/@-26.272605,28.1212023,17z/data=!4m8!3m7!1s0x1e951aa928fa40f1:0x18bb86d01f9d416e!8m2!3d-26.272605!4d28.1212023!9m1!1b1!16s%2Fg%2F11f08hfbcc',
};

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoUrl(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

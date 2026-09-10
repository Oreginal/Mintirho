/**
 * Service content. Copy is taken from the existing Mintirho services page.
 * Services marked `status: 'pending'` exist in Mintirho's offering but have no
 * complete published description yet. Fill in `intro` and `sections` when the
 * client supplies it, then set `status: 'complete'`.
 *
 * Copy style: visible text never contains hyphens or dashes.
 */

export type ServiceGroup = 'occupational' | 'wellness';

export interface ServiceSection {
  heading: string;
  body?: string;
  items?: string[];
}

export interface Service {
  slug: string;
  title: string;
  /** Short label for navigation. */
  navLabel: string;
  group: ServiceGroup;
  /** One or two sentences for listings, derived only from the source copy. */
  summary: string;
  intro?: string[];
  sections: ServiceSection[];
  status: 'complete' | 'pending';
  /** Pages that live outside /services/[slug]. */
  href?: string;
  /** Value passed to the contact form's topic select. */
  topic: string;
}

export const groups: Record<ServiceGroup, { title: string; eyebrow: string; description: string }> =
  {
    occupational: {
      title: 'Occupational health',
      eyebrow: 'Services',
      description:
        'Helping employers meet their legal obligations under the Occupational Health and Safety Act and the Mine Health and Safety Act.',
    },
    wellness: {
      title: 'Wellness',
      eyebrow: 'Wellness',
      description:
        'Services that support the health of employees and individuals beyond compliance.',
    },
  };

export const services: Service[] = [
  {
    slug: 'medical-surveillance',
    title: 'Medical Surveillance',
    navLabel: 'Medical Surveillance',
    group: 'occupational',
    summary:
      'Medical screening programmes that keep your workforce healthy, safe and compliant, from physical examinations to audiometry, vision and lung function testing.',
    intro: [
      'Our commitment is to provide a quality of service that is cost effective and reliable whilst remaining within the ethical and legal frameworks of the professional field within which we practice.',
      'We assist the client to reduce man hours by ensuring that the workforce is healthy, safe and able to keep up with production requirements.',
    ],
    sections: [
      {
        heading: 'Medical surveillance includes',
        items: [
          'Physical examination',
          'Audiometry',
          'Vision screening',
          'Spirometry (lung function test)',
          'Biological monitoring, including blood tests where required',
          'Referrals and specialist consultations where required',
        ],
      },
    ],
    status: 'complete',
    topic: 'medical-surveillance',
  },
  {
    slug: 'risk-assessment',
    title: 'Hygiene Surveys and Risk Assessment',
    navLabel: 'Risk Assessment',
    group: 'occupational',
    summary:
      'Risk assessments and hygiene surveys that measure and quantify workplace exposure, forming the basis of your medical surveillance programme.',
    intro: [
      'We conduct risk assessments and hygiene surveys to measure and quantify the risks and hazards of exposure.',
    ],
    sections: [
      {
        heading: 'What we do',
        items: [
          'Conduct risk assessments and hygiene surveys to measure and quantify the risks and hazards of exposure',
          'Develop risk based job specifications',
          'Formulate medical surveillance programmes',
        ],
      },
    ],
    status: 'complete',
    topic: 'risk-assessment',
  },
  {
    slug: 'on-site-clinic',
    title: 'On Site Clinic Management',
    navLabel: 'On Site Clinic',
    group: 'occupational',
    summary:
      'Setting up and managing a clinic at your workplace, so employees receive care without being taken away from production.',
    sections: [
      {
        heading: 'What we provide',
        items: [
          'Assistance with setting up an on site facility',
          'Qualified personnel to assist with day to day clinic management activities',
          'On site medicine supplies managed by duly licensed personnel',
          'All services offered by Mintirho Healthcare and Consulting Services, delivered on site, so there is no need to take groups of employees away from production',
          'Medical services within reach for the treatment of injuries and other ailments',
        ],
      },
    ],
    status: 'complete',
    topic: 'on-site-clinic',
  },
  {
    slug: 'injury-on-duty',
    title: 'Injury on Duty Management',
    navLabel: 'Injury on Duty',
    group: 'occupational',
    summary:
      'Support with injury on duty cases, from assessment of the injury to completion of WCA forms.',
    // Source: the injury on duty process graphic on the legacy services page.
    // Only the first step's wording is complete in that graphic; the remaining
    // steps ("Accompany…", "Follow up on and administration of…", "Reporting on
    // employee…") are truncated and must be confirmed with Mintirho before use.
    sections: [
      {
        heading: 'What we do',
        items: ['Assessment of injury and completion of WCA forms'],
      },
    ],
    status: 'pending',
    topic: 'injury-on-duty',
  },
  {
    slug: 'smoothie-bike',
    title: 'Smoothie Bike',
    navLabel: 'Smoothie Bike',
    group: 'wellness',
    summary:
      'Pedal & Blend: a pedal powered blender that turns a little exercise into a fresh smoothie. Available for events, parties and regular sessions.',
    sections: [],
    status: 'complete',
    href: '/smoothie-bike',
    topic: 'smoothie-bike',
  },
  {
    slug: 'employee-wellness',
    title: 'Employee Wellness',
    navLabel: 'Employee Wellness',
    group: 'wellness',
    summary:
      'Wellness education, wellness events and health screening for your employees, including HIV testing and TB screening.',
    sections: [
      {
        heading: 'Services include',
        items: [
          'Wellness education',
          'Wellness events',
          'Family planning',
          'Pap smears',
          'HIV testing and TB screening',
        ],
      },
    ],
    status: 'complete',
    topic: 'employee-wellness',
  },
  {
    slug: 'iv-lounge',
    title: 'IV Lounge',
    navLabel: 'IV Lounge',
    group: 'wellness',
    summary:
      'A range of intravenous therapies designed to replenish, rejuvenate and revive, delivered in a relaxing and comfortable environment.',
    sections: [],
    status: 'complete',
    href: '/iv-lounge',
    topic: 'iv-lounge',
  },
];

/**
 * Offerings named on the existing site with no published description.
 * Listed on the services overview; they get pages once content exists.
 */
export const additionalOfferings = ['Education', 'Consulting Services'];

export function serviceHref(service: Service): string {
  return service.href ?? `/services/${service.slug}`;
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

export function getService(slug: string): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}

/** Services rendered through the shared /services/[slug] template. */
export const templatedServices = services.filter((s) => !s.href);

export const contactTopics = [
  { value: 'general', label: 'General enquiry' },
  ...services.map((s) => ({ value: s.topic, label: s.title })),
];

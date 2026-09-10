/**
 * JSON-LD builders. Only verified facts from src/data/site.ts are emitted.
 *
 * Deliberately excluded: aggregateRating, review, priceRange/offers, areaServed,
 * geo, medicalSpecialty and any service-level claims. The allow-lists below
 * are enforced by tests/structured-data.spec.ts — extend them only with facts
 * the client has confirmed.
 */
import { site } from '../data/site';

export const ORGANIZATION_KEYS = [
  '@context',
  '@type',
  '@id',
  'name',
  'legalName',
  'url',
  'logo',
  'telephone',
  'email',
  'address',
  'foundingDate',
  'sameAs',
  'openingHoursSpecification',
] as const;

export const BREADCRUMB_KEYS = ['@context', '@type', 'itemListElement'] as const;

export function organizationSchema(logoUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: logoUrl,
    telephone: [site.phones.office.e164, site.phones.mobile.e164],
    email: site.emails.admin,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: `${site.address.suburb}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    foundingDate: site.registered.iso,
    sameAs: site.socials.map((s) => s.href),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...site.hours.days],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, site.url).href,
    })),
  };
}

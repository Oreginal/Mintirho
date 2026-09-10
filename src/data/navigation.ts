import { servicesByGroup, serviceHref, type ServiceGroup } from './services';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  /** Dropdown children; when present the item renders as a disclosure. */
  children?: NavLink[];
  /** Overview link shown at the foot of the dropdown. */
  overview?: NavLink;
}

const dropdownLinks = (group: ServiceGroup): NavLink[] =>
  servicesByGroup(group).map((s) => ({
    label: s.navLabel,
    href: serviceHref(s),
  }));

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    children: dropdownLinks('occupational'),
    overview: { label: 'All services', href: '/services' },
  },
  {
    label: 'Wellness',
    children: dropdownLinks('wellness'),
    overview: { label: 'All services', href: '/services#wellness' },
  },
  { label: 'Contact', href: '/contact' },
];

/** True when `path` is the item's page or one of its dropdown pages. */
export function isActive(item: NavItem, path: string): boolean {
  const normalise = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  const current = normalise(path);
  if (item.href) return normalise(item.href) === current;
  return (item.children ?? []).some((child) => normalise(child.href) === current);
}

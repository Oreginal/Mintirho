export const routes = [
  '/',
  '/about',
  '/services',
  '/services/medical-surveillance',
  '/services/risk-assessment',
  '/services/on-site-clinic',
  '/services/injury-on-duty',
  '/services/employee-wellness',
  '/iv-lounge',
  '/smoothie-bike',
  '/contact',
] as const;

export const isMobileProject = (name: string) => name === 'iphone' || name === 'pixel';
export const isDesktopProject = (name: string) => name === 'desktop';

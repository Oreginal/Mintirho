/**
 * Header navigation behaviour.
 *
 * Markup contract (see SiteHeader.astro, NavDropdown.astro, MobileNav.astro):
 *   [data-site-header]                      header element (gets data-scrolled)
 *   [data-dropdown]                         desktop disclosure wrapper (gets data-open)
 *     button[data-dropdown-trigger]         aria-expanded + aria-controls
 *     [data-dropdown-panel]                 panel containing links
 *   button[data-menu-open]                  opens the mobile menu
 *   dialog[data-menu]                       mobile menu (native modal dialog)
 *     button[data-menu-close]               closes it
 *     button[data-accordion-trigger]        aria-expanded + aria-controls
 *
 * Uses the disclosure pattern rather than ARIA menus: these are site
 * navigation links, not application menus.
 */

const HOVER_QUERY = '(hover: hover) and (pointer: fine)';
const DESKTOP_QUERY = '(min-width: 64em)';
const OPEN_DELAY = 60;
const CLOSE_DELAY = 200;

function initDropdown(root: HTMLElement, signal: AbortSignal): void {
  const trigger = root.querySelector<HTMLButtonElement>('[data-dropdown-trigger]');
  const panel = root.querySelector<HTMLElement>('[data-dropdown-panel]');
  if (!trigger || !panel) return;

  const links = () => Array.from(panel.querySelectorAll<HTMLAnchorElement>('a[href]'));
  const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';
  let timer: number | undefined;
  let openedByHover = false;

  const setOpen = (open: boolean) => {
    window.clearTimeout(timer);
    trigger.setAttribute('aria-expanded', String(open));
    root.toggleAttribute('data-open', open);
    if (!open) openedByHover = false;
  };

  trigger.addEventListener(
    'click',
    () => {
      // A mouse user who hovered the menu open then clicks expects it to stay open.
      if (openedByHover) {
        openedByHover = false;
        setOpen(true);
        return;
      }
      setOpen(!isOpen());
    },
    { signal },
  );

  const canHover = window.matchMedia(HOVER_QUERY);
  root.addEventListener(
    'pointerenter',
    (event) => {
      if (event.pointerType !== 'mouse' || !canHover.matches) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (!isOpen()) openedByHover = true;
        setOpen(true);
      }, OPEN_DELAY);
    },
    { signal },
  );
  root.addEventListener(
    'pointerleave',
    (event) => {
      if (event.pointerType !== 'mouse' || !canHover.matches) return;
      window.clearTimeout(timer);
      // Keep the panel open if keyboard focus is inside it.
      if (root.contains(document.activeElement) && !openedByHover) return;
      timer = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
    },
    { signal },
  );

  root.addEventListener(
    'keydown',
    (event) => {
      const items = links();
      const index = items.indexOf(document.activeElement as HTMLAnchorElement);

      switch (event.key) {
        case 'Escape':
          if (!isOpen()) return;
          event.preventDefault();
          setOpen(false);
          trigger.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen()) setOpen(true);
          items[index < 0 ? 0 : (index + 1) % items.length]?.focus();
          break;
        case 'ArrowUp':
          if (index < 0) return;
          event.preventDefault();
          items[(index - 1 + items.length) % items.length]?.focus();
          break;
        case 'Home':
          if (index < 0) return;
          event.preventDefault();
          items[0]?.focus();
          break;
        case 'End':
          if (index < 0) return;
          event.preventDefault();
          items[items.length - 1]?.focus();
          break;
      }
    },
    { signal },
  );

  root.addEventListener(
    'focusout',
    (event) => {
      const next = event.relatedTarget as Node | null;
      if (next && !root.contains(next)) setOpen(false);
    },
    { signal },
  );

  document.addEventListener(
    'pointerdown',
    (event) => {
      if (isOpen() && !root.contains(event.target as Node)) setOpen(false);
    },
    { signal },
  );
}

function initMobileMenu(signal: AbortSignal): void {
  const dialog = document.querySelector<HTMLDialogElement>('dialog[data-menu]');
  const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!dialog || !openButton) return;

  openButton.addEventListener(
    'click',
    () => {
      dialog.showModal();
      openButton.setAttribute('aria-expanded', 'true');
    },
    { signal },
  );

  dialog.querySelectorAll<HTMLButtonElement>('[data-menu-close]').forEach((button) => {
    button.addEventListener('click', () => dialog.close(), { signal });
  });

  dialog.addEventListener(
    'close',
    () => {
      openButton.setAttribute('aria-expanded', 'false');
      if (document.contains(openButton)) openButton.focus();
    },
    { signal },
  );

  // Tapping the backdrop closes the menu.
  dialog.addEventListener(
    'click',
    (event) => {
      if (event.target === dialog) dialog.close();
    },
    { signal },
  );

  // Links close the menu so it never lingers after an in-page or same-page navigation.
  dialog.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    link.addEventListener('click', () => dialog.close(), { signal });
  });

  const desktop = window.matchMedia(DESKTOP_QUERY);
  desktop.addEventListener(
    'change',
    (event) => {
      if (event.matches && dialog.open) dialog.close();
    },
    { signal },
  );

  dialog.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]').forEach((button) => {
    const panelId = button.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    button.addEventListener(
      'click',
      () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(open));
        if (panel) panel.hidden = !open;
      },
      { signal },
    );
  });
}

function initScrolledState(signal: AbortSignal): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 8);
    ticking = false;
  };
  update();
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true, signal },
  );
}

let controller: AbortController | undefined;

/** Safe to call on every page load; removes listeners from the previous page. */
export function initNavigation(): void {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  document
    .querySelectorAll<HTMLElement>('[data-dropdown]')
    .forEach((root) => initDropdown(root, signal));
  initMobileMenu(signal);
  initScrolledState(signal);
}

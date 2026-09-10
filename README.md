# Mintirho Healthcare and Consulting Services website

A static, multi-page website built with [Astro](https://astro.build). The visual design is based on the Google Stitch project "Mintirho Healthcare Modern Redesign". All business content comes from Mintirho's existing website.

## Scripts

| Command              | What it does                                                  |
| -------------------- | ------------------------------------------------------------- |
| `npm install`        | Install dependencies                                          |
| `npm run dev`        | Start the local dev server at `http://localhost:4321`         |
| `npm run build`      | Type check, then build the production site into `dist/`       |
| `npm run preview`    | Serve the built `dist/` folder locally                        |
| `npm run lint`       | ESLint, including accessibility rules for Astro templates     |
| `npm run check`      | Astro and TypeScript diagnostics                              |
| `npm run format`     | Format all files with Prettier                                |
| `npm run test:build` | Build with `.env.test`, so the enquiry form renders for tests |
| `npm test`           | Run the Playwright suite (desktop, tablet, iPhone and Pixel)  |

To run the tests, first run `npm run test:build`, then `npm test`.

## Before going live

1. **Set up the enquiry form.** Create a free access key at [web3forms.com](https://web3forms.com) for `admin@mintirhohcs.co.za`.
   - Set it as `PUBLIC_WEB3FORMS_KEY`: in `.env` locally, and in your hosting provider's environment variables.
   - Without a key, the forms show email and WhatsApp links instead.
2. **Build and deploy.** Run `npm run build` and deploy the `dist/` folder. It is plain static HTML, so it works on Vercel, Netlify or the existing cPanel host (upload the contents of `dist/`).
3. **Clean up the old site.** The current live site (`mintirhohcs.co.za/about.html`) has been compromised and serves unrelated spam. Replacing the hosting files, and changing the hosting and FTP passwords, is recommended.

## Editing content

All business content lives in `src/data/`:

- **`site.ts`:** contact details, opening hours, social links, testimonials. There is also an empty `clients` list that fills an About page section once clients are confirmed for publication.
- **`services.ts`:** every service page. Services marked `status: 'pending'` show a "more detail on the way" notice. When the client supplies the full description, fill in `intro` and `sections`, then set `status: 'complete'`.
  - Injury on Duty Management is pending. Its remaining process steps were truncated in the old site's graphic.
  - Education and Consulting Services are listed without pages.
- **`offerings.ts`:** IV Lounge drips, payment note and brochure, and the Smoothie Bike steps, benefits and occasions.
- **`navigation.ts`:** the header menu, which is built automatically from `services.ts`.

### Content rules (enforced by tests)

- **Only verified facts.** No invented statistics, certifications, clients, testimonials or claims. `tests/content.spec.ts` fails on common invented claims.
- **No hyphens or dashes in visible text.** Write "on site", "day to day" and "9am to 6pm". Slugs, URLs and code are not affected.
- **No Mintirho Shop.** The service has been discontinued.
- **Structured data is allow-listed.** It only contains verified business facts; see `src/lib/schema.ts`.

## Placeholder images and video

Some images are **temporary AI generated placeholders from the Stitch design**. They are listed in `src/data/media.ts`, and the files live in `src/assets/placeholders/`.

| Placeholder       | Where it appears                                |
| ----------------- | ----------------------------------------------- |
| `homeHero`        | Homepage hero                                   |
| `smoothieHero`    | Smoothie Bike hero                              |
| `clinicScreening` | Services page and Medical Surveillance hero     |
| `smoothieFeature` | Homepage Smoothie Bike band, social share image |

To replace one, overwrite the file (or change its import), update its `alt` text and set `placeholder: false`.

**Video:** Mintirho's own Smoothie Bike video (`public/video/smoothie-bike.mp4`) plays in the Smoothie Bike "in action" section, with a frame from the video as its poster. Its audio was removed at the client's request, so it plays silently and never autoplays. If a version with speech is used later, add a WebVTT captions file and set `smoothieVideo.captions` in `src/data/media.ts`.

**Replace before launch.** Some placeholders show third party branding, or certificates Mintirho has not claimed:

- `smoothieHero`: Discovery and VUMA logos
- `clinicScreening`: Medcor branding
- `homeHero`: HPCSA and SABS plaques

Feature photos use `src/components/FeatureImage.astro`, the framed card from the Stitch design. Its caption and overlay text must stay factual.

## Structure

```
src/
  assets/      Real Mintirho photos and the logo (optimised at build time)
  components/  Header, footer, mobile menu, form, reusable sections
  data/        All editable content
  layouts/     BaseLayout: SEO, structured data, fonts, page transitions
  lib/         JSON-LD builders
  pages/       One file per route; services/[slug].astro renders service pages
  scripts/     nav.ts (menus), form.ts (enquiry form), motion.ts (GSAP)
  styles/      tokens.css (design tokens from Stitch), global.css
tests/         Playwright suites: pages, content, navigation, form, a11y, motion
reference/     The client's clean copy of the old About page (not published)
```

## Motion

- **One file:** all animation lives in `src/scripts/motion.ts`. GSAP loads on demand after the page renders.
- **What moves:** only the hero, section reveals and a subtle image drift, which is desktop only.
- **Phones:** below 48em (768px) GSAP is never loaded. Content appears instantly, which saves CPU and battery on mobile devices.
- **Reduced motion:** everything is disabled when the visitor prefers reduced motion.
- **Content is never hidden:** if JavaScript fails, a CSS fallback reveals everything.

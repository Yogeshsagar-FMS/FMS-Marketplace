# FMS Circle

A campus marketplace for FMS Delhi students. An expressive FMS-first landing and working campus marketplace built with JavaScript, CSS, and Vite: maroon and butter-yellow surfaces, oversized Bricolage Grotesque typography, the FMS institutional identity, and locally bundled photographic cutouts. This is an independent student concept, not an official institute service.

## Run

Node.js 22 or newer:

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

```sh
npm test
npm run build
npm run preview -- --port 4173
```

## What works

- Animated FMS landing: floating clickable product cutouts, pointer depth, finite type reveal, a pausable campus ticker, and working hero search.
- Category collection posters and an interactive three-chapter senior-to-junior handover story.
- Search by item, description, or category; category, condition, and budget filters; price and newest sorting.
- Saved finds, item details, pickup location, and seller information.
- Listing form with photo preview, type/size validation, free items, local persistence, and recoverable storage errors.
- Your listings, contact disclosure/copy, and removal with confirmation.
- Mobile bottom navigation, keyboard access, native focus-trapping dialogs, reduced-motion support, and image fallbacks.

## Prototype scope

Starter listings and sellers are demonstrations. Illustrative product photos were AI-generated and are not evidence of specific items for sale. Listings and favourites are saved in the current browser, not shared across students. Contact information on your listings is visible to anyone using that browser; do not enter sensitive information on a shared device.

There is no authentication, account verification, payment processing, or private messaging. A shared launch needs a backend, student verification, shared photo storage, moderation, and appropriate privacy controls. `src/storage.js` isolates persistence for that migration. Nothing is sent to an external application service today.

## Project map

- `src/main.js`: marketplace views, forms, navigation, and interactions.
- `src/landing.js` and `src/landing.css`: FMS identity, landing composition, motion, hero search, collection posters, and handover narrative.
- `src/data.js`: demonstration inventory and categories.
- `src/storage.js`: validated local storage, migration, and persistence.
- `src/icons.js`: consistent authored SVG icon family.
- `src/style.css`: layout, responsive styles, and motion.
- `public/`: bundled photos, their prompt provenance, fonts, and licenses.
- `tests/storage.test.js`: storage corruption, validation, migration, quota failures, and inventory checks.
- `PRODUCT.md` and `DESIGN.md`: audience, scope, and design decisions.
- `.agents/skills/`: installed Emil Kowalski and Impeccable guidance.

## Validation

Eight automated Node tests cover storage and data boundaries. Chromium functional validation covered 35 marketplace checks and 24 additional landing checks (including motion pause/resume, real hero search, collections, handover state, institutional identity, and reduced motion), including listing/photo persistence across reloads, combined filters, favourite persistence, escaped content, contact disclosure, removal, keyboard navigation, responsive widths from 320 to 1440px, and reduced motion. Home and listing-form axe checks reported zero WCAG A/AA violations. This does not establish full accessibility conformance or physical-device testing.

Fonts and images are self-hosted; core pages require no external font or image network access. Image and font licenses/provenance ship alongside the assets.

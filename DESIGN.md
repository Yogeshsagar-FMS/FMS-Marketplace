---
name: FMS Circle
description: "A bold campus exchange: FMS. Full circle."
colors:
  wine: "#6b142e"
  wine-deep: "#4b1024"
  butter: "#f1df93"
  paper: "#fcf6ed"
  ink: "#3e1828"
  muted: "#765961"
  accent: "#97203f"
  line: "#ddcdd0"
  mint: "#f0e2df"
  white: "#ffffff"
  field: "#fffbf6"
  field-line: "#ceb4bd"
  chip: "#efe5e1"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(110px, 13.8vw, 200px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.015em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.01em"
  price:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "24px"
    fontWeight: 750
    lineHeight: 1.1
rounded:
  poster: "2px"
  button: "6px"
  filter: "5px"
  badge: "4px"
  field: "7px"
  input: "8px"
  photo: "4px"
  dialog: "16px"
  pill: "100px"
  circle: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "13px 23px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "13px 23px"
  button-light:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "13px 23px"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px 12px"
  category:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.ink}"
    rounded: "{rounded.filter}"
    padding: "10px 15px"
  category-selected:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.paper}"
  photo-well:
    rounded: "{rounded.photo}"
  button-header:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.wine}"
    rounded: "{rounded.button}"
    height: "44px"
---

# Design System: FMS Circle

## Overview

**Creative North Star: "FMS. Full circle."**

An expressive student exchange grounded in FMS Delhi: deep maroon, butter yellow, ivory paper and oversized Bricolage Grotesque lettering. The sourced eagle identity and familiar campus belongings establish place; rotated poster compositions and moving photographic cutouts bring the energy of a student festival programme to an everyday handover.

The user explicitly rejected the restrained forest/serif catalogue. This replacement identity is bold, playful and animated while keeping item comparison and listing practical. The FMS Circle name remains; institutional imagery identifies the campus without claiming an official service. Sample listings and generated photography remain clearly disclosed.

**Key Characteristics:**
- Oversized grotesque lettering with practical DM Sans controls.
- Maroon fields, butter highlights and warm paper inventory.
- Rotated posters and photographic cutouts with soft object depth.
- Flat listing bodies with visible price, condition and pickup.
- Pausable decorative motion and complete reduced-motion states.

## Colors

The palette combines deep maroon identity fields with butter-yellow energy and warm paper utility surfaces. Frontmatter values are normative; the legacy `mint` token now names a warm blush ground.

### Primary
- **Campus Maroon / Deep Maroon:** Hero, finale, selected categories and handover emphasis.
- **Raspberry Accent:** Primary listing actions, saved hearts, emphasis and keyboard focus.

### Secondary
- **Butter Yellow:** Hero emphasis, header listing action, ticker and handover story ground.

### Neutral
- **Warm Paper / Plum Ink:** Main canvas and readable text; paper reverses onto maroon.
- **Muted Plum / Blush Rule:** Supporting information and thin dividers.
- **Blush Ground:** Photo placeholders, notices and utility panels; it does not imply verification.
- **White / Field Paper / Field Rule / Quiet Chip:** Action contrast, clear form controls and unselected filters.

**The Campus Color Rule.** Use maroon and butter as substantial identity fields as well as action colors; keep inventory facts readable on warm paper.

## Typography

**Display Font:** Self-hosted Bricolage Grotesque (`/fonts/bricolage.ttf`), variable weights 200–800, with sans-serif fallback.
**Body Font:** Self-hosted DM Sans, with sans-serif fallback.

The expressive grotesque carries headings, poster lettering and prices; DM Sans keeps item names, labels and explanations practical. The inherited CSS variable named `--serif` now resolves to Bricolage Grotesque and does not indicate a serif role.

### Hierarchy
- **Display:** Frontmatter describes the desktop hero at weight 800. It uses 14.3vw up to 1150px, 14.7vw up to 900px and 15.2vw on phones. The finale uses `clamp(70px, 11vw, 160px)` and 14.9vw on phones.
- **Headline:** Inventory uses the frontmatter role, becoming 31px on phones and 28px below 360px. Collection headings use `clamp(38px, 4.5vw, 62px)`; story headings use `clamp(44px, 5.1vw, 72px)` at weight 800 and line-height 0.98.
- **Title:** Sans item identification remains 15px desktop, 13px mobile and 15px in the narrow single-column grid.
- **Body:** Hero support uses 15px/1.8 desktop and 12px mobile; story and utility copy adapt to their surfaces.
- **Label:** Standard actions use 13px/600. Phone institution text is 11px with 10px secondary text; motion and demo-status controls are 11px. Preserve these final legibility corrections.
- **Price:** Card prices use the frontmatter role with tight tracking and tabular numerals; phones retain 24px prices.

**The Oversized Voice Rule.** Let expressive headings occupy the available width; preserve the shipped oversized display scale rather than imposing the former catalogue cap.

## Layout

The reusable content shell caps at 1280px, with 48px side gutters on desktop, 28px up to 900px, 18px up to 640px and 14px below 360px. The hero has its own 1500px canvas. Its centered type and search sit among perimeter cutouts; this landing composition is documented in the surface brief rather than required of every screen.

Collection posters form three columns on desktop and a horizontal phone strip. Inventory uses four columns, three up to 900px, two up to 640px and one below 360px. Card bodies remain compact and unboxed. Pickup wraps onto its own seller row up to 1150px. The handover story uses two columns and stacks on phones.

Phone hero height is `calc(580px + 25vw)`, becoming 640px below 360px, so campus identity, search and motion control share the first screen. The lamp cutout hides on smaller layouts. Forms retain paired photo/field columns on desktop and stack on mobile; editable phone field text is 16px. Native dialogs scroll within the viewport. Fixed mobile navigation includes a safe-area inset and reserved page space.

## Elevation & Depth

Photographic cutouts use soft drop shadows, overlaps, rotation and pointer depth. Orbit lines give the hero a sense of space; listing bodies remain flat. Dialogs and transient feedback retain soft elevation. Hard offset shadows are not part of this build.

### Shadow Vocabulary
- **Hero search:** `0 10px 30px #39061c22`, a soft lift against maroon.
- **Handover object:** `drop-shadow(0 13px 14px #62441f26)`, grounding the moving book.
- **Dialog:** inherited `0 22px 90px #122f3540`; backdrop `#102d2b80`.
- **Toast:** inherited `0 8px 26px #173e3524`.

**The Object Depth Rule.** Give photographic cutouts soft depth and movement while keeping listing card bodies flat and shadowless.

## Shapes

Posters and factual badges use near-square corners (2px); listing photo wells use 4px, filters 5px, actions 6px and hero search 8px. Existing form fields retain 7px corners and dialogs retain 16px desktop corners. Circular avatars, save controls, orbit lines and exchange marks carry the circle motif. Rectangular actions replace the former all-pill appearance.

## Components

### Buttons

Compact rectangular actions use the frontmatter geometry and a 48px minimum height; the butter header action is 44px. Primary listing actions are raspberry, while the header and finale use butter against maroon. Press feedback scales to 0.975. Keyboard focus uses a 2px accent outline with 5px offset; controls on maroon use butter. Disabled states remain visible and non-interactive.

### Chips

Category filters are compact rectangles with inline SVG icons. Selection reverses to maroon/paper; unselected backgrounds warm on hover. Phone targets remain at least 44px and categories scroll horizontally. Condition badges are small factual rectangles.

### Cards / Containers

A clipped photograph leads an unboxed listing. Condition and save controls sit in its corners; item facts, title, price, seller and pickup follow. The seller row starts with a fine rule. Mobile save controls retain 44px hit areas. Photo placeholders use blush and a clear no-photo explanation.

### Inputs / Fields

Light warm fields with quiet plum borders retain practical spacing and accent focus. Hero search is a paper panel with an inset butter submit button; submitting it filters the real inventory. Mobile search and form inputs use 16px text. Upload replaces its placeholder while preserving change/remove controls. Validation remains paired with explanatory text.

### Navigation

Desktop navigation sits on maroon with muted pale labels and butter active text/rule. Mobile navigation sits on paper with maroon active state and a raspberry listing action. Save/remove rerenders preserve keyboard focus, using visible mobile navigation when a saved card disappears.

### Campus Collage and Handover

Product cutouts link to real sample details. Their drift lasts 6–8 seconds per cycle; mouse pointer depth adds a small independent translation. Hero lettering enters once through an 850ms clip reveal; the second line starts 110ms later. The ticker loops over 34 seconds. One pause control stops continuous decorative movement and pointer depth. Reduced-motion preference removes movement; keyboard navigation makes type entry immediate.

Three explicit chapter buttons move the handover book over 650ms and update a polite live caption. Keyboard and reduced-motion modes suppress that transition. Scroll reveals run once, with 800ms section and 900ms poster entry. Content and actions remain complete without animation. Standard easing is `cubic-bezier(0.23, 1, 0.32, 1)`.

### Detail / Listing Dialogs

Bricolage headings connect utility flows to the new identity. Category sits beside price and condition below the item heading. Sample notices distinguish demonstration listings; local listings expose contact details with a copy action. Native dialog focus returns on close; keyboard interaction suppresses its 220ms entry animation.

## Do's and Don'ts

### Do:
- **Do** carry maroon, butter and the self-hosted Bricolage Grotesque / DM Sans pairing across new surfaces.
- **Do** keep cutout imagery, poster composition and motion grounded in real campus belongings.
- **Do** keep price, condition, seller and wrapping pickup visible on mobile.
- **Do** provide visible focus, immediate keyboard response, a motion pause control and reduced-motion support.
- **Do** keep institutional identity, motion controls and prototype notices readable on phones.

### Don't:
- **Don't** return to the rejected forest/serif restrained catalogue or a generic ecommerce dashboard.
- **Don't** shrink expressive display typography to an arbitrary 6rem maximum.
- **Don't** turn metadata into decorative eyebrows or add hard offset shadows outside this visual world.
- **Don't** imply official endorsement, verified accounts or shared marketplace activity in this browser-local prototype.
- **Don't** require animation or hover to find content or complete an action.

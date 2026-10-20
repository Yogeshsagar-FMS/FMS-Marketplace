---
name: FMS Circle
description: An editorial campus exchange for FMS Delhi.
colors:
  paper: "#f8f7f2"
  ink: "#173e35"
  muted: "#5a6a61"
  accent: "#c7442d"
  line: "#dce1d8"
  mint: "#e7eee3"
  white: "#ffffff"
  field: "#fffefa"
  field-line: "#c8d1c6"
  chip: "#eeefe8"
  accent-hover: "#ad3422"
  ink-hover: "#285648"
  mint-hover: "#dce5d6"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(56px, 5.8vw, 84px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "46px"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.025em"
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
    lineHeight: 1.85
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.01em"
  price:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.1
rounded:
  badge: "4px"
  field: "7px"
  input: "8px"
  photo: "12px"
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
    rounded: "{rounded.pill}"
    padding: "13px 23px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 23px"
  button-dark-hover:
    backgroundColor: "{colors.ink-hover}"
  button-light:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 23px"
  button-light-hover:
    backgroundColor: "{colors.mint-hover}"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px 12px"
  category:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 15px"
  category-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  photo-well:
    rounded: "{rounded.photo}"
---

# Design System: FMS Circle

## Overview

**Creative North Star: "Campus publication, everyday exchange"**

An everyday campus exchange with the character of an independent university publication. Forest ink, warm paper, vermilion accents, and a serif/sans pairing give useful secondhand belongings an editorial frame. The university cultural-festival direction lands through its confident print palette and circular exchange mark; the marketplace keeps familiar search, filters, cards, and forms.

The system is photographic and restrained: still-life imagery leads, product facts remain easy to compare, and thin rules separate information without enclosing every item. Keep the FMS Circle identity and a clear FMS Delhi context. The browser-local prototype labels demonstration inventory and illustrative generated photography; it does not imply verified students or shared activity. Avoid the previous Pinterest/polaroid treatment and generic ecommerce dashboard language.

**Key Characteristics:**
- Editorial serif headlines beside practical sans-serif controls.
- Warm paper, forest ink, and selective vermilion action.
- Photographic wells, flat cards, and thin separating rules.
- A circular exchange mark and compact, responsive inventory.
- Visible pickup facts and immediate keyboard feedback.

## Colors

The palette feels like forest and vermilion ink printed on warm paper; the frontmatter holds normative values.

### Primary
- **Vermilion:** Primary publish/list actions, headline emphasis, saved hearts, and keyboard focus.
- **Forest Ink:** Main text, selected categories, dark actions, and active navigation.

### Neutral
- **Warm Paper:** Page and dialog canvas; reversed text on dark controls.
- **Quiet Green:** Supporting copy, metadata, and inactive navigation.
- **Soft Rule:** Dividers between information groups.
- **Mint Ground:** Handover panels, information notices, and photo placeholders. It is a material ground, not a success status.
- **White / Field Paper / Field Rule:** Reversed primary-action text and clear, lightly bordered form controls.
- **Quiet Chip:** Unselected category backgrounds. Hover colors deepen or shift the existing button grounds.

### Named Rules

**The Selective Vermilion Rule.** Reserve the accent for actions, emphasis, saved state, and focus; do not turn every inventory fact into an accent.

## Typography

**Display Font:** Self-hosted DM Serif Display, with Georgia and serif fallbacks.
**Body Font:** Self-hosted DM Sans, with a sans-serif fallback. The file is variable; interface text uses regular through bold weights.

The serif is the editorial voice for large headings and prices. DM Sans carries item names, controls, and explanatory copy. Headings balance their lines; numerals in prices align tabularly.

### Hierarchy
- **Display:** The frontmatter scale describes the large-screen hero. It resolves to 67px at widths up to 1150px and 57px up to 900px; mobile uses `clamp(52px, 11vw, 69px)` and 47px below 360px. At 1600px and above it is 86px.
- **Headline:** Inventory headings use the frontmatter scale, dropping to 35px on mobile and 31px below 360px. Detail headings are 38px/1.1, 33px on tablet, and 35px on mobile; form headings are 39px, 34px, and 31px.
- **Title:** Item titles use the frontmatter scale on desktop, 13px on mobile, and 15px in the single-column narrow layout. Two-line mobile titles preserve aligned price positions.
- **Body:** Introductory copy uses the frontmatter role; detail descriptions use 13px/1.9 and 12px on mobile. Supporting paragraphs adapt to their surface rather than forcing one global text size.
- **Label:** Button text uses the frontmatter role. Category labels are 12px on desktop and 11px on smaller screens; supporting inventory metadata is generally 10–12px.
- **Price:** Card prices use the frontmatter role, 23px on mobile; detail prices are 34px and 32px on mobile.

### Named Rules

**The Two Voices Rule.** Keep editorial headings and prices in the serif; keep item identification, controls, and factual metadata in the sans.

## Layout

The content shell caps at 1280px, with 48px side gutters on desktop, 28px up to 900px, 18px up to 640px, and 14px below 360px. The header has its own 1400px cap. The desktop introduction is a compact two-column text/photo layout; mobile stacks it and crops the still life to 248px high. The introductory image has one strongly rounded upper-left corner.

Inventory uses four columns on desktop, three up to 900px, two up to 640px, and one below 360px. Gaps move from 38px by 25px to 28px by 13px on mobile. Photo wells are near-square on desktop and slightly taller on mobile. Search becomes a full-width row above two smaller controls; category pills scroll horizontally. Item titles and prices stack on medium and mobile cards.

Pickup remains visible as comparison information. At widths up to 1150px, the seller area becomes a two-column grid and pickup occupies a full-width second row with wrapping text, rather than truncating beside the seller. Detail category metadata sits in the wrapping price/condition row below the item heading and subtitle.

Forms pair a photo-upload column with fields on desktop, then stack on mobile. Paired fields stay side by side until below 360px. Dialogs fit within viewport margins and scroll vertically, with a one-column detail layout on mobile. Persistent mobile browse/saved/list navigation includes a safe-area inset; the page reserves bottom space for it. Mobile editable field text is 16px, with 44px save/close hit areas.

Use the frontmatter spacing steps as the recurring rhythm; surface-specific gaps and padding follow the observed layouts rather than a fabricated global grid.

## Elevation & Depth

Cards remain flat on the page: photography, tonal grounds, whitespace, and rules provide separation. Soft shadows are limited to the exchange stamp, transient toast, and native dialog. There are no hard offset shadows.

### Shadow Vocabulary
- **Exchange stamp:** `0 5px 14px #5223120a`, a faint lift under the circular mark.
- **Dialog:** `0 22px 90px #122f3540`, with a `#102d2b80` backdrop separating the active task.
- **Toast:** `0 8px 26px #173e3524`, a small floating confirmation surface.

**The Flat Inventory Rule.** Keep the card body unboxed and shadowless; reserve elevation for overlays and the small exchange stamp.

## Shapes

Photo wells and handover panels have gently rounded corners. Fields use tighter corners; buttons and category filters use pills. Circular save controls, avatars, and exchange marks repeat the circle motif without making every container circular. Dialogs have a larger radius, reduced on mobile. Borders are thin and quiet; the photo-upload boundary is dashed to communicate an input area.

## Components

### Buttons

Compact, confident pills. Primary, dark, and light variants share the frontmatter geometry and a 48px minimum height. Capability-gated hover shifts their grounds; press scales to 0.975 over 120ms. Keyboard focus uses a 2px vermilion outline with 5px offset. Disabled actions lower opacity and show a waiting cursor.

### Chips

Horizontal category filters combine a small inline SVG icon and label. Their selected state reverses to forest/paper. Mobile chips provide a 44px minimum height and remain horizontally scrollable. Conditions use quiet, small rectangular badges; mint is not a semantic success signal.

### Cards / Containers

A photograph leads each unboxed listing. Condition and save controls sit inside the clipped photo well; factual category/sample metadata, item title and price, description, seller, and pickup follow. The seller group begins after a thin rule. Mobile save controls have 44px hit areas around smaller circular visible grounds. Preserve the full-width wrapping pickup row on narrower cards.

### Inputs / Fields

Light field-paper grounds, quiet one-pixel borders, and compact rounded corners keep forms practical. The search field uses a shared enclosing border and a 2px forest focus-within outline. Other fields retain the global vermilion focus outline. Validation text is red and paired with a message; uploaded photos replace the mint placeholder while preserving a change/remove action.

### Navigation

Desktop navigation uses muted sans-serif labels with a forest active label and bottom rule. Mobile replaces it with fixed browse, saved, and list actions. Saved counts are quiet circular counters. Focus follows rerendered save controls; when removing an item from Saved removes its card, focus moves to the visible Saved navigation control, with the market region as fallback. Never target the hidden desktop navigation on mobile.

### Detail / Listing Dialogs

The detail photograph and editorial heading lead. Category belongs beside price and condition below the heading, not as a decorative eyebrow. Sample notices distinguish illustrative inventory; local listings expose plain-text contact details with a copy action. Native dialog focus is restored on close. Keyboard navigation suppresses dialog entry animation so focus responds immediately.

### Exchange Mark and Feedback

The circular exchange-arrow SVG recurs in the identity, stamp, and handover panel. Saving a card produces a discrete scale pulse when pointer interaction and motion preferences permit it. Standard easing is `cubic-bezier(0.23, 1, 0.32, 1)`; dialog entry takes 220ms, toast entry 180ms, and photo hover 350ms. Filtering is immediate. Reduced-motion preference suppresses movement; hover treatments require a fine pointer with hover capability.

## Do's and Don'ts

### Do:
- **Do** use warm paper, forest ink, and selective vermilion with the self-hosted serif/sans pairing.
- **Do** preserve photographic wells and flat card bodies with quiet rules.
- **Do** keep condition, price, seller, and wrapping pickup visible when comparing items on mobile.
- **Do** maintain visible keyboard focus through saves, removals, and dialog transitions.
- **Do** label sample listings and explain browser-only persistence and illustrative photography.

### Don't:
- **Don't** reintroduce the Pinterest/polaroid layout or a generic ecommerce dashboard.
- **Don't** add card shadows or use mint as a fabricated success/verification signal.
- **Don't** move detail taxonomy above the heading as a decorative eyebrow.
- **Don't** imply verified accounts, shared marketplace activity, payments, or private messages in this local prototype.
- **Don't** make a hover effect or animation necessary to use an action.

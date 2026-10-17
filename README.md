# FMS Circle

A responsive, Pinterest-inspired student marketplace for FMS Delhi. Built with JavaScript, CSS, and Vite.

## Develop

Use Node.js 22 or newer.

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

## Build

```sh
npm run build
npm run preview
```

## What works

- Masonry-style item feed, search, categories, and price sorting
- Saved listings retained in browser storage
- Item detail dialogs and seller information
- Sell form with photo upload, validation, contact information, and browser persistence
- Responsive layouts and keyboard-accessible dialogs

## Prototype scope

Initial listings are demonstration content. New listings and favourites are stored locally in the current browser, not shared across students. There is no authentication, payment processing, or private messaging. Before a campus launch, connect a backend with student verification, shared listing/photo storage, moderation, and private seller contact. Do not submit sensitive information to the prototype.

Images and fonts load from Unsplash, Pravatar, and Google Fonts and require internet access. The core interface and locally uploaded photos work without those services.

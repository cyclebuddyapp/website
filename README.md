# CycleBuddy website

Source for [cyclebuddyapp.com](https://cyclebuddyapp.com): an [Astro](https://astro.build) static site in English, Spanish and French, deployed to GitHub Pages.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

- Strings: `src/i18n/en.ts`, `es.ts`, `fr.ts` (same shape, checked by TypeScript)
- Homepage sections: `src/components/sections/`
- Blog posts: `src/content/blog/<lang>/<slug>.md`
- Logo: `public/brand/logo.svg` (path data in `src/data/logo.ts`)

This site uses no cookies and no trackers.

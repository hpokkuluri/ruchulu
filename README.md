# రుచులు · Ruchulu

*ఘుమఘుమలాడే మా ఇంటి వంటలు* — the recipes from our family's handwritten kitchen notebook, as a small web app.

**Open it:** https://hpokkuluri.github.io/ruchulu/
On a phone, use *Share → Add to Home Screen* (iPhone) or *Install app* (Android). It works offline after the first visit.

## What's here
| File | What it is |
|---|---|
| `index.html` | The app (notebook-style design, search, categories, EN / Both / తెలుగు, light & dark) |
| `recipes.js` | All the recipes — the only file to edit when adding recipes |
| `pages/page-N.jpg` | Photos of the notebook pages ("See the notebook page") |
| `fonts/`, `fonts.css` | Self-hosted fonts, so it looks right offline |
| `icons/`, `manifest.webmanifest` | Home-Screen icon and install info |
| `sw.js` | Offline support |

## Adding recipes
1. Add the photo as `pages/page-N.jpg` (next number).
2. Add entries to `recipes.js` with `page: N`. Format is described at the top of the file.
3. Add the new photo path to `FILES` in `sw.js` and bump `VERSION` (e.g. `ruchulu-v2`).

**Transcription rules:** keep her words and quantities and write the other language alongside; never invent amounts ("approx." stays approx.); where only ingredients are written, leave out `steps`; flag unclear words with `'check'` so they show "please check".

Categories: `podulu` పొడులు · `pachallu` పచ్చళ్ళు · `kooralu` కూరలు · `annalu` అన్నాలు · `rottelu` రొట్టెలు.

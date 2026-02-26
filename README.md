# real-estate-rank

## Deploy to Vercel

This project is a static front-end and can be deployed directly on Vercel.

### Option 1) Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

### Option 2) Vercel Dashboard

1. Import this Git repository in Vercel.
2. Framework preset: `Other`.
3. Build command: leave empty.
4. Output directory: leave empty (root static files).
5. Deploy.

`vercel.json` is included so routes are rewritten to `index.html` for SPA-style navigation compatibility.

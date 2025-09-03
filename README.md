# MovieHub TMDB (React + Vite + Cloudflare Pages)

Simple site like Khatrimaza: category-wise movies (Bollywood via TMDB) + Hollywood/Tollywood Hindi Dubbed (manual list),
click poster to open details + manual download links.

## Tech
- React + Vite (frontend)
- Cloudflare Pages Functions (backend proxy for TMDB)
- TMDB API v3 using a **secret** v4 *Read Access Token* in Cloudflare Env: `TMDB_TOKEN`

## Local Setup
1. Install Node.js 18+
2. `npm install`
3. Create TMDB account → Settings → API → copy **v4 Read Access Token**.
4. Create `.env` is **NOT used** (keys must be secret). For local you can run a tiny proxy using Pages functions via `wrangler` or just call TMDB directly with an exposed key during dev.

Run locally (without secrets) by editing `src/api/tmdb.js` BASE to TMDB v3 + API key if you want quick test.

## Deploy to Cloudflare Pages
1. Push this folder to a new GitHub repo.
2. Cloudflare Dashboard → Pages → **Create project** → Connect to your repo.
3. Build settings:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Build output: `dist`
4. Pages → **Functions**: it auto-detects `/functions` folder.
5. Pages → **Settings → Environment variables**: Add
   - `TMDB_TOKEN` = your TMDB **v4 read token** (starts with `eyJhbGci...`)
6. Deploy. Frontend calls `/api/tmdb?...` which the function forwards to TMDB with your secret token.

## Customize
- Edit `src/data/customData.json`
  - `hindiDubbed.hollywood` = array of TMDB IDs for movies that have Hindi Dubbed available.
  - `hindiDubbed.tollywood` = array of TMDB IDs (Telugu/Tamil/etc.) you want to show as Hindi Dubbed.
  - `downloads` = map of `movieId` → list of links you want to display on the details page.

> Note: TMDB does **not** provide a reliable "Hindi Dubbed" flag. That's why Hollywood/Tollywood Hindi Dubbed uses a manual list. Bollywood section is fetched automatically using `with_original_language=hi`.

## How it works
- Home page loads:
  - **Bollywood** via `/api/tmdb?endpoint=discover/movie&with_original_language=hi`
  - **Hollywood/Tollywood Dubbed** by fetching by IDs listed in `customData.json`
- Clicking a poster opens `/movie/:id` and fetches `/api/tmdb?endpoint=movie/<built-in function id>&append_to_response=videos,images,credits&language=hi`.
- Download links are taken from your `customData.json`.

## Folder Structure
```
moviehub-tmdb/
├── functions/
│   └── api/
│       └── tmdb.js        # Cloudflare Pages Function proxy
├── src/
│   ├── api/
│   │   └── tmdb.js        # API helpers
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   └── MovieGrid.jsx
│   ├── data/
│   │   └── customData.json
│   ├── pages/
│   │   ├── Details.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html             # styles + root
├── package.json
├── vite.config.js
└── README.md
```

## Notes
- Respect TMDB terms (show attribution). Already included in footer.
- To style further, modify CSS in `index.html`.
- If you want automatic categories for Tollywood originals, call `discover` with `with_original_language=te,ta,ml,kn` (comma separated is **not** supported; call multiple times and merge). For Hindi-dubbed availability you should continue using the manual ID list.

# Blackwater RC

The Blackwater RC website — a running club in Taipei. Next.js 16 (App Router)
frontend with a Sanity v5 Studio embedded at `/sanity`, deployed on Vercel.
Products are hybrid: Sanity owns everything editorial, Shopify owns commerce.

Two locales, `en` and `zh_tw`. The site is the store; shoppers only leave at
Shopify's hosted checkout.

> **Working on the code?** Read `CLAUDE.md` first. It is the architecture
> reference — routing, localization, page modules, the type scale, commerce —
> and it documents the constraints that the code alone won't teach you. This
> file only covers getting the thing running.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill it in — see below
npm run dev
```

- Front end: <http://localhost:3001>
- Sanity Studio: <http://localhost:3001/sanity>

The Studio is embedded, so it runs on the same port and the same dev server as
the site. Port 3001 is set in the `dev` script, not a convention.

`predev` runs `npm run typegen` for you, so the first `npm run dev` after a
schema change is already correct.

## Environment

Copy `.env.example` to `.env.local`; every variable is documented there. The
short version of what is mandatory:

| Variable | Why it's required |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `src/sanity/env.ts` throws on startup without it |
| `NEXT_PUBLIC_SANITY_DATASET` | Same — use `dev` locally |
| `SANITY_API_READ_TOKEN` | `src/sanity/lib/live.ts` throws immediately without it |
| `SITE_URL` | Canonicals, JSON-LD, `robots.txt` and all three sitemaps build absolute URLs from it |

Everything else degrades gracefully. **The Shopify variables are all optional** —
without `SHOPIFY_STORE_DOMAIN` plus a Storefront token the integration no-ops and
products render from their manual Sanity fields. `docs/SHOPIFY-SETUP.md` is the
walkthrough for wiring it up.

Add the same variables to the Vercel project before deploying.

Sanity also needs CORS origins for local work: manage.sanity.io → your project →
**API** → add `http://localhost:3001` **with credentials**.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next dev server + Studio on port 3001 (runs `typegen` first) |
| `npm run build` | Production build |
| `npm start` | Serve a production build |
| `npm run typegen` | Regenerates `schema.json` and `sanity.types.ts` |
| `npm test` | Vitest, unit tests only (`src/**/*.test.ts`) |
| `npm run test:watch` | Same, in watch mode |
| `npm run lint` | ESLint |

**Re-run `npm run typegen` after any Sanity schema change.** It extracts the
schema to `schema.json` and regenerates `sanity.types.ts` from that plus the
GROQ in `src/sanity/lib/queries.ts`. `predev` does it automatically; CI and
`npm run build` do not, so a schema change committed without it leaves the
generated types stale.

Note that `typegen` reads `tsconfig.json`'s `include` to resolve `@/` aliases.
Several schema and desk-structure files are still `.js`/`.jsx`, so the `**/*.js`
and `**/*.jsx` globs there are load-bearing — drop them and extraction fails with
`Cannot find module '@/lib/i18n'`.

## Testing

Vitest, `environment: 'node'`, `src/**/*.test.ts` only. There is deliberately no
jsdom or React Testing Library setup: what these tests pin are the pure helpers
whose edge cases are invisible at the call site — locale/path normalization,
event dates, the sitemap and page-module guards, the type scale — not component
rendering. See the comments in `vitest.config.ts`.

Three of them are structural guards that fail when two hand-maintained things
drift apart, so read the failure message before "fixing" the test:

- `src/lib/type-scale.test.ts` — the nine `t-*` rungs in `globals.css` vs
  `TYPE_SCALE_CLASSES` in `src/lib/utils.ts`, and it rejects responsive variants
  on a rung (`lg:t-l-1` emits no CSS at all).
- `src/lib/sitemaps.test.ts` — every routable type reaches a sitemap, and
  everything a sitemap query dereferences is in its `SITEMAP_TAGS`.
- `src/sanity/schemaTypes/objects/page-module.test.ts` — every `Rule.custom` on a
  page module is wrapped in `moduleRule()`.

## Deployment

Vercel. Push to the default branch; add the `.env.local` variables to the Vercel
project first. `docs/SEO-LAUNCH.md` is the post-deploy checklist (indexing,
Search Console, the content that has to exist in the Studio before any of it
matters).

## Documentation

| File | What's in it |
| --- | --- |
| `CLAUDE.md` | Architecture reference. Start here. |
| `.claude/rules/shopify-cart.md` | The rules governing `src/lib/shopify/`, `src/app/api/shopify/`, `src/components/cart/` and the product detail page. Several of its constraints look like inconsistencies begging to be tidied up and must not be. |
| `docs/SHOPIFY-SETUP.md` | Setting up the Headless channel and tokens. |
| `docs/SEO-LAUNCH.md` | Launch checklist for SEO/AEO. |
| `docs/SHOPIFY-I18N-PLAN.md` | Archived. The completed Shopify + field-level-i18n plan, kept for the decision record. |
| `migrations/README.md` | How Sanity migrations are authored and run. |

## Sanity datasets

This project uses two datasets: **`dev`** (where content is authored) and **`prod`** (what the deployed site reads). They are separate copies, so they drift apart as soon as either one is edited — re-clone `dev` → `prod` before a release.

### Cloning `dev` into `prod`

`sanity dataset copy` is the one-command way to do this, but it requires the **advanced dataset management** feature. On our plan it fails with:

```
Bad Request - Your current plan does not include the advanced dataset management feature
```

So we clone with export → delete → create → import. Our plan also caps the project at **2 datasets**, so there's no room for a temporary third one — the target must be deleted before it can be recreated.

> ⚠️ Step 3 permanently deletes the existing `prod`. Never skip the backups in step 2 — they are the only way back.

**1. Check what you're about to overwrite.** Compare document counts and the most recent edit in each dataset, so you can confirm `prod` really is the stale one:

```bash
for ds in dev prod; do echo "=== $ds"; npx sanity documents query 'count(*[!(_id in path("drafts.**"))])' --dataset $ds --api-version 2025-08-15; npx sanity documents query '*[!(_id in path("drafts.**"))]|order(_updatedAt desc)[0]{_type,_updatedAt}' --dataset $ds --api-version 2025-08-15; done
```

**2. Back up both datasets** (`--overwrite` replaces an existing archive of the same name; assets are included, so expect ~35 MB and ~15s each):

```bash
npx sanity dataset export prod ~/sanity-backups/prod-pre-delete-$(date +%Y-%m-%d).tar.gz --overwrite
npx sanity dataset export dev ~/sanity-backups/dev-$(date +%Y-%m-%d).tar.gz --overwrite
```

**3. Note the current visibility, then delete `prod`.** Visibility is **not** inherited by a recreated dataset, so read it first:

```bash
npx sanity dataset visibility get prod   # → public
npx sanity dataset delete prod --force
```

**4. Recreate `prod` and import the `dev` export.** Pass the visibility from step 3:

```bash
npx sanity dataset create prod --visibility public
npx sanity dataset import ~/sanity-backups/dev-$(date +%Y-%m-%d).tar.gz --dataset prod
```

The import prints its phases and ends with `Done! Imported N documents to dataset "prod"`. The asset phase is the slow one (~1 min). Pass the target as `--dataset` rather than a positional argument — the positional form still works but is deprecated and warns.

**5. Verify the clone.** The strongest check is that the full set of document IDs is identical — `diff` should print nothing:

```bash
for ds in dev prod; do npx sanity documents query '*[]._id' --dataset $ds --api-version 2025-08-15 | grep -o '"[^"]*"' | tr -d '"' | sort > /tmp/ids-$ds.txt; done
diff /tmp/ids-dev.txt /tmp/ids-prod.txt && echo "datasets match"
```

Then spot-check one document body (ignoring the fields that legitimately differ) and confirm assets resolve:

```bash
for ds in dev prod; do npx sanity documents get <SOME_DOC_ID> --dataset $ds | python3 -c "import sys,json;d=json.load(sys.stdin);d.pop('_updatedAt',None);d.pop('_rev',None);print(json.dumps(d,sort_keys=True))" > /tmp/doc-$ds.json; done
diff /tmp/doc-dev.json /tmp/doc-prod.json && echo "document content matches"
npx sanity documents query 'count(*[_type=="sanity.imageAsset" && defined(url)])' --dataset prod --api-version 2025-08-15
```

**6. Point the app at `prod`** — in `.env.local` for a local check, and in the Vercel project's environment variables for the deploy:

```bash
sed -i '' 's/^NEXT_PUBLIC_SANITY_DATASET="dev"/NEXT_PUBLIC_SANITY_DATASET="prod"/' .env.local
```

### Things that surprise people

- **Document history is not preserved.** Import writes fresh `_rev`s, so the content is identical but each document's edit timeline restarts. Only `sanity dataset copy` (paid feature) keeps history.
- **The export line count is lower than the document count.** `sanity.imageAsset` / `sanity.fileAsset` documents live in `assets.json` + `files/` rather than `data.ndjson`, so e.g. 720 documents export as 568 NDJSON lines + 151 assets. Nothing is missing.
- **`import --replace` is not a mirror.** It overwrites documents with matching `_id`s but leaves behind anything in the target that no longer exists in the source. Deleting and recreating is what makes the two datasets identical.
- **Inspect an archive** without importing it:

  ```bash
  tar -tzf ~/sanity-backups/dev-<date>.tar.gz | head
  ```

  Note the archive contains a top-level `<dataset>-export-<timestamp>/` folder, so extracting a single file needs that prefix (`tar -xzOf <archive> <folder>/data.ndjson`).

### Restoring from a backup

Same shape as the clone, using a backup archive as the source:

```bash
npx sanity dataset delete prod --force
npx sanity dataset create prod --visibility public
npx sanity dataset import ~/sanity-backups/prod-pre-delete-<date>.tar.gz --dataset prod
```

## Troubleshooting

**`Error: Failed to communicate with the Sanity API`** — your CLI session
expired. `npx sanity logout && npx sanity login`.

**`Missing environment variable: NEXT_PUBLIC_SANITY_DATASET`** (or `_PROJECT_ID`)
— `src/sanity/env.ts` asserts both at import time. Check `.env.local` exists and
that you restarted the dev server after editing it.

**Studio throws on startup about a read token** — `SANITY_API_READ_TOKEN` is
unset. `src/sanity/lib/live.ts` requires it even in development.

**`The installed version of "@sanity/cli" is not compatible with the installed
version of "sanity"`** — the two are versioned independently and must be
upgraded together. `sanity` v5.25 needs `@sanity/cli` v8.

**`Cannot find module '@/lib/i18n'` during `typegen`** — `tsconfig.json` lost its
`**/*.js` / `**/*.jsx` include globs; the `.js` schema files can't resolve `@/`
without them.

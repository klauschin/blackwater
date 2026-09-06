# Sanity migrations

`sanity migration run <id>` resolves ids against **this directory only** — it is the
CLI's default and is not configurable from `sanity.cli.ts`. A migration authored
anywhere else (this repo kept two under `src/sanity/migrations/` for a while) is
invisible to the CLI and can only ever be run by hand.

One migration per subdirectory, named for its id, exporting `defineMigration()` from
`sanity/migrate` as the default export of `index.ts`:

```
migrations/<id>/index.ts
```

Run it against the dataset in `.env.local`, dry first:

```bash
npx sanity migration run <id> --dry-run
npx sanity migration run <id> --no-dry-run
npx sanity documents validate      # optional, confirms the dataset still validates
```

## What belongs here, and what doesn't

`defineMigration` walks documents one at a time and patches each in isolation. That
covers a field rename, a type change, or a backfill — anything decidable from the
document in front of it.

It cannot read a *second* document while processing the first, so work that has to
compare or merge siblings (the document-level → field-level i18n merges, which
grouped translations by their `translation.metadata` set) was written as one-shot
`@sanity/client` scripts under `scripts/` instead, run with `node` and
`SANITY_READ_WRITE_TOKEN`. Both that directory and every migration that once lived
here have been removed now that dev and prod are fully migrated; git history has
them if a shape ever needs revisiting.

Write new one-shots to the same shape those had: dry-run by default behind an
`--execute` flag, idempotent, and printing what they will touch before they touch it.

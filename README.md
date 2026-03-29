# Celina Deal Scout Demo

This repo is now a map-first real estate investment demo focused on **Celina, Texas**. It ranks a curated shortlist of public-web listings against:

- current asking prices and pricing cuts
- Redfin market and migration trends
- Realtor zip-level listing and rent context
- City of Celina growth data and public GIS layers
- major catalysts like the Methodist hospital, DNT extension, H-E-B land buy, and Wilson Creek Park

## What the demo does

- Shows an interactive Celina map with investor-scored listing markers
- Lets you change the strategy: fast flip, entry equity, or growth-corridor bet
- Re-scores listings based on budget, rehab appetite, hold window, and minimum modeled profit
- Overlays official Celina GIS layers for future land use, master-planned communities, and capital projects
- Surfaces source links directly in the UI so the investment thesis is traceable

## Important scope note

This is a **public-web demo**, not a licensed MLS or VOW/IDX product. The shortlist is intentionally small and source-backed. If we turn this into a production investor platform, the next step should be licensed listing feeds plus parcel, permit, tax, comp, and contractor-cost data.

## Local preview

This is a static site. Preview it with any simple file server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Nightly refresh path

The repo includes:

- `scripts/refresh-demo-data.mjs` for a nightly public-web refresh
- `.github/workflows/nightly-refresh.yml` to run that script every night

That path is useful for demos, but public-page scraping is brittle. For anything investor-facing in production, replace it with licensed feeds and more reliable structured data providers.

## Current source stack

- [City of Celina](https://www.celina-tx.gov/)
- [U.S. Census QuickFacts](https://www.census.gov/quickfacts/fact/table/celinacitytexas/SEX255223)
- [Redfin Celina housing market](https://www.redfin.com/city/30799/TX/Celina/housing-market)
- [Realtor 75009 overview](https://www.realtor.com/realestateandhomes-search/75009/overview)
- [Methodist Celina press release](https://www.methodisthealthsystem.org/press-releases/2025/march/first-hospital-in-celina-opens-its-doors-to-pati/)
- [NTTA DNT extension update](https://www.ntta.org/ntta-board-approves-dallas-north-tollway-extension-contracts)
- [Celina EDC H-E-B land purchase](https://celinaedc.com/about/in-the-news/h-e-b-purchases-land-in-celina-texas)

## Suggested next steps

- Replace the curated shortlist with a broader ingestion pipeline
- Add parcel search, permit history, tax-appraisal context, and teardown/new-build flags
- Separate flip, rental, and developer scoring models
- Add user accounts so each investor can save strategies and markets
- Move from static heuristics to a backend scorer with versioned snapshots

# Celina Growth Explorer Demo

This repo contains a static demo for a "development vision" product concept that helps home buyers, realtors, and city teams visualize upcoming growth in Celina, Texas.

## What is included

- Interactive Leaflet map with sector overlays
- Timeline slider for 2026-2040
- Development detail drawer with grouped projects and source links
- Audience framing panel for buyers, realtors, and city teams
- Live public GIS layer toggles backed by the City of Celina ArcGIS portal
- Static-file structure that is easy to push to GitHub and deploy on Vercel

## Local preview

Because this is a static site, you can preview it with any simple file server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Choose the default static-site settings.
4. Deploy.

No build step is required for the current version.

## Suggested next iterations

- Move the project data into a structured JSON or CMS-friendly format
- Expand the ArcGIS integration to cover additional public safety, utility, and parcel layers
- Add parcel-specific views and search
- Add scenario modes for home buyers, business owners, and city staff
- Replace approximate rectangles with more precise boundaries and map layers
- Add screenshots, logo polish, and a stronger landing narrative for sales demos

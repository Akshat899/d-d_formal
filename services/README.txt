# Design & Deploy — Generic SEO Service Page

## Files
- `service.html` — copy this into `services/` for each individual service page.
- `service.css` — shared styling for every service page.
- `service.js` — shared functionality + all interchangeable service content.

## Create a new service page
1. Copy `service.html`.
2. Rename it, for example:
   - `website-development.html`
   - `branding.html`
   - `seo.html`
3. Change only the body attribute:
   `<body data-service="website-development">`
4. Use one of the service keys already present in `service.js`.
5. If you add a new service, add one object to `SERVICES` in `service.js`.

## Recommended URL structure
Use clean individual URLs:
`https://designandeploy.in/services/website-development.html`

For the strongest SEO setup, eventually remove `.html` with server rewrites if your hosting setup supports it.

## Important SEO note
The template updates title, description, canonical and JSON-LD from the service configuration. For maximum crawl reliability, you can also hard-code the title/meta/canonical values in each copied HTML file after finalising the page content.

## Form
The form posts to:
`../send-enquiry.php`

That matches the existing site's live form handler structure. The JS also falls back to a pre-filled email if the handler does not respond.

## Software logos
The tools slider uses Simple Icons CDN URLs. Each logo/card links to the official software website. If you want zero third-party image requests, download the SVGs into `assets/software/` and change the generated `<img src>` in `service.js`.

# IZYBIZ Landing Page

Single-page marketing website built with plain HTML, CSS, and JavaScript.

## Overview

This project is a custom landing page for IZYBIZ with:

- Sticky responsive navigation (desktop + mobile menu)
- Hero intro animation sequence
- "We deliver" interactive cards
- "Our use cases" visual section
- Expand/collapse FAQ section
- Contact section
- "Book a call" modal with form validation and async submit

## Tech Stack

- HTML5 (`index.html`)
- CSS3 (`style.css`)
- Vanilla JavaScript (`script.js`)
- Assets folder for logos, icons, and illustrations (`assets/`)

## Project Structure

```text
.
├── assets/         # Images, logo, favicon, illustrations
├── index.html      # Page structure and content
├── style.css       # All styling, layout, animations, responsiveness
├── script.js       # Interactions, animations, modal + FAQ behavior
└── READ.md         # Project documentation
```

## Run Locally

Because this is a static website, you can serve it with any local HTTP server.

### Option 1 - Python (quickest)

```bash
python3 -m http.server 3000
```

Open: `http://localhost:3000`

### Option 2 - Node

```bash
npx serve .
```

Open the URL printed in your terminal (usually `http://localhost:3000`).

## Editing Guide

- Update content and sections in `index.html`
- Update styles, spacing, and responsive behavior in `style.css`
- Update interactions/animations/modal logic in `script.js`
- Replace media files in `assets/` and update paths in HTML if needed

## Form Submission / Backend Note

The modal submit in `script.js` calls a Supabase Edge Function URL directly.

If you redeploy or change backend project/function names, update:

- `EDGE_FUNCTION_SEND_DEMO_CONFIRMATION_URL` in `script.js`

## Deployment

This site can be deployed on any static host:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Deploy by uploading/publishing the project root with `index.html` as the entry file.

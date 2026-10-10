# ResumeIQ — AI Resume Analyzer

A polished, responsive resume review workspace built with Next.js, React, and TypeScript. It extracts text from PDF and DOCX files, compares it with an optional job description, and returns structured, evidence-based feedback. It can run locally in clearly labeled demonstration mode without credentials, or call OpenAI from the server when configured.

> Scores are estimates for editing guidance. They are not certified ATS results, employer decisions, or a prediction of hiring outcomes. Suggestions must be checked against the candidate's real experience.

## Features

- Responsive dashboard, resume upload, job targeting, and report screens.
- A content-driven portfolio case-study at `/portfolio`, ready for your GitHub/demo links.
- PDF and DOCX parsing, drag and drop, paste-in text, and upload validation.
- Structured score breakdown, radar visualization, matched and missing terms, and prioritized recommendations.
- OpenAI JSON analysis with Zod validation and a no-key demo provider.
- Browser-local analysis history, search, report deletion, clipboard actions, and print-to-PDF export.
- Privacy notice, upload size and text limits, server-only credentials, and no public sharing.

## Requirements

- Node.js 20 or later and npm.
- Optional OpenAI API key for real AI analysis.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `Copy-Item .env.example .env.local` in place of `cp`.

## Publish the live site

This project uses Next.js API routes, so GitHub Pages alone cannot host the complete application. Deploy the GitHub repository to a Next.js host such as Vercel; `vercel.json` already identifies the framework.

1. Create a **public** GitHub repository and push this project (keep `.env.local` out of Git).
2. Import the repository into Vercel and deploy it.
3. In the hosting project's environment variables, set `OPENAI_API_KEY`, `OPENAI_MODEL`, and `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin (for example, your assigned `*.vercel.app` URL). Redeploy after setting them.
4. Add the final public URL to `lib/site-content.ts` under `portfolio.links.liveDemo` and your GitHub repository URL under `portfolio.links.repository`.
5. Add the deployed site as a property in Google Search Console, complete its ownership verification, then submit `https://YOUR-DOMAIN/sitemap.xml` and request indexing for `/portfolio`. Search inclusion and ranking are controlled by Google and are not guaranteed.
6. Add the same public URL to the Featured section of your LinkedIn profile or to a project entry. LinkedIn profile updates are done in your account; this app does not post to LinkedIn.

The `/portfolio` route has its own Open Graph preview image, metadata, sitemap entry, and crawl rules. When `NEXT_PUBLIC_SITE_URL` is unset, the site intentionally blocks indexing and emits an empty sitemap so localhost URLs are never advertised to search engines.

For a custom domain, first connect it in your hosting provider, then update `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS URL and redeploy before submitting the sitemap.

Add your key to `.env.local` to enable real analysis:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
MAX_UPLOAD_MB=5
```

Without `OPENAI_API_KEY`, the analyzer returns heuristic demonstration feedback and clearly labels it as a demo. It does not silently represent mock results as AI analysis. Never commit `.env.local` or put the API key in a `NEXT_PUBLIC_` variable.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Architecture

- `app/page.tsx` — interactive client experience and local history.
- `app/api/extract/route.ts` — PDF/DOCX parsing, 5 MB default file limit, and extracted-text cap.
- `app/api/analyze/route.ts` — request validation, server-side OpenAI call, explicit mock fallback, and response validation.
- `lib/schema.ts` — Zod request/response schemas.
- `lib/mock.ts` — deterministic demonstration analysis.
- `app/globals.css` — responsive ResumeIQ visual system and print styling.
- `lib/site-content.ts` — central place to update the brand, owner name, project description, portfolio highlights, and showcase links.
- `app/sitemap.ts`, `app/robots.ts`, and `app/portfolio/opengraph-image.tsx` — search discovery and share previews for the live portfolio page.

## Customize your portfolio content

Edit `lib/site-content.ts` to change the project name, account owner, short portfolio description, highlight list, and repository/demo/documentation links. These edits update `/portfolio` and the browser page metadata. Update the sample report in `app/page.tsx` when you want the dashboard preview to show a different example. UI copy and layout live in `app/page.tsx`; visual styling lives in `app/globals.css`. Keep API behavior and analysis instructions in `app/api` and `lib/schema.ts` separate, so refreshing your portfolio story does not alter how resume data is processed. After changing content, run `npm run typecheck` and `npm run build`, then redeploy the app to publish the update.

## Data and privacy

No account system or database is configured. Analysis history is kept in the current browser's local storage and can be deleted from the History screen. Clearing browser data removes it. Uploaded files are parsed in memory by the server and are not intentionally persisted. When configured, resume text and the optional job description are sent to the OpenAI API only after the user clicks Analyze. Review the provider's current data handling terms before using this with sensitive personal information. Do not upload a resume without the owner's consent.

The local demo is not a full production security deployment: there is no authentication, shared database, or rate limiter. The API limits text size and uploaded file size but should also be protected with deployment-level rate limiting.

## Limitations and next steps

- Reports are saved only in the browser that created them.
- Export uses the browser's print dialog; select “Save as PDF”.
- Improvement suggestions are included in the report as prompts for factual edits; this starter does not auto-rewrite a candidate's work history.
- Configure authentication, persistent storage, CSRF/rate limiting, observability, and a privacy review before deploying to multiple users.
- Add real screenshots after running the app locally.

## License

MIT. See [LICENSE](./LICENSE).

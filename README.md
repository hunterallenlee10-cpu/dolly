# Dolly's Tax & Advisory CPA: concept website

Spec preview by Lee Enterprises Unlimited for Dolly Suarez, CPA, CFP® professional.
Front-end only: Next.js (App Router), TypeScript, Tailwind CSS v4, Motion, Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

- Plan, QA results and the list of `[Confirm ...]` items: `implementation_kickstart.md`
- Review screenshots (375px and 1440px): `docs/screenshots/`
- Site facts live in `lib/site.ts`; each section is one file in `components/sections/`
- The booking form logs to the console only. Connect a form service at the `TODO` in `components/booking/BookingForm.tsx`.
- The site is `noindex, nofollow` until approved (`app/layout.tsx`, `app/robots.ts`).
- Original Drive photos go in `public/images/raw/` (git-ignored: the original certificate shows the license number).

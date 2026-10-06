# Deekda site

Static intro, download, support and privacy pages for Deekda (Next.js `output: "export"`, no server).
Korean at `/`, English at `/en/`. The design comes from the Figma "Website" target of `tools/figma-galaxy-phone-mockups` in the smalldisplay repo.

```sh
npm install
npm run dev        # http://localhost:3000/deekda-site/
npm run typecheck
npm run build      # writes out/, then copies support/ and privacy/ to support.html and privacy.html
```

- **Base path:** served under `/deekda-site` on GitHub Pages. For a custom domain build with `SITE_BASE_PATH=""`.
- **Old URLs:** the App Store listings link to `/support.html` and `/privacy.html`; `scripts/legacy-urls.mjs` keeps both working.
- **App Store button:** set `APP_STORE_URL` in `lib/site.ts`. While it is empty the button shows "link coming soon".
- **Copy:** every string is in `lib/content.ts` (ko/en); the privacy text is in `lib/privacy.tsx`.
- **Dot field + motion:** the background is a canvas dot field (`components/DotField.tsx`, math in `lib/dotfield.ts`, tweens by GSAP core). It reacts to a mouse only (`(hover: hover) and (pointer: fine)`, not with reduced motion); touch gets static dots with slow breathing. Theme choices in the Themes section recolor it through the `deekda-accent` window event. Spec: `docs/superpowers/specs/2026-10-06-site-redesign-design.md` in the smalldisplay repo.
- **Tests:** `npm run test:unit` (pure logic plus CSS/source structure) and, after `npm run build`, `npm run test:built` (checks `out/*.html`). Needs Node 22.18+ (type stripping); CI only builds.
- **Deploy:** `.github/workflows/pages.yml` publishes `out/` once Settings → Pages → Source is switched to "GitHub Actions".

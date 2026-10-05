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
- **Deploy:** `.github/workflows/pages.yml` publishes `out/` once Settings → Pages → Source is switched to "GitHub Actions".

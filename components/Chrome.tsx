import Link from "next/link";
import { COPY } from "@/lib/content";
import { CONTACT_EMAIL, asset, pagePath, type Lang, type PageKey } from "@/lib/site";

function Logo({ lang }: { lang: Lang }) {
  return (
    <Link href={pagePath(lang, "home")} className="logo" aria-label="Deekda">
      <img src={asset("/images/app-icon.png")} width={32} height={32} alt="" />
      <span>Deekda</span>
    </Link>
  );
}

export function LangToggle({ lang, page }: { lang: Lang; page: PageKey }) {
  const other: Lang = lang === "ko" ? "en" : "ko";
  return (
    <div className="lang" role="group" aria-label="Language">
      <Link href={pagePath("ko", page)} className={lang === "ko" ? "on" : ""} hrefLang="ko" aria-current={lang === "ko" ? "true" : undefined} prefetch={false}>KO</Link>
      <Link href={pagePath("en", page)} className={lang === "en" ? "on" : ""} hrefLang="en" aria-current={lang === "en" ? "true" : undefined} prefetch={false}>EN</Link>
      <span className="sr-only">{other}</span>
    </div>
  );
}

export function Header({ lang, page }: { lang: Lang; page: PageKey }) {
  const t = COPY[lang].nav;
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Logo lang={lang} />
        <nav className="nav" aria-label="Main">
          <Link href={pagePath(lang, "home")} aria-current={page === "home" ? "page" : undefined}>{t.about}</Link>
          <Link href={pagePath(lang, "support")} aria-current={page === "support" ? "page" : undefined}>{t.support}</Link>
        </nav>
        <div className="header-end">
          <LangToggle lang={lang} page={page} />
          <Link href={pagePath(lang, "download")} className="btn btn-primary btn-sm">{t.download}</Link>
          <details className="menu">
            <summary aria-label={t.menu}><span /><span /><span /></summary>
            <div className="menu-panel">
              <Link href={pagePath(lang, "home")}>{t.about}</Link>
              <Link href={pagePath(lang, "support")}>{t.support}</Link>
              <Link href={pagePath(lang, "download")}>{t.download}</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const t = COPY[lang].footer;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Logo lang={lang} />
          <div className="footer-links">
            <span>{t.contact} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span>
            <Link href={pagePath(lang, "privacy")}>{t.privacy}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BYONGHOON KIM</span>
          <span>{t.weather}</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { COPY } from "@/lib/content";
import { PRIVACY } from "@/lib/privacy";
import { pagePath, type Lang } from "@/lib/site";
import { Footer, Header } from "../Chrome";
import { Section } from "../ui";

export function PrivacyPage({ lang }: { lang: Lang }) {
  const t = COPY[lang].privacy;
  const doc = PRIVACY[lang];
  return (
    <>
      <Header lang={lang} page="privacy" />
      <main>
        <Section className="page-head">
          <h1>{doc.heading}</h1>
          <p className="small muted">{doc.effective}</p>
        </Section>

        <Section className="tight-top">
          <div className="doc-layout">
            <aside className="toc" aria-label={t.toc}>
              <p className="cap dim">{t.toc}</p>
              <ul>
                {doc.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
              </ul>
            </aside>
            <article className="doc">
              <nav className="tabs" aria-label={t.tabLabel}>
                <Link href={pagePath("ko", "privacy")} hrefLang="ko" className={lang === "ko" ? "on" : ""} aria-current={lang === "ko" ? "page" : undefined}>{t.tabs[0]}</Link>
                <Link href={pagePath("en", "privacy")} hrefLang="en" className={lang === "en" ? "on" : ""} aria-current={lang === "en" ? "page" : undefined}>{t.tabs[1]}</Link>
              </nav>
              <p>{doc.intro}</p>
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id}>
                  <h2 className="h2-sm">{s.title}</h2>
                  {s.blocks.map((b, i) => ("p" in b ? <p key={i}>{b.p}</p> : <ul key={i}>{b.ul.map((li, j) => <li key={j}>{li}</li>)}</ul>))}
                </section>
              ))}
            </article>
          </div>
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

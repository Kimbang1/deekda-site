import { COPY } from "@/lib/content";
import { APP_STORE_URL, RELEASES, type Lang } from "@/lib/site";
import { Footer, Header } from "../Chrome";
import { ButtonLink, Chip, DisabledButton, Section } from "../ui";

export function DownloadPage({ lang }: { lang: Lang }) {
  const t = COPY[lang].download;
  return (
    <>
      <Header lang={lang} page="download" />
      <main>
        <Section className="page-head">
          <h1>{t.title}</h1>
          <p className="lead muted measure">{t.body}</p>
        </Section>

        <Section className="tight-top">
          <div className="platform-grid">
            <article className="card platform">
              <h2 className="h2-sm">{t.windows.name}</h2>
              <Chip>{RELEASES.windows.tag}</Chip>
              <p className="muted">{t.windows.note}</p>
              <ButtonLink href={RELEASES.windows.url}>{t.windows.button}</ButtonLink>
            </article>
            <article className="card platform">
              <h2 className="h2-sm">{t.mac.name}</h2>
              <Chip>{RELEASES.mac.tag}</Chip>
              <p className="muted">{t.mac.note}</p>
              <ButtonLink href={RELEASES.mac.url}>{t.mac.button}</ButtonLink>
            </article>
          </div>
        </Section>

        <Section tone="alt">
          <h2 className="measure">{t.smart.title}</h2>
          <p className="lead muted measure">{t.smart.body}</p>
          <ol className="smart-steps">
            {t.smart.steps.map((s, i) => (
              <li key={s} className="card">
                <span className="step-num mono" aria-hidden="true">{i + 1}</span>
                <p className="h3">{s}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <h2>{t.store.title}</h2>
          <p className="lead muted">{t.store.body}</p>
          <div className="actions">
            {APP_STORE_URL ? <ButtonLink href={APP_STORE_URL} kind="secondary">{t.store.appStore}</ButtonLink> : <DisabledButton>{t.store.appStoreSoon}</DisabledButton>}
            <DisabledButton>{t.store.play}</DisabledButton>
          </div>
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

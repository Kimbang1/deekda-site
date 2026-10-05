import { COPY } from "@/lib/content";
import { CONTACT_EMAIL, type Lang } from "@/lib/site";
import { Footer, Header } from "../Chrome";
import { Section } from "../ui";

export function SupportPage({ lang }: { lang: Lang }) {
  const t = COPY[lang].support;
  return (
    <>
      <Header lang={lang} page="support" />
      <main>
        <Section className="page-head">
          <h1>{t.title}</h1>
        </Section>

        <Section className="tight-top">
          <div className="split">
            <div>
              <h2>{t.stepsTitle}</h2>
              <p className="lead muted">{t.stepsBody}</p>
            </div>
            <div>
              <ol className="rows numbered">
                {t.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="mono step-inline" aria-hidden="true">{i + 1}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p className="muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {t.extras.map((e) => <p key={e} className="muted extra">{e}</p>)}
            </div>
          </div>
        </Section>

        <Section tone="alt">
          <div className="split">
            <h2>{t.faqTitle}</h2>
            <div className="faq">
              {t.faq.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary><span className="h3">{f.q}</span><i aria-hidden="true" /></summary>
                  <p className="muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="split">
            <span />
            <div className="card contact">
              <h3>{t.contactTitle}</h3>
              <p className="muted">{t.contactBody}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mail">{CONTACT_EMAIL}</a>
            </div>
          </div>
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

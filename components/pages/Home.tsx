import type { CSSProperties } from "react";
import { COPY } from "@/lib/content";
import { RELEASES, asset, type Lang } from "@/lib/site";
import { Footer, Header } from "../Chrome";
import { PcScreen } from "../PcScreen";
import { Tilt } from "../Tilt";
import { Badge, ButtonLink, Section } from "../ui";
import { GuardianTile, Watch } from "../Watch";

function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="display">{t.hero.title.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="lead muted">{t.hero.lead}</p>
          <div className="actions">
            <ButtonLink href={RELEASES.windows.url}>{t.hero.windows}</ButtonLink>
            <ButtonLink href={RELEASES.mac.url} kind="secondary">{t.hero.mac}</ButtonLink>
          </div>
          <div className="badges">
            <Badge tone="cyan">{t.hero.badgeStore}</Badge>
            <Badge tone="violet">{t.hero.badgeGalaxy}</Badge>
          </div>
        </div>
        <Tilt className="scene">
          <div className="scene-monitor">
            <div className="scene-screen"><PcScreen mode="bars" /></div>
            <i className="scene-neck" />
            <i className="scene-base" />
          </div>
          <div className="scene-watch">
            <i className="hero-glow" />
            {[0, 1, 2].map((n) => <i key={n} className="pulse-ring" style={{ "--n": n } as CSSProperties} />)}
            <Watch kind="character" theme="neon" />
            <i className="stand-post" />
            <i className="stand-base" />
          </div>
        </Tilt>
      </div>
      <div className="desk">
        <div className="wrap"><p className="small muted">{t.hero.caption}</p></div>
      </div>
    </section>
  );
}

function Mirror({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <Section>
      <h2>{t.mirror.title}</h2>
      <p className="lead muted measure">{t.mirror.body}</p>
      <div className="mirror-grid">
        <figure className="card mirror-pc">
          <div className="mirror-screen">
            <PcScreen mode="full" className="pc-full" />
            <PcScreen mode="compact" className="pc-compact" />
          </div>
          <figcaption className="small muted">{t.mirror.pc}</figcaption>
        </figure>
        <figure className="card mirror-watch">
          <Watch kind="system" theme="neon" online={t.scene.online} label={t.alt.system} />
          <figcaption className="small muted">{t.mirror.watch}</figcaption>
        </figure>
      </div>
    </Section>
  );
}

function Pages({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <Section tone="alt">
      <h2>{t.pages.title}</h2>
      <p className="lead muted measure">{t.pages.body}</p>
      <div className="pages-grid">
        {t.pages.items.map((item) => (
          <figure key={item.key} className="page-item">
            <div className="stage">
              <Watch kind={item.key} theme="neon" online={t.scene.online} label={t.alt[item.key]} />
            </div>
            <figcaption>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Themes({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const themes = ["modern", "matrix", "neon"] as const;
  return (
    <Section>
      <div className="themes-grid">
        <div>
          <h2>{t.themes.title}</h2>
          <p className="lead muted">{t.themes.body}</p>
          <div className="mascots">
            <figure><div className="tile"><GuardianTile label={t.themes.guardian} /></div><figcaption className="small muted">{t.themes.guardian}</figcaption></figure>
            <figure><div className="tile tile-pixel"><img src={asset("/images/pixel-face.png")} width={512} height={512} alt={t.alt.pixel} loading="lazy" /></div><figcaption className="small muted">{t.themes.pixel}</figcaption></figure>
          </div>
        </div>
        <div className="theme-watches">
          {themes.map((theme, i) => (
            <figure key={theme} className={i === 1 ? "raised" : ""}>
              <Watch kind="system" theme={theme} online={COPY[lang].scene.online} label={`${t.themes.names[i]} theme`} />
              <figcaption className="small muted">{t.themes.names[i]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Steps({ lang }: { lang: Lang }) {
  const t = COPY[lang].steps;
  return (
    <Section tone="alt">
      <h2>{t.title}</h2>
      <p className="lead muted">{t.body}</p>
      <ol className="steps">
        {t.items.map((s, i) => (
          <li key={s.title}>
            <span className="step-num mono" aria-hidden="true">{i + 1}</span>
            <h3>{s.title}</h3>
            <p className="muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Trust({ lang }: { lang: Lang }) {
  const t = COPY[lang].trust;
  return (
    <Section>
      <div className="split">
        <div>
          <h2>{t.title}</h2>
          <p className="lead muted">{t.body}</p>
        </div>
        <dl className="rows">
          {t.items.map((it) => (
            <div key={it.title}>
              <dt className="h3">{it.title}</dt>
              <dd className="muted">{it.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function Env({ lang }: { lang: Lang }) {
  const t = COPY[lang].env;
  return (
    <Section tone="alt">
      <div className="split">
        <h2>{t.title}</h2>
        <dl className="table">
          {t.rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd className="muted">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function Cta({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <Section className="cta">
      <h2 className="h1">{t.cta.title}</h2>
      <div className="actions center">
        <ButtonLink href={RELEASES.windows.url}>{t.hero.windows}</ButtonLink>
        <ButtonLink href={RELEASES.mac.url} kind="secondary">{t.hero.mac}</ButtonLink>
      </div>
      <p className="small dim">{t.cta.note}</p>
    </Section>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Header lang={lang} page="home" />
      <main>
        <Hero lang={lang} />
        <Mirror lang={lang} />
        <Pages lang={lang} />
        <Themes lang={lang} />
        <Steps lang={lang} />
        <Trust lang={lang} />
        <Env lang={lang} />
        <Cta lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { Step, Steps, useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import portrait from './assets/me-potrait-new.png';

export const design: DesignSystem = {
  palette: { bg: '#0a0f0c', text: '#e9f5ec', accent: '#7cffa0' },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  typeScale: { hero: 150, body: 36 },
  radius: 10,
};

const mono = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
const muted = '#7a9385';
const amber = '#ffb454';
const panelBg = '#121a14';
const border = '#223228';

const fill = { width: '100%', height: '100%' } as const;

const headingStyle: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 72,
  fontWeight: 800,
  lineHeight: 1.15,
  margin: 0,
  maxWidth: 1560,
};

const bulletRow: CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: 20 };
const bulletMarker: CSSProperties = { fontFamily: mono, fontSize: 32, color: 'var(--osd-accent)', lineHeight: 1.4 };
const bulletText: CSSProperties = {
  fontFamily: 'var(--osd-font-body)',
  fontSize: 'var(--osd-size-body)',
  lineHeight: 1.4,
  margin: 0,
  maxWidth: 1500,
};

const tableHeadStyle: CSSProperties = {
  fontFamily: mono,
  fontSize: 22,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: muted,
};

// ---------------------------------------------------------------------------
// Transitions — one DNA for the deck (RISE), a cover-grade variant (SETTLE).
// ---------------------------------------------------------------------------

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const settle: SlideTransition = {
  duration: 280,
  exit: { duration: 280, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 280,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Shared pieces
// ---------------------------------------------------------------------------

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `1px solid ${border}`,
        paddingTop: 16,
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 20,
          letterSpacing: '0.2em',
          color: muted,
          textTransform: 'uppercase',
        }}
      >
        Compression Dictionary Transport
      </span>
      <span style={{ fontFamily: mono, fontSize: 20, color: muted }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const PageShell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div
    style={{
      ...fill,
      position: 'relative',
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
      padding: '100px 120px 100px 120px',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 24,
        letterSpacing: '0.25em',
        color: 'var(--osd-accent)',
        textTransform: 'uppercase',
        marginBottom: 28,
      }}
    >
      {label}
    </div>
    {children}
    <Footer />
  </div>
);

const SectionDividerLayout = ({
  part,
  line1,
  line2,
  subtitle,
}: {
  part: string;
  line1: string;
  line2: string;
  subtitle: string;
}) => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 160px',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 32,
        letterSpacing: '0.3em',
        color: 'var(--osd-accent)',
        textTransform: 'uppercase',
        marginBottom: 40,
      }}
    >
      {part}
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 120,
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
      }}
    >
      <div>{line1}</div>
      <div>{line2}</div>
    </h2>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, maxWidth: 1300, lineHeight: 1.4 }}>{subtitle}</p>
  </div>
);

const Bullet = ({ children }: { children: ReactNode }) => (
  <div style={bulletRow}>
    <span style={bulletMarker}>&rsaquo;</span>
    <p style={bulletText}>{children}</p>
  </div>
);

const CodePanel = ({ label, children }: { label: string; children: ReactNode }) => (
  <div
    style={{
      background: panelBg,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 32px',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 20,
        letterSpacing: '0.2em',
        color: muted,
        textTransform: 'uppercase',
        marginBottom: 16,
      }}
    >
      {label}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: mono, fontSize: 26, lineHeight: 1.6, color: 'var(--osd-text)' }}>
      {children}
    </div>
  </div>
);

const BarRow = ({
  label,
  pct,
  valueLabel,
  color,
}: {
  label: string;
  pct: number;
  valueLabel: string;
  color: string;
}) => {
  const active = useIsActivePage();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <span
        style={{
          width: 130,
          fontFamily: mono,
          fontSize: 22,
          color: muted,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 28,
          background: panelBg,
          border: `1px solid ${border}`,
          borderRadius: 'var(--osd-radius)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: active ? `${pct}%` : '0%',
            background: color,
            borderRadius: 'var(--osd-radius)',
            transition: 'width 900ms cubic-bezier(0, 0, 0.2, 1)',
          }}
        />
      </div>
      <span style={{ width: 80, fontFamily: mono, fontSize: 22, color: 'var(--osd-text)', textAlign: 'right' }}>
        {valueLabel}
      </span>
    </div>
  );
};

const StatCard = ({
  eyebrow,
  value,
  caption,
  color,
}: {
  eyebrow: string;
  value: string;
  caption: string;
  color: string;
}) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <span
      style={{
        fontFamily: mono,
        fontSize: 24,
        letterSpacing: '0.1em',
        color: muted,
        textTransform: 'uppercase',
      }}
    >
      {eyebrow}
    </span>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 110, fontWeight: 900, lineHeight: 1.05, color }}>
      {value}
    </span>
    <span style={{ fontSize: 26, color: muted, lineHeight: 1.4, maxWidth: 520 }}>{caption}</span>
  </div>
);

const Badge = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 140,
      height: 140,
      borderRadius: 999,
      border: '2px solid var(--osd-accent)',
      fontFamily: mono,
      fontSize: 38,
      fontWeight: 700,
      color: 'var(--osd-accent)',
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const FlowChip = ({ label, sub, accent }: { label: string; sub: string; accent?: boolean }) => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '24px 20px',
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${accent ? 'var(--osd-accent)' : border}`,
      background: panelBg,
    }}
  >
    <span style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, color: accent ? 'var(--osd-accent)' : 'var(--osd-text)' }}>
      {label}
    </span>
    <span style={{ fontSize: 20, color: muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{sub}</span>
  </div>
);

const Operator = ({ children }: { children: ReactNode }) => (
  <span style={{ fontFamily: mono, fontSize: 40, color: muted, flexShrink: 0 }}>{children}</span>
);

const ColumnLabel = ({ children, accent }: { children: ReactNode; accent?: boolean }) => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 24,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: accent ? 'var(--osd-accent)' : muted,
    }}
  >
    {children}
  </div>
);

const FlowBox = ({ index, children }: { index: string; children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start',
      background: panelBg,
      border: `1px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '20px 24px',
    }}
  >
    <span style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, color: 'var(--osd-accent)', flexShrink: 0 }}>
      {index}
    </span>
    <p style={{ fontSize: 26, lineHeight: 1.4, margin: 0, color: 'var(--osd-text)' }}>{children}</p>
  </div>
);

const TableRow = ({
  method,
  source,
  savings,
  highlight,
}: {
  method: string;
  source: string;
  savings: string;
  highlight?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '280px 1fr 240px',
      alignItems: 'center',
      padding: '22px 0',
      borderBottom: `1px solid ${border}`,
      background: highlight ? 'rgba(124, 255, 160, 0.06)' : 'transparent',
    }}
  >
    <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 700, color: highlight ? 'var(--osd-accent)' : 'var(--osd-text)' }}>
      {method}
    </span>
    <span style={{ fontSize: 28, color: muted }}>{source}</span>
    <span
      style={{
        fontFamily: mono,
        fontSize: 30,
        fontWeight: 700,
        color: highlight ? 'var(--osd-accent)' : 'var(--osd-text)',
        textAlign: 'right',
      }}
    >
      {savings}
    </span>
  </div>
);

const Card = ({
  label,
  title,
  accent,
  children,
}: {
  label: string;
  title: string;
  accent?: boolean;
  children: ReactNode;
}) => (
  <div
    style={{
      flex: 1,
      background: panelBg,
      border: `1px solid ${accent ? 'var(--osd-accent)' : border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 28px 30px',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 22,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: accent ? 'var(--osd-accent)' : muted,
        marginBottom: 16,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.25, color: accent ? 'var(--osd-accent)' : 'var(--osd-text)' }}>
      {title}
    </div>
    <p style={{ fontSize: 26, lineHeight: 1.45, color: muted, margin: '12px 0 0' }}>{children}</p>
  </div>
);

const AgendaItem = ({ n, children }: { n: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
    <span style={{ fontFamily: mono, fontSize: 32, color: 'var(--osd-accent)', fontWeight: 700 }}>{n}</span>
    <span style={{ fontFamily: 'var(--osd-font-body)', fontSize: 'var(--osd-size-body)', lineHeight: 1.4 }}>
      {children}
    </span>
  </div>
);

const ResourceLine = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <span style={{ fontFamily: mono, fontSize: 28, color: 'var(--osd-accent)' }}>&rsaquo;</span>
    <span style={{ fontFamily: mono, fontSize: 28, color: 'var(--osd-text)' }}>{children}</span>
  </div>
);

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 160px',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 28,
        letterSpacing: '0.3em',
        color: 'var(--osd-accent)',
        textTransform: 'uppercase',
        marginBottom: 40,
      }}
    >XTREMEJS · 2026</div>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 900,
        lineHeight: 1.05,
        margin: 0,
      }}
    >
      <div>The Next Evolution</div>
      <div>of Web Compression</div>
    </h1>
    <p style={{ fontSize: 40, color: muted, marginTop: 40, maxWidth: 1400, lineHeight: 1.4 }}>
      From gzip and Brotli to Compression Dictionary Transport
    </p>
  </div>
);
Cover.transition = settle;

const Introduction: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '70px 120px 60px',
    }}
  >
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 72 }}>
      <div style={{ width: 510, flexShrink: 0 }}>
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: '2px solid var(--osd-accent)',
            padding: 10,
            marginBottom: 28,
          }}
        >
          <img
            src={portrait}
            alt="Raihan Nismara"
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 56,
            fontWeight: 900,
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Raihan Nismara
        </h2>
        <p style={{ fontSize: 28, color: muted, margin: '16px 0 0', lineHeight: 1.4 }}>
          Frontend Engineer · d3labs.io
        </p>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 22, alignItems: 'start' }}>
          <span style={{ fontSize: 28, fontWeight: 800 }}>Nationality</span>
          <span style={{ fontSize: 30, color: muted }}>Indonesia 🇮🇩</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 22, alignItems: 'start' }}>
          <span style={{ fontSize: 28, fontWeight: 800 }}>Recent Works</span>
          <div style={{ fontSize: 28, color: muted, lineHeight: 1.55 }}>
            <div>- Frontend Dev · Telkom Indonesia</div>
            <div>- Frontend Dev · Belanjaqu</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 22, alignItems: 'start' }}>
          <span style={{ fontSize: 28, fontWeight: 800 }}>Past Talks</span>
          <div style={{ fontSize: 28, color: muted, lineHeight: 1.55 }}>
            <div>- Fork It Community &lsquo;25</div>
            <div>- JS Poland &lsquo;24</div>
            <div>- CityJS Singapore &lsquo;24</div>
            <div>- iJS Singapore &lsquo;23–&lsquo;24</div>
          </div>
        </div>
      </div>
    </div>
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: 34,
        marginTop: 42,
        paddingTop: 22,
        borderTop: `1px solid ${border}`,
        fontFamily: mono,
        fontSize: 22,
        color: muted,
      }}
    >
      <span>◉ raihan.my.id</span>
      <span style={{ color: 'var(--osd-accent)' }}>in</span>
      <span>Raihan Nismara</span>
      <span style={{ color: '#ff5d5d' }}>▶</span>
      <span>codevcast</span>
      <span style={{ color: '#ff8ac2' }}>◎</span>
      <span>raihan.nismara</span>
    </div>
  </div>
);
Introduction.transition = settle;

const Agenda: Page = () => (
  <PageShell label="Running order">
    <h2 style={headingStyle}>Where we&rsquo;re headed</h2>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Steps>
        <Step>
          <AgendaItem n="01">A short history of squeezing bytes over the wire</AgendaItem>
        </Step>
        <Step>
          <AgendaItem n="02">How gzip, Brotli, and negotiation work today</AgendaItem>
        </Step>
        <Step>
          <AgendaItem n="03">Differential compression, explained simply</AgendaItem>
        </Step>
        <Step>
          <AgendaItem n="04">Compression Dictionary Transport: your cache as a dictionary</AgendaItem>
        </Step>
        <Step>
          <AgendaItem n="05">Measuring honestly, and how to ship it</AgendaItem>
        </Step>
      </Steps>
    </div>
  </PageShell>
);

const SectionOne: Page = () => (
  <SectionDividerLayout
    part="Part 01"
    line1="A Short History of"
    line2="Squeezing Bytes"
    subtitle="From punch cards to protocol headers"
  />
);

const Lz77: Page = () => (
  <PageShell label="01 — The sliding window">
    <h2 style={headingStyle}>LZ77: don&rsquo;t repeat yourself</h2>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>Lempel &amp; Ziv publish the idea in 1977</Bullet>
      <Bullet>Find a byte sequence you&rsquo;ve already seen, replace it with a pointer</Bullet>
      <Bullet>The &ldquo;dictionary&rdquo; is simply what&rsquo;s already been sent — a sliding window</Bullet>
      <Bullet>Nearly every format since — zip, PNG, gzip, Brotli — builds on this</Bullet>
    </div>
    <div style={{ marginTop: 40 }}>
      <CodePanel label="Example">
        <div>Input&nbsp;&nbsp;&nbsp;the cat sat on the mat</div>
        <div>
          Encoded&nbsp;the cat sat on <span style={{ color: 'var(--osd-accent)' }}>&lsaquo;back 14, len 3&rsaquo;</span> mat
        </div>
      </CodePanel>
    </div>
  </PageShell>
);

const Gzip: Page = () => (
  <PageShell label="02 — Going mainstream (1992)">
    <h2 style={headingStyle}>gzip: LZ77 plus a smarter alphabet</h2>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>DEFLATE combines LZ77 back-references with Huffman coding</Bullet>
      <Bullet>Frequent bytes get shorter codes, rare bytes get longer ones</Bullet>
      <Bullet>Shipped in 1992 — every browser and server has spoken it since</Bullet>
      <Bullet>Still the universal floor: if nothing else negotiates, gzip works</Bullet>
    </div>
    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <BarRow label="Raw" pct={100} valueLabel="1.00×" color={muted} />
      <BarRow label="gzip" pct={27} valueLabel="0.27×" color="var(--osd-accent)" />
    </div>
  </PageShell>
);

const Brotli: Page = () => (
  <PageShell label="03 — A bigger, smarter dictionary (2015)">
    <h2 style={headingStyle}>Brotli bakes the web into the format</h2>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>Google ships Brotli in 2015, standardized as RFC 7932</Bullet>
      <Bullet>Includes a ~120 KB static dictionary of common web text and markup</Bullet>
      <Bullet>Common web strings like &ldquo;function&rdquo; and &ldquo;background-color&rdquo; ship pre-built</Bullet>
      <Bullet>Typically 15–25% smaller than gzip on the same text</Bullet>
    </div>
    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <BarRow label="Raw" pct={100} valueLabel="1.00×" color={muted} />
      <BarRow label="gzip" pct={27} valueLabel="0.27×" color={amber} />
      <BarRow label="Brotli" pct={20} valueLabel="0.20×" color="var(--osd-accent)" />
    </div>
  </PageShell>
);

const SectionTwo: Page = () => (
  <SectionDividerLayout
    part="Part 02"
    line1="Compression"
    line2="On The Wire"
    subtitle="Four ways to ship the same bytes, and how browsers pick one"
  />
);

const Methods: Page = () => (
  <PageShell label="04 — The comparison">
    <h2 style={headingStyle}>Same JSON, four ways to send it</h2>
    <div style={{ marginTop: 56, display: 'flex', gap: 24 }}>
      <Card label="Plain" title="Identity">
        Readable bytes go straight onto the wire.
      </Card>
      <Card label="gzip" title="DEFLATE">
        A widely supported general-purpose baseline.
      </Card>
      <Card label="Brotli" title="br">
        General-purpose, often stronger on web text.
      </Card>
      <Card label="Dictionary" title="Shared context" accent>
        Known phrases help related responses shrink further.
      </Card>
    </div>
    <div
      style={{
        marginTop: 44,
        padding: '24px 32px',
        borderLeft: '3px solid var(--osd-accent)',
        background: panelBg,
        fontSize: 30,
        lineHeight: 1.4,
      }}
    >
      No universal winner. Measure your payload and repeat-visit pattern.
    </div>
  </PageShell>
);

const Negotiation: Page = () => (
  <PageShell label="05 — HTTP content negotiation">
    <h2 style={headingStyle}>Client advertises. Server selects.</h2>
    <div style={{ marginTop: 56, display: 'flex', gap: 24 }}>
      <CodePanel label="Request header">
        <div>Accept-Encoding:</div>
        <div style={{ color: 'var(--osd-accent)' }}>gzip, br</div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, lineHeight: 1.45 }}>
          The client lists what it can decode.
        </div>
      </CodePanel>
      <CodePanel label="Server choice">
        <div>select best match</div>
        <div style={{ color: 'var(--osd-accent)' }}>per response</div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, lineHeight: 1.45 }}>
          Often an edge or CDN layer decides.
        </div>
      </CodePanel>
      <CodePanel label="Response header">
        <div>Content-Encoding:</div>
        <div style={{ color: 'var(--osd-accent)' }}>br</div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, lineHeight: 1.45 }}>
          The body is Brotli encoded on the wire.
        </div>
      </CodePanel>
    </div>
    <p style={{ marginTop: 44, fontSize: 32, color: muted, lineHeight: 1.5, maxWidth: 1500 }}>
      If nothing matches, the server falls back to plain or gzip. Negotiation is what makes new codecs safe to ship.
    </p>
  </PageShell>
);

const FetchFlow: Page = () => (
  <PageShell label="06 — What the browser does">
    <h2 style={headingStyle}>The browser decodes it for you</h2>
    <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 20 }}>
      <FlowChip label="Server" sub="encodes body" />
      <Operator>&rarr;</Operator>
      <FlowChip label="Response" sub="Content-Encoding" />
      <Operator>&rarr;</Operator>
      <FlowChip label="Browser" sub="decodes bytes" />
      <Operator>&rarr;</Operator>
      <FlowChip label="fetch()" sub="response.json()" accent />
    </div>
    <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>JavaScript only ever sees decoded bytes</Bullet>
      <Bullet>No app code needed: it is pure HTTP negotiation</Bullet>
    </div>
  </PageShell>
);

const Ceiling: Page = () => (
  <PageShell label="07 — Where static dictionaries stop">
    <h2 style={headingStyle}>One dictionary can&rsquo;t know your site</h2>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Steps>
        <Step>
          <Bullet>Brotli&rsquo;s dictionary is generic — shared by every website on earth</Bullet>
        </Step>
        <Step>
          <Bullet>It has never seen your bundle hashes, your class names, your copy</Bullet>
        </Step>
        <Step>
          <Bullet>A repeat visitor still re-receives bytes their browser already has</Bullet>
        </Step>
        <Step>
          <div
            style={{
              marginTop: 12,
              padding: '28px 36px',
              border: '1px solid var(--osd-accent)',
              borderRadius: 'var(--osd-radius)',
              background: panelBg,
            }}
          >
            <p style={{ fontSize: 36, fontWeight: 700, color: 'var(--osd-accent)', margin: 0, textAlign: 'center' }}>
              What if the browser already had most of the answer?
            </p>
          </div>
        </Step>
      </Steps>
    </div>
  </PageShell>
);

const SectionThree: Page = () => (
  <SectionDividerLayout
    part="Part 03"
    line1="Differential"
    line2="Compression"
    subtitle="Why send the whole thing when you can send the difference?"
  />
);

const Diff: Page = () => (
  <PageShell label="08 — Diffing against what you already have">
    <h2 style={headingStyle}>Send the diff, not the whole file</h2>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>A &ldquo;reference&rdquo; is any version you already hold — a prior file, a patch base</Bullet>
      <Bullet>The encoder computes a diff — only what changed since the reference</Bullet>
      <Bullet>Classic tools: bsdiff, VCDIFF (RFC 3284), rsync&rsquo;s rolling checksum</Bullet>
      <Bullet>The decoder rebuilds the full output from reference + diff</Bullet>
    </div>
    <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 28 }}>
      <FlowChip label="Reference" sub="old version" />
      <Operator>+</Operator>
      <FlowChip label="Diff" sub="what changed" />
      <Operator>=</Operator>
      <FlowChip label="New file" sub="full output" accent />
    </div>
  </PageShell>
);

const DiffExample: Page = () => (
  <PageShell label="09 — Why it works: a real example">
    <h2 style={headingStyle}>The diff is often a rounding error</h2>
    <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 56 }}>
      <StatCard eyebrow="Full download" value="1.2 GB" caption="The entire updated game binary" color="var(--osd-text)" />
      <Badge>-97%</Badge>
      <StatCard eyebrow="Diff only" value="38 MB" caption="Just the bytes that actually changed" color="var(--osd-accent)" />
    </div>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Bullet>Game &amp; OS updates: Windows Update, PlayStation, and Steam all ship diffs</Bullet>
      <Bullet>Version control: git stores most history as diffs against prior trees</Bullet>
      <Bullet>Video codecs: only the pixels that changed between frames get encoded</Bullet>
    </div>
  </PageShell>
);

const SectionFour: Page = () => (
  <SectionDividerLayout
    part="Part 04"
    line1="Compression Dictionary"
    line2="Transport"
    subtitle="What if your last response could compress your next one?"
  />
);

const CdtIntro: Page = () => (
  <PageShell label="10 — Your cache becomes the dictionary">
    <h2 style={headingStyle}>Your old response becomes the dictionary</h2>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>Standardized as RFC 9842: Compression Dictionary Transport</Bullet>
      <Bullet>The browser tells the server which prior response it still holds</Bullet>
      <Bullet>The server compresses the new response as a diff against it</Bullet>
      <Bullet>Built on Shared Brotli and Shared Zstandard codecs</Bullet>
    </div>
    <div style={{ marginTop: 40 }}>
      <CodePanel label="Request &amp; response headers">
        <div>
          <span style={{ color: muted }}>Available-Dictionary:</span> sha-256=:8f3a...:
        </div>
        <div>
          <span style={{ color: muted }}>Use-As-Dictionary:</span> match=&quot;/assets/app.*.js&quot;
        </div>
        <div>
          <span style={{ color: muted }}>Content-Encoding:</span>{' '}
          <span style={{ color: 'var(--osd-accent)' }}>dcb</span> (dictionary-compressed brotli)
        </div>
      </CodePanel>
    </div>
  </PageShell>
);

const CdtFlow: Page = () => (
  <PageShell label="11 — How it works, in two visits">
    <h2 style={headingStyle}>Visit one teaches. Visit two profits.</h2>
    <div style={{ marginTop: 56, display: 'flex', gap: 56 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ColumnLabel>Visit 1 — first load</ColumnLabel>
        <Steps>
          <Step>
            <FlowBox index="01">Browser requests app.js for the first time</FlowBox>
          </Step>
          <Step>
            <FlowBox index="02">Server replies with the full file, tagged Use-As-Dictionary</FlowBox>
          </Step>
          <Step>
            <FlowBox index="03">Browser stores the response as a named dictionary in cache</FlowBox>
          </Step>
        </Steps>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ColumnLabel accent>Visit 2 — later update</ColumnLabel>
        <Steps>
          <Step>
            <FlowBox index="04">Browser requests app.v2.js, sends Available-Dictionary: &lt;hash&gt;</FlowBox>
          </Step>
          <Step>
            <FlowBox index="05">Server diffs v2 against that dictionary instead of starting from zero</FlowBox>
          </Step>
          <Step>
            <FlowBox index="06">Only the delta — often a few KB — crosses the network</FlowBox>
          </Step>
        </Steps>
      </div>
    </div>
  </PageShell>
);

const Protocol: Page = () => (
  <PageShell label="12 — The standard protocol">
    <h2 style={headingStyle}>RFC 9842 standardizes the negotiation</h2>
    <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <CodePanel label="Dictionary response">
        <div style={{ color: 'var(--osd-accent)' }}>Use-As-Dictionary</div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, lineHeight: 1.45 }}>
          Scopes which future URLs may use it.
        </div>
      </CodePanel>
      <CodePanel label="Future request">
        <div style={{ color: 'var(--osd-accent)' }}>Available-Dictionary</div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, lineHeight: 1.45 }}>
          Client names its copy by SHA-256 hash.
        </div>
      </CodePanel>
      <CodePanel label="Encoding choice">
        <div style={{ color: 'var(--osd-accent)' }}>Accept-Encoding: dcb, dcz</div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, lineHeight: 1.45 }}>
          Dictionary-aware Brotli and Zstandard.
        </div>
      </CodePanel>
      <CodePanel label="Caches must vary">
        <div style={{ color: 'var(--osd-accent)' }}>Vary: available-dictionary</div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, lineHeight: 1.45 }}>
          Variants are keyed on the dictionary. HTTPS only.
        </div>
      </CodePanel>
    </div>
  </PageShell>
);

const CdtNumbers: Page = () => (
  <PageShell label="13 — The numbers">
    <h2 style={headingStyle}>90% fewer bytes, same bundle</h2>
    <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 56 }}>
      <StatCard
        eyebrow="Without a shared dictionary"
        value="100%"
        caption="Every byte of app.js, every single deploy"
        color="var(--osd-text)"
      />
      <Badge>-90%</Badge>
      <StatCard
        eyebrow="With a shared dictionary"
        value="~8%"
        caption="Only the bytes that actually changed"
        color="var(--osd-accent)"
      />
    </div>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Bullet>Chrome shipped support behind a flag in 2023, stable soon after</Bullet>
      <Bullet>Biggest win: versioned JS/CSS bundles where only a hash changed</Bullet>
      <Bullet>web.dev reports 80–90%+ smaller transfers on repeat bundle updates</Bullet>
    </div>
  </PageShell>
);

const SearchExample: Page = () => (
  <PageShell label="14 — A measured example">
    <h2 style={headingStyle}>Google Search: 107 kB down to 60 kB</h2>
    <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 56 }}>
      <StatCard eyebrow="First load · Content-Encoding: br" value="107 kB" caption="Full response, standard Brotli" color="var(--osd-text)" />
      <Badge>-44%</Badge>
      <StatCard eyebrow="Reload · Content-Encoding: dcb" value="60 kB" caption="Dictionary-compressed Brotli" color="var(--osd-accent)" />
    </div>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Bullet>Chrome reports ~23% smaller HTML on average vs Brotli</Bullet>
      <Bullet>Source: Chrome for Developers, May 2025 — their data, not ours</Bullet>
    </div>
  </PageShell>
);

const Comparison: Page = () => (
  <PageShell label="15 — Three generations, side by side">
    <h2 style={headingStyle}>Same job, smarter reference each time</h2>
    <div style={{ marginTop: 48 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 240px',
          padding: '0 0 16px 0',
          borderBottom: `2px solid ${border}`,
        }}
      >
        <span style={tableHeadStyle}>Method</span>
        <span style={tableHeadStyle}>Dictionary source</span>
        <span style={{ ...tableHeadStyle, textAlign: 'right' }}>Typical savings</span>
      </div>
      <Steps>
        <Step>
          <TableRow method="gzip" source="None — pure LZ77 + Huffman" savings="~70%" />
        </Step>
        <Step>
          <TableRow method="Brotli" source="Generic static dictionary (web-wide)" savings="~75–80%" />
        </Step>
        <Step>
          <TableRow method="CDT" source="Your own previous response" savings="~90%+" highlight />
        </Step>
      </Steps>
    </div>
    <p style={{ marginTop: 40, fontSize: 32, color: muted, lineHeight: 1.5, maxWidth: 1500 }}>
      Each generation needed a better reference. CDT&rsquo;s reference is the one thing only you have — your own
      history.
    </p>
  </PageShell>
);

const SectionFive: Page = () => (
  <SectionDividerLayout
    part="Part 05"
    line1="Measure,"
    line2="Then Ship"
    subtitle="Caveats, honest numbers, and a rollout loop"
  />
);

const Images: Page = () => (
  <PageShell label="16 — Know what not to compress">
    <h2 style={headingStyle}>Compress text, not photos</h2>
    <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 28 }}>
      <FlowChip label="JSON · HTML · JS · CSS" sub="repetitive text — compresses well" accent />
      <FlowChip label="JPEG · WebP · AVIF" sub="already compressed" />
    </div>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>Image formats already use image-specific compression</Bullet>
      <Bullet>Wrapping them in gzip or Brotli saves very little</Bullet>
      <Bullet>Spend dictionary effort on JS, CSS, HTML, and JSON</Bullet>
    </div>
  </PageShell>
);

const Measurement: Page = () => (
  <PageShell label="17 — Measure cold and warm">
    <h2 style={headingStyle}>One percentage hides four costs</h2>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <Card label="Response bytes" title="Compressed body only">
          What most tools report. Easy to compare, easy to over-trust.
        </Card>
        <Card label="First visit" title="Dictionary + response" accent>
          Charge for the context the client must fetch first.
        </Card>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <Card label="Repeat visit" title="Response with cached context">
          The dictionary is reused; its download is not repeated.
        </Card>
        <Card label="Everything else" title="Time, CPU, cache">
          Headers, TLS, and encode/decode time matter too.
        </Card>
      </div>
    </div>
  </PageShell>
);

const Rollout: Page = () => (
  <PageShell label="18 — Make it real">
    <h2 style={headingStyle}>Roll out with a measurement loop</h2>
    <div style={{ marginTop: 56, display: 'flex', gap: 24 }}>
      <Card label="01 · Observe" title="Find big repeated text">
        Start with JSON, HTML, JS, and CSS.
      </Card>
      <Card label="02 · Enable" title="Serve gzip or Brotli">
        Let negotiation and fallback work per client.
      </Card>
      <Card label="03 · Compare" title="Bytes and latency">
        Include CPU, cold cache, and repeat visits.
      </Card>
      <Card label="04 · Consider CDT" title="Add dictionaries" accent>
        Plan versioning, caching, client support, HTTPS.
      </Card>
    </div>
    <p style={{ marginTop: 44, fontSize: 30, color: muted, lineHeight: 1.5, maxWidth: 1500 }}>
      Use dictionaries when the same client repeatedly fetches related content and the savings justify the setup cost.
    </p>
  </PageShell>
);

const Closing: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 160px',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 28,
        letterSpacing: '0.3em',
        color: 'var(--osd-accent)',
        textTransform: 'uppercase',
        marginBottom: 40,
      }}
    >
      Thank you
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 120,
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
      }}
    >
      <div>Your Cache Is Now</div>
      <div>Part Of The Codec</div>
    </h2>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <ResourceLine>Chrome &amp; Edge — shipping now, support still evolving</ResourceLine>
      <ResourceLine>Spec: RFC 9842 — Compression Dictionary Transport (also RFC 7932, RFC 1952)</ResourceLine>
      <ResourceLine>Read more: web.dev/articles/compression-dictionary-transport</ResourceLine>
    </div>
    <p style={{ marginTop: 56, fontSize: 32, color: muted }}>Questions welcome.</p>
  </div>
);

export const meta: SlideMeta = {
  title: 'The Next Evoluyion of Web Compression (full)',
  createdAt: '2026-11-05T05:56:21.398Z',
};

export default [
  Cover,
  Introduction,
  Agenda,
  SectionOne,
  Lz77,
  Gzip,
  Brotli,
  SectionTwo,
  Methods,
  Negotiation,
  FetchFlow,
  Ceiling,
  SectionThree,
  Diff,
  DiffExample,
  SectionFour,
  CdtIntro,
  CdtFlow,
  Protocol,
  CdtNumbers,
  SearchExample,
  Comparison,
  SectionFive,
  Images,
  Measurement,
  Rollout,
  Closing,
] satisfies Page[];

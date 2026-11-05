import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#090b08', text: '#eef5e9', accent: '#c7ff4a' },
  fonts: {
    display: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  typeScale: { hero: 148, body: 32 },
  radius: 12,
};

const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const muted = '#98a58e';
const line = '#303a26';
const panel = '#13170f';
const fill = { width: '100%', height: '100%' } as const;
const shell: CSSProperties = { ...fill, position: 'relative', boxSizing: 'border-box', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)', padding: '96px 124px 106px' };
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: { duration: 260, easing: EASE_OUT, keyframes: [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }] },
};

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return <div style={{ position: 'absolute', bottom: 37, left: 124, right: 124, borderTop: `1px solid ${line}`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', color: muted, fontFamily: mono, fontSize: 17, letterSpacing: '.08em' }}><span>WEB COMPRESSION LAB</span><span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span></div>;
};

const Frame = ({ label, children }: { label: string; children: ReactNode }) => <div style={shell}><div style={{ fontFamily: mono, color: 'var(--osd-accent)', fontSize: 28, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 25 }}>{label}</div>{children}<Footer /></div>;

const Heading = ({ children, size = 70 }: { children: ReactNode; size?: number }) => <h2 style={{ margin: 0, maxWidth: 1500, fontFamily: 'var(--osd-font-display)', fontSize: size, lineHeight: 1.1, letterSpacing: '-.045em', fontWeight: 650 }}>{children}</h2>;

const Pill = ({ children, accent = false }: { children: ReactNode; accent?: boolean }) => <span style={{ display: 'inline-flex', padding: '8px 12px', border: `1px solid ${accent ? '#718f2e' : line}`, borderRadius: 99, color: accent ? 'var(--osd-accent)' : muted, font: `17px ${mono}`, letterSpacing: '.03em' }}>{children}</span>;

const Box = ({ title, children, accent = false }: { title: string; children: ReactNode; accent?: boolean }) => <div style={{ background: panel, border: `1px solid ${accent ? '#617a2d' : line}`, borderRadius: 12, padding: '25px 27px', flex: 1 }}><div style={{ font: `17px ${mono}`, color: accent ? 'var(--osd-accent)' : muted, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 19 }}>{title}</div>{children}</div>;

const Cover: Page = () => <div style={{ ...shell, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', right: 100, top: 145, width: 580, height: 580, borderRadius: '50%', border: '1px solid #303a26', boxShadow: '0 0 0 50px #171c10, 0 0 0 51px #303a26, 0 0 0 115px #12170f, 0 0 0 116px #303a26' }} />
  <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320 }}>
    <Pill accent>FIELD DEMO · HTTP CONTENT ENCODING</Pill>
    <h1 style={{ fontSize: 136, lineHeight: .98, letterSpacing: '-.065em', margin: '34px 0 25px', fontWeight: 750 }}>Less wire.<br /><span style={{ color: 'var(--osd-accent)' }}>Same story.</span></h1>
    <p style={{ maxWidth: 920, fontSize: 31, lineHeight: 1.45, color: muted, margin: 0 }}>A small fetch demo comparing gzip, Brotli, and shared dictionaries on one JSON response.</p>
    <div style={{ display: 'flex', gap: 13, marginTop: 42 }}><Pill>PLAIN</Pill><Pill>GZIP</Pill><Pill>BROTLI</Pill><Pill accent>DICTIONARY</Pill></div>
  </div><Footer />
</div>;

const QuestionPage: Page = () => <Frame label="00 / the question">
  <Heading size={82}>Can yesterday's bytes make today's response smaller?</Heading>
  <p style={{ color: muted, fontSize: 28, lineHeight: 1.5, maxWidth: 1220, margin: '28px 0 50px' }}>We'll keep the data and interface fixed, then change how the same response travels.</p>
  <div style={{ display: 'flex', gap: 19 }}>
    <Box title="First"><div style={{ fontSize: 30 }}>What is the baseline?</div><p style={{ color: muted, fontSize: 28 }}>Plain JSON gives us a byte count to compare.</p></Box>
    <Box title="Then"><div style={{ fontSize: 30 }}>What do gzip and br find?</div><p style={{ color: muted, fontSize: 28 }}>General compressors learn patterns from each response.</p></Box>
    <Box title="Finally" accent><div style={{ fontSize: 30, color: 'var(--osd-accent)' }}>What if context is already known?</div><p style={{ color: muted, fontSize: 28 }}>A shared dictionary can carry patterns across responses.</p></Box>
  </div>
</Frame>;

const PayloadPage: Page = () => <Frame label="01 / the payload">
  <Heading>One familiar response, sent four ways.</Heading>
  <p style={{ fontSize: 28, color: muted, margin: '22px 0 42px' }}>Six travel cards repeat the same field names and data shapes.</p>
  <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
    <Box title="JSON response"><div style={{ font: `28px/1.8 ${mono}`, color: '#d1ddd3' }}><div>{'{'}</div><div style={{ paddingLeft: 28 }}><span style={{ color: 'var(--osd-accent)' }}>"title"</span>: "The quiet side of Bali",</div><div style={{ paddingLeft: 28 }}><span style={{ color: 'var(--osd-accent)' }}>"location"</span>: "Ubud, Indonesia",</div><div style={{ paddingLeft: 28 }}><span style={{ color: 'var(--osd-accent)' }}>"description"</span>: "A sunlit hideaway…",</div><div style={{ paddingLeft: 28 }}>… 3 more records</div><div>{'}'}</div></div></Box>
    <Box title="What repeats"><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><Pill>title</Pill><Pill>location</Pill><Pill>description</Pill><Pill>category</Pill><Pill>rating</Pill><Pill>image</Pill><Pill>price</Pill></div><p style={{ color: muted, fontSize: 28, lineHeight: 1.5, margin: '30px 0 0' }}>Repeated structure gives compressors patterns to reuse.</p></Box>
    <Box title="What the audience sees" accent><div style={{ fontSize: 47, color: 'var(--osd-accent)', fontWeight: 650, letterSpacing: '-.04em' }}>Same six cards</div><p style={{ color: muted, fontSize: 28, lineHeight: 1.5, margin: '13px 0 0' }}>Decoded JSON feeds the same UI in every tab.</p></Box>
  </div>
</Frame>;

const MethodsPage: Page = () => <Frame label="02 / the comparison">
  <Heading>Compression is a trade between patterns and overhead.</Heading>
  <div style={{ display: 'flex', gap: 18, marginTop: 45 }}>
    <Box title="Plain"><div style={{ fontSize: 35, fontWeight: 650 }}>Identity</div><p style={{ color: muted, fontSize: 28, lineHeight: 1.5 }}>The readable bytes go straight onto the wire.</p></Box>
    <Box title="gzip"><div style={{ fontSize: 35, fontWeight: 650 }}>DEFLATE</div><p style={{ color: muted, fontSize: 28, lineHeight: 1.5 }}>A widely supported general-purpose baseline.</p></Box>
    <Box title="Brotli"><div style={{ fontSize: 35, fontWeight: 650 }}>br</div><p style={{ color: muted, fontSize: 28, lineHeight: 1.5 }}>A general-purpose format often effective for web text.</p></Box>
    <Box title="Dictionary" accent><div style={{ fontSize: 35, fontWeight: 650, color: 'var(--osd-accent)' }}>Shared context</div><p style={{ color: muted, fontSize: 28, lineHeight: 1.5 }}>Known phrases can help related responses shrink further.</p></Box>
  </div>
  <div style={{ marginTop: 33, padding: '21px 25px', borderLeft: '3px solid #c7ff4a', background: panel, fontSize: 28, color: '#dfe9d5' }}>There is no universal winner. Measure the actual payload, settings, and repeat-request pattern.</div>
</Frame>;

const NegotiationPage: Page = () => <Frame label="03 / HTTP content negotiation">
  <Heading>Client advertises. Server selects. Browser decodes.</Heading>
  <div style={{ display: 'flex', gap: 20, marginTop: 45 }}>
    <Box title="Request header"><div style={{ font: `28px/1.7 ${mono}`, color: '#dbe7d0' }}>Accept-Encoding:<br /><span style={{ color: 'var(--osd-accent)' }}>gzip, br</span></div><p style={{ color: muted, fontSize: 28 }}>The client lists formats it can decode.</p></Box>
    <Box title="Server choice"><div style={{ font: `28px/1.7 ${mono}`, color: '#dbe7d0' }}>select best match<br /><span style={{ color: 'var(--osd-accent)' }}>for this response</span></div><p style={{ color: muted, fontSize: 28 }}>Often handled by a server or edge layer.</p></Box>
    <Box title="Response header" accent><div style={{ font: `28px/1.7 ${mono}`, color: 'var(--osd-accent)' }}>Content-Encoding:<br />br</div><p style={{ color: muted, fontSize: 28 }}>The body is Brotli encoded on the wire.</p></Box>
  </div>
  <div style={{ marginTop: 33, padding: '20px 24px', background: panel, border: `1px solid ${line}`, font: `28px/1.6 ${mono}`, color: muted }}>Accept-Encoding → select representation → Content-Encoding → decoded response</div>
</Frame>;

const FlowPage: Page = () => <Frame label="04 / what fetch does">
  <Heading>HTTP decompresses before your app reads JSON.</Heading>
  <div style={{ display: 'flex', alignItems: 'center', gap: 17, marginTop: 58 }}>
    <Box title="1 · server"><div style={{ font: `28px/1.65 ${mono}` }}>JSON bytes<br /><span style={{ color: 'var(--osd-accent)' }}>gzip / br</span></div></Box><div style={{ color: 'var(--osd-accent)', fontSize: 41 }}>→</div>
    <Box title="2 · response"><div style={{ font: `28px/1.65 ${mono}` }}>Content-Encoding<br /><span style={{ color: muted }}>compressed body</span></div></Box><div style={{ color: 'var(--osd-accent)', fontSize: 41 }}>→</div>
    <Box title="3 · browser"><div style={{ font: `28px/1.65 ${mono}` }}>decode bytes<br /><span style={{ color: 'var(--osd-accent)' }}>automatically</span></div></Box><div style={{ color: 'var(--osd-accent)', fontSize: 41 }}>→</div>
    <Box title="4 · fetch"><div style={{ font: `28px/1.65 ${mono}` }}>response.json()<br /><span style={{ color: muted }}>normal objects</span></div></Box>
  </div>
  <p style={{ maxWidth: 1350, fontSize: 28, lineHeight: 1.5, color: muted, marginTop: 42 }}>The demo asks for a mode in the URL; the server sends the matching encoding. The browser removes the content encoding before JavaScript parses the response.</p>
</Frame>;

const MeasurementPage: Page = () => <Frame label="05 / measure cold and warm">
  <Heading>One percentage hides four useful costs.</Heading>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 42 }}>
    <Box title="Response bytes"><div style={{ fontSize: 28 }}>Compressed JSON only</div><p style={{ color: muted, fontSize: 28 }}>The app exposes both wire-body and original JSON sizes.</p></Box>
    <Box title="First-use bytes" accent><div style={{ fontSize: 28, color: 'var(--osd-accent)' }}>Dictionary + response</div><p style={{ color: muted, fontSize: 28 }}>Charge for the context the client has to fetch.</p></Box>
    <Box title="Repeat-use bytes"><div style={{ fontSize: 28 }}>Response with cached context</div><p style={{ color: muted, fontSize: 28 }}>The dictionary is reused; its download is not repeated.</p></Box>
    <Box title="Other costs"><div style={{ fontSize: 28 }}>Time, CPU, cache, images</div><p style={{ color: muted, fontSize: 28 }}>Headers, TLS, image requests, and encode/decode time matter too.</p></Box>
  </div>
  <p style={{ color: muted, fontSize: 28, marginTop: 27 }}>Compare a cold visit and a warm visit. The best ratio may not be the best user experience.</p>
</Frame>;

const ReadoutPage: Page = () => <Frame label="06 / read the demo">
  <Heading>Compare bytes. Keep the user experience constant.</Heading>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 40 }}>
    <Box title="Live controls"><div style={{ display: 'flex', gap: 12 }}><Pill>Plain</Pill><Pill>gzip</Pill><Pill>Brotli</Pill><Pill accent>Dictionary</Pill></div><p style={{ color: muted, fontSize: 28, lineHeight: 1.5, margin: '24px 0 0' }}>Each tab fetches the same records and draws the same six cards.</p></Box>
    <Box title="What the counters mean" accent><div style={{ font: `28px/1.8 ${mono}` }}><div><span style={{ color: 'var(--osd-accent)' }}>ON THE WIRE</span> response bytes</div><div><span style={{ color: 'var(--osd-accent)' }}>LESS TO SEND</span> vs plain JSON</div><div><span style={{ color: 'var(--osd-accent)' }}>CONTENT-ENCODING</span> server header</div></div></Box>
  </div>
  <div style={{ display: 'flex', gap: 22, marginTop: 22 }}><Box title="Try this"><div style={{ fontSize: 28 }}>Choose each tab, then fetch again.</div><p style={{ color: muted, fontSize: 28 }}>Notice the output stays unchanged as the body size moves.</p></Box><Box title="Keep the measurement honest"><div style={{ fontSize: 28, color: '#d9e5da' }}>Payload bytes only</div><p style={{ color: muted, fontSize: 28 }}>Counters omit HTTP headers, TLS, and image requests.</p></Box></div>
</Frame>;

const DictionaryPage: Page = () => <Frame label="07 / shared context">
  <Heading>A dictionary can move repetition out of every response.</Heading>
  <div style={{ display: 'flex', gap: 24, marginTop: 45 }}>
    <Box title="First visit"><div style={{ display: 'flex', gap: 13, marginTop: 15 }}><Pill accent>DICTIONARY</Pill><span style={{ color: muted, fontSize: 32 }}>+</span><Pill>RESPONSE</Pill></div><p style={{ color: muted, fontSize: 28, marginTop: 28 }}>Fetch the shared context once.</p></Box>
    <Box title="Later visits" accent><div style={{ display: 'flex', gap: 13, marginTop: 15 }}><Pill accent>CACHED DICTIONARY</Pill><span style={{ color: muted, fontSize: 32 }}>+</span><Pill>RESPONSE</Pill></div><p style={{ color: muted, fontSize: 28, marginTop: 28 }}>Reuse matching context for related responses.</p></Box>
  </div>
  <div style={{ marginTop: 31, padding: 23, border: `1px solid ${line}`, borderRadius: 10, color: muted, fontSize: 28, lineHeight: 1.55 }}>The demo serves a cacheable dictionary and negotiates a real <strong style={{ color: '#f0f4eb' }}>dcb</strong> response when the browser offers its matching hash.</div>
</Frame>;

const BrowserFlowPage: Page = () => <Frame label="08 / what Chrome actually does">
  <Heading>The browser and server handle the dictionary exchange.</Heading>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 39 }}>
    <Box title="01 · first page response"><div style={{ font: `28px/1.5 ${mono}`, color: 'var(--osd-accent)' }}>Link: &lt;/dict&gt;;<br />rel="compression-dictionary"</div><p style={{ color: muted, fontSize: 28 }}>The resource advertises a dictionary.</p></Box>
    <Box title="02 · browser stores it"><div style={{ font: `28px/1.5 ${mono}`, color: 'var(--osd-accent)' }}>Use-As-Dictionary</div><p style={{ color: muted, fontSize: 28 }}>The dictionary response sets its URL match rules; the browser caches it.</p></Box>
    <Box title="03 · later matching request"><div style={{ font: `28px/1.5 ${mono}`, color: 'var(--osd-accent)' }}>Available-Dictionary<br />Accept-Encoding: dcb</div><p style={{ color: muted, fontSize: 28 }}>The browser advertises a cached match and supported encoding.</p></Box>
    <Box title="04 · dictionary response" accent><div style={{ font: `28px/1.5 ${mono}`, color: 'var(--osd-accent)' }}>Content-Encoding: dcb</div><p style={{ color: muted, fontSize: 28 }}>The server uses that dictionary; browser decoding stays automatic.</p></Box>
  </div>
  <p style={{ color: muted, fontSize: 28, marginTop: 23 }}>The site configures dictionary resources and matching. Page JavaScript does not manually tokenize or restore the response.</p>
</Frame>;

const ProtocolPage: Page = () => <Frame label="09 / the standard protocol">
  <Heading>Compression Dictionary Transport adds negotiation.</Heading>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 37 }}>
    <Box title="Dictionary response"><div style={{ font: `28px/1.7 ${mono}`, color: 'var(--osd-accent)' }}>Use-As-Dictionary</div><p style={{ color: muted, fontSize: 28 }}>Server describes which future URLs can use this dictionary.</p></Box>
    <Box title="Future request"><div style={{ font: `28px/1.7 ${mono}`, color: 'var(--osd-accent)' }}>Available-Dictionary</div><p style={{ color: muted, fontSize: 28 }}>Client identifies its dictionary with a SHA-256 hash.</p></Box>
    <Box title="Encoding choice"><div style={{ font: `28px/1.7 ${mono}`, color: 'var(--osd-accent)' }}>Accept-Encoding: dcb, dcz</div><p style={{ color: muted, fontSize: 28 }}>Client advertises dictionary-aware formats it supports.</p></Box>
    <Box title="Compressed response"><div style={{ font: `28px/1.7 ${mono}`, color: 'var(--osd-accent)' }}>Content-Encoding: dcb</div><p style={{ color: muted, fontSize: 28 }}>Server selects a negotiated dictionary encoding.</p></Box>
  </div>
  <p style={{ color: muted, fontSize: 28, marginTop: 22 }}>Cacheable variants vary on <span style={{ color: '#eef5e9', fontFamily: mono }}>accept-encoding, available-dictionary, dictionary-id</span>. RFC 9842 uses secure contexts (HTTPS; localhost is trusted for development).</p>
</Frame>;

const SearchExamplePage: Page = () => <Frame label="10 / a measured example">
  <Heading>Google Search: 107 kB to 60 kB on a reload.</Heading>
  <div style={{ display: 'flex', alignItems: 'stretch', gap: 24, marginTop: 48 }}>
    <Box title="First page load"><div style={{ font: `28px ${mono}`, color: muted }}>Content-Encoding: br</div><div style={{ fontSize: 88, color: '#eef5e9', marginTop: 30 }}>107 kB</div><p style={{ color: muted, fontSize: 28 }}>Full response with standard Brotli.</p></Box>
    <div style={{ alignSelf: 'center', font: `48px ${mono}`, color: 'var(--osd-accent)' }}>→</div>
    <Box title="Later reload" accent><div style={{ font: `28px ${mono}`, color: 'var(--osd-accent)' }}>Content-Encoding: dcb</div><div style={{ fontSize: 88, color: 'var(--osd-accent)', marginTop: 30 }}>60 kB</div><p style={{ color: muted, fontSize: 28 }}>Dictionary-compressed Brotli.</p></Box>
  </div>
  <p style={{ color: muted, fontSize: 28, marginTop: 26 }}>Chrome's May 2025 article reports this one comparison, and a 23% average HTML payload reduction across Chrome users vs Brotli. Google's numbers are an example, not this demo's benchmark.</p>
  <div style={{ marginTop: 18 }}><Pill>CHROME FOR DEVELOPERS · 14 MAY 2025</Pill></div>
</Frame>;

const ImagesPage: Page = () => <Frame label="11 / images are different">
  <Heading>JSON shrinks. A photo is already packed.</Heading>
  <div style={{ display: 'flex', gap: 42, alignItems: 'center', marginTop: 45 }}>
    <div style={{ width: 440, height: 300, borderRadius: 12, position: 'relative', overflow: 'hidden', background: '#20291a' }}><div style={{ position: 'absolute', width: 130, height: 130, borderRadius: '50%', background: '#e0bd69', top: 43, right: 65 }} /><div style={{ position: 'absolute', width: 340, height: 230, bottom: -115, left: -20, transform: 'rotate(45deg)', background: '#66754a' }} /><div style={{ position: 'absolute', width: 340, height: 230, bottom: -165, right: -15, transform: 'rotate(45deg)', background: '#37442b' }} /></div>
    <div style={{ flex: 1 }}><div style={{ font: `19px ${mono}`, color: 'var(--osd-accent)', letterSpacing: '.08em' }}>SEPARATE IMAGE REQUEST</div><p style={{ fontSize: 30, lineHeight: 1.4, margin: '18px 0', maxWidth: 900 }}>JPEG, WebP, and AVIF already use image-specific compression. Gzip or Brotli around them usually saves very little.</p><p style={{ color: muted, fontSize: 28, lineHeight: 1.5, maxWidth: 900, margin: 0 }}>In this demo the image URLs are fields in JSON; the image bytes arrive independently and are excluded from the text counters.</p></div>
  </div>
</Frame>;

const RolloutPage: Page = () => <Frame label="12 / make it real">
  <Heading>Roll out compression with a measurement loop.</Heading>
  <div style={{ display: 'flex', gap: 18, marginTop: 44 }}>
    <Box title="01 · Observe"><div style={{ fontSize: 28 }}>Find large, repeated text responses.</div><p style={{ color: muted, fontSize: 28 }}>Start with JSON, HTML, JS, and CSS.</p></Box>
    <Box title="02 · Enable"><div style={{ fontSize: 28 }}>Serve gzip or Brotli.</div><p style={{ color: muted, fontSize: 28 }}>Let negotiation and fallback work per client.</p></Box>
    <Box title="03 · Compare"><div style={{ fontSize: 28 }}>Measure bytes and latency.</div><p style={{ color: muted, fontSize: 28 }}>Include CPU, cold cache, and repeat visits.</p></Box>
    <Box title="04 · Consider CDT" accent><div style={{ fontSize: 28, color: 'var(--osd-accent)' }}>Add dictionary lifecycle.</div><p style={{ color: muted, fontSize: 28 }}>Versioning, caching, client support, HTTPS.</p></Box>
  </div>
  <div style={{ marginTop: 31, border: `1px solid ${line}`, padding: '19px 23px', color: muted, fontSize: 28, lineHeight: 1.5 }}>Use the shared dictionary when the same client repeatedly fetches related content and the saved bytes justify the setup and operational costs.</div>
</Frame>;

const ClosePage: Page = () => <Frame label="13 / take it to production">
  <Heading>Three practical takeaways.</Heading>
  <div style={{ display: 'flex', gap: 20, marginTop: 43 }}>
    <Box title="01 · Enable"><div style={{ fontSize: 28, lineHeight: 1.4 }}>Serve text with gzip or Brotli.</div><p style={{ color: muted, fontSize: 28 }}>Let HTTP negotiation choose a supported encoding.</p></Box>
    <Box title="02 · Measure"><div style={{ fontSize: 28, lineHeight: 1.4 }}>Compare real response bodies.</div><p style={{ color: muted, fontSize: 28 }}>Include cold and repeat visits; count setup costs.</p></Box>
    <Box title="03 · Explore"><div style={{ fontSize: 28, lineHeight: 1.4 }}>Use CDT when context repeats.</div><p style={{ color: muted, fontSize: 28 }}>Check client support, HTTPS, caching, and dictionary versioning.</p></Box>
  </div>
  <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 18 }}><Pill accent>RFC 9842</Pill><span style={{ font: `17px ${mono}`, color: muted }}>Compression Dictionary Transport</span><span style={{ font: `17px ${mono}`, color: line }}>·</span><Pill>RFC 7932 · Brotli</Pill><Pill>RFC 1952 · GZIP</Pill></div>
  <p style={{ fontSize: 37, color: 'var(--osd-accent)', marginTop: 44, letterSpacing: '-.03em' }}>Same story. Less to carry.</p>
</Frame>;

export const notes: (string | undefined)[] = [
  'Open the companion demo at localhost:4178. This deep dive asks whether shared context makes repeated responses smaller.',
  'Frame the talk around three questions: establish the plain baseline, compare per-response compression, then consider context reused across responses.',
  'The payload repeats field names and structure. Every tab returns the same six records, so the audience can compare transport cost without a UI change.',
  'gzip and Brotli are general-purpose content encodings. Their result changes with the sample and settings; avoid promising a fixed winner.',
  'HTTP negotiation is usually automatic. The client advertises supported encodings, the server selects one representation, and the response names the encoding.',
  'Point out that Fetch gives JavaScript decoded JSON after the browser handles Content-Encoding. In the app, the server selects an encoding from a demo query parameter.',
  'The counters omit headers, TLS, image requests, and CPU time. For dictionary compression, compare first-use setup bytes with repeat-use response bytes.',
  'Click the tabs live. Explain that the counters report encoded response-body bytes versus the plain JSON body. They omit headers, TLS, and image transfers.',
  'The dictionary tab is now wired to the browser-managed protocol. On first use, the HTML advertises a dictionary resource; Chrome downloads it and later may send Available-Dictionary. The server verifies that hash before returning dcb. If the browser lacks support, show its br fallback honestly.',
  'Walk this slowly: the first response advertises the dictionary, its response says what URLs match, and the browser caches it. A later request advertises the cached dictionary; the server can return dcb. JavaScript does not implement these steps.',
  'RFC 9842 adds dictionary discovery and negotiation. Use-As-Dictionary scopes a downloaded dictionary; Available-Dictionary identifies the client copy; dcb and dcz are negotiated encodings. Cache keys must vary on relevant headers, and use is restricted to HTTPS.',
  'The Chrome for Developers article shows a Search response changing from 107 kB br to 60 kB dcb after reload, and reports 23% average HTML reduction across Chrome users. Attribute those measurements to the 2025 article; they are not results from our smaller sample. In our demo, let the first request finish, repeat it, and inspect Available-Dictionary on the request and Content-Encoding: dcb on the response. Open chrome://net-internals/#sharedDictionary to inspect or clear this demo dictionary; this is not an enable switch.',
  'The image requests are separate from the JSON response. Already-compressed image formats generally get little benefit from wrapping them in gzip or Brotli.',
  'The production path starts with observability and ordinary gzip/Brotli. Consider dictionaries only when repeated related fetches pay back the added lifecycle and cache complexity.',
  'Close with measurement and deployment conditions. RFC 9842 is the standard for Compression Dictionary Transport and requires secure contexts; this demo is a simpler illustration.',
];

export const meta: SlideMeta = {
  title: 'Less wire, same story — web compression deep dive',
  createdAt: '2026-10-10T08:00:00Z',
};

export default [Cover, QuestionPage, PayloadPage, MethodsPage, NegotiationPage, FlowPage, MeasurementPage, ReadoutPage, DictionaryPage, BrowserFlowPage, ProtocolPage, SearchExamplePage, ImagesPage, RolloutPage, ClosePage] satisfies Page[];

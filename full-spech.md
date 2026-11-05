# The Next Evolution of Web Compression — Full Speech

**Event:** XtremeJS 2026
**Deck:** `slides/web-compression-combined` (26 slides)
**Total talk time:** 30:00 (adjust Q&A on top). Pace: ~130 words/minute.
**Legend:** `[BUILD]` = press next to reveal the next step on the slide. `[PAUSE]` = breathe, let it land.

---

## Timing Overview

| #  | Slide                                   | Duration | Start → End   |
|----|-----------------------------------------|----------|---------------|
| 01 | Cover                                   | 0:30     | 0:00 → 0:30   |
| 02 | Agenda (5 builds)                       | 0:45     | 0:30 → 1:15   |
| 03 | Part 01 divider                         | 0:15     | 1:15 → 1:30   |
| 04 | LZ77: don't repeat yourself             | 1:15     | 1:30 → 2:45   |
| 05 | gzip                                    | 1:15     | 2:45 → 4:00   |
| 06 | Brotli                                  | 1:30     | 4:00 → 5:30   |
| 07 | Part 02 divider                         | 0:15     | 5:30 → 5:45   |
| 08 | Same JSON, four ways                    | 1:15     | 5:45 → 7:00   |
| 09 | Client advertises. Server selects.      | 1:30     | 7:00 → 8:30   |
| 10 | The browser decodes it for you          | 1:00     | 8:30 → 9:30   |
| 11 | One dictionary can't know your site (4 builds) | 1:30 | 9:30 → 11:00  |
| 12 | Part 03 divider                         | 0:15     | 11:00 → 11:15 |
| 13 | Send the diff, not the whole file       | 1:30     | 11:15 → 12:45 |
| 14 | The diff is often a rounding error      | 1:15     | 12:45 → 14:00 |
| 15 | Part 04 divider                         | 0:15     | 14:00 → 14:15 |
| 16 | Your old response becomes the dictionary| 2:00     | 14:15 → 16:15 |
| 17 | Visit one teaches. Visit two profits. (6 builds) | 2:15 | 16:15 → 18:30 |
| 18 | RFC 9842 standardizes the negotiation   | 1:45     | 18:30 → 20:15 |
| 19 | 90% fewer bytes, same bundle            | 1:30     | 20:15 → 21:45 |
| 20 | Google Search: 107 kB → 60 kB           | 1:30     | 21:45 → 23:15 |
| 21 | Same job, smarter reference (3 builds)  | 1:30     | 23:15 → 24:45 |
| 22 | Part 05 divider                         | 0:15     | 24:45 → 25:00 |
| 23 | Compress text, not photos               | 1:00     | 25:00 → 26:00 |
| 24 | One percentage hides four costs         | 1:45     | 26:00 → 27:45 |
| 25 | Roll out with a measurement loop        | 1:15     | 27:45 → 29:00 |
| 26 | Closing                                 | 1:00     | 29:00 → 30:00 |

**Checkpoints while presenting:** Part 02 starts at **5:30** · Part 03 at **11:00** · Part 04 (the main event) at **14:00** · Part 05 at **24:45**. If you are more than 1 minute behind at the Part 04 checkpoint, shorten slides 13–14 (they are the easiest to trim).

---

## 01 · Cover — 0:30 (0:00 → 0:30)

Hi everyone, welcome to XtremeJS. Today's talk is called *The Next Evolution of Web Compression*.

We're going to travel from gzip and Brotli, the tools you almost certainly already use, to something newer: **Compression Dictionary Transport**. It's a way for the browser's own cache to help compress what the server sends next.

You don't need to know anything about compression algorithms. If you've ever looked at the Network tab, you're ready.

---

## 02 · Agenda — 0:45 (0:30 → 1:15)

Here's where we're headed. Five parts.

`[BUILD]` One: a short history of squeezing bytes over the wire.
`[BUILD]` Two: how gzip, Brotli, and negotiation work today.
`[BUILD]` Three: differential compression, explained simply.
`[BUILD]` Four: the main event, Compression Dictionary Transport, where your cache becomes a dictionary.
`[BUILD]` And five: measuring honestly, and how to actually ship it.

Let's start at the beginning.

---

## 03 · Part 01 — A Short History of Squeezing Bytes — 0:15 (1:15 → 1:30)

Part one. A short history of squeezing bytes, from punch cards to protocol headers.

---

## 04 · LZ77: don't repeat yourself — 1:15 (1:30 → 2:45)

Our story starts in 1977, when Lempel and Ziv publish one very simple idea.

If you find a sequence of bytes you've already seen, don't send it again. Replace it with a pointer back to where it was.

Look at the example. "The cat sat on the mat." The second "the " is the same as the first one, so instead of repeating it, we write: go back 14, copy 3. That's the whole trick.

Here's the part I want you to remember: the "dictionary" is just *what's already been sent*. A sliding window over earlier data. `[PAUSE]`

Nearly every format since builds on this: zip, PNG, gzip, Brotli. Keep this idea in your pocket, because we'll come back to it.

---

## 05 · gzip — 1:15 (2:45 → 4:00)

Fast forward to 1992. gzip takes LZ77 and adds a smarter alphabet.

The format is called DEFLATE. It combines those LZ77 back-references with Huffman coding. Huffman coding is simple in spirit: frequent bytes get short codes, rare bytes get long ones. Like Morse code, where "e" is a single dot.

gzip shipped in 1992, and every browser and server has spoken it ever since. That's why it's still the universal floor. If nothing else negotiates, gzip works.

And look at the bar: raw is 1.00. gzip brings that down to about 0.27. Roughly a 70% saving for free, on text.

---

## 06 · Brotli — 1:30 (4:00 → 5:30)

Then in 2015, Google ships Brotli, later standardized as RFC 7932.

The big idea: **bake the web into the format.** Brotli includes a static dictionary of about 120 kilobytes, containing common web text and markup. Words like "function" and "background-color" are already known before the first byte is sent. So the very start of a file, where a sliding window has nothing to point to yet, is not empty any more.

The result is typically 15 to 25 percent smaller than gzip on the same text. On the bars: gzip at 0.27, Brotli at about 0.20.

But notice the word "static". That dictionary is the same for everyone. Hold that thought for a few minutes.

---

## 07 · Part 02 — Compression On The Wire — 0:15 (5:30 → 5:45)

Part two. Compression on the wire: four ways to ship the same bytes, and how browsers pick one.

---

## 08 · Same JSON, four ways to send it — 1:15 (5:45 → 7:00)

Let's take one JSON response and look at four ways to send it.

Identity: plain, readable bytes straight onto the wire. gzip: the widely supported baseline. Brotli: general purpose, often stronger on web text. And this highlighted one, dictionary: known phrases, shared context, so related responses shrink further.

The message at the bottom is the important one: **there's no universal winner.** The right choice depends on your payload and on how people revisit your site. Measure, don't guess. We'll see exactly how to measure in part five.

---

## 09 · Client advertises. Server selects. — 1:30 (7:00 → 8:30)

So how does a browser and server agree on which one to use? HTTP content negotiation. Three steps.

First, the client advertises. The request carries `Accept-Encoding: gzip, br`. That's the browser saying: here's what I can decode.

Second, the server selects the best match, per response. Very often it's not even your app. An edge or CDN layer makes the call.

Third, the response says what it chose: `Content-Encoding: br`. The body on the wire is Brotli.

And if nothing matches, the server falls back to plain or gzip. That fallback is the secret. **Negotiation is what makes new codecs safe to ship.** An old browser simply never says it speaks the new thing, so it never receives it.

---

## 10 · The browser decodes it for you — 1:00 (8:30 → 9:30)

Now a reassuring detail for us as JavaScript developers.

Follow the chain: the server encodes the body, the response carries `Content-Encoding`, the browser decodes the bytes, and only then do we get to `fetch()` and `response.json()`.

So JavaScript only ever sees decoded bytes. And there's no app code needed. It is pure HTTP negotiation. You don't import a library, you don't write a decoder. That is why this layer is so powerful, and why what comes next can be adopted without rewriting your application.

---

## 11 · One dictionary can't know your site — 1:30 (9:30 → 11:00)

Now let's find the ceiling. Where do static dictionaries stop?

`[BUILD]` Brotli's dictionary is generic. It's shared by every website on earth.
`[BUILD]` It has never seen your bundle hashes, your class names, or your copy.
`[BUILD]` And so a repeat visitor still re-receives bytes their browser already has. Think about that. They downloaded `app.js` last week. You shipped a small fix. And they download almost the whole thing again.
`[BUILD]` `[PAUSE]` So here's the question: **what if the browser already had most of the answer?**

Keep that question in your head. The next two parts build to the answer.

---

## 12 · Part 03 — Differential Compression — 0:15 (11:00 → 11:15)

Part three. Differential compression. Why send the whole thing when you can send the difference?

---

## 13 · Send the diff, not the whole file — 1:30 (11:15 → 12:45)

The idea is old and intuitive. Send the diff, not the whole file.

A "reference" is any version you already hold: a previous file, a patch base. The encoder computes a diff, only what changed since that reference. The decoder takes reference plus diff and rebuilds the full output.

This has been around for a long time. Classic tools: bsdiff, VCDIFF, which is RFC 3284, and rsync with its rolling checksum.

Look at the equation at the bottom: **reference plus diff equals new file.** And notice this is exactly LZ77's idea from the beginning of the talk, but with a bigger window. Instead of only pointing back into the current file, we point back into a whole *previous version* of it.

---

## 14 · The diff is often a rounding error — 1:15 (12:45 → 14:00)

And it works spectacularly well. Here's a real-world example.

An updated game binary: 1.2 gigabytes for a full download. The diff: 38 megabytes. Just the bytes that actually changed. That's about 97% less.

You've already benefited from this without noticing. Windows Update, PlayStation, and Steam all ship diffs. Git stores most of its history as diffs against prior trees. Video codecs encode only the pixels that changed between frames.

So differential compression is proven everywhere... except one place. The web page you're loading right now. That's about to change.

---

## 15 · Part 04 — Compression Dictionary Transport — 0:15 (14:00 → 14:15)

Part four. Compression Dictionary Transport. What if your last response could compress your next one?

---

## 16 · Your old response becomes the dictionary — 2:00 (14:15 → 16:15)

Here's the main idea, and it fits in one sentence: **your old response becomes the dictionary.**

It's standardized as RFC 9842, Compression Dictionary Transport. The browser tells the server which earlier response it still holds. The server then compresses the new response as a diff against it. And it's built on Shared Brotli and Shared Zstandard, which are just Brotli and Zstandard that can take an outside dictionary.

Let me show you the three headers, because that's really all there is.

`Use-As-Dictionary`, on a response: "browser, keep this one, and use it for URLs matching this pattern," here `/assets/app.*.js`.

`Available-Dictionary`, on a later request: "here's the hash of the dictionary I have."

And `Content-Encoding: dcb`, which stands for dictionary-compressed Brotli. That's what the server answers with.

`[PAUSE]` So the "dictionary" isn't a new file you have to build and distribute. It's a file you already shipped.

---

## 17 · Visit one teaches. Visit two profits. — 2:15 (16:15 → 18:30)

Let's walk through it in two visits.

**Visit 1: first load, left column.**
`[BUILD]` The browser requests `app.js` for the first time.
`[BUILD]` The server replies with the full file, tagged `Use-As-Dictionary`. Nothing special yet. Full cost.
`[BUILD]` The browser stores that response as a named dictionary in its cache.

**Visit 2: a later update, right column.**
`[BUILD]` You deploy. The new file is `app.v2.js`. The browser requests it, and sends `Available-Dictionary` with the hash of the old file.
`[BUILD]` The server diffs v2 against that dictionary, instead of starting from zero.
`[BUILD]` And only the delta, often a few kilobytes, crosses the network.

`[PAUSE]` Visit one teaches. Visit two profits. The first user pays full price. Every returning user, on every deploy, gets the discount.

---

## 18 · RFC 9842 standardizes the negotiation — 1:45 (18:30 → 20:15)

This isn't a Chrome experiment. It's a standard protocol, so let me map the four pieces.

Top left: `Use-As-Dictionary` on the dictionary response. It scopes which future URLs may use it.

Top right: `Available-Dictionary` on a future request. The client names its copy by SHA-256 hash.

Bottom left: encoding choice. `Accept-Encoding: dcb, dcz`. Dictionary-aware Brotli and Zstandard.

And bottom right, the one people forget: `Vary: available-dictionary`. Caches must vary. Cached variants are keyed on which dictionary was used, otherwise a CDN could hand a diff to someone who can't apply it. And it's **HTTPS only**.

Same safety story as before: clients that don't advertise it just get normal Brotli or gzip.

---

## 19 · 90% fewer bytes, same bundle — 1:30 (20:15 → 21:45)

So what do you get? For a bundle where little changed: without a shared dictionary, 100% of `app.js` on every single deploy. With one, about 8%. Only the bytes that actually changed. Roughly 90% fewer.

Some context. Chrome shipped support behind a flag in 2023, stable soon after. The biggest win is versioned JS and CSS bundles where often only a hash changed. And web.dev reports 80 to 90 percent or more smaller transfers on repeat bundle updates.

Be careful with the word "typical" here. This is the best case, a bundle with a small change. A rewritten bundle won't shrink like this. The next slide is a more modest, real measurement.

---

## 20 · Google Search: 107 kB down to 60 kB — 1:30 (21:45 → 23:15)

Here's a measured example, and I like it because it's modest.

Google Search. First load, `Content-Encoding: br`: 107 kilobytes. Reload with `Content-Encoding: dcb`: 60 kilobytes. About 44% smaller.

And Chrome reports roughly 23% smaller HTML on average versus Brotli.

Note the source: Chrome for Developers, May 2025. That's their data, not mine. I haven't measured your site and neither have they. Which is exactly why part five exists.

---

## 21 · Same job, smarter reference each time — 1:30 (23:15 → 24:45)

Let's put three generations side by side. The job is the same every time. What changes is the reference.

`[BUILD]` gzip: no dictionary at all, pure LZ77 plus Huffman. About 70% savings.
`[BUILD]` Brotli: a generic static dictionary, web-wide. About 75 to 80%.
`[BUILD]` CDT: your own previous response. About 90% and up.

`[PAUSE]` Each generation needed a better reference. And CDT's reference is the one thing only you have: your own history.

That's the whole evolution in one table. Now, before you rush to enable it everywhere...

---

## 22 · Part 05 — Measure, Then Ship — 0:15 (24:45 → 25:00)

Part five. Measure, then ship. Caveats, honest numbers, and a rollout loop.

---

## 23 · Compress text, not photos — 1:00 (25:00 → 26:00)

First caveat: know what not to compress.

Text-like content is repetitive, so it compresses well: JSON, HTML, JS, CSS. JPEG, WebP, and AVIF are already compressed with image-specific techniques.

Wrapping an image in gzip or Brotli saves very little and costs CPU. So spend your dictionary effort where the repetition is: JS, CSS, HTML, and JSON.

---

## 24 · One percentage hides four costs — 1:45 (26:00 → 27:45)

Second caveat, and the one I care about most: **one percentage hides four costs.**

Response bytes: the compressed body only. That's what most tools report. Easy to compare, easy to over-trust.

First visit: dictionary plus response. If the client had to fetch context first, charge for it.

Repeat visit: the response with the cached dictionary. The dictionary is reused, so its download isn't repeated. This is where CDT shines.

And everything else: headers, TLS, encode and decode time, CPU, cache behavior. Smaller bytes that cost more time are not a win.

So when someone says "90% smaller," ask: smaller on which visit, measured how? Measure cold and warm.

---

## 25 · Roll out with a measurement loop — 1:15 (27:45 → 29:00)

Here's how to make it real. A four-step loop.

One, **observe**: find big, repeated text. Start with JSON, HTML, JS, and CSS.
Two, **enable**: serve gzip or Brotli, and let negotiation and fallback work per client.
Three, **compare**: bytes and latency, including CPU, cold cache, and repeat visits.
Four, **consider CDT**: add dictionaries, and plan for versioning, caching, client support, and HTTPS.

And the rule of thumb at the bottom: use dictionaries when the same client repeatedly fetches related content and the savings justify the setup cost. If your users visit once, this isn't for you. If they come back every week and you deploy often, it very well might be.

---

## 26 · Closing — 1:00 (29:00 → 30:00)

So let's end where we started. LZ77 said the dictionary is what you've already sent. Brotli said, let's ship a dictionary of the web. And now your cache is part of the codec.

If you want to dig in: Chrome and Edge are shipping it now, though support is still evolving. The spec is RFC 9842, Compression Dictionary Transport, with RFC 7932 for Brotli and RFC 1952 for gzip. And the best starting point to read is web.dev/articles/compression-dictionary-transport.

Thank you. I'd love your questions.

`[Q&A: not counted in the 30:00]`

---

## Delivery Notes

- **Dividers (03, 07, 12, 15, 22)** are deliberate breathing room. Read the subtitle, take a sip of water, move on. Don't skip them: the 15 seconds each is budgeted.
- **If you run long:** cut in this order → slide 10 (shorten to 30s), slide 14 (45s), slide 23 (30s), slide 08 (45s).
- **If you run short:** extend slide 17 with a live DevTools demo of `Content-Encoding: dcb`, or slide 24 with a story of a measurement that fooled you.
- **Key phrases to land verbatim:** "the dictionary is just what's already been sent" (04) · "negotiation is what makes new codecs safe to ship" (09) · "what if the browser already had most of the answer?" (11) · "visit one teaches, visit two profits" (17) · "one percentage hides four costs" (24).
- **Honesty anchors:** slides 19–20 state numbers from third parties (web.dev, Chrome for Developers). Say so out loud, as scripted above.
- **Fix before presenting:** the deck's metadata title reads "Evoluyion" (typo in `meta.title`). The cover slide itself spells it correctly.

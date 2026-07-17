# Proteus Arc — Design Iteration Log

This is the living record for the Proteus Arc public site and research interface. Update it after **every Proteus Arc user prompt** and again after **every completed result** so future work compounds instead of restarting from taste guesses. Documentation is an automatic required task; the user must never need to request it again.

## Update protocol

Every iteration must record:

1. Date and status
2. User comment, quoted verbatim
3. Interpretation and design hypothesis
4. Live references inspected
5. Files/components changed
6. What was rejected and why
7. Desktop/mobile screenshots
8. Build, browser, accessibility, and interaction verification
9. Slop diagnostic score
10. What the next iteration should improve

---

## Feedback ledger

### Feedback A — reject generic 3D

> “it looks shit. i need very good quality.
>
> remember the hero video you made before? without higgsfield, the custom vector. it looks good, work off that iwth the heading \"The IPO for Alzheimer's\", and make the site look really clean and good, with many other vectors like that”

**Permanent lesson:** Proteus Arc should not chase generic photorealistic/AI 3D. Its strongest ownable language is the custom dark-blue EEG/network vector system. New visuals must extend that system rather than replace it.

### Feedback B — raise the entire system

> “make the vector interface, make scrolling better. make this website 10x better. go to the world's best medical sites, take inspiration. better fonts, a really good design theme that is conssitent across the site, the whole schabang. and take as long as you need for this. i need it to be stunning, very good, gsap interactions, buttons crafted with unique vector svg's just to contribute to the entire vibe. all of that, here. and make a docuemnt for it aswell you update on each iteration of this site, plus with my comments so you get better and better each time.”

**Permanent lesson:** Quality is evaluated as a system: typography, scroll feel, transitions, navigation, buttons, landing page, research interface, mobile, trust language, and documentation must all feel designed together.

### Feedback C — reject Iteration 02 and restart the visual direction

> “no not good at all, the buttons shape is so primitive, the colours are just so off, and the hero vector isnt an animation you can hover around for it to move, and the video button is still there. the website cannot be too cluttered. and it should be black across the site, and the scrolling is shit. consider that researchers, and the general audience will see this site. and change the font, change the entire design style. scrape google alone for 10+ minutes, and find the ideal styles to make the best websites possible, and check medical sites aswell, the ones that make conversions happen. and at the end, update your internal document i told you to make.”

**Permanent lesson:** Do not preserve a rejected system through cosmetic edits. Proteus Arc must be black throughout, sparse enough for a general audience, rigorous enough for researchers, native-scrolling, and built around a genuinely hover-responsive neural object. No hero video or media-control residue. Buttons must be authored as distinct vector objects rather than pills with decoration.

### Feedback D — documentation is automatic

> “note, for this prompt, result, and each future, update the living iteration doc, add it as a task automatically, i should never have to ask.”

**Permanent lesson:** Every Proteus Arc prompt is logged when received, and every result is appended when verified. The iteration document is never an optional or user-reminded step.

---

## Iteration 00 — Baseline dashboard aesthetic

**Status:** Rejected

The original `/proteusarc` page used a floating rounded navbar, blue gradients, glass cards, a generic EEG dashboard panel, equal-weight feature cards, and unrelated stock iconography. `/proteusarc/interface` used a separate light dashboard aesthetic.

### Why it failed

- Public site and interface did not share one design system.
- Generic SaaS card patterns made the project feel less clinically credible.
- Hero visual was a UI card, not a memorable brand object.
- Motion was entrance animation rather than narrative motion.
- Typography and spacing felt template-derived.

---

## Iteration 01 — Custom vector narrative site

**Date:** 2026-07-15
**Status:** Completed and verified

### Design hypothesis

Use the original locally rendered brain-network animation as the hero and derive every section visual from the same EEG/network vector grammar. Replace the feature-card grid with an editorial Decide/Learn sequence.

### Delivered

- Full-bleed original vector hero video.
- Heading: **“The IPO for Alzheimer’s.”**
- Custom SVG library:
  - layered EEG signal field
  - dynamic higher-order graph
  - signal → structure → uncertainty pipeline
  - calibrated uncertainty distribution
  - Proteus Arc vector mark
- Alternating dark, clinical-paper, and blue sections.
- Clear clinical posture: research platform, uncertainty visible, not a standalone diagnosis.
- Responsive desktop/mobile layouts.
- Reduced-motion fallback.

### Primary files

- `src/pages/ProteusArc.tsx`
- `src/pages/proteus-arc.css`
- `src/components/proteus/VectorScenes.tsx`
- `public/media/proteus-arc-hero.mp4`
- `public/media/proteus-arc-hero-poster.jpg`

### Verification

- Production build: passed.
- Desktop: 1440×900, no horizontal overflow.
- Mobile: 390×844, no horizontal overflow.
- Hero video: loaded and autoplaying.
- Browser console errors: none.
- Browser title: `Proteus Arc | The IPO for Alzheimer’s`.
- Slop diagnostic: **0/10** after repair.

### Screenshots

- `docs/design-log/iteration-01-desktop-hero.png`
- `docs/design-log/iteration-01-mobile-full.png`

### Remaining weakness

The public page is visually coherent, but `/proteusarc/interface` is still the old generic light dashboard. Scroll motion is mostly CSS/IntersectionObserver rather than a fully choreographed GSAP system. Buttons are clean but not yet distinctive vector objects.

---

## Iteration 02 — Medical-grade unified system

**Date:** 2026-07-15
**Status:** Completed; independent review pending

### User direction

See Feedback B above.

### Design hypothesis

A world-class Proteus Arc system should combine medical trust, editorial scientific storytelling, one ownable vector grammar, restrained GSAP motion, and a research workspace that feels like the public narrative continued—not a separate template.

### Live references inspected

Eight live medical, biotech, neuroscience, and digital-health sites were inspected at desktop width:

1. [Moderna](https://www.modernatx.com/) — editorial science hierarchy and visible media controls.
2. [Neuralink](https://neuralink.com/) — reduced navigation and technology in a believable human context.
3. [Synchron](https://synchron.com/) — human-first proposition, precise mono labels, explicit pause control.
4. [Rune Labs](https://runelabs.io/) — the strongest precedent for sparse neural vectors and clinical data restraint.
5. [Eko Health](https://www.ekohealth.com/) — immediate product clarity and technology shown in use.
6. [PathAI](https://www.pathai.com/) — mission-first typography and a focused real-product showcase.
7. [Viz.ai](https://www.viz.ai/) — clinical workflow presentation and evidence linked to outcomes.
8. [Beacon Biosignals](https://beacon.bio/) — direct EEG precedent: human context → waveform abstraction → research pathway.

Mayo Clinic Platform was attempted but returned an access-denied response to automated inspection; it was not represented as successfully reviewed.

### What was adopted

- Quiet editorial navigation rather than a corporate multi-row menu.
- Human-readable scientific storytelling before product detail.
- Sparse vector networks, event traces, and calibrated distributions.
- Explicit video controls, focus treatment, and reduced-motion parity.
- A research workflow that shows state and provenance rather than decorative dashboard tiles.

### What was rejected

- Corporate carousels and excessive utility navigation.
- Stock doctor/patient imagery without a real Proteus research context.
- Purple/yellow generic clinical-AI styling.
- Glass cards layered over uncontrolled footage.
- Fake metrics, collaborators, approvals, publications, or patient outcomes.
- Animated counters whose correct value is absent before animation.

### Delivered design system

- Formal Google DESIGN.md-compatible contract at `DESIGN.md`.
- Onest Variable for editorial/product typography.
- IBM Plex Mono for IDs, logs, coordinates, graph notation, and status.
- Latin-only self-hosted font build: one Onest variable file plus IBM Plex Mono 400/500.
- Shared neural navy, clinical-paper, evidence-blue, and signal-cyan palette.
- Shared vector-action language and clinical-claims guardrails.
- DESIGN.md validation: zero structural or WCAG errors. Remaining warnings only identify semantic tokens reserved for future states.

### Public site changes

- GSAP + ScrollTrigger hero parallax, section reveals, vector/copy choreography, and live section rail.
- Page-scoped GSAP context with complete teardown.
- Custom `VectorButton` with a drawn signal trace, two neural nodes, and directional terminal.
- Section progress rail for Opening → Thesis → Architecture → Posture → Collaborate.
- Original vector brain animation retained as the brand object.
- Video now respects reduced motion, Save-Data, failed autoplay, visibility changes, and explicit play/pause state.
- Hero video changed to `preload="metadata"` with a poster fallback.
- Skip link, visible focus, anchor offsets, mobile crop, and `overflow-x: clip`.

### Research interface changes

- The generic Shadcn dashboard was replaced by a unified vector research workspace.
- Shared Arc mark, typography, tokens, vector scenes, and vector buttons.
- Workflow navigation: Guide → Run → Results → Logs.
- Semantic tablist with roving keyboard focus and Arrow/Home/End navigation.
- Associated labels, required fields, inline error descriptions, `aria-invalid`, and busy state.
- Dynamic higher-order graph viewport with an accessible progress indicator.
- Console uses an isolated scroll viewport, `role="log"`, live additions, and Lenis prevention.
- Timers are stored and cleared on restart/unmount.
- Completion is announced without forcibly switching tabs; the researcher chooses when to review results.
- Deterministic calibration demo (`0.87`) replaces the previous randomized 84–96% diagnostic-looking score.
- “Simulated,” “research-only,” and “not clinical” disclosures remain attached to result output and JSON export.
- Export now downloads a transparent JSON fixture instead of presenting a dead action.
- Logs use a caption, scoped headers, and session-only provenance.
- Mobile workflow uses a four-node sticky navigation bar with 44px+ controls.

### Verification

- Production Vite build: passed.
- Proteus-targeted ESLint: passed with no findings.
- Vitest: 1 test file / 1 test passed.
- Static security pattern scan: no secrets, `eval`, unsafe HTML, or execution patterns.
- Desktop landing: 1440×900, no horizontal overflow, correct title, Onest loaded, hero video ready/playing.
- Mobile landing: 390×844, no horizontal overflow, section rail removed appropriately.
- Desktop interface: four workflow tabs, no overflow, complete simulation → explicit review action → Results.
- Mobile interface: 390×844, no overflow, four equal workflow targets.
- Result warning: `Not a clinical result. The 0.87 display value exists only to demonstrate calibration presentation.`
- Reduced motion: reveal content remains visible; continuous vector animation collapses to a static final state.
- Browser console/page errors: none.
- Font output reduced from all-language subsets to exactly three Latin WOFF2 files.
- Build output: CSS 110.22 kB / 20.62 kB gzip; JS 609.35 kB / 200.92 kB gzip.

### Known repository debt outside this iteration

Full-repository ESLint still reports 14 pre-existing errors and nine warnings in unrelated Shadcn UI, globe, asset-context, and Tailwind files. No finding points to a Proteus Arc file. These unrelated files were not modified.

`src/App.tsx` already contained an uncommitted routing/Lenis change before this redesign; it was intentionally not overwritten.

### Product boundary

The research interface is a local, deterministic workflow demonstration. It has no clinical model backend, patient database, authentication, regulatory clearance, or real diagnostic output. The UI discloses this explicitly.

### Screenshots

- `docs/design-log/iteration-02-landing-desktop-hero.png`
- `docs/design-log/iteration-02-architecture.png`
- `docs/design-log/iteration-02-landing-mobile.png`
- `docs/design-log/iteration-02-interface-run.png`
- `docs/design-log/iteration-02-interface-result.png`
- `docs/design-log/iteration-02-interface-mobile.png`

### Slop diagnostic

**0/10 after repair.** No generic feature-tile grid, icon-topped cards, center-stack landing pattern, fake statistics, stock medical imagery, rainbow AI gradient, or unearned glass panel remains.

### Next iteration backlog

- Add authentic Proteus EEG/research context only when consented real imagery is available.
- Add publications, study registrations, methods, and collaborators only when verifiable sources are supplied.
- Run a formal axe/WCAG 2.2 audit and Lighthouse performance pass.
- Split the research interface state/views into smaller modules if it grows beyond the current demonstration.
- Route-level code-split GSAP and the research workspace without altering unrelated application routes.
- Replace local simulation fixtures with a real, validated backend only when product data contracts exist.

---

## Iteration 03 — Black neural atlas

**Date started:** 2026-07-15
**Status:** Implementation and QA complete; awaiting user acceptance

### User direction

See Feedback C and Feedback D above.

### Working design hypothesis

Treat Proteus Arc as a living neural atlas in a black gallery: one hover-responsive scientific object, near-monochrome surfaces, Instrument Sans editorial typography, precise mono notation, native scrolling, and a strict information hierarchy that works first for a general audience and then reveals research depth. Interaction should communicate changing network structure rather than decorate the page.

### Research status

- A Google-only timed scrape ran for 673 seconds across 13 medical, biotech, neuroscience, conversion, trust, and accessibility queries.
- Google challenged all 13 automated searches, so no blocked result was represented as research evidence.
- The isolated Camofox browser was restored and Google discovery resumed interactively.
- Google surfaced Enveda, Asimov, Schrödinger, Benchling, Qureator, Strateos, Novo Nordisk, and healthcare conversion/UX sources for direct verification.
- Enveda live inspection confirmed a sparse interface over one dominant scientific visual, short proposition, one primary action, and peripheral technical detail. Its saturated palette and pill CTA were explicitly rejected for Proteus Arc.
- Asimov confirmed that a large scientific object, disciplined type, and restrained structural notation can establish scientific authority without card grids. Its light surface and molecule-specific visual language were not copied.
- Eko Health confirmed the conversion value of a precise outcome-led proposition, a single dominant action, visible medical posture, and early trust evidence. Commerce navigation, promotional UI, and unsupported proof metrics were rejected.
- Beacon Biosignals confirmed that EEG specificity, immediate audience clarity, and direct platform language outperform generic “AI-powered healthcare” positioning. Its lighter enterprise treatment and stock-adjacent photography were not adopted.
- Eastern Standard's healthcare UX guidance reinforced task-specific navigation, accessibility, readable language, user research, and a simple primary CTA. Its recommendations were treated as mechanisms rather than a visual template.

### Research synthesis applied

1. Lead with one proposition and one live scientific object; do not present a collage of features.
2. Make the primary action descriptive and visibly distinct while keeping a lower-emphasis learn path.
3. Let general readers understand the thesis before exposing method detail; keep specialist language inspectable below.
4. Place research-only and non-diagnostic boundaries beside consequential workflow states rather than in legal copy alone.
5. Use proof only when substantiated. No fabricated partners, adoption counts, clinical outcomes, calibration values, testimonials, or authority marks.
6. Keep native scrolling, readable line lengths, keyboard semantics, and minimum target sizes because healthcare trust depends on basic usability.

### Work completed

- Removed the hero video and video-control architecture.
- Added a deterministic native-canvas EEG brain network that responds to pointer position, pauses offscreen/hidden, caps pixel density, and honors reduced motion.
- Replaced the pill-like signal button with a cut-corner SVG frame and separate neural terminal.
- Rebuilt the public narrative as four black editorial moments with no section rail or alternating-color panels.
- Changed the display/product family from Onest Variable to Instrument Sans Variable while keeping IBM Plex Mono only for technical notation.
- Disabled Lenis handling inside both Proteus routes through route-root prevention; GSAP now adds shallow continuity on top of native browser scrolling.
- Rebuilt the research interface on the same pure-black system using square line-bounded fields, restrained cyan state, structural tabs, and clear separation between inputs, signal field, execution trace, output, and logs.
- Preserved ARIA tabs, arrow/Home/End keyboard operation, progress semantics, live execution log behavior, de-identified input framing, JSON export, timer cleanup, explicit simulation language, and non-clinical warnings.
- Corrected tab-switch scroll retention so each newly selected view begins at its header.
- Added per-field validation, first-missing-field focus, input length constraints, delayed object-URL cleanup, and filename-safe subject normalization.
- Removed the artificial numeric `0.87` calibration fixture. Simulated results now show a nonnumeric `DEMO` presentation and explicitly state that no model value was generated.
- Raised all measured mobile navigation/workspace controls to at least 44px and corrected the remaining accessible-name and contrast findings.
- Removed the obsolete hero MP4 and poster assets from the repository.
- Rewrote `DESIGN.md` around the implemented black neural-atlas system and added explicit prohibitions against videos, pills, light panels, fake metrics, and scroll-jacking.
- Replaced the canvas's self-queuing draw loop with a single-owner RAF scheduler that stops while offscreen or hidden, restarts once when visible, never queues under reduced motion, and cancels reliably on unmount.
- Preserved normal route scroll restoration by avoiding any initial tab scroll; only an actual tab change resets the dedicated workspace route to the top.
- Raised placeholder, sidebar-heading, signal-coordinate, and input-boundary contrast to `6.48:1` text and `3.28:1` non-text minimums against black.
- Reframed all public operational claims as a research hypothesis, proposed workflow, or interface simulation and placed the no-model/no-diagnostic boundary directly in the hero, workspace CTA, and footer.
- Made the public skip-link destination programmatically focusable.

### Verification

- `npm run build`: passed (`2,272` modules transformed).
- `npx tsc --noEmit`: passed.
- Targeted ESLint across Proteus pages, components, utility, and regression test: passed with zero findings.
- `npm run test -- --run`: passed, `3` files / `10` tests. Nine Proteus-specific tests cover tab names, inactive-description contrast tokens, per-field invalid state and focus, nonnumeric calibration presentation, copy-level no-model boundaries, safe export filename normalization, initial scroll preservation, single-chain RAF lifecycle, offscreen/hidden pausing, reduced-motion static rendering, and unmount cleanup.
- Headless browser workflow: passed on desktop and mobile with zero console/page errors and zero horizontal overflow.
- Hero verification: zero video elements, one `1489 × 931` high-DPI canvas at the desktop test viewport, pointer movement changed rendered pixels, and native wheel input moved the document exactly `720px`.
- Mobile verification: landing action `48 × 44px`; all four research tabs approximately `91.5 × 50px`; zero overflow.
- Reduced-motion verification: title and reveal content remain fully visible, the canvas remains present in its simplified state, and lifecycle tests confirm zero queued canvas RAFs after initial render, resize, intersection changes, or pointer input.
- Initial interface route scroll after entrance animation: exactly `0px`.
- Public skip destination: `tabIndex=-1` and available as the target of “Skip to main content.”
- Chrome skip-link focus verification: public link focuses `#problem`; interface link focuses `#pi-workspace-content`.
- Chrome inactive-tab verification: computed `rgb(143,143,141)`, opacity `1`, contrast `6.48:1` against black.
- Chrome forbidden-claim verification: “Trace a signal through the model” and “Network features ready for review” are both absent.
- Final Lighthouse, landing: performance `90`, accessibility `100`, best practices `100`, SEO `100`; FCP `2.4s`, LCP `3.1s`, TBT `50ms`, CLS `0`.
- Final Lighthouse, interface: performance `89`, accessibility `100`, best practices `100`, SEO `100`; FCP `2.6s`, LCP `3.2s`, TBT `20ms`, CLS `0`.
- Security-pattern scan across Proteus TypeScript/CSS: zero secret assignment, `eval`, `exec`, `innerHTML`, `dangerouslySetInnerHTML`, `document.write`, or debug-log matches.
- `npx -y @google/design.md lint DESIGN.md`: zero errors; warnings only for semantic tokens not directly referenced by component entries.

### Independent review triage

The asynchronous reviewer began before the Iteration 03 rebuild and therefore reported several obsolete conditions: the old SectionRail, hero video/control, narrow mobile CTA, unnamed tabs, low-contrast Iteration 02 copy, and rounded interface controls no longer exist. Every finding was still checked against the current code. The applicable findings were resolved by adding per-field validation and focus, 44px mobile targets, sanitized bounded export names, delayed object-URL cleanup, GSAP tween cleanup, final contrast/name repairs, four focused interface tests, and replacement of the numeric `0.87` fixture with nonnumeric `DEMO` presentation. Final Lighthouse accessibility is `100` on both routes.

A later final-scope reviewer identified four additional valid blockers and one timing-stale documentation finding. The stale DESIGN.md finding had already been resolved before review delivery. The valid RAF lifecycle, unsolicited initial scroll, manual contrast, and unqualified-claim findings were repaired and covered by new regression/browser checks. Its skip-link suggestion was also implemented. Its missing `ArcBrand.tsx` suggestion reflected an incorrect review-scope filename: the actual reusable mark is `ArcMark` in `VectorScenes.tsx`, and there is no broken import or missing runtime component. The post-repair build, TypeScript, targeted lint, browser workflow, security scan, design lint, and dual-route Lighthouse gates passed; the subsequent re-review prompted the additional tests and copy changes below.

The first narrow re-review confirmed those lifecycle, scroll, DESIGN.md, and skip-link fixes but found two remaining issues: inactive tab descriptions were dimmed by inherited opacity, and interface copy still implied real model execution. The tab descriptions now render at full opacity with `#8f8f8d` (`6.48:1`). Every timed message, heading, result summary, badge, export disclaimer, status, and footer now identifies an interface walkthrough or fixture; the UI explicitly states that no EEG file, model service, network feature, calibration trace, artifact, clinical result, or diagnosis was generated. Copy-level and CSS-token regression tests were added, bringing the suite to ten passing tests.

The final two-issue independent re-review passed with no security concerns, logic errors, or suggestions. It confirmed that all relevant workflow, result, status, and export copy is accurately framed as a non-executing interface fixture and that inactive descriptions render at opacity `1` with `6.48:1` contrast against black.

### Final screenshots

- `docs/design-log/iteration-03-landing-desktop-hero.png`
- `docs/design-log/iteration-03-landing-desktop-method.png`
- `docs/design-log/iteration-03-landing-mobile-hero.png`
- `docs/design-log/iteration-03-interface-desktop-run.png`
- `docs/design-log/iteration-03-interface-desktop-result.png`
- `docs/design-log/iteration-03-interface-mobile-run.png`

### Slop diagnostic

- No stock healthcare photography, glassmorphism, pill controls, rainbow gradients, icon-topper cards, autoplay video, video residue, fake partners, fake clinical metrics, fabricated testimonials, or generic “AI-powered healthcare” claims remain in the Proteus routes.
- The canvas has a recognizably authored brain silhouette, higher-order graph field, sulcal traces, EEG paths, and pointer-local interaction rather than a generic particle background.
- The research route remains denser than the public narrative because its density serves operation and inspectability; decorative cards and redundant status motifs were removed.

### Known product boundary

The research workflow remains a local interface simulation. No EEG file is uploaded, no validated backend or model is connected, no clinical inference is generated, and no adoption or outcome evidence is claimed. Touch devices receive autonomous canvas motion rather than hover behavior. This iteration is technically complete but remains unaccepted until the user evaluates the rendered experience.

---

## Iteration 04 — Authored system reset

**Date started:** 2026-07-17 11:31:05 IST
**Status:** Rejection logged; measured one-hour research running

### User rejection

> “its absolute buns, nothing is custom, update your design.md, take an entire hour for research this time, and make the website so much better. I need it to exemplify everything properly.”

The message was submitted twice verbatim, reinforcing that Iteration 03 is rejected as a whole rather than requesting incremental polish.

### Reset decision

- Iteration 03's black/cyan canvas, cut-corner controls, editorial section sequence, Instrument Sans hierarchy, and interface treatment are not approved foundations.
- Nothing visual carries forward by default. Accessibility, honest simulation boundaries, native scrolling, lifecycle safety, and test coverage remain engineering requirements rather than aesthetic commitments.
- No Iteration 04 implementation will begin until a measured 60-minute wall-clock research pass is complete and its verified sources are synthesized.
- The existing `DESIGN.md` is superseded. It will be replaced after research with a new system based on an original Proteus Arc concept, not a blended average of reference sites.

### Research brief

The hour must investigate four distinct evidence classes:

1. Authored identities with unmistakably custom controls, transitions, typography, and page grammar.
2. Scientific and neuroscience storytelling that makes method, scale, and uncertainty tangible.
3. Medical/health conversion architecture built on trust, audience recognition, and safe next actions.
4. Interactive data-art systems whose behavior expresses a concept rather than decorating a hero.

Google result pages are discovery evidence only. Every design finding must come from a successfully opened live site or a clearly documented exclusion. Challenge pages, snippets, and elapsed time alone do not count as evidence.

### Timed research execution

- Valid clock start: 2026-07-17 11:43:56 IST (`2026-07-17T06:13:56.912Z`).
- Minimum finish: 2026-07-17 12:43:56 IST; implementation remains blocked until the collector confirms at least `3,600` elapsed seconds.
- Browser isolation: Dockerized Camofox only, with a dedicated `proteus-hour-research-v4` user/session and loopback-bound API/viewer. System Google Chrome is explicitly excluded after the user requested that their Google tab not be closed.
- Collector plan: 18 evenly spaced Google discovery queries plus 18 direct live-site inspections, persistent snapshots, DOM/style extraction, interaction evidence, and desktop hero/below-fold screenshots.
- Initial proof: Stage `1/18` completed at `13s`; Google returned `9` links and NewLimit was opened and captured as a verified live site.

### Execution correction — 2026-07-17 12:26:54 IST

> “you stopped, execute.”

The collector was checked immediately and was still running at `2,436s` (`40m 36s`), with Stage `13/18` complete. Work continued during the timed pass by parsing the accumulated DOM/style/motion evidence and visually comparing hero and below-fold contact sheets.

Interim findings:

- Large sans headline + cyan accent + abstract brain/network illustration + conventional top navigation is already a category default and cannot be the next Proteus Arc identity.
- Generic pill actions, soft audience cards, capability-card grids, and decorative network diagrams recur across weaker references and must be explicitly prohibited.
- Arc Institute earns trust by making research publications the actual information architecture rather than placing generic claims above an evidence section.
- Synchron makes human purpose and a precise study action the visual center instead of leading with platform terminology.
- Asimov owns an asymmetric systems diagram and page edge; Enveda lets one scientific object and cross-boundary typography control the composition.
- Rune Labs' synchronized event raster is a more specific neuroscience mechanism than a decorative brain silhouette.
- The strongest non-derivative Proteus Arc opportunity is one continuous transformation across the entire scroll: raw EEG → pairwise network → higher-order topology → uncertainty → provenance. Public and researcher paths should bifurcate inside that system rather than appearing as two generic cards.

### User-directed color and scrolling revision — 2026-07-17 18:30:56 IST

> “make the scrollbar orange, and try a blue colour as secondary instwad of orange. then make scrolling more normal”

- Orange `#FF5A36` is reserved exclusively for the native scrollbar thumb on both Proteus routes.
- The active signal, evidence lens, focus, open-clause action, topology, and provenance accent changed to signal blue `#7898FF` with hover `#9AB0FF`; the base blue has `7.51:1` contrast against `#050505`.
- Route-specific scroll behavior is now `auto`, overriding the repository-wide smooth-scroll default without changing unrelated pages.
- Programmatic receipt review uses an immediate native jump rather than smooth animation.
- Desktop public clauses were reduced from oversized cinematic heights to approximately one viewport; mobile clauses, reading-depth content, and closing content now use document-driven height with ordinary block padding.

---

## Iteration 05 — Public mandate, evidence ledger, and correspondence

**Date:** 2026-07-17
**Status:** Implementation and local QA complete; direct push requested

### User direction

> “additionally, add sections for explaining proteus arc's fundamental vision, how we want to change alzheimer's accessibillity, and increase the world's knowledge of alzheimer's to inspire future cures. show a table with the benefits of EEG + an AI Questionaire, what problems of EEG we are solving, and add a contact page + a button with a Proteus Arc Brochure.
>
> Additionally, consider some thoughtful microinteractions, aswell as GSAP.
>
> and then after that, push it to this github. under bot-works.tech/proteusarc/homepage”

Follow-up deployment direction: **“do the push then”**.

### Design hypothesis

Extend the Evidence Prospectus as a public research mandate rather than adding a marketing-card grid. Vision, access, knowledge, and input limitations should read as sequential clauses in the same evidence field. Every potential benefit must remain paired with its failure mode and a proposed—not validated—Proteus response.

### Delivered

- Canonical public route at `/proteusarc/homepage`; `/proteusarc` redirects there.
- Three continuous mandate sections:
  - make the invisible course of Alzheimer’s inspectable;
  - prevent specialist scarcity from deciding who can participate in research;
  - treat shared methods and limitations as infrastructure for future cures.
- Semantic EEG + AI questionnaire evidence ledger with five rows covering temporal resolution, repeated sessions, signal quality/artifact, self-report bias, multimodal alignment, provenance, missingness, and uncertainty.
- Dedicated `/proteusarc/contact` correspondence page with an email handoff, no fake form, and a prominent warning not to send medical data, EEG files, or urgent-care requests.
- Five-page A4 evidence prospectus at `/proteusarc/proteus-arc-brochure.pdf`, backed by an editable HTML source in `docs/proteus-arc-brochure.html`.
- Contact and brochure actions integrated into the public mandate and correspondence page.
- Interface backlinks moved to the canonical homepage route.

### Motion and interaction

- Proteus routes are excluded from the legacy Lenis shell and retain browser-native wheel physics.
- GSAP owns first-disclosure reveals and a one-pixel folio progress trace only; it never pins, scrubs, or changes wheel delta.
- Scroll progress uses one coalesced animation-frame owner with listener, observer, tween, and RAF cleanup on unmount.
- Reduced-motion users receive immediate static content and no progress animation.
- Evidence rows, mandate commitments, vector actions, and folio links use restrained line/color microinteractions.
- The mobile evidence ledger is a labelled, keyboard-focusable horizontal region with a visible focus outline.

### Performance architecture

- Legacy QueryClient, tooltips, toasts, Sonner, and Lenis moved into a lazy `LegacyAppShell`; Proteus routes do not load or initialize them.
- Proteus bootstrap dropped from approximately `106 KB` gzip to `54.5 KB` gzip; `51.8 KB` moved to the legacy-only chunk.
- Recursive and Newsreader variable-font payload dropped from approximately `584 KB` to `230 KB` using Latin standard/weight subsets while preserving the authored families.

### Verification

- TypeScript: passed.
- Production Vite build: passed (`2,278` modules transformed).
- Targeted ESLint across all changed Proteus/application files: passed with zero findings.
- Vitest in deterministic serial mode: `7` files / `23` tests passed.
- Axe WCAG 2.0/2.1 AA: zero violations on homepage and contact at `1440×900` and `390×844`.
- Isolated browser QA: zero horizontal page overflow, zero React error overlays, correct canonical redirect, brochure `200 application/pdf`, and no Lenis on any Proteus route.
- Native scroll check: a `520px` wheel request moved the document exactly `520px`; the GSAP folio trace updated independently.
- Mobile evidence ledger: `370px` viewport container / `860px` content width, overflow contained to the labelled keyboard region.
- Desktop Lighthouse before host saturation: performance `96`, accessibility `100`, best practices `100`, SEO `100`.
- Mobile Lighthouse accessibility, best practices, and SEO remained `100`. A later performance rerun was invalidated by macOS load above `100`; no design or claim decision was based on that saturated trace.
- Brochure: valid five-page A4 PDF, `346,024` bytes, visually inspected with no clipping.
- Secret-pattern scan: zero embedded token, key, password, or private-key assignments.
- `DESIGN.md` lint: zero errors; only nonblocking unused semantic-token warnings.

### Screenshots

- `docs/design-log/iteration-05-homepage-desktop-hero.png`
- `docs/design-log/iteration-05-homepage-desktop-evidence.png`
- `docs/design-log/iteration-05-homepage-mobile-knowledge.png`
- `docs/design-log/iteration-05-contact-desktop.png`
- `docs/design-log/iteration-05-contact-mobile.png`

### Product boundary

This remains a public research concept and deterministic interface simulation. No EEG ingestion, connected questionnaire, artifact processing, model training, inference, calibration, diagnosis, screening, clinical access, care pathway, or cure is live. “AI questionnaire” means a proposed clinician-governed research input, not an autonomous diagnostic chatbot. The contact inbox is correspondence, not clinical intake.

### Slop diagnostic

**0/10 after repair.** The expansion uses continuous clauses and a ruled evidence ledger rather than cards, capability tiles, dashboard widgets, pill buttons, fake metrics, decorative gradients, or stock healthcare imagery.

---
version: alpha
name: Proteus Arc — Evidence Prospectus
description: "A public offering of method: one continuous EEG evidence field transforms from signal to topology, uncertainty, and provenance."
colors:
  primary: "#050505"
  primaryDeep: "#000000"
  primaryRaised: "#0C0B09"
  secondary: "#F1EDE5"
  secondaryStrong: "#FFFDF8"
  tertiary: "#7898FF"
  tertiaryHover: "#9AB0FF"
  scrollbar: "#FF5A36"
  neutral: "#050505"
  ink: "#F1EDE5"
  inkMuted: "#B8B1A5"
  inkQuiet: "#9D978D"
  borderDark: "#2C2924"
  borderStrong: "#514B43"
  success: "#A8D6B6"
  warning: "#F3B75D"
  danger: "#FF8C82"
typography:
  display-xl:
    fontFamily: Newsreader Variable
    fontSize: 8rem
    fontWeight: 320
    lineHeight: 0.88
    letterSpacing: "-0.055em"
    fontVariation: "opsz 72"
  display-lg:
    fontFamily: Newsreader Variable
    fontSize: 5.5rem
    fontWeight: 340
    lineHeight: 0.92
    letterSpacing: "-0.045em"
    fontVariation: "opsz 64"
  h1:
    fontFamily: Recursive Variable
    fontSize: 4.5rem
    fontWeight: 520
    lineHeight: 0.92
    letterSpacing: "-0.055em"
    fontVariation: "MONO 0, CASL 0.25, CRSV 0.5"
  h2:
    fontFamily: Newsreader Variable
    fontSize: 3.75rem
    fontWeight: 340
    lineHeight: 0.96
    letterSpacing: "-0.04em"
    fontVariation: "opsz 56"
  h3:
    fontFamily: Recursive Variable
    fontSize: 1.625rem
    fontWeight: 560
    lineHeight: 1.05
    letterSpacing: "-0.035em"
    fontVariation: "MONO 0, CASL 0.2"
  body-lg:
    fontFamily: Recursive Variable
    fontSize: 1.125rem
    fontWeight: 420
    lineHeight: 1.58
    letterSpacing: "-0.018em"
    fontVariation: "MONO 0, CASL 0.15"
  body-md:
    fontFamily: Recursive Variable
    fontSize: 1rem
    fontWeight: 420
    lineHeight: 1.6
    letterSpacing: "-0.012em"
    fontVariation: "MONO 0, CASL 0.1"
  body-sm:
    fontFamily: Recursive Variable
    fontSize: 0.875rem
    fontWeight: 450
    lineHeight: 1.55
    fontVariation: "MONO 0, CASL 0.05"
  label:
    fontFamily: Recursive Variable
    fontSize: 0.6875rem
    fontWeight: 540
    lineHeight: 1.35
    letterSpacing: "0.08em"
    fontVariation: "MONO 1, CASL 0"
  receipt:
    fontFamily: Recursive Variable
    fontSize: 0.75rem
    fontWeight: 430
    lineHeight: 1.55
    letterSpacing: "0.02em"
    fontVariation: "MONO 1, CASL 0"
rounded:
  none: 0px
  micro: 2px
  lens: 999px
spacing:
  hairline: 1px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section-sm: 96px
  section-lg: 176px
components:
  action-clause:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 0px
    height: 48px
  action-clause-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiaryHover}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 0px
    height: 48px
  register-field:
    backgroundColor: "{colors.primaryDeep}"
    textColor: "{colors.secondary}"
    typography: "{typography.receipt}"
    rounded: "{rounded.none}"
    padding: 16px
    height: 52px
  receipt-row:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.inkMuted}"
    typography: "{typography.receipt}"
    rounded: "{rounded.none}"
    padding: 16px
---

## Overview

Proteus Arc is an **Evidence Prospectus**: a public offering of method rather than a stock offering. The experience exposes how a proposed Alzheimer’s EEG workflow would move from raw temporal traces to relationships, higher-order topology, uncertainty, and provenance. The metaphor must be disambiguated in the first viewport.

The visual identity is not a brain illustration, dashboard, or biotech campaign. One continuous evidence field determines the composition, interaction, navigation, and workspace. Public explanation and researcher inspection are two depths of the same object.

**Surface commitments:**

- Public route: **Decide / Learn**. One claim becomes inspectable at a time.
- Workspace: **Command / Inspect**. One specimen is staged and examined; there is no marketing hero or dashboard sidebar.

## Colors

- **Primary (#050505):** Continuous public and workspace field.
- **Primary deep (#000000):** Canvas depth, register fields, and true absence.
- **Secondary (#F1EDE5):** Warm paper-white text. Avoid clinical blue-white.
- **Tertiary (#7898FF):** Signal blue. It marks the active locus, open clause, focus, selected transformation, and provenance connection.
- **Scrollbar (#FF5A36):** Orange is reserved for the native scrollbar thumb and is not reused as an interface accent.
- **Ink muted (#B8B1A5):** Explanatory copy; `9.58:1` against primary.
- **Ink quiet (#9D978D):** Secondary receipt text; `7.03:1` against primary.
- **Borders:** Warm graphite, never cool blue-gray.

Signal blue reaches `7.51:1` against primary and may carry normal text. It is semantic, not decorative. Uncertainty is encoded through opacity, line density, hatching, and bounds—not rainbow gradients.

## Typography

**Newsreader Variable** carries human purpose, consequence, and major prospectus clauses. Use optical sizing and low-to-medium weights. It must never become a luxury-fashion flourish; it appears only where meaning, not operation, dominates.

**Recursive Variable** carries explanation, navigation, controls, and research notation. Its axes are structural:

- Public explanation: `MONO 0`, `CASL 0.15–0.3`
- Method annotation: `MONO 0.35–0.65`, `CASL 0.05–0.15`
- Provenance/receipts: `MONO 1`, `CASL 0`

The gradual move from humanist sans toward mono makes the public-to-research transition visible. Do not add a third family. Do not use Instrument Sans or IBM Plex Mono in Proteus Arc.

## Layout

### Public prospectus

- One deterministic evidence field persists through the page.
- Hero title is embedded into the field; it is not a left-copy/right-visual split.
- Native scroll changes the field through raw trace → events → pairwise links → higher-order loops → uncertainty/provenance.
- Copy appears as sparse clauses and margin annotations connected to the active state.
- Public/research depth bifurcates within one composition; never use audience cards.
- Maximum reading measure: 38rem. Maximum prospectus frame: 1480px.
- Claim and limitation share the same viewport and visual weight hierarchy.

### Workspace

- Command / Inspect surface with a source register, one large specimen field, a transformation spine, and a contextual receipt.
- No fixed sidebar, hero heading, card grid, circular progress indicator, or decorative console.
- The staged walkthrough transforms one specimen rather than swapping dashboard panels.
- On mobile, the specimen leads; register, stage spine, and receipt follow in document order.

### Scroll

Browser-native scroll physics are mandatory. Anchor navigation and in-page receipt jumps use `auto`, not smooth scrolling. Public clauses stay close to one viewport on desktop and use content-driven heights on mobile. Visual progress may read `scrollY` and schedule one paint frame; it must never change wheel delta, pin the document, or delay readable content.

## Elevation & Depth

Depth comes from evidence layers, not surfaces:

- Raw traces: low-opacity warm white.
- Active events: signal-blue locus marks.
- Pairwise relationships: thin warm-gray lines.
- Higher-order groups: signal-blue loops and translucent hatch fills.
- Uncertainty: ghost envelopes and broken bounds.
- Provenance: crisp mono receipts attached to the selected locus.

No glassmorphism, card shadows, bloom fields, generic radial gradients, or persistent backdrop blur. The evidence lens may soften only the pixels immediately outside its inspection radius.

## Shapes

- Traces are continuous and irregular; never decorative sine waves repeated identically.
- Events use short vertical loci and small square timestamps.
- Pairwise edges are straight or lightly tensioned.
- Higher-order relationships use open loops that visibly group three or more loci.
- Uncertainty bounds are broken and hatched.
- The evidence lens is the only persistent circle.
- Containers remain square and are used only when a semantic register or receipt needs a boundary.

## Components

### Evidence field

A native canvas renders deterministic stacked EEG-like traces, temporal events, pairwise edges, higher-order loops, uncertainty envelopes, and provenance labels in one coordinate system. Scroll selects a transformation state. Pointer/touch selects a local locus. The canvas is explanatory, not data output.

Lifecycle requirements: one RAF chain maximum; cap DPR; stop hidden/offscreen; restart once; queue no RAF under reduced motion; clean observers/listeners on unmount. Provide semantic text for every state.

### Evidence lens

The lens reveals source channels, stage, retained context, and uncertainty for the nearest locus. Pointer movement changes inspection, not decorative displacement. Touch toggles or advances the selected locus. Keyboard users receive equivalent stage and receipt controls.

### Prospectus folio

A sparse edge register shows issue, status, current clause, and product boundary. It replaces fixed glass navigation. On mobile it becomes a compact top line.

### Open-clause action

An unboxed text action with a warm rule and one signal-blue locus. Hover/focus opens the rule around the locus and shifts the label by at most 4px. The visible component has no filled container; the semantic target remains at least 44px high. It must work without motion.

### Transformation receipt

Each stage states:

1. source
2. proposed operation
3. retained context
4. uncertainty or missing information
5. product boundary

Receipts are not cards. They are ruled rows attached to the active evidence state.

### Source register

Three optional fictional labels may stage the interface walkthrough. The register states that labels are not loaded, validated, uploaded, or analyzed. Validation errors focus the first missing field.

### Instrument simulation

The workspace advances through deterministic UI states only. It never claims filtering, feature generation, graph construction, calibration, inference, or clinical output occurred. Export contains user-entered labels, selected stage, and fixture receipts only.

## Do's and Don'ts

### Do

- Explain “IPO” as a public offering of method in the hero.
- Make one continuous scientific object control the entire experience.
- Keep human purpose before technical method.
- Pair every ambitious claim with its boundary.
- Route readers through named actions: **Read the prospectus** and **Inspect the instrument simulation**.
- Use progressive depth, not separate public/research themes.
- Let type variation, traces, and rules create hierarchy before adding containers.
- Preserve native scroll, keyboard access, visible focus, 44px targets, and reduced motion.
- Test lifecycle, initial scroll, contrast, overflow, touch behavior, and semantic alternatives.

### Don't

- Do not use a brain silhouette, neuron particle cloud, glass brain, molecule field, or generic network globe.
- Do not drift from the approved signal blue into cyan gradients, violet glows, or multi-hue biotech effects.
- Do not use pill controls, cut corners, terminal ornaments, icon toppers, or rounded card grids.
- Do not use a fixed glass navigation bar, numbered marketing sections, alternating copy/vector rows, or audience cards.
- Do not use decorative console logs or a circular progress ring.
- Do not add stock medical photography, generated patient imagery, fake publications, logos, partners, testimonials, metrics, approvals, or outcome claims.
- Do not let motion hide content or substitute for hierarchy.
- Do not imply EEG upload, model execution, calibrated output, clinical validation, diagnosis, or deployment.
- Do not treat technical QA as visual acceptance.

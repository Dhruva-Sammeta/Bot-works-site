import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "@/components/proteus/fonts";
import { EvidenceField } from "@/components/proteus/EvidenceField";
import { ProspectusAction } from "@/components/proteus/ProspectusAction";
import { ProspectusMark } from "@/components/proteus/ProspectusMark";
import "./proteus-arc.css";

type ReceiptRowProps = {
  label: string;
  children: string;
};

function ReceiptRow({ label, children }: ReceiptRowProps) {
  return <div className="pa-receipt-row"><dt>{label}</dt><dd>{children}</dd></div>;
}

export default function ProteusArc() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const previousTitle = document.title;
    document.title = "Proteus Arc | The IPO for Alzheimer’s";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = [...page.querySelectorAll<HTMLElement>(".pa-observe")];
    const progress = page.querySelector<HTMLElement>(".pa-folio-progress > i");

    if (reduced) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => { document.title = previousTitle; };
    }

    page.classList.add("pa-gsap-ready");
    const context = gsap.context(() => {
      gsap.set(elements, { opacity: 0, y: 18 });
      if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
    }, page);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          gsap.to(target, { opacity: 1, y: 0, duration: .72, ease: "power3.out", clearProps: "opacity,transform", overwrite: true });
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.18 });
    elements.forEach((element) => observer.observe(element));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      if (!progress) return;
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      gsap.set(progress, { scaleX: Math.min(1, Math.max(0, window.scrollY / range)) });
    };
    const scheduleProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      if (frame) window.cancelAnimationFrame(frame);
      gsap.killTweensOf(elements);
      context.revert();
      page.classList.remove("pa-gsap-ready");
      document.title = previousTitle;
    };
  }, []);

  return (
    <main ref={pageRef} className="pa-prospectus">
      <a className="pa-skip-link" href="#source-clause">Skip to the prospectus</a>
      <EvidenceField mode="public" />

      <header className="pa-folio" aria-label="Proteus Arc prospectus navigation">
        <Link className="pa-folio-brand" to="/proteusarc/homepage" aria-label="Proteus Arc home">
          <ProspectusMark className="pa-prospectus-mark" />
          <span>Proteus Arc</span>
        </Link>
        <div className="pa-folio-issue" aria-label="Prospectus status">
          <span>Evidence prospectus</span>
          <em>Issue 00 / Interface simulation</em>
        </div>
        <nav className="pa-folio-nav" aria-label="Prospectus clauses">
          <a href="#source-clause">Source</a>
          <a href="#vision-clause">Vision</a>
          <a href="#evidence-ledger">Evidence</a>
        </nav>
        <Link className="pa-folio-instrument" to="/proteusarc/interface">Inspect instrument <span aria-hidden="true">↘</span></Link>
        <span className="pa-folio-progress" aria-hidden="true"><i /></span>
      </header>

      <section className="pa-opening" aria-labelledby="proteus-title">
        <div className="pa-opening-meta pa-observe">
          <span>OPEN METHOD / PUBLIC RECORD</span>
          <span>Dynamic higher-order EEG research hypothesis</span>
        </div>
        <div className="pa-opening-title pa-observe">
          <h1 id="proteus-title"><span>The IPO</span><em>for Alzheimer’s.</em></h1>
        </div>
        <div className="pa-opening-statement pa-observe">
          <strong>Not a stock offering.</strong>
          <p>A public offering of method: how an EEG research hypothesis could move from signal to topology, where uncertainty enters, and what remains unproven.</p>
          <div className="pa-opening-actions">
            <ProspectusAction href="#source-clause" tone="signal">Read the prospectus</ProspectusAction>
            <ProspectusAction to="/proteusarc/interface">Inspect the instrument simulation</ProspectusAction>
          </div>
        </div>
        <div className="pa-opening-boundary pa-observe">
          <span>Product boundary</span>
          <p>No EEG upload. No connected model. No clinical inference. No diagnosis.</p>
        </div>
      </section>

      <section id="source-clause" className="pa-clause pa-clause-source" tabIndex={-1}>
        <div className="pa-clause-index" aria-hidden="true"><span>Source</span><i /></div>
        <article className="pa-clause-copy pa-observe">
          <p className="pa-clause-kicker">THE RECORD OPENS WITH TIME</p>
          <h2>A signal is not evidence yet.</h2>
          <p className="pa-clause-lede">EEG is a changing trace. Before a network appears, timing, channel context, and missing information have to remain visible.</p>
          <dl className="pa-transformation-receipt">
            <ReceiptRow label="Source">Fictional stacked EEG-like traces</ReceiptRow>
            <ReceiptRow label="Proposed operation">Mark temporal events without collapsing time</ReceiptRow>
            <ReceiptRow label="Retained">Channel, order, timing, and visible gaps</ReceiptRow>
            <ReceiptRow label="Missing">No uploaded recording and no quality assessment</ReceiptRow>
          </dl>
        </article>
        <p className="pa-margin-note pa-observe">Move across the field to inspect a locus. The lens reveals context; it does not generate a result.</p>
      </section>

      <section className="pa-clause pa-clause-relation">
        <div className="pa-clause-index" aria-hidden="true"><span>Relation</span><i /></div>
        <article className="pa-clause-copy pa-observe">
          <p className="pa-clause-kicker">FROM READINGS TO RELATIONSHIPS</p>
          <h2>The hypothesis lives between channels.</h2>
          <p className="pa-clause-lede">Proteus Arc asks whether changing relationships could carry information that isolated averages lose. The lines are proposed structure—not measured connectivity.</p>
          <dl className="pa-transformation-receipt">
            <ReceiptRow label="Source">Marked temporal loci</ReceiptRow>
            <ReceiptRow label="Proposed operation">Estimate changing dependencies</ReceiptRow>
            <ReceiptRow label="Retained">Time order and source-channel identity</ReceiptRow>
            <ReceiptRow label="Missing">No estimator, fitted parameters, or validation</ReceiptRow>
          </dl>
        </article>
      </section>

      <section id="topology-clause" className="pa-clause pa-clause-topology">
        <div className="pa-clause-index" aria-hidden="true"><span>Topology</span><i /></div>
        <article className="pa-clause-copy pa-observe">
          <p className="pa-clause-kicker">PAIRS ARE NOT THE WHOLE SYSTEM</p>
          <h2>Groups can change together.</h2>
          <p className="pa-clause-lede">A higher-order model would represent relationships among three or more loci. The open loops make that proposed grouping inspectable instead of hiding it inside a score.</p>
          <dl className="pa-transformation-receipt">
            <ReceiptRow label="Source">Proposed pairwise relation field</ReceiptRow>
            <ReceiptRow label="Proposed operation">Construct higher-order groups</ReceiptRow>
            <ReceiptRow label="Retained">Membership, time, and source links</ReceiptRow>
            <ReceiptRow label="Missing">No trained topology or disease association</ReceiptRow>
          </dl>
        </article>
      </section>

      <section id="boundary-clause" className="pa-clause pa-clause-boundary">
        <div className="pa-clause-index" aria-hidden="true"><span>Boundary</span><i /></div>
        <article className="pa-clause-copy pa-observe">
          <p className="pa-clause-kicker">UNCERTAINTY STAYS IN FRAME</p>
          <h2>Nothing becomes trustworthy by disappearing.</h2>
          <p className="pa-clause-lede">A credible research system would show bounds, provenance, missing inputs, and model limits beside every interpretation. The broken frame is the point: this prospectus is incomplete by design.</p>
          <dl className="pa-transformation-receipt pa-transformation-receipt-accent">
            <ReceiptRow label="What is live">A deterministic public interface and staged fixture</ReceiptRow>
            <ReceiptRow label="What is not">Data ingestion, inference, calibration, or clinical use</ReceiptRow>
            <ReceiptRow label="Human role">Question assumptions and review evidence</ReceiptRow>
            <ReceiptRow label="Status">Research concept / non-diagnostic</ReceiptRow>
          </dl>
        </article>
      </section>

      <section id="vision-clause" className="pa-mandate pa-mandate-vision" aria-labelledby="vision-title">
        <div className="pa-mandate-register" aria-hidden="true"><span>01</span><i /><em>Fundamental vision</em></div>
        <article className="pa-mandate-copy pa-observe">
          <p className="pa-clause-kicker">A PUBLIC RESEARCH MANDATE</p>
          <h2 id="vision-title">Make the invisible course of Alzheimer’s inspectable.</h2>
          <p>Proteus Arc begins with a simple conviction: a brain-health hypothesis should be legible before it becomes influential. We want to explore whether dynamic EEG relationships, higher-order network structure, and human context can form a transparent research record—one that exposes uncertainty instead of compressing it into a hidden score.</p>
        </article>
        <aside className="pa-mandate-proof pa-observe" aria-label="Vision commitments">
          <span>See change over time</span>
          <span>Keep provenance attached</span>
          <span>Let people question the method</span>
        </aside>
      </section>

      <section className="pa-mandate pa-mandate-access" aria-labelledby="access-title">
        <div className="pa-mandate-register" aria-hidden="true"><span>02</span><i /><em>Access</em></div>
        <article className="pa-mandate-copy pa-observe">
          <p className="pa-clause-kicker">WIDEN THE RESEARCH DOOR</p>
          <h2 id="access-title">Specialist scarcity should not decide who gets seen.</h2>
          <p>EEG is comparatively portable, repeatable, and time-sensitive. A carefully governed AI questionnaire could add structured lived context between visits. Together, they could support more accessible research participation and more informed conversations—without pretending to replace imaging, biomarkers, neurological examination, or clinical judgment.</p>
        </article>
        <p className="pa-mandate-boundary pa-observe"><strong>Boundary</strong>This is a direction for research accessibility, not a screening service. No EEG or questionnaire is connected here, and no clinical pathway is currently offered.</p>
      </section>

      <section className="pa-mandate pa-mandate-knowledge" aria-labelledby="knowledge-title">
        <div className="pa-mandate-register" aria-hidden="true"><span>03</span><i /><em>Knowledge</em></div>
        <article className="pa-mandate-copy pa-observe">
          <p className="pa-clause-kicker">TURN EVERY RESULT INTO A QUESTION</p>
          <h2 id="knowledge-title">Knowledge is infrastructure for future cures.</h2>
          <p>Alzheimer’s will not yield to one opaque prediction. Proteus Arc’s long-term ambition is to make methods, limitations, and research receipts easier to inspect so more scientists, clinicians, families, and builders can learn from the same public record. Better shared questions can inspire stronger studies—and, eventually, future cures.</p>
          <p className="pa-mandate-disclaimer">This vision does not promise a cure, diagnosis, or clinical access today. It commits to making the research path more understandable and accountable.</p>
          <div className="pa-mandate-actions">
            <ProspectusAction to="/proteusarc/contact" tone="signal" ariaLabel="Contact the Proteus Arc team">Contact the Proteus Arc team</ProspectusAction>
            <ProspectusAction href="/proteusarc/proteus-arc-brochure.pdf" download="proteus-arc-brochure.pdf" ariaLabel="Download the Proteus Arc brochure">Download the Proteus Arc brochure</ProspectusAction>
          </div>
        </article>
      </section>

      <section id="evidence-ledger" className="pa-evidence-ledger" aria-labelledby="evidence-ledger-title">
        <header className="pa-ledger-heading pa-observe">
          <span>INPUT LEDGER / BENEFIT BEFORE CLAIM</span>
          <h2 id="evidence-ledger-title">What EEG can offer—and what Proteus must solve.</h2>
          <p>Potential benefits are paired with their failure modes. Every response below is a proposed research direction, not a validated capability.</p>
        </header>
        <div
          className="pa-ledger-scroll pa-observe"
          role="region"
          aria-label="Scroll the EEG and AI questionnaire evidence table"
          tabIndex={0}
        >
          <table aria-label="EEG and AI questionnaire evidence ledger">
            <thead><tr><th scope="col">Input</th><th scope="col">Potential benefit</th><th scope="col">Problem to solve</th><th scope="col">Proposed Proteus response</th></tr></thead>
            <tbody>
              <tr><th scope="row">EEG temporal dynamics</th><td>Millisecond-scale view of changing electrical activity</td><td>Limited spatial specificity and volume conduction</td><td>Keep channel and topology context visible; do not infer anatomy</td></tr>
              <tr><th scope="row">Repeat EEG sessions</th><td>Portable, comparatively low-cost longitudinal measurement</td><td>Setup variation, electrode drift, and between-session instability</td><td>Attach acquisition provenance, time-aware baselines, and uncertainty</td></tr>
              <tr><th scope="row">EEG signal quality</th><td>Direct visibility into rhythmic and event-level change</td><td>Motion, muscle, eye, and environmental artifacts</td><td>Expose quality flags and missingness; never silently repair a trace</td></tr>
              <tr><th scope="row">AI questionnaire</th><td>Structured context about cognition, function, and change</td><td>Recall and self-report bias, language, and unequal access</td><td>Display source and uncertainty; preserve human review and opt-out</td></tr>
              <tr><th scope="row">EEG + questionnaire</th><td>Multimodal context across signal and lived experience</td><td>Missing or misaligned inputs can create false confidence</td><td>Keep separate provenance receipts and make absent inputs explicit</td></tr>
            </tbody>
          </table>
        </div>
        <p className="pa-ledger-footnote pa-observe">AI questionnaire means a proposed, clinician-governed research instrument—not an autonomous diagnostic chatbot.</p>
      </section>

      <section className="pa-reading-depths" aria-labelledby="reading-depth-title">
        <div className="pa-depth-intro pa-observe">
          <span>ONE RECORD / TWO READING DEPTHS</span>
          <h2 id="reading-depth-title">Clear enough to enter. Deep enough to interrogate.</h2>
        </div>
        <div className="pa-depth-paths pa-observe">
          <a href="#source-clause"><span>Public reading</span><strong>Follow the thesis in plain language.</strong><i aria-hidden="true">↓</i></a>
          <Link to="/proteusarc/interface"><span>Research inspection</span><strong>Stage the fixture and inspect every receipt.</strong><i aria-hidden="true">↘</i></Link>
        </div>
      </section>

      <section className="pa-closing" aria-labelledby="closing-title">
        <div className="pa-closing-copy pa-observe">
          <p>The goal is not a better-looking graph.</p>
          <h2 id="closing-title">It is evidence people can question before it ever affects a person.</h2>
          <ProspectusAction to="/proteusarc/interface" tone="signal">Open the instrument simulation</ProspectusAction>
        </div>
        <div className="pa-closing-boundary pa-observe">
          <span>Research concept</span>
          <p>Dynamic higher-order EEG network hypothesis for Alzheimer’s. Interface simulation only.</p>
        </div>
      </section>

      <footer className="pa-prospectus-footer">
        <div className="pa-footer-brand"><ProspectusMark className="pa-prospectus-mark" /><span>Proteus Arc</span></div>
        <p>Method offered publicly. Claims withheld until evidence exists.</p>
        <Link to="/proteusarc/contact">Contact ↗</Link>
      </footer>
    </main>
  );
}

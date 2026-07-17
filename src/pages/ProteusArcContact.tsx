import { useEffect } from "react";
import { Link } from "react-router-dom";
import "@/components/proteus/fonts";
import { ProspectusAction } from "@/components/proteus/ProspectusAction";
import { ProspectusMark } from "@/components/proteus/ProspectusMark";
import "./proteus-contact.css";

const emailHref = "mailto:nagapranayimmadi@gmail.com?subject=Proteus%20Arc%20inquiry";

export default function ProteusArcContact() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Contact | Proteus Arc";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="pc-contact">
      <a className="pc-skip-link" href="#contact-record">Skip to contact record</a>
      <header className="pc-header">
        <Link to="/proteusarc/homepage" className="pc-brand" aria-label="Proteus Arc home">
          <ProspectusMark className="pc-mark" />
          <span>Proteus Arc</span>
        </Link>
        <span>Public correspondence / no clinical intake</span>
      </header>

      <section id="contact-record" className="pc-hero" aria-labelledby="contact-title">
        <div className="pc-index" aria-hidden="true"><span>CONTACT</span><i /><em>Issue 00</em></div>
        <div className="pc-title">
          <p>BUILD THE PUBLIC RECORD WITH US</p>
          <h1 id="contact-title">Contact the Proteus Arc team.</h1>
        </div>
        <div className="pc-intro">
          <p>We welcome conversations with EEG researchers, neuroscientists, clinicians, accessibility partners, public-knowledge builders, and people who can challenge the method constructively.</p>
          <ProspectusAction href={emailHref} tone="signal" ariaLabel="Email Proteus Arc">Email Proteus Arc</ProspectusAction>
        </div>
      </section>

      <section className="pc-ledger" aria-labelledby="contact-ledger-title">
        <header>
          <span>CORRESPONDENCE LEDGER</span>
          <h2 id="contact-ledger-title">Tell us where you can make the work more rigorous.</h2>
        </header>
        <dl>
          <div><dt>Research collaboration</dt><dd>EEG methodology, dynamic networks, higher-order topology, uncertainty, validation design.</dd></div>
          <div><dt>Clinical and scientific review</dt><dd>Failure modes, evidence thresholds, workflow realities, communication boundaries.</dd></div>
          <div><dt>Access and public knowledge</dt><dd>Inclusive research participation, questionnaire governance, understandable Alzheimer’s education.</dd></div>
          <div><dt>Product and engineering</dt><dd>Inspectable interfaces, provenance, safe AI systems, responsible data infrastructure.</dd></div>
        </dl>
      </section>

      <section className="pc-boundary" aria-labelledby="contact-boundary-title">
        <div>
          <span>PRIVACY BOUNDARY</span>
          <h2 id="contact-boundary-title">Correspondence—not care.</h2>
        </div>
        <div>
          <p><strong>Do not send personal medical data, EEG files, or urgent care requests.</strong> This inbox is not monitored as a clinical service and cannot provide diagnosis, treatment, crisis support, or research enrollment.</p>
          <p>For medical questions, contact a qualified healthcare professional. For an emergency, contact local emergency services.</p>
        </div>
      </section>

      <section className="pc-actions" aria-label="Proteus Arc resources">
        <ProspectusAction to="/proteusarc/homepage" ariaLabel="Return to the Proteus Arc homepage">Return to the Proteus Arc homepage</ProspectusAction>
        <ProspectusAction href="/proteusarc/proteus-arc-brochure.pdf" download="proteus-arc-brochure.pdf" ariaLabel="Download the Proteus Arc brochure">Download the Proteus Arc brochure</ProspectusAction>
      </section>

      <footer className="pc-footer">
        <div><ProspectusMark className="pc-mark" /><span>Proteus Arc</span></div>
        <p>Research concept / non-diagnostic / public method prospectus</p>
        <a href={emailHref}>nagapranayimmadi@gmail.com ↗</a>
      </footer>
    </main>
  );
}

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import "@/components/proteus/fonts";
import { EvidenceField } from "@/components/proteus/EvidenceField";
import { ProspectusAction } from "@/components/proteus/ProspectusAction";
import { ProspectusMark } from "@/components/proteus/ProspectusMark";
import { sanitizeSubjectReferenceForFilename } from "@/components/proteus/simulation";
import "./proteus-interface.css";

type StageId = "source" | "trace" | "relation" | "topology" | "boundary";

type Stage = {
  id: StageId;
  short: string;
  label: string;
  statement: string;
  source: string;
  operation: string;
  retained: string;
  missing: string;
};

type ResultData = {
  patientId: string;
  timestamp: string;
  dataset: string;
  cognitiveBaseline: string;
  summary: string;
  calibrationPreview: "illustrative-ui-fixture";
  status: "Interface walkthrough";
};

type HistoryEntry = {
  timestamp: string;
  patientId: string;
  dataset: string;
  cognitiveBaseline: string;
  status: "Walkthrough complete";
};

const stages: Stage[] = [
  {
    id: "source",
    short: "SOURCE",
    label: "Source register",
    statement: "Fictional labels enter the register. Nothing is loaded.",
    source: "User-entered subject, dataset, and cognitive-context labels",
    operation: "Record labels in local interface state",
    retained: "Exact label text and session time",
    missing: "No file, identity check, consent record, or validation service",
  },
  {
    id: "trace",
    short: "TRACE",
    label: "Temporal trace",
    statement: "The field previews where temporal events could remain visible.",
    source: "Deterministic illustrative EEG-like traces",
    operation: "Reveal a proposed temporal-event view",
    retained: "Channel identity, order, and event position",
    missing: "No filtering, quality check, artifact rejection, or signal data",
  },
  {
    id: "relation",
    short: "RELATION",
    label: "Pairwise relation",
    statement: "Proposed relationships appear without becoming model output.",
    source: "Illustrative temporal loci",
    operation: "Stage a pairwise-dependency presentation",
    retained: "Source-channel and time-position links",
    missing: "No estimator, parameters, statistics, or fitted relationships",
  },
  {
    id: "topology",
    short: "TOPOLOGY",
    label: "Higher-order topology",
    statement: "Open loops show how groups could be made inspectable.",
    source: "Illustrative pairwise relation field",
    operation: "Stage groups spanning three or more loci",
    retained: "Visible group membership and source links",
    missing: "No trained topology, biomarker, disease association, or inference",
  },
  {
    id: "boundary",
    short: "BOUNDARY",
    label: "Uncertainty and provenance",
    statement: "The final state exposes what the fixture cannot know.",
    source: "The staged interface states and user-entered labels",
    operation: "Attach an uncertainty and provenance receipt",
    retained: "Inputs, display state, limitations, and session time",
    missing: "No calibration, model value, clinical result, or diagnosis",
  },
];

function formatTimestamp() {
  return `${new Date().toISOString().replace("T", " ").slice(0, 19)} UTC`;
}

function useVerticalStageLayout() {
  const [vertical, setVertical] = useState(() => window.matchMedia("(max-width: 720px)").matches);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const handleChange = (event: MediaQueryListEvent) => setVertical(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);
  return vertical;
}

export default function ProteusArcInterface() {
  const [activeStage, setActiveStage] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [dataset, setDataset] = useState("");
  const [cognitiveBaseline, setCognitiveBaseline] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [walkthroughStage, setWalkthroughStage] = useState<number | null>(null);
  const [stageTrace, setStageTrace] = useState<string[]>([]);
  const [resultsList, setResultsList] = useState<ResultData[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const timersRef = useRef<number[]>([]);
  const resultRef = useRef<HTMLElement>(null);
  const verticalStageLayout = useVerticalStageLayout();

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Proteus Arc | Instrument Simulation";
    return () => {
      clearTimers();
      document.title = previousTitle;
    };
  }, []);

  const handleStageKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % stages.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + stages.length) % stages.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = stages.length - 1;
    setActiveStage(nextIndex);
    window.requestAnimationFrame(() => document.getElementById(`pi-stage-${stages[nextIndex].id}`)?.focus());
  };

  const runSimulation = () => {
    const missingFields = [
      { value: patientId, label: "subject reference", id: "pi-subject-reference" },
      { value: dataset, label: "EEG dataset", id: "pi-eeg-dataset" },
      { value: cognitiveBaseline, label: "cognitive baseline", id: "pi-cognitive-baseline" },
    ].filter((field) => !field.value.trim());

    if (missingFields.length > 0) {
      setValidationError(`Enter ${missingFields.map((field) => field.label).join(", ")} before starting the walkthrough.`);
      window.requestAnimationFrame(() => document.getElementById(missingFields[0].id)?.focus());
      return;
    }

    clearTimers();
    setValidationError("");
    setIsRunning(true);
    setActiveStage(0);
    setWalkthroughStage(0);
    setStageTrace(["Source register opened. No data or model is connected."]);

    stages.forEach((stage, index) => {
      const timer = window.setTimeout(() => {
        setActiveStage(index);
        setWalkthroughStage(index);
        setStageTrace((previous) => [...previous, stage.statement]);
        if (index === stages.length - 1) {
          const timestamp = formatTimestamp();
          const result: ResultData = {
            patientId: patientId.trim(),
            timestamp,
            dataset: dataset.trim(),
            cognitiveBaseline: cognitiveBaseline.trim(),
            summary: "Interface walkthrough completed. No network features, calibration traces, or model artifacts were generated; this receipt demonstrates the intended review structure only.",
            calibrationPreview: "illustrative-ui-fixture",
            status: "Interface walkthrough",
          };
          setResultsList((previous) => [result, ...previous]);
          setHistory((previous) => [{
            timestamp,
            patientId: patientId.trim(),
            dataset: dataset.trim(),
            cognitiveBaseline: cognitiveBaseline.trim(),
            status: "Walkthrough complete",
          }, ...previous]);
          setIsRunning(false);
        }
      }, 480 + index * 780);
      timersRef.current.push(timer);
    });
  };

  const reviewReceipt = () => {
    if (typeof resultRef.current?.scrollIntoView === "function") {
      resultRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };

  const exportResult = (result: ResultData) => {
    const payload = {
      ...result,
      stages: stages.map(({ id, label, source, operation, retained, missing }) => ({ id, label, source, proposedOperation: operation, retained, missing })),
      disclaimer: "Interface demonstration JSON. Contains user-entered labels and fixture text only; no EEG analysis, model output, calibration value, clinical result, or diagnosis.",
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `proteus-arc-${sanitizeSubjectReferenceForFilename(result.patientId)}-simulation.json`;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const stage = stages[activeStage];
  const progress = walkthroughStage === null ? 0 : Math.round((walkthroughStage / (stages.length - 1)) * 100);

  return (
    <main className="proteus-interface">
      <a className="pi-skip-link" href="#pi-instrument-content">Skip to instrument</a>

      <header className="pi-folio" aria-label="Proteus Arc instrument header">
        <Link className="pi-folio-brand" to="/proteusarc/homepage" aria-label="Proteus Arc instrument simulation — back to public prospectus">
          <ProspectusMark className="pi-prospectus-mark" />
          <span>Proteus Arc</span>
        </Link>
        <div className="pi-folio-status"><span>Instrument simulation</span><em>No connected model</em></div>
        <div className="pi-folio-mode"><span>Command / Inspect</span><i aria-hidden="true" /></div>
        <Link className="pi-folio-exit" to="/proteusarc/homepage">Public prospectus <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="pi-boundary-banner" aria-label="Product boundary">
        <strong>INTERFACE FIXTURE</strong>
        <p>No data or model is connected. Labels remain local to this browser session; no file is uploaded or analyzed.</p>
      </section>

      <section id="pi-instrument-content" className="pi-instrument" tabIndex={-1} aria-labelledby="pi-instrument-title">
        <form className="pi-source-register" noValidate aria-busy={isRunning} onSubmit={(event) => { event.preventDefault(); runSimulation(); }}>
          <div className="pi-register-heading">
            <span>Source register</span>
            <em>Fictional labels only</em>
          </div>
          <h1 id="pi-instrument-title">Stage a fictional record.</h1>
          <p>Enter three labels to preview how a future research interface could expose each proposed transformation. Nothing is loaded, filtered, fitted, or inferred.</p>

          <label htmlFor="pi-subject-reference">
            <span>Subject reference</span>
            <input id="pi-subject-reference" required maxLength={64} disabled={isRunning} value={patientId} onChange={(event) => setPatientId(event.target.value)} placeholder="e.g. sub-004" autoComplete="off" aria-invalid={Boolean(validationError && !patientId.trim())} aria-describedby={validationError && !patientId.trim() ? "pi-run-error pi-register-note" : "pi-register-note"} />
          </label>
          <label htmlFor="pi-eeg-dataset">
            <span>EEG dataset</span>
            <input id="pi-eeg-dataset" required maxLength={128} disabled={isRunning} value={dataset} onChange={(event) => setDataset(event.target.value)} placeholder="e.g. eeg-session-02.edf" autoComplete="off" aria-invalid={Boolean(validationError && !dataset.trim())} aria-describedby={validationError && !dataset.trim() ? "pi-run-error pi-register-note" : "pi-register-note"} />
          </label>
          <label htmlFor="pi-cognitive-baseline">
            <span>Cognitive baseline</span>
            <input id="pi-cognitive-baseline" required maxLength={64} disabled={isRunning} value={cognitiveBaseline} onChange={(event) => setCognitiveBaseline(event.target.value)} placeholder="e.g. MMSE-24" autoComplete="off" aria-invalid={Boolean(validationError && !cognitiveBaseline.trim())} aria-describedby={validationError && !cognitiveBaseline.trim() ? "pi-run-error pi-register-note" : "pi-register-note"} />
          </label>

          {validationError && <p id="pi-run-error" className="pi-validation" role="alert">{validationError}</p>}
          <ProspectusAction className="pi-start-action" tone="signal" type="submit" disabled={isRunning} ariaLabel="Start interface walkthrough">
            {isRunning ? `Staging ${(walkthroughStage ?? 0) + 1} of ${stages.length}` : "Start interface walkthrough"}
          </ProspectusAction>
          <p id="pi-register-note" className="pi-register-note">No files are uploaded. The walkthrough changes deterministic interface states only.</p>
        </form>

        <div className="pi-specimen" aria-label="Illustrative evidence specimen">
          <EvidenceField mode="instrument" phase={activeStage} />
          <div className="pi-specimen-head">
            <span>SPECIMEN / UI FIXTURE</span>
            <div role="progressbar" aria-label="Interface walkthrough progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><i style={{ width: `${progress}%` }} /><em>{String(walkthroughStage === null ? 0 : walkthroughStage + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</em></div>
          </div>
          <div className="pi-specimen-status" role="status" aria-live="polite">
            <span>{stage.short}</span>
            <p>{isRunning ? stage.statement : "Select a stage to inspect its proposed operation and missing evidence."}</p>
          </div>
        </div>

        <aside id="pi-stage-panel" className="pi-stage-receipt" role="tabpanel" aria-labelledby={`pi-stage-${stage.id}`} tabIndex={0}>
          <div className="pi-receipt-heading"><span>Transformation receipt</span><em>{stage.label}</em></div>
          <h2>{stage.statement}</h2>
          <dl>
            <div><dt>Source</dt><dd>{stage.source}</dd></div>
            <div><dt>Proposed operation</dt><dd>{stage.operation}</dd></div>
            <div><dt>Retained</dt><dd>{stage.retained}</dd></div>
            <div><dt>Missing</dt><dd>{stage.missing}</dd></div>
          </dl>
          <div className="pi-trace-status" aria-live="polite" aria-atomic="true">
            <span>Latest fixture event</span>
            <p>{stageTrace.at(-1) ?? "No walkthrough staged in this session."}</p>
          </div>
        </aside>

        <nav className="pi-stage-spine" role="tablist" aria-label="Evidence transformation stages" aria-orientation={verticalStageLayout ? "vertical" : "horizontal"}>
          {stages.map((item, index) => (
            <button
              key={item.id}
              id={`pi-stage-${item.id}`}
              type="button"
              role="tab"
              aria-selected={activeStage === index}
              aria-controls="pi-stage-panel"
              tabIndex={activeStage === index ? 0 : -1}
              onClick={() => setActiveStage(index)}
              onKeyDown={(event) => handleStageKeyDown(event, index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.short}</strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </nav>
      </section>

      {!isRunning && resultsList.length > 0 && (
        <div className="pi-complete-clause" role="status">
          <p><strong>Walkthrough complete.</strong> The receipt records labels, staged states, and limitations—not analysis.</p>
          <ProspectusAction onClick={reviewReceipt}>Review demonstration card</ProspectusAction>
        </div>
      )}

      <section ref={resultRef} className="pi-output-register" tabIndex={-1} aria-labelledby="pi-output-title">
        <header>
          <span>Output register / local session</span>
          <h2 id="pi-output-title">A result is a boundary before it is a number.</h2>
          <p>Every demonstration receipt states what the interface displayed and what it did not generate.</p>
        </header>

        {resultsList.length === 0 ? (
          <div className="pi-empty-receipt"><span>NO RECEIPT YET</span><p>Complete the interface walkthrough to create a local demonstration receipt.</p></div>
        ) : resultsList.map((result, index) => (
          <article className="pi-demonstration-receipt" key={`${result.timestamp}-${index}`}>
            <div className="pi-demo-mark"><strong>DEMO</strong><span>No model value generated</span></div>
            <div className="pi-demo-copy">
              <span>Interface simulation / {result.timestamp}</span>
              <h3>Presentation structure ready to inspect.</h3>
              <p>{result.summary}</p>
              <dl>
                <div><dt>Subject label</dt><dd>{result.patientId}</dd></div>
                <div><dt>Dataset label</dt><dd>{result.dataset}</dd></div>
                <div><dt>Cognitive-context label</dt><dd>{result.cognitiveBaseline}</dd></div>
                <div><dt>Calibration presentation</dt><dd>No calibration value is generated.</dd></div>
              </dl>
              <ProspectusAction onClick={() => exportResult(result)}>Export demonstration JSON</ProspectusAction>
            </div>
            <p className="pi-demo-boundary">Not a clinical result. No network features, calibration traces, or model artifacts were generated.</p>
          </article>
        ))}
      </section>

      <section className="pi-history" aria-labelledby="pi-history-title">
        <header><span>Provenance / this session</span><h2 id="pi-history-title">Walkthrough history</h2></header>
        {history.length === 0 ? <p className="pi-history-empty">No walkthrough history in this session.</p> : (
          <div className="pi-history-table-wrap" role="region" aria-label="Scroll walkthrough history table" tabIndex={0}>
            <table>
              <caption className="pa-sr-only">Interface walkthrough history for this browser session</caption>
              <thead><tr><th scope="col">Timestamp</th><th scope="col">Subject</th><th scope="col">Dataset</th><th scope="col">Cognitive context</th><th scope="col">Status</th></tr></thead>
              <tbody>{history.map((entry, index) => <tr key={`${entry.timestamp}-${index}`}><td>{entry.timestamp}</td><td>{entry.patientId}</td><td>{entry.dataset}</td><td>{entry.cognitiveBaseline}</td><td>{entry.status}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="pi-footer">
        <div><ProspectusMark className="pi-prospectus-mark" /><span>Proteus Arc</span></div>
        <p>Interface simulation only. No EEG analysis, model output, calibration, clinical validation, or diagnosis.</p>
        <Link to="/proteusarc/homepage">Read prospectus ↗</Link>
      </footer>
    </main>
  );
}

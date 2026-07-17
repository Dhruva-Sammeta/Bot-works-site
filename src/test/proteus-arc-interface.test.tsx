import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sanitizeSubjectReferenceForFilename } from "@/components/proteus/simulation";
import ProteusArcInterface from "@/pages/ProteusArcInterface";

const interfaceStyles = readFileSync(resolve(process.cwd(), "src/pages/proteus-interface.css"), "utf8");

function renderInterface() {
  return render(
    <MemoryRouter>
      <ProteusArcInterface />
    </MemoryRouter>,
  );
}

function relativeLuminance(rgb: string) {
  const values = rgb.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
  const [red, green, blue] = values.map((value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastAgainstBlack(rgb: string) {
  return (relativeLuminance(rgb) + 0.05) / 0.05;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return `rgb(${Number.parseInt(value.slice(0, 2), 16)}, ${Number.parseInt(value.slice(2, 4), 16)}, ${Number.parseInt(value.slice(4, 6), 16)})`;
}

describe("Proteus Arc research interface", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("exposes every transformation stage as a named keyboard tab", () => {
    renderInterface();

    expect(screen.getByRole("tab", { name: "01 SOURCE" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "02 TRACE" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "03 RELATION" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "04 TOPOLOGY" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "05 BOUNDARY" })).toBeInTheDocument();
  });

  it("keeps the quiet instrument token above WCAG AA contrast", () => {
    const color = interfaceStyles.match(/--pi-quiet:\s*(#[0-9a-f]{6})/i)?.[1] ?? "#000000";
    expect(contrastAgainstBlack(hexToRgb(color))).toBeGreaterThanOrEqual(4.5);
  });

  it("moves stage selection and focus with the keyboard without changing scroll", () => {
    renderInterface();
    const scrollTo = window.scrollTo as ReturnType<typeof vi.fn>;
    const source = screen.getByRole("tab", { name: "01 SOURCE" });
    const trace = screen.getByRole("tab", { name: "02 TRACE" });

    expect(scrollTo).not.toHaveBeenCalled();
    fireEvent.keyDown(source, { key: "ArrowRight" });
    expect(trace).toHaveAttribute("aria-selected", "true");
    expect(trace).toHaveFocus();
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("marks and focuses only the missing input", () => {
    renderInterface();
    const subject = screen.getByLabelText("Subject reference");
    const dataset = screen.getByLabelText("EEG dataset");
    const baseline = screen.getByLabelText("Cognitive baseline");

    fireEvent.change(subject, { target: { value: "sub-004" } });
    fireEvent.change(dataset, { target: { value: "eeg-session-02.edf" } });
    fireEvent.click(screen.getByRole("button", { name: "Start interface walkthrough" }));

    expect(subject).toHaveAttribute("aria-invalid", "false");
    expect(dataset).toHaveAttribute("aria-invalid", "false");
    expect(baseline).toHaveAttribute("aria-invalid", "true");
    expect(baseline).toHaveFocus();
    expect(screen.getByRole("alert")).toHaveTextContent("Enter cognitive baseline");
  });

  it("uses a nonnumeric fixture for calibration presentation", () => {
    vi.useFakeTimers();
    renderInterface();

    fireEvent.change(screen.getByLabelText("Subject reference"), { target: { value: "sub-004" } });
    fireEvent.change(screen.getByLabelText("EEG dataset"), { target: { value: "eeg-session-02.edf" } });
    fireEvent.change(screen.getByLabelText("Cognitive baseline"), { target: { value: "MMSE-24" } });
    fireEvent.click(screen.getByRole("button", { name: "Start interface walkthrough" }));

    act(() => { vi.advanceTimersByTime(5000); });
    fireEvent.click(screen.getByRole("button", { name: "Review demonstration card" }));

    expect(screen.getByText("DEMO")).toBeInTheDocument();
    expect(screen.getByText("No model value generated")).toBeInTheDocument();
    expect(screen.queryByText("0.87")).not.toBeInTheDocument();
    expect(screen.getAllByText(/No network features, calibration traces, or model artifacts were generated/)).toHaveLength(2);
    expect(screen.queryByText("Network features ready for review.")).not.toBeInTheDocument();
    expect(screen.getByText(/No calibration value is generated/)).toBeInTheDocument();
  });

  it("states that the walkthrough does not execute a model", () => {
    renderInterface();

    expect(screen.getByText(/No data or model is connected/)).toBeInTheDocument();
    expect(screen.queryByText("Trace a signal through the model.")).not.toBeInTheDocument();
    expect(screen.getByText("Start interface walkthrough")).toBeInTheDocument();
  });
});

describe("sanitizeSubjectReferenceForFilename", () => {
  it("removes path syntax and supplies a safe fallback", () => {
    expect(sanitizeSubjectReferenceForFilename("../../Subject 004 / raw")).toBe("Subject-004-raw");
    expect(sanitizeSubjectReferenceForFilename("***")).toBe("subject");
    expect(sanitizeSubjectReferenceForFilename("a".repeat(90))).toHaveLength(64);
  });
});

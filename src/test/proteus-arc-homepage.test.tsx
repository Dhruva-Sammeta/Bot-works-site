import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProteusArc from "@/pages/ProteusArc";

function renderHomepage() {
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  return render(<MemoryRouter><ProteusArc /></MemoryRouter>);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Proteus Arc public mandate", () => {
  it("explains the fundamental vision, access mission, and open-knowledge purpose", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /make the invisible course of alzheimer’s inspectable/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /specialist scarcity should not decide who gets seen/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /knowledge is infrastructure for future cures/i })).toBeInTheDocument();
    expect(screen.getByText(/does not promise a cure, diagnosis, or clinical access today/i)).toBeInTheDocument();
  });

  it("publishes an accessible ledger of EEG and AI questionnaire benefits, limitations, and proposed responses", () => {
    renderHomepage();

    const table = screen.getByRole("table", { name: /EEG and AI questionnaire evidence ledger/i });
    expect(within(table).getByRole("columnheader", { name: "Input" })).toBeInTheDocument();
    expect(within(table).getByRole("columnheader", { name: "Potential benefit" })).toBeInTheDocument();
    expect(within(table).getByRole("columnheader", { name: "Problem to solve" })).toBeInTheDocument();
    expect(within(table).getByRole("columnheader", { name: "Proposed Proteus response" })).toBeInTheDocument();
    expect(within(table).getByRole("row", { name: /EEG temporal dynamics.*millisecond.*spatial specificity.*channel and topology context/i })).toBeInTheDocument();
    expect(within(table).getByRole("row", { name: /AI questionnaire.*structured context.*recall and self-report bias.*source and uncertainty/i })).toBeInTheDocument();
    expect(within(table).getByRole("row", { name: /EEG \+ questionnaire.*multimodal context.*missing or misaligned inputs.*separate provenance receipts/i })).toBeInTheDocument();
  });

  it("makes the horizontally scrollable evidence ledger keyboard accessible", () => {
    renderHomepage();

    expect(screen.getByRole("region", { name: /scroll the eeg and ai questionnaire evidence table/i })).toHaveAttribute("tabindex", "0");
  });

  it("offers dedicated contact and downloadable brochure actions", () => {
    renderHomepage();

    expect(screen.getByRole("link", { name: /contact the proteus arc team/i })).toHaveAttribute("href", "/proteusarc/contact");
    expect(screen.getByRole("link", { name: /download the proteus arc brochure/i })).toHaveAttribute("href", "/proteusarc/proteus-arc-brochure.pdf");
    expect(screen.getByRole("link", { name: /download the proteus arc brochure/i })).toHaveAttribute("download");
  });

  it("keeps the GSAP scroll trace decorative and outside the accessibility tree", () => {
    const { container } = renderHomepage();
    expect(container.querySelector(".pa-folio-progress")).toHaveAttribute("aria-hidden", "true");
  });
});

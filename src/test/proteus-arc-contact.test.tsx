import { cleanup, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import ProteusArcContact from "@/pages/ProteusArcContact";

const contactStyles = readFileSync(resolve(process.cwd(), "src/pages/proteus-contact.css"), "utf8");

function renderContact() {
  return render(<MemoryRouter><ProteusArcContact /></MemoryRouter>);
}

afterEach(cleanup);

describe("Proteus Arc contact page", () => {
  it("provides an honest contact handoff and protects medical privacy", () => {
    renderContact();

    expect(screen.getByRole("heading", { name: /contact the proteus arc team/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email proteus arc/i })).toHaveAttribute("href", expect.stringMatching(/^mailto:nagapranayimmadi@gmail\.com\?subject=/));
    expect(screen.getByText(/do not send personal medical data, eeg files, or urgent care requests/i)).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("links back to the homepage and to the downloadable brochure", () => {
    renderContact();

    expect(screen.getByRole("link", { name: /return to the proteus arc homepage/i })).toHaveAttribute("href", "/proteusarc/homepage");
    expect(screen.getByRole("link", { name: /download the proteus arc brochure/i })).toHaveAttribute("href", "/proteusarc/proteus-arc-brochure.pdf");
  });

  it("defines the orange scrollbar on the html element without descendant-scoped variables", () => {
    expect(contactStyles).toContain("scrollbar-color: #ff5a36 #050505;");
  });
});

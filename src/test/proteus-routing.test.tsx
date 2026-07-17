import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ProteusRoutes } from "@/App";
import { usesNativeScroll } from "@/lib/proteus-routing";

beforeEach(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Proteus Arc routes", () => {
  it("uses native scrolling for every Proteus route and keeps Lenis for legacy routes", () => {
    expect(usesNativeScroll("/proteusarc/homepage")).toBe(true);
    expect(usesNativeScroll("/proteusarc/interface")).toBe(true);
    expect(usesNativeScroll("/proteusarc/contact")).toBe(true);
    expect(usesNativeScroll("/proteusarc")).toBe(true);
    expect(usesNativeScroll("/about")).toBe(false);
  });

  it("serves the public prospectus at the requested homepage path", async () => {
    render(<MemoryRouter initialEntries={["/proteusarc/homepage"]}><ProteusRoutes /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: "The IPO for Alzheimer’s." }, { timeout: 10_000 })).toBeInTheDocument();
  });

  it("serves the contact page and redirects the old Proteus root to the homepage", async () => {
    const { unmount } = render(<MemoryRouter initialEntries={["/proteusarc/contact"]}><ProteusRoutes /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: /contact the proteus arc team/i }, { timeout: 10_000 })).toBeInTheDocument();
    unmount();

    render(<MemoryRouter initialEntries={["/proteusarc"]}><ProteusRoutes /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: "The IPO for Alzheimer’s." }, { timeout: 10_000 })).toBeInTheDocument();
  });
});

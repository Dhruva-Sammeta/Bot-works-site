import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EvidenceField } from "@/components/proteus/EvidenceField";

type ResizeCallback = ResizeObserverCallback;
type IntersectionCallback = IntersectionObserverCallback;

const resizeCallbacks: ResizeCallback[] = [];
const intersectionCallbacks: IntersectionCallback[] = [];
const rafCallbacks = new Map<number, FrameRequestCallback>();
let nextFrameId = 0;
let reducedMotion = false;
let resizeDisconnect: ReturnType<typeof vi.fn>;
let intersectionDisconnect: ReturnType<typeof vi.fn>;

function canvasContextStub() {
  return new Proxy({}, {
    get(target, property) {
      if (property in target) return target[property as keyof typeof target];
      return vi.fn();
    },
    set(target, property, value) {
      Object.assign(target, { [property]: value });
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
}

function flushAnimationFrame(time = 16) {
  const next = rafCallbacks.entries().next().value as [number, FrameRequestCallback] | undefined;
  if (!next) return;
  const [id, callback] = next;
  rafCallbacks.delete(id);
  callback(time);
}

function setDocumentHidden(hidden: boolean) {
  Object.defineProperty(document, "hidden", { configurable: true, value: hidden });
  document.dispatchEvent(new Event("visibilitychange"));
}

describe("EvidenceField lifecycle", () => {
  beforeEach(() => {
    reducedMotion = false;
    nextFrameId = 0;
    resizeCallbacks.length = 0;
    intersectionCallbacks.length = 0;
    rafCallbacks.clear();
    resizeDisconnect = vi.fn();
    intersectionDisconnect = vi.fn();
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        matches: reducedMotion && query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      const id = ++nextFrameId;
      rafCallbacks.set(id, callback);
      return id;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
      rafCallbacks.delete(id);
    });
    vi.stubGlobal("ResizeObserver", class {
      constructor(callback: ResizeCallback) { resizeCallbacks.push(callback); }
      observe() {}
      unobserve() {}
      disconnect() { resizeDisconnect(); }
    });
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionCallback) { intersectionCallbacks.push(callback); }
      observe() {}
      unobserve() {}
      disconnect() { intersectionDisconnect(); }
      takeRecords() { return []; }
      root = null;
      rootMargin = "0px";
      thresholds = [0.01];
    });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => canvasContextStub());
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      x: 0, y: 0, top: 0, left: 0, right: 1000, bottom: 700, width: 1000, height: 700,
      toJSON: () => ({}),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    rafCallbacks.clear();
  });

  it("keeps one RAF owner across stage changes and visibility transitions", () => {
    const { rerender, unmount } = render(<EvidenceField mode="instrument" phase={0} />);

    expect(rafCallbacks.size).toBe(1);
    expect(resizeCallbacks).toHaveLength(1);
    expect(intersectionCallbacks).toHaveLength(1);
    flushAnimationFrame();
    expect(rafCallbacks.size).toBe(1);

    rerender(<EvidenceField mode="instrument" phase={3} />);
    expect(rafCallbacks.size).toBe(1);
    expect(resizeCallbacks).toHaveLength(1);
    expect(intersectionCallbacks).toHaveLength(1);

    intersectionCallbacks[0]([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(rafCallbacks.size).toBe(0);
    intersectionCallbacks[0]([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(rafCallbacks.size).toBe(1);

    setDocumentHidden(true);
    expect(rafCallbacks.size).toBe(0);
    setDocumentHidden(false);
    expect(rafCallbacks.size).toBe(1);

    unmount();
    expect(rafCallbacks.size).toBe(0);
    expect(resizeDisconnect).toHaveBeenCalledOnce();
    expect(intersectionDisconnect).toHaveBeenCalledOnce();
  });

  it("renders statically without queuing RAF under reduced motion", () => {
    reducedMotion = true;
    const { container, rerender, unmount } = render(<EvidenceField mode="instrument" phase={0} />);

    expect(rafCallbacks.size).toBe(0);
    rerender(<EvidenceField mode="instrument" phase={4} />);
    resizeCallbacks[0]([], {} as ResizeObserver);
    intersectionCallbacks[0]([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    fireEvent.pointerMove(container.firstElementChild as Element, { clientX: 500, clientY: 350 });
    expect(rafCallbacks.size).toBe(0);

    unmount();
    expect(rafCallbacks.size).toBe(0);
  });
});

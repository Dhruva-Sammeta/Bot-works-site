import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import logoSrc from "@/assets/logo.png";

interface AssetState {
  globeData: any | null;
  isLoaded: boolean;
  progress: number;
}

const AssetContext = createContext<AssetState>({ globeData: null, isLoaded: false, progress: 0 });

export const useAssets = () => useContext(AssetContext);

const GLOBE_CACHE_KEY = "h4s_globe_geojson_v2";
const GLOBE_URL = "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";

async function fetchGlobeData(): Promise<any> {
  // Try Cache API first (better than localStorage for large data)
  if ("caches" in window) {
    try {
      const cache = await caches.open("h4s-assets-v1");
      const cached = await cache.match(GLOBE_URL);
      if (cached) return cached.json();
    } catch {}
  }

  // Fallback: localStorage
  try {
    const cached = localStorage.getItem(GLOBE_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}

  const res = await fetch(GLOBE_URL);
  if (!res.ok) throw new Error("Failed to fetch globe data");
  const data = await res.json();

  // Store in Cache API
  if ("caches" in window) {
    try {
      const cache = await caches.open("h4s-assets-v1");
      await cache.put(GLOBE_URL, new Response(JSON.stringify(data)));
    } catch {}
  }

  // Fallback store
  try {
    localStorage.setItem(GLOBE_CACHE_KEY, JSON.stringify(data));
  } catch {}

  return data;
}

export function AssetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssetState>({ globeData: null, isLoaded: false, progress: 0 });

  const load = useCallback(async () => {
    const tasks: Promise<void>[] = [];
    let completed = 0;
    const total = 3;

    const tick = () => {
      completed++;
      setState((s) => ({ ...s, progress: Math.round((completed / total) * 100) }));
    };

    // 1. Fonts
    tasks.push(document.fonts.ready.then(() => tick()));

    // 2. Preload Logo Image
    tasks.push(
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = logoSrc;
        let fired = false;
        const done = () => { if (fired) return; fired = true; tick(); resolve(); };
        img.onload = done;
        img.onerror = done;
        setTimeout(done, 2000);
      })
    );

    // 3. Globe GeoJSON
    let globeData: any = null;
    tasks.push(
      fetchGlobeData()
        .then((d) => { globeData = d; tick(); })
        .catch(() => tick())
    );

    await Promise.all(tasks);
    setState({ globeData, isLoaded: true, progress: 100 });
  }, []);

  useEffect(() => { load(); }, [load]);

  return <AssetContext.Provider value={state}>{children}</AssetContext.Provider>;
}

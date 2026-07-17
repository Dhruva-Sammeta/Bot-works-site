import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { usesNativeScroll } from "@/lib/proteus-routing";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProteusArc = lazy(() => import("./pages/ProteusArc"));
const ProteusArcContact = lazy(() => import("./pages/ProteusArcContact"));
const ProteusArcInterface = lazy(() => import("./pages/ProteusArcInterface"));
const LegacyAppShell = lazy(() => import("./components/LegacyAppShell"));

export function ProteusRoutes() {
  return (
    <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/proteusarc" element={<Navigate to="/proteusarc/homepage" replace />} />
        <Route path="/proteusarc/homepage" element={<ProteusArc />} />
        <Route path="/proteusarc/contact" element={<ProteusArcContact />} />
        <Route path="/proteusarc/interface" element={<ProteusArcInterface />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function RouteBoundary() {
  const location = useLocation();
  if (usesNativeScroll(location.pathname)) return <ProteusRoutes />;
  return (
    <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page" />}>
      <LegacyAppShell><ProteusRoutes /></LegacyAppShell>
    </Suspense>
  );
}

const App = () => (
  <BrowserRouter>
    <RouteBoundary />
  </BrowserRouter>
);

export default App;

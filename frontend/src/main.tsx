import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { GeochronologicalFilters } from "./layouts/geochronological-filters.tsx";
import { Home } from "./pages/home.tsx";
import { Dashboard } from "./pages/dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, 
        pointerEvents: "none", 
      }}
    >
      <iframe
        title="background-map"
        src={`https://www.google.com/maps?output=embed`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          filter: "brightness(0.7) contrast(0.9) saturate(0.9)", 
        }}
        allowFullScreen
      />
    </div>

    <BrowserRouter>
      <Routes>
        <Route element={<GeochronologicalFilters />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

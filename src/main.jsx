import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Website from "./components/Website.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ColorTemplatePage from "./components/ColorTemplatePage.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/site-structure" element={<Website />} />
      <Route path="/color-template" element={<ColorTemplatePage />} />
    </Routes>
  </BrowserRouter>
);

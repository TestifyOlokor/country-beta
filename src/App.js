import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/theme-context.ts";
import LandingPage from "./components/landing-page";
import Country from "./components/country";
import "./App.css";

function App() {
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaultDark() ? "light" : "dark";
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LandingPage theme={theme} setTheme={setTheme} />}
          />
          <Route
            path="countries/:id"
            element={<Country theme={theme} setTheme={setTheme} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;

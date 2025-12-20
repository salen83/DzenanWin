import React, { useState } from "react";
import "./App.css";

import { MatchesProvider } from "./MatchesContext";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("screen1");

  return (
    <MatchesProvider>
      <div className="container">
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => setCurrentScreen("screen1")}>Završeni mečevi</button>
          <button onClick={() => setCurrentScreen("screen2")}>Statistika</button>
          <button onClick={() => setCurrentScreen("screen3")}>Mozzart ponuda</button>
          <button onClick={() => setCurrentScreen("screen4")}>Prognoza – metoda 1</button>
        </div>

        {currentScreen === "screen1" && <Screen1 />}
        {currentScreen === "screen2" && <Screen2 />}
        {currentScreen === "screen3" && <Screen3 />}
        {currentScreen === "screen4" && <Screen4 />}
      </div>
    </MatchesProvider>
  );
}

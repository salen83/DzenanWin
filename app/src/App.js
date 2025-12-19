import React, { useState } from "react";
import "./App.css";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import { MatchesContext } from "./MatchesContext";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("screen1");
  const [rows, setRows] = useState([]);

  return (
    <MatchesContext.Provider value={{ rows, setRows }}>
      <div className="container">
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => setCurrentScreen("screen1")}>Završeni mečevi</button>
          <button onClick={() => setCurrentScreen("screen2")}>Statistika</button>
          <button onClick={() => setCurrentScreen("screen3")}>Mozzart ponuda</button>
          <button onClick={() => setCurrentScreen("screen4")}>Screen 4</button>
          <button onClick={() => setCurrentScreen("screen5")}>Screen 5</button>
          <button onClick={() => setCurrentScreen("screen6")}>Screen 6</button>
          <button onClick={() => setCurrentScreen("screen7")}>Screen 7</button>
          <button onClick={() => setCurrentScreen("screen8")}>Screen 8</button>
          <button onClick={() => setCurrentScreen("screen9")}>Screen 9</button>
          <button onClick={() => setCurrentScreen("screen10")}>Screen 10</button>
        </div>

        {currentScreen === "screen1" && <Screen1 />}
        {currentScreen === "screen2" && <Screen2 />}
        {currentScreen === "screen3" && <Screen3 />}
      </div>
    </MatchesContext.Provider>
  );
}

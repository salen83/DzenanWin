import React, { useState } from "react";
import "./App.css";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";
import Screen5 from "./Screen5";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("screen1");

  return (
    <div className="container">
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCurrentScreen("screen1")}>Završeni mečevi</button>
        <button onClick={() => setCurrentScreen("screen2")}>Statistika</button>
        <button onClick={() => setCurrentScreen("screen3")}>Mozzart ponuda</button>
        <button onClick={() => setCurrentScreen("screen4")}>Predikcije</button>
        <button onClick={() => setCurrentScreen("screen5")}>Rangiranje</button>
      </div>

      {currentScreen === "screen1" && <Screen1 />}
      {currentScreen === "screen2" && <Screen2 />}
      {currentScreen === "screen3" && <Screen3 />}
      {currentScreen === "screen4" && <Screen4 />}
      {currentScreen === "screen5" && <Screen5 />}
    </div>
  );
}

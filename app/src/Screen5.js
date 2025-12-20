import React, { useContext, useMemo, useState } from "react";
import { MatchesContext } from "./MatchesContext";

/*
 Screen5:
 - samo čita podatke
 - rangira mečeve po verovatnoći
 - NEMA unosa
*/

export default function Screen5() {
  const { predictions } = useContext(MatchesContext);
  const [mode, setMode] = useState("gg"); // gg | ng | over2

  const sorted = useMemo(() => {
    if (!Array.isArray(predictions)) return [];

    const key =
      mode === "gg" ? "ggProb" :
      mode === "ng" ? "ngProb" :
      "over2Prob";

    return [...predictions].sort((a, b) => (b[key] || 0) - (a[key] || 0));
  }, [predictions, mode]);

  return (
    <div className="container">
      <h1>Rangiranje mečeva</h1>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setMode("gg")}>Rang GG</button>
        <button onClick={() => setMode("ng")} style={{ marginLeft: "10px" }}>
          Rang NG
        </button>
        <button onClick={() => setMode("over2")} style={{ marginLeft: "10px" }}>
          Rang 2+
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Vreme</th>
            <th>Domaćin</th>
            <th>Gost</th>
            <th>GG %</th>
            <th>NG %</th>
            <th>2+ %</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => (
            <tr key={i}>
              <td>{m.time}</td>
              <td>{m.home}</td>
              <td>{m.away}</td>
              <td>{m.ggProb?.toFixed(1) ?? 0}%</td>
              <td>{m.ngProb?.toFixed(1) ?? 0}%</td>
              <td>{m.over2Prob?.toFixed(1) ?? 0}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

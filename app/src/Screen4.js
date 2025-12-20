import React, { useContext, useEffect, useState } from "react";
import { MatchesContext } from "./MatchesContext"; // koristi isti context kao Screen3

export default function Screen4() {
  const { futureMatches } = useContext(MatchesContext); // futureMatches = mečevi iz Screen3
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (!futureMatches) return;

    const calcPredictions = futureMatches.map(match => {
      // Ovde ide logika prve, najlakše metode predikcije GG/NG/2+
      // Primer: GG = 50%, NG = 50%, 2+ = 60%
      return {
        time: match.time,
        home: match.home,
        away: match.away,
        gg: 50,   // procenat
        ng: 50,
        over2: 60
      };
    });

    setPredictions(calcPredictions);
  }, [futureMatches]);

  return (
    <div className="container">
      <h1>Predviđanja (Metoda 1)</h1>
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
          {predictions.map((row, idx) => (
            <tr key={idx}>
              <td>{row.time}</td>
              <td>{row.home}</td>
              <td>{row.away}</td>
              <td>{row.gg}%</td>
              <td>{row.ng}%</td>
              <td>{row.over2}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

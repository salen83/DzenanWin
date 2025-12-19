import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const columns = ["time", "home", "away", "full", "ht", "sh"];

export default function App() {
  const [rows, setRows] = useState([]);
  const pasteRef = useRef(null);
  const pastePosition = useRef({ row: 0, col: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("matches");
    if (saved) setRows(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("matches", JSON.stringify(rows));
  }, [rows]);

  const emptyRow = () => ({
    time: "", home: "", away: "", full: "", ht: "", sh: ""
  });

  const focusPaste = (r, c) => {
    pastePosition.current = { row: r, col: c };
    pasteRef.current.focus();
  };

  const handlePaste = e => {
    const text = e.target.value;
    if (!text) return;

    const lines = text.trim().split(/\r?\n/);
    const newRows = [...rows];
    const { row, col } = pastePosition.current;

    lines.forEach((line, i) => {
      const values = line.split("\t");
      const rIndex = row + i;

      if (!newRows[rIndex]) newRows[rIndex] = emptyRow();

      values.forEach((val, j) => {
        const key = columns[col + j];
        if (key) newRows[rIndex][key] = val;
      });
    });

    setRows(newRows);
    e.target.value = "";
  };

  const updateCell = (r, key, val) => {
    const copy = [...rows];
    copy[r][key] = val;
    setRows(copy);
  };

  const deleteRow = r => {
    const copy = [...rows];
    copy.splice(r, 1);
    setRows(copy);
  };

  return (
    <div className="container">
      <h1>Završeni mečevi</h1>
      <button onClick={() => setRows([...rows, emptyRow()])}>Dodaj red</button>

      {/* ANDROID PASTE INPUT */}
      <textarea
        ref={pasteRef}
        onChange={handlePaste}
        style={{
          position: "absolute",
          opacity: 0,
          height: 0,
          width: 0
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Vreme</th>
            <th>Domaćin</th>
            <th>Gost</th>
            <th>Ukupan</th>
            <th>HT</th>
            <th>SH</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {columns.map((col, c) => (
                <td key={c}>
                  <input
                    value={row[col]}
                    onChange={e => updateCell(r, col, e.target.value)}
                    onFocus={() => focusPaste(r, c)}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => deleteRow(r)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

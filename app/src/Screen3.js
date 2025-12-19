import React, { useState, useRef } from "react";

const columns = ["time", "home", "away"];

export default function Screen3() {
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem("futureMatches");
    return saved ? JSON.parse(saved) : [];
  });

  const pasteRef = useRef(null);
  const pastePosition = useRef({ row: 0, col: 0 });

  const emptyRow = () => ({ time: "", home: "", away: "" });

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

  const addRow = () => setRows([...rows, emptyRow()]);

  const updateCell = (index, key, value) => {
    const copy = [...rows];
    copy[index][key] = value;
    setRows(copy);
  };

  const deleteRow = index => {
    const copy = [...rows];
    copy.splice(index, 1);
    setRows(copy);
  };

  const deleteAll = () => setRows([]);

  React.useEffect(() => {
    localStorage.setItem("futureMatches", JSON.stringify(rows));
  }, [rows]);

  return (
    <div className="container">
      <h1>Mozzart ponuda</h1>
      <button onClick={addRow}>Dodaj red</button>
      <button onClick={deleteAll} style={{ marginLeft: "10px" }}>Obriši sve</button>

      {/* ANDROID PASTE INPUT */}
      <textarea
        ref={pasteRef}
        onChange={handlePaste}
        style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
      />

      <table>
        <thead>
          <tr>
            <th>Vreme</th>
            <th>Domaćin</th>
            <th>Gost</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {(rows || []).map((row, r) => (
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

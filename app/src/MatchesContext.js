import React, { createContext, useState, useEffect } from "react";

export const MatchesContext = createContext();

export function MatchesProvider({ children }) {
  // SCREEN1 - zavrseni mecevi
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("matches");
    if (saved) setRows(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("matches", JSON.stringify(rows));
  }, [rows]);

  // SCREEN3 - budući mečevi
  const [futureRows, setFutureRows] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("futureMatches");
    if (saved) setFutureRows(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("futureMatches", JSON.stringify(futureRows));
  }, [futureRows]);

  return (
    <MatchesContext.Provider value={{ rows, setRows, futureRows, setFutureRows }}>
      {children}
    </MatchesContext.Provider>
  );
}

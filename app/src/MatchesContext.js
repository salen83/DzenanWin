import React, { createContext, useState, useEffect } from "react";

export const MatchesContext = createContext([]);

export const MatchesProvider = ({ children }) => {
  const [rows, setRows] = useState([]);

  // Učitavanje iz localStorage pri startu
  useEffect(() => {
    const saved = localStorage.getItem("matches");
    if (saved) setRows(JSON.parse(saved));
  }, []);

  // Čuvanje u localStorage kad god se rows promeni
  useEffect(() => {
    localStorage.setItem("matches", JSON.stringify(rows));
  }, [rows]);

  return (
    <MatchesContext.Provider value={{ rows, setRows }}>
      {children}
    </MatchesContext.Provider>
  );
};

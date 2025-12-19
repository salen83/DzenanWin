import React from "react";
import "./App.css";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import { MatchesProvider } from "./MatchesContext";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <MatchesProvider>
      <Router>
        <div className="container">
          <h1>Fudbalska aplikacija</h1>
          <div className="nav-buttons">
            <Link to="/screen1"><button>Završeni mečevi</button></Link>
            <Link to="/screen2"><button>Statistika</button></Link>
            <Link to="/screen3"><button>Screen 3</button></Link>
            <Link to="/screen4"><button>Screen 4</button></Link>
            <Link to="/screen5"><button>Screen 5</button></Link>
            <Link to="/screen6"><button>Screen 6</button></Link>
            <Link to="/screen7"><button>Screen 7</button></Link>
            <Link to="/screen8"><button>Screen 8</button></Link>
            <Link to="/screen9"><button>Screen 9</button></Link>
            <Link to="/screen10"><button>Screen 10</button></Link>
          </div>
          <Routes>
            <Route path="/screen1" element={<Screen1 />} />
            <Route path="/screen2" element={<Screen2 />} />
            {/* Ostali screenovi */}
          </Routes>
        </div>
      </Router>
    </MatchesProvider>
  );
}

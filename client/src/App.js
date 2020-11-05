import React, { useState } from "react";
import "./styles/styles.css";

import Calculator from "./components/layout/Calculator";
import Results from "./components/layout/Results";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <Calculator results={results} setResults={setResults} />
      <Results results={results} />
    </div>
  );
}

export default App;

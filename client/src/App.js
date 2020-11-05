import React, { useState, useEffect } from "react";
import config from "./config";
import "./styles/styles.css";

import Calculator from "./components/layout/Calculator";
import Results from "./components/layout/Results";

function App() {
  const [results, setResults] = useState([]);

  const handleResults = (result) => {
    setResults(result);
  };

  return (
    <div className="App">
      <Calculator
        handleResults={handleResults}
        results={results}
        setResults={setResults}
      />
      <Results
        results={results}
        setResults={setResults}
        handleResults={handleResults}
      />
    </div>
  );
}

export default App;

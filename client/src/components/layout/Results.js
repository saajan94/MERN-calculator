import React from "react";

const Results = (props) => {
  return (
    <div className="results">
      <h1>Calculations</h1>
      <div className="border"></div>
      {props.results.map((result, index) => {
        return <h2 key={index}>{result.calculation}</h2>;
      })}
    </div>
  );
};

export default Results;

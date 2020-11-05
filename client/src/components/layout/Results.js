import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000/");

const Results = (props) => {
  useEffect(() => {}, [props.results]);
  // useEffect(() => {
  //   socket.on("calculations", (data) => {
  //     props.setResults([...props.results, data]);
  //     console.log(props.results);
  //   });
  // }, [props.results, props]);

  // useEffect(() => {
  //   socket.on("new-calculation", (data) => {
  //     if (calcList.length === 10) calcList.shift();
  //     setCalcList(...calcList, data);
  //     // handleResults(...calcList, data);
  //     console.log(calcList);
  //   });
  // }, [handleResults, calcList]);

  console.log(props.results);
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

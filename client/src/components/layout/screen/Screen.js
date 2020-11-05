import React from "react";

const ResultScreen = (props) => {
  return <div className="result-screen">{props.children}</div>;
};

const ComputationScreen = (props) => (
  <div className="computation-screen">{props.children}</div>
);

const Screen = (props) => {
  return (
    <div className="screen">
      <ResultScreen>{props.expression}</ResultScreen>
      <ComputationScreen></ComputationScreen>
    </div>
  );
};

export default Screen;

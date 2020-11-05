import React from "react";

import NumberPadRow from "./NumberPadRow";
import Button from "./Button";

const NumberPad = (props) => {
  return (
    <div className="numberpad">
      <NumberPadRow>
        <Button btnValue={"C"} onClick={() => props.handleButtonPress("C")} />
        <Button
          btnValue={"\xB1"}
          onClick={() => props.handleButtonPress("\xB1")}
        />
        <Button btnValue={"%"} onClick={() => props.handleButtonPress("%")} />
        <Button btnValue={"/"} onClick={() => props.handleButtonPress("/")} />
      </NumberPadRow>
      <NumberPadRow>
        <Button btnValue={9} onClick={() => props.handleButtonPress(9)} />
        <Button btnValue={8} onClick={() => props.handleButtonPress(8)} />
        <Button btnValue={7} onClick={() => props.handleButtonPress(7)} />
        <Button btnValue={"*"} onClick={() => props.handleButtonPress("*")} />
      </NumberPadRow>
      <NumberPadRow>
        <Button btnValue={6} onClick={() => props.handleButtonPress(6)} />
        <Button btnValue={5} onClick={() => props.handleButtonPress(5)} />
        <Button btnValue={4} onClick={() => props.handleButtonPress(4)} />
        <Button btnValue={"-"} onClick={() => props.handleButtonPress("-")} />
      </NumberPadRow>
      <NumberPadRow>
        <Button btnValue={3} onClick={() => props.handleButtonPress(3)} />
        <Button btnValue={2} onClick={() => props.handleButtonPress(2)} />
        <Button btnValue={1} onClick={() => props.handleButtonPress(1)} />
        <Button btnValue={"+"} onClick={() => props.handleButtonPress("+")} />
      </NumberPadRow>
      <NumberPadRow>
        <Button btnValue={0} onClick={() => props.handleButtonPress(0)} />
        <Button btnValue={"."} onClick={() => props.handleButtonPress(".")} />
        <Button
          btnValue={"="}
          type="large"
          onClick={() => props.handleButtonPress("=")}
        />
      </NumberPadRow>
    </div>
  );
};

export default NumberPad;

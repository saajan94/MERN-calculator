import React from "react";

const Button = (props) => {
  const classes = ["btn"];
  if (typeof props !== "undefined" && typeof props.type !== "undefined")
    classes.push("btn--" + props.type);

  return (
    <button
      className={classes.join(" ")}
      onClick={() => props.onClick(props.btnValue)}
    >
      {props.btnValue}
    </button>
  );
};

export default Button;

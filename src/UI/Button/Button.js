import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => {
  const style = [classes.Button];
  switch (props.type) {
    case "positive":
      style.push(classes.Positive);
      break;
    case "negative":
      style.push(classes.Negative);
      break;
    case "cta":
      style.push(classes.Positive);
      style.push(classes.CTA);
      break;
    default:
      style.push(classes.Neutral);
  }

  if (props.fillWidth) {
    style.push(classes.FillWidth);
  }

  if (props.disabled) {
    style.push(classes.Disabled);
  }

  return (
    <div className={style.join(" ")} onClick={props.onClick}>
      <h5>{props.value}</h5>
    </div>
  );
};

export default Button;

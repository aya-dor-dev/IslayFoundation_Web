import React from "react";
import classes from "./Input.module.scss";


const Input = (props: any) => {
  const overrideStyle = props.style ?? {};

  return (
    <div className={classes.InputField} style={overrideStyle}>
      <h5>{props.title}</h5>
      {props.children ? props.children : <input value="" {...props} />}
      <p className={classes.ErrorMessage}>{props.error}</p>
    </div>
  );
};

export default Input;

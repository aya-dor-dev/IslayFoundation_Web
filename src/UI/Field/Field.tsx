import React, {FunctionComponent} from "react";
import classes from "./Field.module.scss";

type FieldProps = {
  value: string,
  title: string,
  className?: any
}

const Field: FunctionComponent<FieldProps> = ({value, title, className, children}) => {
  const style = [classes.Field];
  if (className) {
    style.push(className);
  }
  return (
    <div className={style.join(" ")}>
      <p className={classes.Value}>{value}</p>
      <p className={classes.Title}>{title}</p>
      {children}
    </div>
  );
};

export default Field;

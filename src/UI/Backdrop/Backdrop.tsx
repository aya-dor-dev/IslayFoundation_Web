import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import classes from "./Backdrop.module.scss";
const animationTiming = {
  enter: 300,
  exit: 300,
};
const backdrop = (props: {show: boolean, onClick?: () => void}) => (
  <CSSTransition
    in={props.show}
    mountOnEnter
    unmountOnExit
    timeout={animationTiming}
    classNames={{
      enterActive: classes["backdrop-in-enter-active"],
      exitActive: classes["backdrop-in-exit-active"],
    }}
  >
    <div className={classes.Backdrop} onClick={props.onClick}></div>
  </CSSTransition>
);

export default backdrop;

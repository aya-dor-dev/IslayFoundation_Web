import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import Backdrop from "../Backdrop/Backdrop";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./SideDrawer.module.scss";

const animationTiming = {
  enter: 300,
  exit: 300,
};

const sideDrawer = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} onClick={props.close} />
      <CSSTransition
        in={props.show}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: classes["slide-in-enter-active"],
          exitActive: classes["slide-in-exit-active"],
        }}
      >
        <div className={classes.Container}>
          <div className={classes.SideDrawer}>
            <FontAwesomeIcon
              icon={faTimes}
              className={classes.CloseButton}
              onClick={props.close}
            />
            <div className={classes.Content}>{props.children}</div>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default sideDrawer;

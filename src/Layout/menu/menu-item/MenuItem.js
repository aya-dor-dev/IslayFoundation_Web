import React from "react";
import classes from "./MenuItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, withRouter } from "react-router-dom";

const MenuItem = (props) => {
  const style = [classes.MenuItem];
  if (
    props.history.location.pathname === props.link ||
    (!props.exact && props.history.location.pathname.startsWith(props.link))
  ) {
    style.push(classes.MenuItemSelected);
  }
  return (
    <NavLink to={props.link}>
      <li className={style.join(" ")}>
        <div className={classes.Icon}>
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <span className={classes.Content}>{props.children}</span>
      </li>
    </NavLink>
  );
};

export default withRouter(MenuItem);

import React from "react";
import Card from "../../UI/Card/Card";
import classes from "./investor.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Field from "../../UI/Field/Field";
import { Investor } from "../store/types";

const investor = (props: Investor) => {
  return (
    <Card>
      <div className={classes.Investor}>
        <div className={classes.ProfilePhotoContainer}>
          <div className={classes.ProfilePhoto}>
            <FontAwesomeIcon className={classes.UserIcon} icon={faUser} />
          </div>
        </div>
        <Field value={props.name} title={props.email ?? ''} />
        <Field value={`£${props.invested}`} title="Invested" />
        <Field value={`£${props.withdrawen}`} title="Withdrawen" />
      </div>
    </Card>
  );
};

export default investor;

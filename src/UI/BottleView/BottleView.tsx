import React from "react";
import { IBottle } from "../../bottles/store/types";
import classes from "./BottleView.module.scss";
import sharedClasses from "../../sharedStyles.module.scss";

const BottleView = (props: { bottle: IBottle; investorName?: string}) => {
  return (
    <div className={classes.BottleCell}>
      <div className={classes.RoundedImage}>
        <img src={props.bottle.imageUrl} alt="" />
      </div>
      <div className={classes.BottleInfo}>
        <span className={classes.Name}>{props.bottle.name}</span>
        <span className={sharedClasses.Subtext}>{props.investorName}</span>
      </div>
    </div>
  );
};

export default BottleView;

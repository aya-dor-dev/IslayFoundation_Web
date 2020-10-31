import React from "react";
import classes from "./InfoCard.module.scss";

type InfoCardProps = {
  name: string;
  cta?: boolean;
  selected?: boolean;
  onClick?: () => void;
  positive?: boolean;
}

const InfoCard = (props: React.PropsWithChildren<InfoCardProps>) => {
  const style = [classes.InfoCard];
  if (props.cta) {
    style.push(classes.CTA);
  }
  if (props.selected) {
    style.push(classes.Selected);
  }
  if (props.onClick) {
    style.push(classes.Selectable);
  }

  const valueStyle = [classes.Value]
  if (props.positive !== undefined) {
    valueStyle.push(props.positive ? classes.Positive : classes.Negative);
  }

  return (
    <div className={style.join(" ")} onClick={props.onClick}>
      <h1 className={valueStyle.join(" ")}>{props.children}</h1>
      <p className={classes.Key}>{props.name}</p>
    </div>
  );
};

export default InfoCard;



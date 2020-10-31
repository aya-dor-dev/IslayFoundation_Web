import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../../store/rootReducer";
import Card from '../../UI/Card/Card';
import Field from "../../UI/Field/Field";
import { Bottle, BOTTLE_STATE } from '../store/types';
import classes from "./BottleListItem.module.scss";

const BottleListItem = (props: {bottle: Bottle, editBottle: Function}) => {
  const { name, cost, state, purchaseDate, imageUrl, soldFor, ownerId } = props.bottle;
  const inventory = useSelector((state: RootState) => state.inventory.data);
  
  let ownerName = "" 
  if (inventory) {
    ownerName = inventory.investors.filter((el) => el.id === ownerId)[0].name
  }
  const menuButton = (
    <FontAwesomeIcon className={classes.Menu} icon={faEllipsisV} />
  );

  return (
    <Card>
    <div className={classes.Bottle} onClick={() => props.editBottle()}>
      {state === BOTTLE_STATE.SOLD ? <h5 className={classes.Label}>SOLD</h5> : menuButton}
      <img src={imageUrl} className={classes.Image} alt="" />
      <h5 className={classes.Name}>{name}</h5>
      <Field
        className={classes.PurchasedBy}
        title="Purchased by"
        value={ownerName}
      ></Field>
      <Field
        className={classes.PurchaseDate}
        title="Purchase date"
        value={purchaseDate ? new Date(purchaseDate).toLocaleDateString() : "-"}
      ></Field>
      <Field
        className={classes.PurchasePrice}
        title="Purchase price"
        value={`£${cost}`}
      ></Field>
      <Field
        className={classes.Auction}
        title="Auction"
        value="Scotch Whisky Auctions - 108"
      ></Field>
      <Field className={classes.Lot} title="Lot" value="108-24122"></Field>
      <Field
        className={classes.SoldFor}
        title="Sold for"
        value={soldFor ? `£${soldFor}` : "-"}
      ></Field>
    </div>
    </Card>
  );
};

export default React.memo(BottleListItem, (prevProps, nextProps) => prevProps.bottle === nextProps.bottle);

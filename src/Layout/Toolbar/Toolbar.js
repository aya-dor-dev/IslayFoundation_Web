import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./Toolbar.module.scss";

const Toolbar = (props) => {
  const inventories = useSelector((state) => state.session.inventories);

  const inventoriesSelector = (
    <select
      className={classes.InventorySelector}
      name="inventories"
      id="inventories"
      onChange={(event) => props.history.push(`/inventory/${event.target.value}/overview`)}
      defaultValue={props.match.params.inventoryId}
    >
      {inventories.map((inventory) => (
        <option key={inventory.id} value={inventory.id} >{inventory.name}</option>
      ))}
    </select>
  );

  const style = [classes.Toolbar];
  if (props.className) {
    style.push(props.className)
  }
  return <div className={style.join(' ')}>{inventoriesSelector}</div>;
};

export default withRouter(Toolbar);

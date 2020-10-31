import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/images/logo.png";
import classes from "./InventorySelector.module.scss";

const InventorySelector = () => {
  const { inventories, selectedInventory } = useSelector(
    (state) => state.session
  );
  let inventorySelector = null;
  if (inventories && inventories.length > 0) {
    const options = inventories.map((inventory) => (
      <option value={inventory.id}>{inventory.name}</option>
    ));
    inventorySelector = (
      <select
        className={classes.InventorySelector}
        name="inventories"
        id="inventories"
      >
        {options}
      </select>
    );
  }
  return (
    <div className={classes.Container}>
      <div className={classes.Logo}>
        <img src={Logo} alt="Logo" />
      </div>
      {inventorySelector}
    </div>
  );
};

export default React.memo(
  InventorySelector,
  (prev, next) =>
    prev.selectedInventory === next.selectedInventory &&
    prev.inventories === next.inventories
);

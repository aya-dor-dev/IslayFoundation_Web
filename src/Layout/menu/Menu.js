import React from "react";
import classes from "./Menu.module.scss";
import MenuItem from "./menu-item/MenuItem";
import {
  faGavel,
  faUsers,
  faWineBottle,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
const Menu = (props) => {
  const inventoryId = props.match.params.inventoryId;
  const root = `/inventory/${inventoryId}`;
  return (
    <ul className={classes.Menu}>
      <MenuItem {...props} icon={faHome} link={`${root}/overview`}>
        Overview
      </MenuItem>
      <MenuItem {...props} icon={faGavel} link={`${root}/auctions`}>
        Auctions
      </MenuItem>
      <MenuItem {...props} icon={faWineBottle} link={`${root}/bottles`}>
        Bottles
      </MenuItem>
      <MenuItem {...props} icon={faUsers} link={`${root}/investors`}>
        Investors
      </MenuItem>
    </ul>
  );
};

export default Menu;

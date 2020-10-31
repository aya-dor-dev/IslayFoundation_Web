import PropTypes from "prop-types";
import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CreateInventory from "./create-inventory/CreateInventory";

const InventoriesList = (props) => {
  // const dispatch = useDispatch();
  // const { loading, inventories, error } = useSelector(
    // (state) => state.inventories
  // );
  // const token = useSelector((state) => state.session.token);
  const [createInventory, setCreateInventory] = useState(false);

  // useEffect(() => {
  //   if (props.inventoriesIds && props.inventoriesIds.length > 0) {
  //     dispatch(getAllInventories(token, props.inventoriesIds));
  //   }
  // }, [props.inventoriesIds, dispatch, token]);

  const items = props.inventories.map((inventory) => (
    <p key={inventory.id} onClick={() => props.history.push(`/inventory/${inventory.id}/overview`)}>{inventory.name}</p>
  ));
  items.push(
    <Button
      key="create"
      type="cta"
      value="Create Inventory"
      onClick={() => setCreateInventory(true)}
    />
  );

  const modal = (
    <Modal
      close={() => setCreateInventory(false)}
      show={createInventory}
      title="CREATE YOUR FIRST INVENTORY"
    >
      <CreateInventory close={() => setCreateInventory(false)} inventories={props.inventories} />
    </Modal>
  );

  return (
    <div>
      {modal}
      {items}
    </div>
  );
};

InventoriesList.propTypes = {
  inventoriesIds: PropTypes.arrayOf(PropTypes.string),
};

export default withRouter(React.memo(
  InventoriesList,
  (prevProps, nextProps) =>
    prevProps.inventories.length === nextProps.inventories.length
));

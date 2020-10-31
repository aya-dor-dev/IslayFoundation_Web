import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
//import { createNewInventory, createNewInventoryInit } from "../actions";
import classes from "./CreateInventory.module.scss";
import PropTypes from "prop-types";



const CreateInventory = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(createNewInventoryInit());
  }, [dispatch]);

  const { token, userId } = useSelector((state) => state.session);
  const { savingInventory, inventorySaved, inventorySaveError } = useSelector(
    (state) => state.inventory
  );

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);

  if (inventorySaved) {
    props.close();
  }

  const submitHandler = () => {
    if (savingInventory) {
      return;
    }
    let canSubmit = true;
    if (name.trim().length === 0) {
      setNameError("Name cannot be empty");
      canSubmit = false;
    } else {
      setNameError(null);
      canSubmit = canSubmit && true;
    }

    if (canSubmit) {
     //dispatch(createNewInventory(token, userId, name, props.inventories));
    }
  };

  return (
    <React.Fragment>
      <div className={classes.AddBottle}>
        <form onSubmit={submitHandler}>
          <div className={classes.FormFields}>
            <Input
              error={nameError}
              style={{ gridArea: "name" }}
              disabled={savingInventory}
              type="text"
              title="* Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <div className={classes.Save}>
              <Button value="SAVE" type="cta" disabled={savingInventory} onClick={() => submitHandler()} />
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

CreateInventory.propTypes = {
  inventoriesIds: PropTypes.arrayOf(PropTypes.string),
};

export default CreateInventory;

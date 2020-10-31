import React, { useState } from "react";
import * as API from "../../API/Bottles";
import { getBottles } from "../store/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import PulseLoader from "react-spinners/PulseLoader";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
// import { createNewBottle, updateBottle } from "../actions";
import classes from "./AddBottle.module.scss";
import { RootState } from "../../store/rootReducer";
import { Investor } from "../../investors/store/types";
import { Bottle, BOTTLE_STATE } from "../store/types";

const AddBottle = (props: {
  inventoryId: string;
  close: Function;
  bottle?: Bottle;
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.session.token);
  const investors = useSelector(
    (state: RootState) => state.inventory.data?.investors
  );

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState(props.bottle ? props.bottle.name : "");
  const [nameError, setNameError] = useState<string | null>(null);
  const [price, setPrice] = useState(
    props.bottle ? props.bottle.cost.toString() : ""
  );
  const [priceError, setPriceError] = useState<string | null>(null);
  const [purchaseDate, setPurchaseDate] = useState(
    (props.bottle?.purchaseDate ?? -1) > 0
      ? new Date(props.bottle!.purchaseDate!)
      : null
  );
  const [ownerId, setOwnerId] = useState(
    props.bottle ? props.bottle.ownerId : null
  );
  const [ownerError, setOwnerError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(
    props.bottle ? props.bottle.imageUrl : ""
  );

  type OptionType = { label: string; value: string };
  let investorsOptions: OptionType[] = [];
  if (investors) {
    investorsOptions = investors.map((el: Investor) => {
      return { label: el.name, value: el.id };
    });
  }

  let selectedInvestorOption = null;
  if (ownerId) {
    selectedInvestorOption = ownerId
      ? investorsOptions.filter((em) => em.value === ownerId)[0]
      : null;
  }

  if (saved) {
    props.close();
  }

  const submitHandler = () => {
    if (validateBottle()) {
      setSaving(true);
      const purchaseTs = purchaseDate ? purchaseDate.getTime() : null;
      let promise: Promise<any>;
      if (!props.bottle) {
        const bottle: Bottle = {
          name: name,
          cost: parseFloat(price),
          ownerId: ownerId!,
          purchaseDate: purchaseTs ?? -1,
          imageUrl: imageUrl,
          state: BOTTLE_STATE.UNLISTED,
        };

        promise = API.createNewBottle(bottle, props.inventoryId, token!);
      } else {
        const bottle: Bottle = {
          ...props.bottle!,
          name: name,
          cost: parseFloat(price),
          ownerId: ownerId!,
          imageUrl: imageUrl,
          purchaseDate: purchaseTs ?? -1,
        };
        promise = API.updateBottle(bottle, props.inventoryId, token!);
      }

      promise
        .then((res) => {
          props.close();
          dispatch(getBottles(token!, props.inventoryId));
        })
        .catch((err) => console.log(err));
    }
  };

  const validateBottle = () => {
    if (saving) {
      return false;
    }
    let canSubmit = true;
    if (name.trim().length === 0) {
      setNameError("Name cannot be empty");
      canSubmit = false;
    } else {
      setNameError(null);
      canSubmit = canSubmit && true;
    }
    if (price.trim().length === 0 || parseFloat(price) <= 0) {
      setPriceError("Price has to be greater than 0");
      canSubmit = false;
    } else {
      setPriceError(null);
      canSubmit = canSubmit && true;
    }

    if (!ownerId) {
      setOwnerError("Must choose investor");
      canSubmit = false;
    } else {
      setOwnerError(null);
      canSubmit = canSubmit && true;
    }

    return canSubmit;
  }

  return (
    <div className={classes.AddBottle}>
      <form onSubmit={submitHandler}>
        <div className={classes.FormFields}>
          <Input
            error={nameError}
            style={{ gridArea: "name" }}
            disabled={saving}
            type="text"
            title="* Name"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <Input
            error={priceError}
            style={{ gridArea: "price" }}
            disabled={saving}
            type="number"
            title="* Price"
            value={price}
            min="0"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(event.target.value)
            }
          />
          <Input title="Purchased On" style={{ gridArea: "date" }}>
            <DatePicker
              selected={purchaseDate}
              onChange={(date) => setPurchaseDate(date)}
              timeCaption="Purchased On"
              dateFormat="MMMM d, yyyy"
              isClearable={true}
              wrapperClassName={classes.PurchaseDate}
              disabled={saving}
            />
          </Input>
          <Input
            style={{ gridArea: "image_url", alignSelf: "end" }}
            disabled={saving}
            type="test"
            title="Image URL"
            value={imageUrl}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setImageUrl(event.target.value)
            }
          />
          <img className={classes.Image} src={imageUrl} alt="" />
          <Input
            title="Purchased By"
            style={{ gridArea: "owner" }}
            error={ownerError}
          >
            <Select
              value={selectedInvestorOption}
              options={investorsOptions}
              onChange={(opt: any) => setOwnerId(opt.value)}
            />
          </Input>
          <div className={classes.Save}>
            {saving ? (
              <PulseLoader color="#dba514" />
            ) : (
              <Button
                fillWidth
                type="cta"
                value="SAVE"
                onClick={() => submitHandler()}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBottle;

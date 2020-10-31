import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import PulseLoader from "react-spinners/PulseLoader";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import classes from "./AddAuction.module.scss";
import { RootState } from "../../store/rootReducer";
import { Auction } from "../store/types";
import { getAuctioneers } from "../../auctioneers/store/actions";
import { Auctioneer } from "../../auctioneers/store/types";
import API from "../../API/API";
import { getAuctions } from "../store/actions";

const AddAuction = (props: {
  inventoryId: string;
  auction?: Auction;
  close: Function;
}) => {
  const token = useSelector((state: RootState) => state.session.token);

  const dispatch = useDispatch();

  const auctioneers = useSelector((state: RootState) => state.auctioneers.data);
  const loadingAuctioneers = useSelector(
    (state: RootState) => state.auctioneers.loading
  );
  const errorLoadingAuctioneers = useSelector(
    (state: RootState) => state.auctioneers.error
  );

  const [auctioneerId, setAuctioneerId] = useState<string | null>(
    props.auction?.auctioneerId ?? null
  );
  const [auctioneerError, setAuctioneerError] = useState<string | null>(null);
  const [name, setName] = useState(props.auction ? props.auction.name : "");
  const [nameError, setNameError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(
    props.auction?.startDate ? new Date(props.auction.startDate) : null
  );
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDate, setEndDate] = useState(
    props.auction?.endDate ? new Date(props.auction.endDate) : null
  );
  const [endDateError, setEndDateError] = useState<string | null>(null);

  const [savingAuction, setSavingAuction] = useState(false);
  const [auctionSaved, setAuctionSaved] = useState(false);

  useEffect(() => {
    if (
      token &&
      !loadingAuctioneers &&
      !auctioneers &&
      !errorLoadingAuctioneers
    ) {
      dispatch(getAuctioneers(token));
    }
  }, [
    token,
    loadingAuctioneers,
    errorLoadingAuctioneers,
    auctioneers,
    dispatch,
  ]);

  type OptionType = { label: string; value: string };
  let auctioneersOptions: OptionType[] = [];
  if (auctioneers) {
    auctioneersOptions = auctioneers.map((el: Auctioneer) => {
      return { label: el.name, value: el.id };
    });
  }

  let selectedAuctioneerOption = null;
  if (auctioneerId) {
    selectedAuctioneerOption = auctioneerId
      ? auctioneersOptions.filter((em) => em.value === auctioneerId)[0]
      : null;
  }

  if (auctionSaved) {
    props.close();
  }

  const submitHandler = () => {
    if (savingAuction) {
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
    if (!auctioneerId) {
      setAuctioneerError("Must choose auctioneer");
      canSubmit = false;
    } else {
      setAuctioneerError(null);
      canSubmit = canSubmit && true;
    }
    if (!startDate) {
      setStartDateError("Must choose start date");
      canSubmit = false;
    } else {
      setStartDateError(null);
      canSubmit = canSubmit && true;
    }
    if (!endDate) {
      setEndDateError("Must choose end date");
      canSubmit = false;
    } else {
      setEndDateError(null);
      canSubmit = canSubmit && true;
    }
    if (endDate && startDate) {
      if (endDate.getTime() < startDate.getTime()) {
        setEndDateError("End date is before start date");
      } else {
        setEndDateError(null);
      }
    }
    if (canSubmit) {
      saveAuction();
    }
  };

  const saveAuction = () => {
    const auction: Auction = {
      name: name,
      startDate: startDate!.getTime(),
      endDate: endDate!.getTime(),
      auctioneerId: auctioneerId!,
      bottles: []
    };
    setSavingAuction(true)
    API.post(`inventories/${props.inventoryId}/auctions.json?auth=${token}`, auction)
      .then((res) => {
        dispatch(getAuctions(token!, props.inventoryId));
        setSavingAuction(false);
        setAuctionSaved(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.AddBottle}>
      <form className={classes.Form} onSubmit={submitHandler}>
        <div className={classes.FormFields}>
          <Input
            title="* Auctioneer"
            style={{ gridArea: "auctioneer" }}
            error={auctioneerError}
          >
            <Select
              value={selectedAuctioneerOption}
              options={auctioneersOptions}
              onChange={(opt: any) => {
                setAuctioneerId(opt.value);
              }}
              isLoading={loadingAuctioneers}
            />
          </Input>
          <Input
            error={nameError}
            style={{ gridArea: "name" }}
            disabled={savingAuction}
            type="text"
            title="* Name"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <Input
            title="* Starting On"
            style={{ gridArea: "start_date" }}
            error={startDateError}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeCaption="Starting On"
              dateFormat="MMMM d, yyyy"
              isClearable={true}
              wrapperClassName={classes.StartDate}
              disabled={savingAuction}
            />
          </Input>
          <Input
            title="* Ending On"
            style={{ gridArea: "end_date" }}
            error={endDateError}
          >
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              timeCaption="Emding On"
              dateFormat="MMMM d, yyyy"
              isClearable={true}
              wrapperClassName={classes.EndDate}
              disabled={savingAuction}
            />
          </Input>
          <div className={classes.Save}>
            {savingAuction ? (
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

export default AddAuction;

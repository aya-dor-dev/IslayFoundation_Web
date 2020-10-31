import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedClasses from "../sharedStyles.module.scss";
import { RootState } from "../store/rootReducer";
import InfoCard from "../UI/InfoCard/InfoCard";
import PageHeader from "../UI/PageHeader/PageHeader";
import SideDrawer from "../UI/SideDrawer/SideDrawer";
import { Bottle, BOTTLE_STATE } from "./store/types";
import AddBottle from "./add-bottle/AddBottle";
import BottleListItem from "./bottle/BottleListItem";
import classes from "./BottlesList.module.scss";
import { getBottles } from "./store/actions";
import InfoView, { InfoItem } from "../UI/InfoView/InfoView";
import BottlesTable from "./BottlesTable";

const BottlesList = (props: { inventoryId: string }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.session.token);
  const { loading, error } = useSelector((state: RootState) => state.bottles);
  const bottles = useSelector((state: RootState) => state.bottles.data);

  const [editedBottle, setEditedBottle] = useState<Bottle | undefined>(
    undefined
  );
  const [addingBottle, setAddingBottle] = useState(false);
  const [filterState, setFilterState] = useState<BOTTLE_STATE | null>(null);
  const [filterName, setFilterName] = useState<string | null>("");

  useEffect(() => {
    if (token) {
      dispatch(getBottles(token, props.inventoryId));
    }
  }, [dispatch, token, props.inventoryId]);

  const openBottleEditForm = () => {
    setAddingBottle(true);
  };

  const editBottle = (bottle: Bottle) => {
    setAddingBottle(true);
    setEditedBottle(bottle);
  };

  const finishBottleEdit = () => {
    setAddingBottle(false);
    setEditedBottle(undefined);
  };

  let content = null;
  let info = null;

  if (error) {
    content = "Oops";
  } else if (bottles) {
    info = getInfo(bottles, filterState, (state) => setFilterState(state), () => setAddingBottle(true))
    
    let filteredBottles =
      filterState || filterName
        ? bottles.filter((b) => {
            let keep = true;
            if (filterState && filterState !== b.state) {
              return false;
            }
            if (
              filterName &&
              !b.name.toLowerCase().includes(filterName.toLowerCase())
            ) {
              return false;
            }
            return keep;
          })
        : bottles;
        content = <BottlesTable bottles={filteredBottles} editBottle={(btl) => editBottle(btl)}/>
  }

  const formStyle = [classes.EditBottleForm];
  if (addingBottle) {
    formStyle.push(classes.EditBottleFormOpen);
  }

  return (
    <div className={SharedClasses.Page}>
      <SideDrawer show={addingBottle} close={finishBottleEdit}>
        <AddBottle
          bottle={editedBottle}
          inventoryId={props.inventoryId}
          close={finishBottleEdit}
        />
      </SideDrawer>
      <PageHeader
        loading={loading}
        onFilterChange={(filter) => {
          setFilterName(filter.length === 0 ? null : filter);
        }}
      >
        Bottles
      </PageHeader>
      <div className={SharedClasses.PageContent}>
        {info}
        {content}
      </div>
    </div>
  );
};

const getInfo = (
  bottles: Bottle[],
  selectedState: BOTTLE_STATE | null,
  onStateClicked: (state: BOTTLE_STATE | null) => void,
  addBottle: Function
) => {
  const items: InfoItem[] = [];
  items.push({
    id: "bottles",
    name: "Bottles",
    selected: selectedState === null,
    value: bottles.length,
    onClick: () => onStateClicked(null),
  });
  items.push({
    id: "sold",
    name: "Sold",
    selected: selectedState === BOTTLE_STATE.SOLD,
    value: bottles.filter(item => item.state === BOTTLE_STATE.SOLD).length,
    onClick: () => onStateClicked(BOTTLE_STATE.SOLD),
  });
  items.push({
    id: "listed",
    name: "Listed",
    selected: selectedState === BOTTLE_STATE.LISTED,
    value: bottles.filter(item => item.state === BOTTLE_STATE.LISTED).length,
    onClick: () => onStateClicked(BOTTLE_STATE.LISTED),
  });
  items.push({
    id: "unlisted",
    name: "Unlisted",
    selected: selectedState === BOTTLE_STATE.UNLISTED,
    value: bottles.filter(item => item.state === BOTTLE_STATE.UNLISTED).length,
    onClick: () => onStateClicked(BOTTLE_STATE.UNLISTED),
  });
  items.push({
    id: "add",
    name: "Add Bottle",
    value: <FontAwesomeIcon color="#dba514" icon={faPlusSquare} />,
    onClick:() => addBottle(),
    cta: true,
  });
  return <InfoView items={items} />;
};

export default React.memo(
  BottlesList,
  (prevProps, nextProps) => prevProps.inventoryId === nextProps.inventoryId
);

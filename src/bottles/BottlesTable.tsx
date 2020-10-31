import React from "react";
import { useSelector } from "react-redux";
import { Investor } from "../investors/store/types";
import { RootState } from "../store/rootReducer";
import BottleView from "../UI/BottleView/BottleView";
import Table, { TableColumn } from "../UI/Table/Table";
import classes from "./BottlesTable.module.scss";
import { Bottle, BOTTLE_STATE } from "./store/types";

/**
  IMAGE NAme name   auction
  IMABE owner cost
 * */

const BottlesTable = (props: {
  bottles: Bottle[];
  editBottle: (bottle: Bottle) => void;
}) => {
  const investors = useSelector(
    (state: RootState) => state.inventory.data?.investors
  );

  const columns: TableColumn<Bottle>[] = [
    {
      title: "Bottle",
      width: "45%",
      render: (btl) => renderBottleCell(btl, investors),
    },
    {
      title: "Cost",
      width: "15%",
      render: (btl) => `£${btl.cost}`,
    },
    {
      title: "Status",
      width: "25%",
      render: (btl) => renderStatusCell(btl),
    },
    {
      title: "Purchase Date",
      width: "15%",
      render: (btl) =>
        (btl.purchaseDate ?? 0) > 0
          ? new Date(btl.purchaseDate!)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")
          : "-",
    },
  ];

  return (
    <Table
      items={props.bottles}
      columns={columns}
      onRowSelected={(i, btl) => props.editBottle(btl)}
    />
  );
};

const renderBottleCell = (btl: Bottle, investors?: Investor[]) => (
  <BottleView
    bottle={btl}
    investorName={
      investors ? investors.filter((i) => i.id === btl.ownerId)[0].name : ""
    }
  />
);
// (
//   <div className={classes.BottleCell}>
//     <RoundedContainer className={sharedClasses.BottleImage}>
//       <img src={btl.imageUrl} alt="" />
//     </RoundedContainer>
//     <div className={classes.BottleInfo}>
//       <span className={classes.Name}>{btl.name}</span>
//       <span className={sharedClasses.Subtext}>
//         {investors ? investors.filter((i) => i.id === btl.ownerId)[0].name : ""}
//       </span>
//     </div>
//   </div>
// );

const renderStatusCell = (btl: Bottle) => {
  const statusStyle = [classes.Status];
  let status = "-";
  switch (btl.state!) {
    case BOTTLE_STATE.SOLD:
      statusStyle.push(classes.Sold);
      status = "SOLD";
      break;
    case BOTTLE_STATE.LISTED:
      statusStyle.push(classes.Listed);
      status = "LISTED";
      break;
    case BOTTLE_STATE.UNLISTED:
      statusStyle.push(classes.Unlisted);
      status = "UNLISTED";
      break;
  }
  return (
    <div className={classes.StatusCell}>
      <span className={statusStyle.join(" ")}>{status}</span>
    </div>
  );
};

export default BottlesTable;

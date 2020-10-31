import React, { useState } from "react";
import { Auction, AuctionBottle, AUCTION_STATUS } from "../store/types";
import classes from "./AuctionsTable.module.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Auctioneer } from "../../auctioneers/store/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Table, { TableColumn } from "../../UI/Table/Table";
import sharedClasses from "../../sharedStyles.module.scss";

interface IProps extends RouteComponentProps<any> {
  auctions: Auction[];
  auctioneers: Map<string, Auctioneer>;
}

const AuctionsList = (props: IProps) => {
  const [auctions, setAuctions] = useState(props.auctions);

  const columns: TableColumn<Auction>[] = [
    {
      title: "Auction",
      width: "25%",
      render: (auction) =>
        auctionCell(auction, props.auctioneers.get(auction.auctioneerId)!),
    },
    {
      title: "Bottles",
      width: "15%",
      render: (auction) => bottlesCell(auction.bottles),
    },
    {
      title: "Starts On",
      width: "12%",
      sort: (asc) => {
        const items = auctions.sort((a1, a2) => {
          return a1.startDate === a2.startDate
            ? 0
            : a1.startDate > a2.startDate
            ? 1
            : -1;
        });
        return asc ? items : items.reverse();
      },
      render: (auction) =>
        new Date(auction.startDate)
          .toDateString()
          .split(" ")
          .slice(1, 4)
          .join(" "),
    },
    {
      title: "Ends On",
      width: "12%",
      sort: (asc) => {
        const items = auctions.sort((a1, a2) => {
          return a1.endDate === a2.endDate
            ? 0
            : a1.endDate > a2.endDate
            ? 1
            : -1;
        });
        return asc ? items : items.reverse();
      },
      render: (auction) =>
        new Date(auction.endDate)
          .toDateString()
          .split(" ")
          .slice(1, 4)
          .join(" "),
    },
    {
      title: "Investment",
      width: "13%",
      // key: "investment",
      render: (auction) =>
        "£" + auction.investment,
    },
    {
      title: "Revenue",
      width: "13%",
      // key: "revenue",
      render: (auction) =>
        incomeCell(
          auction
        ),
    },
  ];
  return (
    <Table
      items={auctions}
      columns={columns}
      onRowSelected={(index, auction) => {
        props.history.push(`${props.location.pathname}/${auction.id!}`);
      }}
    />
  );
};

const incomeCell = (
  auction: Auction
) => {
  if (
    auction.auctionStatus === AUCTION_STATUS.FUTURE ||
    auction.auctionStatus === AUCTION_STATUS.THIS_MONTH
  ) {
    return (
      <td>
        <span className={classes.Value}>-</span>
      </td>
    );
  }

  const revenue = auction.returnOnInvestment! - auction.investment!
  let revenueArrow = null;
  let revenueClass = classes.Value;
  if (revenue && revenue !== 0) {
    if (revenue > 0) {
      revenueClass = classes.ValuePositive;
      revenueArrow = (
        <FontAwesomeIcon icon={faArrowUp} className={revenueClass} />
      );
    } else {
      revenueClass = classes.ValueNegative;
      revenueArrow = (
        <FontAwesomeIcon icon={faArrowDown} className={revenueClass} />
      );
    }
  }

  const incomeCell = (
    <td>
      <span className={classes.Value} style={{ marginRight: "8px" }}>
        £{auction.returnOnInvestment!}
      </span>
      <span className={revenueClass}>£{Math.abs(revenue)}</span>
      {revenueArrow}
    </td>
  );

  return incomeCell;
};

const auctionCell = (auction: Auction, auctioneer: Auctioneer) => {
  return (
    <div className={classes.AuctionCell}>
      <div className={classes.ImageContainer}>
        <img src={auctioneer.imageUrl} alt="logo" />
      </div>
      <div>
        <span className={classes.Text}>{auctioneer.name}</span>
        <span className={sharedClasses.Subtext}>{auction.name}</span>
      </div>
    </div>
  );
};

const bottlesCell = (bottles: AuctionBottle[]) => {
  const items = [];
  for (let i = 0; i < Math.min(bottles.length, 3); i++) {
    items.push(
      <div>
        <img src={bottles[i].imageUrl} alt="" />
      </div>
    );
  }

  if (bottles.length - items.length > 0) {
    items.push(
      <div>
        <span>+{bottles.length - items.length}</span>
      </div>
    );
  }
  return <div className={classes.BottlesCell}>{items}</div>;
};

export default withRouter(AuctionsList);

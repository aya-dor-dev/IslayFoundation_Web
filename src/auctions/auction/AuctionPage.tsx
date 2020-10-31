import {
  faArrowDown,
  faArrowUp,

  faPencilAlt, faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as AuctionAPI from "../../API/Auctions";
import { getAuctioneers } from "../../auctioneers/store/actions";
import { Auctioneer } from "../../auctioneers/store/types";
import { getAuctions } from "../../auctions/store/actions";
import { getBottles } from "../../bottles/store/actions";
import SharedClasses from "../../sharedStyles.module.scss";
import { RootState } from "../../store/rootReducer";
import BottleView from "../../UI/BottleView/BottleView";
import InfoView, { InfoItem } from "../../UI/InfoView/InfoView";
import PageHeader from "../../UI/PageHeader/PageHeader";
import SideDrawer from "../../UI/SideDrawer/SideDrawer";
import Table, { TableColumn } from "../../UI/Table/Table";
import { IProps } from "../../utils";
import { Auction, AuctionBottle } from "../store/types";
import classes from "./AuctionPage.module.scss";
import SelectBottles from "./SelectBottles";
import Modal from '../../UI/Modal/Modal';

/**
 * image name name name lot cost reserve sold
 */
interface Props extends IProps, RouteComponentProps<any> {
  auctionId: string;
  auctioneer?: Auctioneer;
  auction?: Auction;
}

const AuctionPage = (props: Props) => {
  const dispatch = useDispatch();

  const [loadingAuction, setLoadingAuction] = useState(false);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [editingBottles, setEditingBottles] = useState(false);
  const [updatingAuction, setUpdatingAuction] = useState(false);
  const auctioneers = useSelector((state: RootState) => state.auctioneers.data);
  const loadingAuctioneers = useSelector(
    (state: RootState) => state.auctioneers.loading
  );
  const errorLoadingAuctioneers = useSelector(
    (state: RootState) => state.auctioneers.error
  );
  let auctioneer: Auctioneer | undefined = undefined;

  if (auctioneers && auction !== null) {
    auctioneer = auctioneers.filter((a) => a.id === auction.auctioneerId)[0];
  }

  useEffect(() => {
    if (!loadingAuction && auction === null) {
      loadAuction();
    }
  }, [auction, loadingAuction]);

  const loadAuction = () => {
    setLoadingAuction(true);
    AuctionAPI.getAuction(props.inventoryId!, props.auctionId, props.token!)
      .then((auction) => {
        setAuction(auction);
        setLoadingAuction(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (
      auction !== null &&
      !auctioneers &&
      !loadingAuctioneers &&
      !errorLoadingAuctioneers
    ) {
      dispatch(getAuctioneers(props.token!));
    }
  }, [
    auction,
    auctioneers,
    dispatch,
    errorLoadingAuctioneers,
    loadingAuctioneers,
    props.token,
  ]);

  let title = " ";
  let info = null;
  let table = null;
  if (auction !== null && auctioneer) {
    title = auctioneer.name + " - " + auction.name;
    info = getInfo(auction, setEditingBottles);

    const columns: TableColumn<AuctionBottle>[] = [
      {
        title: "Bottle",
        width: "48%",
        render: (btl) => <BottleView bottle={btl} />,
      },
      {
        title: "Lot",
        width: "13%",
        render: (btl) => lotCell(btl),
      },
      {
        title: "Cost",
        width: "13%",
        render: (btl) => "£" + btl.cost,
      },
      {
        title: "Reserve",
        width: "13%",
        render: (btl) => (btl.reserve ? "£" + btl.reserve : "-"),
      },
      {
        title: "Sold",
        width: "13%",
        render: (btl) => (btl.soldFor ? "£" + btl.soldFor : "-"),
      },
    ];

    table = <Table items={auction.bottles} columns={columns} />;
  }

  const updateBottles = (ids: string[]) => {
    setEditingBottles(false);
    setUpdatingAuction(true);
    AuctionAPI.updateBottles(
      props.inventoryId!,
      props.auctionId!,
      props.token!,
      ids,
      auction?.bottles?.map((b) => b.id) ?? []
    )
      .then((res) => {
        console.log(res);
        setUpdatingAuction(false);
        dispatch(getBottles(props.token!, props.inventoryId!));
        dispatch(getAuctions(props.token!, props.inventoryId!));
        loadAuction();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={SharedClasses.Page}>
      <SideDrawer
        show={editingBottles}
        close={updatingAuction ? null : () => setEditingBottles(false)}
      >
        <SelectBottles
          inventoryId={props.inventoryId!}
          selectedIds={auction?.bottles?.map((b) => b.id) ?? []}
          save={(selectedIds) => updateBottles(selectedIds)}
          token={props.token}
        />
      </SideDrawer>
      <PageHeader
        loading={loadingAuction || loadingAuctioneers || updatingAuction}
      >
        {title}
      </PageHeader>
      <div className={SharedClasses.PageContent}>
        {info}
        {table}
      </div>
    </div>
  );
};

const lotCell = (bottle: AuctionBottle) => (
  <div className={classes.LotCell}>
    <span>{bottle.lot ?? "-"}</span>
    <FontAwesomeIcon icon={faPencilAlt} color={"#fff"} size='1x' />
  </div>
);

const getInfo = (
  auction: Auction,
  setEditingBottles: (editingBottles: boolean) => void
) => {
  const returnText =
    (auction.returnOnInvestment! < 0 ? "-" : "") +
    "£" +
    Math.abs(auction.returnOnInvestment!);
  const revenue = auction.returnOnInvestment! - auction.investment!;
  const revenueText = (revenue < 0 ? "-" : "") + "£" + Math.abs(revenue);

  const revenueArrowIcon =
    revenue === 0 ? null : revenue > 0 ? faArrowUp : faArrowDown;
  const revenueArrow = revenueArrowIcon ? (
    <FontAwesomeIcon icon={revenueArrowIcon} />
  ) : null;
  const revenueView = (
    <div>
      {revenueText} {revenueArrow}
    </div>
  );
  const positive = revenue === 0 ? undefined : revenue > 0 ? true : false;

  const items: InfoItem[] = [];
  items.push({ id: "count", name: "Bottles", value: auction.bottles.length });
  items.push({
    id: "investment",
    name: "Investment",
    value: `£${auction.investment}`,
  });
  items.push({ id: "return", name: "Return", value: returnText });
  items.push({
    id: "revenue",
    name: "Revenue",
    value: revenueView,
    positive: positive,
  });
  items.push({
    id: "add",
    name: "Add Bottle",
    value: <FontAwesomeIcon color="#dba514" icon={faPlusSquare} />,
    cta: true,
    onClick: () => setEditingBottles(true),
  });
  return <InfoView items={items} />;
};

export default withRouter(AuctionPage);

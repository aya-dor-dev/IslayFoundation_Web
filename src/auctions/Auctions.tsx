import React, { useState, useEffect } from "react";
import SharedClasses from "../sharedStyles.module.scss";
import PageHeader from "../UI/PageHeader/PageHeader";
import InfoCard from "../UI/InfoCard/InfoCard";
import classes from "./Auctions.module.scss";
import SideDrawer from "../UI/SideDrawer/SideDrawer";
import AddAuction from "./add-auction/AddAuction";
import { Auction, AUCTION_STATUS } from "./store/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/rootReducer";
import { getAuctions } from "./store/actions";
import AuctionsTable from "./table/AuctionsTable";
import { getAuctioneers } from "../auctioneers/store/actions";
import { IProps } from "../utils";


const Auctions = (props: IProps) => {
  const dispatch = useDispatch();
  const loadingAuctions = useSelector(
    (state: RootState) => state.auctions.loading
  );
  const errorLoadingAuctions = useSelector(
    (state: RootState) => state.auctions.error
  );
  const auctions = useSelector((state: RootState) => state.auctions.data);

  const loadingAuctioneers = useSelector(
    (state: RootState) => state.auctioneers.loading
  );
  const errorLoadingAuctioneers = useSelector(
    (state: RootState) => state.auctioneers.error
  );
  const auctioneers = useSelector((state: RootState) => state.auctioneers.data);

  const [addingAuction, setAddingAuction] = useState(false);
  const [savingAuction, setSavingAuction] = useState(false);
  const [stateFilter, setStateFilter] = useState<AUCTION_STATUS | null>(null);

  useEffect(() => {
    if (props.token) {
      if (!loadingAuctions && !errorLoadingAuctions && !auctions) {
        dispatch(getAuctions(props.token, props.inventoryId!));
      }
    }
  }, [props.inventoryId, props.token, dispatch, loadingAuctions, errorLoadingAuctions, auctions]);

  useEffect(() => {
    if (props.token) {
      if (!loadingAuctioneers && !errorLoadingAuctioneers && !auctioneers) {
        dispatch(getAuctioneers(props.token));
      }
    }
  }, [props.inventoryId, props.token, dispatch, loadingAuctioneers, errorLoadingAuctioneers, auctioneers]);

  let content = null;
  let info = null;
  let error = null;

  if (auctions && auctioneers) {
    const auctioneersMap = new Map(
      auctioneers.map((auctioneer) => [auctioneer.id, auctioneer])
    );

    const filtered =
      stateFilter !== null
        ? auctions.filter((a) => a.auctionStatus === stateFilter)
        : auctions;
    content = (
      <AuctionsTable auctions={filtered} auctioneers={auctioneersMap} />
    );
  }

  if (error) {
    content = "Oops";
  } else if (auctions && auctioneers) {
    info = (
      <div className={SharedClasses.Info}>
        <InfoCard
          selected={stateFilter === null}
          name="Auctions"
          onClick={() => setStateFilter(null)}
        >
          {auctions.length}
        </InfoCard>
        <InfoCard
          name="Active"
          selected={stateFilter === AUCTION_STATUS.ACTIVE}
          onClick={() => setStateFilter(AUCTION_STATUS.ACTIVE)}
        >
          {
            auctions.filter(
              (auction) => auction.auctionStatus === AUCTION_STATUS.ACTIVE
            ).length
          }
        </InfoCard>
        <InfoCard
          name="This Month"
          selected={stateFilter === AUCTION_STATUS.THIS_MONTH}
          onClick={() => setStateFilter(AUCTION_STATUS.THIS_MONTH)}
        >
          {
            auctions.filter(
              (auction) => auction.auctionStatus === AUCTION_STATUS.THIS_MONTH
            ).length
          }
        </InfoCard>
        <InfoCard
          name="Future"
          selected={stateFilter === AUCTION_STATUS.FUTURE}
          onClick={() => setStateFilter(AUCTION_STATUS.FUTURE)}
        >
          {
            auctions.filter(
              (auction) => auction.auctionStatus === AUCTION_STATUS.FUTURE
            ).length
          }
        </InfoCard>
        <InfoCard
          name="Past"
          selected={stateFilter === AUCTION_STATUS.PAST}
          onClick={() => setStateFilter(AUCTION_STATUS.PAST)}
        >
          {
            auctions.filter(
              (auction) => auction.auctionStatus === AUCTION_STATUS.PAST
            ).length
          }
        </InfoCard>
        <InfoCard
          cta
          name="New Auction"
          onClick={() => {
            setAddingAuction(true);
          }}
        >
          <FontAwesomeIcon color="#dba514" icon={faPlusSquare} />
        </InfoCard>
      </div>
    );
  }

  const finishAuctionEdit = () => {
    setAddingAuction(false);
  };
  
  return (
    <div className={SharedClasses.Page}>
      <SideDrawer
        show={addingAuction}
        close={savingAuction ? null : () => finishAuctionEdit()}
      >
        <AddAuction
          inventoryId={props.inventoryId!}
          close={() => finishAuctionEdit()}
        />
      </SideDrawer>
      <PageHeader loading={loadingAuctions}>Auctions</PageHeader>
      <div className={SharedClasses.PageContent}>
        {info}
        {content}
      </div>
    </div>
  );
};

export default Auctions;

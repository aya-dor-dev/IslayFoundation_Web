import React from "react";
import { IProps } from "../utils";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import Auctions from './Auctions';
import AuctionPage from './auction/AuctionPage';
;

interface Props extends IProps, RouteComponentProps<any> {}

const AuctionsRoot = (props: Props) => {
  
  const AuctionsList = (p: RouteComponentProps<any>) => {
    return <Auctions {...props} />;
  };

  const AuctionPageComp = (p: RouteComponentProps<any>) => {
    return <AuctionPage token={props.token} inventoryId={props.inventoryId} auctionId={p.match.params.auctionId}/>;
  };

  return (
    <Switch>
      <Route
        path="/inventory/:inventoryId/auctions/:auctionId"
        component={AuctionPageComp}
      />
      <Route
        path="/inventory/:inventoryId/auctions"
        component={AuctionsList}
      />
    </Switch>
  );
};

export default withRouter(AuctionsRoot);

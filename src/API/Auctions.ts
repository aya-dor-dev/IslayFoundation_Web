import { Auctioneer } from "./../auctioneers/store/types";
import API, { withToken } from "./API";
import { Auction, AuctionBottle } from "../auctions/store/types";
import * as BottlesApi from "./Bottles";
import * as AuctioneersApi from "./Auctioneers";
import { BOTTLE_STATE } from "../bottles/store/types";

const SCHEME = (inventoryId: string) =>
  `inventories/${inventoryId}/auctions.json`;

const SINGLE_AUCTION_SCHEME = (inventoryId: string, auctionId: string) =>
  `inventories/${inventoryId}/auctions/${auctionId}.json`;

export const getAuctions = (inventoryId: string, token: string) => {
  return API.get(withToken(SCHEME(inventoryId), token)).then(async (res) => {
    const auctions: Auction[] = [];
    for (const key in res.data) {
      const auction: Auction = res.data[key];
      auction.id = key;

      const auctioneer = await AuctioneersApi.getAuctioneer(
        token,
        auction.auctioneerId
      );

      auction.bottles = (await BottlesApi.getBottlesByIds(
        inventoryId,
        token,
        auction.bottles.map((b) => b.id)
      )) as AuctionBottle[];
      calculateInvestment(auction, auctioneer);

      auctions.push(auction);
    }

    return auctions;
  });
};

export const getAuction = (
  inventoryId: string,
  auctionId: string,
  token: string
) => {
  return API.get(
    withToken(SINGLE_AUCTION_SCHEME(inventoryId, auctionId), token)
  ).then(async (res) => {
    const auction: Auction = res.data;
    auction.bottles = (await BottlesApi.getBottlesByIds(
      inventoryId,
      token,
      (auction.bottles ?? []).map((b) => b.id)
    )) as AuctionBottle[];

    const auctioneer = await AuctioneersApi.getAuctioneer(
      token,
      auction.auctioneerId
    );

    calculateInvestment(auction, auctioneer);
    return auction;
  });
};

const calculateInvestment = (auction: Auction, auctioneer: Auctioneer) => {
  auction.investment = auction.bottles.reduce((val, btl) => val + btl.cost!, 0);
  auction.returnOnInvestment = auction.bottles.reduce((val, btl) => {
    const soldFor = btl.soldFor ?? 0;
    const isReserve = btl.reserve !== undefined;
    return (val + soldFor - eval(auctioneer.feesFormula)) as number;
  }, 0);
};

export const updateBottles = (
  inventoryId: string,
  auctionId: string,
  token: string,
  newList: string[],
  oldList: string[]
) => {
  const auctionBottles = newList.map((id) => {
    return { id: id };
  });
  return API.patch(
    withToken(SINGLE_AUCTION_SCHEME(inventoryId, auctionId), token),
    {
      bottles: auctionBottles,
    }
  ).then((res) => {
    const promises = newList.map((id) =>
      BottlesApi.updateState(id, inventoryId, BOTTLE_STATE.LISTED, token)
    );
    const unlistedIds = oldList.filter((id) => !newList.includes(id));
    promises.push(
      ...unlistedIds.map((id) =>
        BottlesApi.updateState(id, inventoryId, BOTTLE_STATE.UNLISTED, token)
      )
    );
  });
};

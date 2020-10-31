import { getAuctions } from "./../../API/Auctions";
import * as API from "../../API/Auctions";
import { getBottle } from "../../API/Bottles";
import * as actions from "./actions";
import { put } from "redux-saga/effects";
import {
  GetAuctionsAction,
  Auction,
  AUCTION_STATUS,
  AuctionBottle,
} from "./types";
import { Bottle } from "../../bottles/store/types";

const SCHEME = (inventoryId: string, token: string) =>
  `inventories/${inventoryId}/auctions.json?auth=${token}`;

export function* getAllAuctions(action: GetAuctionsAction) {
  yield put(actions.getAuctionsStart());

  try {
    const auctions: Auction[] = yield API.getAuctions(
      action.inventoryId,
      action.token
    );

    const date = new Date().getTime();
    auctions.forEach((auction) => {
      let status: AUCTION_STATUS = AUCTION_STATUS.FUTURE;
      if (auction.endDate < date) {
        status = AUCTION_STATUS.PAST;
      } else if (date < auction.endDate && date > auction.startDate) {
        status = AUCTION_STATUS.ACTIVE;
      } else if (
        new Date().getMonth() === new Date(auction.startDate).getMonth() &&
        new Date().getFullYear() === new Date(auction.startDate).getFullYear()
      ) {
        status = AUCTION_STATUS.THIS_MONTH;
      }
      
      auction.auctionStatus = status;
    });
    yield put(actions.getAuctionsSuccess(auctions));
  } catch (err) {
    yield put(actions.getAuctionsFailed(err.message));
  }
}

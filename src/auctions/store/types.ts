import { APIResponse, ApiAction, RepoState } from "../../API/API";
import { IBottle } from "../../bottles/store/types";
import {Auctioneer} from '../../auctioneers/store/types';

export const GET_AUCTIONS = "GET_AUCTIONS";
export const GET_AUCTIONS_START = "GET_AUCTIONS_START";
export const GET_AUCTIONS_SUCCESS = "GET_AUCTIONS_SUCCESS";
export const GET_AUCTIONS_FAILED = "GET_AUCTIONS_FAILED";

export enum AUCTION_STATUS {
  PAST,
  THIS_MONTH,
  ACTIVE,
  FUTURE,
}

export interface Auction {
  id?: string;
  name: string;
  startDate: number;
  endDate: number;
  auctioneerId: string;
  bottles: AuctionBottle[];
  auctionStatus?: AUCTION_STATUS;
  investment?: number;
  returnOnInvestment?: number;
}

export interface AuctionBottle extends IBottle {
  id: string;
  reserve?: number;
  lot?: string;
  lotUrl?: string;
}

export interface AuctionsRepoState extends RepoState<Auction[]> {}

export interface GetAuctionsAction extends ApiAction {
  type: typeof GET_AUCTIONS;
  inventoryId: string;
}

export interface GetAuctionsStartAction {
  type: typeof GET_AUCTIONS_START;
}

export interface GetAuctionsResponse extends APIResponse<Auction[]> {
  type: typeof GET_AUCTIONS_SUCCESS | typeof GET_AUCTIONS_FAILED;
}

export type AuctionsActionTypes =
  | GetAuctionsAction
  | GetAuctionsStartAction
  | GetAuctionsResponse;

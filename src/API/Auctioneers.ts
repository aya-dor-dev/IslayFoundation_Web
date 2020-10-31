import API, { withToken } from "./API";
import { Auctioneer } from "../auctioneers/store/types";

export const SCHEME_NAME = "auctioneers.json";
export const AUCTIONEER_SCHEME = (id: string) => `auctioneers/${id}.json`;

export const getAuctioneers = (token: string) => {
  return API.get(withToken(SCHEME_NAME, token));
};

export const getAuctioneer = (token: string, auctioneerId: string) => {
  return API.get(withToken(AUCTIONEER_SCHEME(auctioneerId), token)).then(res => res.data as Auctioneer);
};
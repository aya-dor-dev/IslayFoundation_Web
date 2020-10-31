import axios from "axios";
import { Bottle } from "../bottles/store/types";

const INVENTORIES_SCHEME = "inventories";


export const withToken = (url: string, token: string) => `${url}?auth=${token}`;

const instance = axios.create({
  baseURL: "https://islay-foundation.firebaseio.com/",
});

export default instance;

export interface ApiAction {
  type: string;
  token: string;
  inventoryId?: string;
  userId?: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: string;
}

export interface RepoState<T> {
  data?: T;
  loading: boolean;
  error?: string;
}

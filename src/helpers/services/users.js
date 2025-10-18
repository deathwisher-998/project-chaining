import { APIClient } from "../api_helper";
import * as url from "../url_helper";

const api = new APIClient();

export const userList = (data) => api.get(url.User);
export const userDetails = (data) => api.get(url.User + `/${data}`);
export const userLevel = (data) => api.get(url.User + `/${data}/Levels`);
export const userAddress = (data) => api.get(url.Useraddres);
export const createAddress = (data) => api.post(url.Useraddres,data)
export const userAddressByid = (data) => api.get(url.Useraddres + `/User${data}`);

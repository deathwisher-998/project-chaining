import { APIClient } from "../api_helper";
import * as url from "../url_helper";

const api = new APIClient();

export const withDrawpendinglist = () => api.get(url.withdrawpendingList);
export const withDrawUpdatestatus = (data) => api.post(url.withdrawupdateStatus, data);
export const withDrawAmount = (data) => api.post(url.withdrawAmount, data);
export const withdrawAmountlist = (data) => api.get(url.withdrawAmount + `/UserId/${data}`);

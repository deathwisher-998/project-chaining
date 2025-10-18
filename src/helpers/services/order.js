import { APIClient } from "../api_helper";
import * as url from "../url_helper";

const api = new APIClient();

export const createOrder = (data) => api.post(url.Order, data);
export const Orderlist = (data) => api.get(url.Order + `/${data}`);

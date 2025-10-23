import { APIClient } from "../api_helper";
import * as url from "../url_helper";

const api = new APIClient();

export const createOrder = (data) => api.post(url.Order, data);
export const Orderlist = (data) => api.get(url.Order + `/${data}`);
export const Adminorderlist = () => api.get(url.Order)
export const updateOrderStatus = (data) => api.post(url.UpdateOrderStatus, data)

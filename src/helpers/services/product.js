import { APIClient } from "../api_helper";
import * as url from "../url_helper";

const api = new APIClient();

export const Productlist = (data) => api.get(url.productList);
export const productImage = (data) => api.get(url.productList + `/${data}/productImage`);
export const productDetails = (data) => api.get(url.productList + `/${data}`);
export const productAdd = (data) => api.post(url.productList, data)
export const productImageAdd = (data) => api.post(url.productList + "/productImage", data)

import { ADD_TO_CART } from "./actionTypes";
import { REMOVE_TO_CART } from "./actionTypes";
import { UPDATE_CART } from "./actionTypes";
import { CART_PRODUCTLIST } from "./actionTypes";

export const addToCartFunc = (data) => {
  return {
    type: ADD_TO_CART,
    payload: { data },
  };
};

export const removeToCartFunc = (data) => {
  return {
    type: REMOVE_TO_CART,
    payload: { data },
  };
};

export const updateCartProductFunc = (data) => {
  return {
    type: UPDATE_CART,
    payload: { data },
  };
};

export const cartproductList = (data) => {
  return {
    type: CART_PRODUCTLIST,
    payload: { data },
  };
};

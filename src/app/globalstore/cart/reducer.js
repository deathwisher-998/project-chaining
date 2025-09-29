import { ADD_TO_CART } from './actionTypes';
import { REMOVE_TO_CART } from './actionTypes';
import { UPDATE_CART } from './actionTypes';
import { CART_PRODUCTLIST } from './actionTypes';

const initialState = {
  productFlag: false,
  productId: null,
  cartProduct: null,
  addCartFlag: false,
  removeCartFlag: false,
  productQuantity: null,
  emptycart:true,
  cartproductlist:null,
};

const ProductCart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state = {
        ...state,
        addCartFlag: action.payload?.data?.addCartFlag,
        singleProductData: action.payload?.data?.singleProductData,
        productId: action.payload?.data?.productId,
      };
      break;
    case REMOVE_TO_CART:
      state = {
        ...state,
        removeCartFlag: action.payload?.data?.removeCartFlag,
        singleProductData: action.payload?.data?.singleProductData,
        productId: action.payload?.data?.productId,
      };
      break;
    case UPDATE_CART:
      state = {
        ...state,
        productFlag: action.payload?.data?.productFlag,
        productQuantity: action.payload?.data?.productQuantity,
        productId: action.payload?.data?.productId,
      };
      break;
    case CART_PRODUCTLIST:
      state = {
        ...state,
        cartproductlist: action.payload?.data?.cartproductlist,
        productQuantity:action.payload?.data?.productQuantity
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default ProductCart;

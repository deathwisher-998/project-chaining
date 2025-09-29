import { combineReducers } from 'redux';

// Authentication
import login from './auth/reducer';
import ProductCart from './cart/reducer';

const rootReducer = combineReducers({
  login,
  ProductCart
});

export default rootReducer;

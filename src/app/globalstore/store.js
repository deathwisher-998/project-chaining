// "use client"

// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";

// import rootReducer from "./reducers";
// import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];
// const composeEnhancers =  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// export function configureStore(initialState) {

//   const store = createStore(
//     rootReducer,
//       initialState,
//       composeEnhancers(
//           applyMiddleware(...middlewares)
//       ),
//   );
//   sagaMiddleware.run(rootSaga);
//   return store;
// }

"use client";

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

export function configuredStore(initialState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }) // disable thunk since you're using saga
        .concat(sagaMiddleware),
    devTools: typeof window !== "undefined", // enable Redux DevTools only in browser
  });

  // Run sagas
  sagaMiddleware.run(rootSaga);

  return store;
}

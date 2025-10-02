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

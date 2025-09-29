import { all, fork } from "redux-saga/effects";
// import authSaga from "./auth/login/saga";

export default function* rootSaga() {
  yield all([
    //public
    // fork(authSaga),
  ]);
}

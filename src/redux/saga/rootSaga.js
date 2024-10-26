import { all } from "redux-saga/effects";

import taskSaga from "./taskSaga.js";

export default function* rootSaga() {
  yield all([
    taskSaga(),
  ]);
}

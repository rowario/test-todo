import { all } from "redux-saga/effects";
import { watchUploadFile } from "./sagas";

export default function* rootSaga() {
	yield all([watchUploadFile()]);
}

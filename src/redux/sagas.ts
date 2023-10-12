import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { uploadFileSuccess, uploadFileFailure, UploadTaskFileRequestAction } from "./actions";

function* uploadFile({ payload }: UploadTaskFileRequestAction) {
	const { projectId, board, taskId } = payload;
	try {
		const formData = new FormData();
		formData.append("file", payload.file);

		const response: AxiosResponse<{ fileUrl: string }> = yield call(axios.post, "http://localhost:3001/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		console.log("status", response.status);

		if (response.status === 200) {
			yield put(uploadFileSuccess({ projectId, board, taskId, fileUrl: response.data.fileUrl }));
		} else {
			yield put(uploadFileFailure({ projectId, board, taskId, error: "File upload failed" }));
		}
	} catch (error) {
		console.log(error);
		yield put(uploadFileFailure({ projectId, board, taskId, error: "File upload failed" }));
	}
}

export function* watchUploadFile() {
	yield takeLatest("UPLOAD_TASK_FILE_REQUEST", uploadFile);
}

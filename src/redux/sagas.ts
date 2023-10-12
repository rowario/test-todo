import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { uploadFileSuccess, uploadFileFailure, UploadTaskFileRequestAction } from "./actions";

function* uploadFile({ payload }: UploadTaskFileRequestAction) {
	const { projectId, board, taskId } = payload;
	try {
		const formData = new FormData();
		formData.append("file", payload.file);

		const response: AxiosResponse<{ fileUrl: string }> = yield call(axios.post, "https://api.rowario.ru/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.status === 200) {
			yield put(uploadFileSuccess({ projectId, board, taskId, fileUrl: response.data.fileUrl }));
		} else {
			yield put(uploadFileFailure({ projectId, board, taskId, error: "File upload failed" }));
		}
	} catch (error) {
		yield put(uploadFileFailure({ projectId, board, taskId, error: "File upload failed" }));
	}
}

export function* watchUploadFile() {
	yield takeLatest("UPLOAD_TASK_FILE_REQUEST", uploadFile);
}

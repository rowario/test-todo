import { FC } from "react";
import { connect } from "react-redux";
import { uploadFileRequest } from "../../redux/actions";
import { useAppDispatch } from "../../redux/hooks";
import { TaskBoard } from "../../types";

export const UploadButton: FC<{ projectId: number; board: TaskBoard; taskId: number }> = ({ projectId, board, taskId }) => {
	const dispatch = useAppDispatch();

	return (
		<div className="file add-file">
			<label className="name">
				<input
					type="file"
					name="uploadFile"
					onChange={(e) => {
						if (!e.target.files) return;
						const file = e.target.files[0];
						dispatch(uploadFileRequest({ projectId, board, taskId, file }));
					}}
				/>
				add new file
			</label>
		</div>
	);
};

export const UploadButtonConnected = connect(null, { uploadFileRequest })(UploadButton);

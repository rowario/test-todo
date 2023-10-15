import { Editor } from "@tinymce/tinymce-react";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import {
	addTaskComment,
	addTaskSubcomment,
	addTaskSubtask,
	deleteTask,
	deleteTaskFile,
	deleteTaskSubtask,
	toggleTaskSubtask,
	updateTaskDescription,
	updateTaskPriority,
	updateTaskTitle,
} from "../../redux/actions";
import { useAppDispatch } from "../../redux/hooks";
import { Comment, Task } from "../../types";
import Button from "../Button";
import Input from "../Input";
import Loader from "../Loader";
import { Modal } from "../Modal";
import Timer from "../Timer";
import { UploadButtonConnected } from "../UploadButton";
import "./task-modal.scss";

type Priority = Task["priority"];
const priorities: Priority[] = ["Low", "Medium", "High"];

const TaskModal: FC<{ projectId: number; task: Task | null; opened: boolean; onClose: () => any }> = ({
	projectId,
	task,
	opened,
	onClose,
}) => {
	const [title, setTitle] = useState(task?.title ?? "");
	const debouncedTitle = useDebounce(title, 300);

	const [description, setDescription] = useState("");
	const debouncedDescription = useDebounce(description, 300);

	const [subtaskInput, setSubtaskInput] = useState("");

	const [isOpenCommentInput, setIsOpenCommentInput] = useState(false);
	const [commentInput, setCommentInput] = useState("");

	const [editorLoaded, setEditorLoaded] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (task && task.title !== debouncedTitle) {
			dispatch(updateTaskTitle({ projectId, board: task.board, taskId: task.id, title: debouncedTitle }));
		}
	}, [debouncedTitle]);

	useEffect(() => {
		if (task && task.description !== debouncedDescription) {
			dispatch(updateTaskDescription({ projectId, board: task.board, taskId: task.id, description: debouncedDescription }));
		}
	}, [debouncedDescription]);

	useEffect(() => {
		setIsOpenCommentInput(false);
		setTitle(task?.title ?? "");
		setDescription(task?.description ?? "");
	}, [task]);

	if (!task) return null;

	return (
		<Modal opened={opened} onClose={onClose}>
			<div className="task-modal">
				<textarea
					className="title"
					value={title}
					placeholder={"Title.."}
					onChange={(e) => {
						const value = e.target.value.replaceAll("\n", "");
						if (value.length > 50) return;
						setTitle(value);
					}}
					rows={1}
				/>
				<div className="time">
					<p className="title">
						Created at: <span>{dayjs(task.createdAt).format("D MMMM, YYYY, HH:mm")}</span>
					</p>
				</div>
				{task.startedAt && (
					<>
						<div className="time">
							<p className="title">
								Started at: <span>{dayjs(task.startedAt).format("D MMMM, YYYY, HH:mm")}</span>
							</p>
						</div>
						{!task.endedAt && (
							<div className="time">
								<p className="title">
									In work since:{" "}
									<span>
										<Timer startedAt={task.startedAt} />
									</span>
								</p>
							</div>
						)}
					</>
				)}
				{task.endedAt && (
					<div className="time">
						<p className="title">
							Endend at: <span>{dayjs(task.endedAt).format("D MMMM, YYYY, HH:mm")}</span>
						</p>
					</div>
				)}
				<div className="priority">
					<p className="title">Priority:</p>
					<select
						value={task.priority}
						onChange={(e) =>
							dispatch(
								updateTaskPriority({
									projectId,
									board: task.board,
									taskId: task.id,
									priority: e.target.value as Priority,
								})
							)
						}
					>
						{priorities.map((priorityName) => (
							<option key={priorityName} value={priorityName}>
								{priorityName}
							</option>
						))}
					</select>
				</div>
				<div className="sub-tasks">
					<p className="title">Subtasks</p>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							dispatch(addTaskSubtask({ projectId, board: task.board, taskId: task.id, title: subtaskInput }));
							setSubtaskInput("");
						}}
					>
						<Input
							small
							value={subtaskInput}
							onChange={(e) => setSubtaskInput(e.target.value)}
							placeholder="New subtask.."
						/>
					</form>
					{task.subTasks.map((subTask) => (
						<div className="sub-task" key={subTask.id}>
							<input
								checked={subTask.done}
								onChange={() => {
									dispatch(
										toggleTaskSubtask({
											projectId,
											board: task.board,
											taskId: task.id,
											subtaskId: subTask.id,
										})
									);
								}}
								id={`${task.id}-sub-task-${subTask.id}`}
								type="checkbox"
							/>
							<label htmlFor={`${task.id}-sub-task-${subTask.id}`}>{subTask.title}</label>
							<button
								onClick={() => {
									dispatch(
										deleteTaskSubtask({
											projectId,
											board: task.board,
											taskId: task.id,
											subtaskId: subTask.id,
										})
									);
								}}
								className="delete-task"
							>
								✕
							</button>
						</div>
					))}
				</div>
				<div className="description" style={editorLoaded ? {} : { height: 200, position: "relative" }}>
					<Editor
						apiKey="p5licqtt339bbkogqx705xqp7a9ahwlam84x94qvd8c572xz"
						init={{
							branding: false,
							height: 200,
							menubar: false,
							plugins: "",
							toolbar: "undo redo | bold italic",
							placeholder: "Description..",
							content_style: "body { line-height: 0.4 }",
						}}
						onInit={() => setEditorLoaded(true)}
						onEditorChange={(value) => setDescription(value)}
						value={description}
					/>
					{!editorLoaded && (
						<div className="loader">
							<Loader fill="#adb5bd" />
						</div>
					)}
				</div>
				<div className="files">
					<div className="title">Files</div>
					<div className="files-container">
						<UploadButtonConnected projectId={projectId} board={task.board} taskId={task.id} />
						{task.attachedFiles.map((link, fileIndex) => {
							const fileName = link.split("/").at(-1)!;
							const shortName = fileName.length > 10 ? fileName.slice(0, 10).trim() + ".." : fileName;
							const ext = fileName.split(".").at(-1);
							return (
								<div className="file" key={link}>
									<a download target="_blank" href={link} className="name">
										{`${shortName}[.${ext}]`}
									</a>
									<div
										onClick={() =>
											dispatch(deleteTaskFile({ projectId, board: task.board, taskId: task.id, fileIndex }))
										}
										className="delete-file"
									>
										✕
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="comments">
					<div className="title">Comments</div>
					<Button onClick={() => setIsOpenCommentInput((current) => !current)} small as="button">
						{!isOpenCommentInput ? "Add comment" : "Close"}
					</Button>
					<div style={{ display: !isOpenCommentInput ? "none" : "block" }}>
						<form
							onSubmit={(e) => {
								e.preventDefault();

								dispatch(
									addTaskComment({ projectId, board: task.board, taskId: task.id, comment: commentInput })
								);
								setCommentInput("");
							}}
						>
							<Input
								fullWidth
								placeholder="Your comment.."
								value={commentInput}
								onChange={(e) => setCommentInput(e.target.value)}
							/>
						</form>
					</div>
					{task.comments.length > 0 && (
						<div className="comments-container">
							{task.comments.map((x) => (
								<CommentItem key={x.id} projectId={projectId} task={task} comment={x} />
							))}
						</div>
					)}
				</div>
				<Button
					color="red"
					as="button"
					small
					onClick={() => {
						onClose();
						dispatch(deleteTask({ projectId, taskId: task.id, board: task.board }));
					}}
				>
					Delete task
				</Button>
			</div>
		</Modal>
	);
};

const CommentItem: FC<{ comment: Comment; projectId: number; task: Task }> = ({ comment, projectId, task }) => {
	const [isOpenInput, setIsOpenInput] = useState(false);
	const [replyInput, setReplyInput] = useState("");

	const dispatch = useAppDispatch();

	return (
		<div className="comment">
			<div className="wrapper">
				<div className="message-header">
					<div className="author">{comment.author}</div>
					<div className="date">{dayjs(comment.createdAt).format("D MMMM, YYYY, HH:mm")}</div>
				</div>
				<div className="message">{comment.text}</div>
				<button type="button" className="reply-button" onClick={() => setIsOpenInput((current) => !current)}>
					{isOpenInput ? "Close" : "Reply"}
				</button>
				<div style={{ display: isOpenInput ? "block" : "none" }}>
					<form
						onSubmit={(e) => {
							e.preventDefault();

							dispatch(
								addTaskSubcomment({
									projectId,
									board: task.board,
									taskId: task.id,
									commentId: comment.id,
									comment: replyInput,
								})
							);
							setReplyInput("");
						}}
					>
						<Input
							small
							fullWidth
							value={replyInput}
							onChange={(e) => setReplyInput(e.target.value)}
							placeholder="Your reply.."
						/>
					</form>
				</div>
			</div>
			{comment.subcomments && (
				<div className="subcomments-container">
					<div className="line"></div>
					{comment.subcomments.map((subComment) => (
						<CommentItem key={subComment.id} projectId={projectId} task={task} comment={subComment} />
					))}
				</div>
			)}
		</div>
	);
};

export default TaskModal;

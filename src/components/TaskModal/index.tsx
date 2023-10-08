import { Editor } from "@tinymce/tinymce-react";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { Comment, Task } from "../../types";
import Input from "../Input";
import Loader from "../Loader";
import { Modal } from "../Modal";
import Timer from "../Timer";
import "./task-modal.scss";

type Priority = Task["priority"];
const possiblePriorities: Priority[] = ["Low", "Medium", "High"];

const TaskModal: FC<{ task: Task | null; opened: boolean; onClose: () => any }> = ({ task, opened, onClose }) => {
	const [title, setTitle] = useState(task?.title ?? "");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<Task["priority"]>("Low");

	const [editorLoaded, setEditorLoaded] = useState(false);

	const [subtaskInput, setSubtaskInput] = useState("");

	useEffect(() => {
		setTitle(task?.title ?? "");
		setDescription(task?.description ?? "");
		setPriority(task?.priority ?? "Low");
	}, [task, task?.description]);

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
						<div className="time">
							<p className="title">
								In work since:{" "}
								<span>
									<Timer startedAt={task.startedAt} />
								</span>
							</p>
						</div>
					</>
				)}
				<div className="priority">
					<p className="title">Priority:</p>
					<select onChange={(e) => setPriority(e.target.value as Priority)}>
						{possiblePriorities.map((priorityName) => (
							<option selected={priorityName === priority} key={priorityName} value="priorityName">
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
							task.subTasks.unshift({
								id: Math.ceil(Math.random() * 8428423424),
								title: subtaskInput,
								done: false,
								createdAt: new Date(),
							});
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
							<input id={`${task.id}-sub-task-${subTask.id}`} type="checkbox" />
							<label htmlFor={`${task.id}-sub-task-${subTask.id}`}>{subTask.title}</label>
							<button
								onClick={() => {
									// handle delete
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
						<div className="file add-file">
							<label className="name">
								<input type="file" name="uploadFile" />
								add new file
							</label>
						</div>
						{task.attachedFiles.map((x, i) => (
							<div className="file" key={i}>
								<a download href={x} className="name">
									{x}
								</a>
								<div className="delete-file">✕</div>
							</div>
						))}
					</div>
				</div>
				<div className="comments">
					<div className="title">Comments</div>
					<div className="comments-container">
						{task.comments.map((x) => (
							<CommentItem comment={x} key={x.createdAt.toString()} />
						))}
					</div>
				</div>
			</div>
		</Modal>
	);
};

const CommentItem: FC<{ comment: Comment }> = ({ comment }) => {
	const [isOpenInput, setIsOpenInput] = useState(false);
	const [replyInput, setReplyInput] = useState("");

	return (
		<div key={comment.createdAt.toString()} className="comment">
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
					<Input
						small
						fullWidth
						value={replyInput}
						onChange={(e) => setReplyInput(e.target.value)}
						placeholder="Your comment.."
					/>
				</div>
			</div>
			{comment.subcomments && (
				<div className="subcomments-container">
					<div className="line"></div>
					{comment.subcomments.map((subComment) => (
						<CommentItem comment={subComment} key={subComment.createdAt.toString()} />
					))}
				</div>
			)}
		</div>
	);
};

export default TaskModal;

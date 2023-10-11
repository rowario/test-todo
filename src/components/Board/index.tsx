import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, useState } from "react";
import { addTask } from "../../redux/actions";
import { useAppDispatch } from "../../redux/hooks";
import { Task, TaskBoard } from "../../types";
import Input from "../Input";
import Paper from "../Paper";
import TaskItem from "../TaskItem";
import "./board.scss";

const Board: FC<{
	projectId: number;
	tasks: Task[];
	filter: (task: Task) => boolean;
	title: string;
	board: TaskBoard;
	onTaskClick: (task: Task) => void;
}> = ({ projectId, tasks, filter, title, board, onTaskClick }) => {
	const [newTaskInput, setNewTaskInput] = useState("");

	const dispatch = useAppDispatch();

	const droppableId = `tasks-${board}`;

	const ucFirst = (string: string) =>
		string
			.split("")
			.map((x, i) => (i === 0 ? x.toUpperCase() : x))
			.join("");

	return (
		<Paper>
			<p className="tasks-title">{ucFirst(title)}</p>
			<div className="board-container">
				<form
					onSubmit={(e) => {
						e.preventDefault();

						if (newTaskInput.trim().length < 1) return;

						dispatch(addTask({ projectId, board, title: newTaskInput }));
						setNewTaskInput("");
					}}
				>
					<Input
						fullWidth
						value={newTaskInput}
						onChange={(e) => setNewTaskInput(e.target.value)}
						placeholder="Add task"
					/>
				</form>
				<Droppable droppableId={droppableId}>
					{(providedDrop) => (
						<div ref={providedDrop.innerRef} {...providedDrop.droppableProps} className={`tasks ${droppableId}`}>
							{tasks.filter(filter).map((task, index) => {
								const key = `drop-` + task.id.toString();
								return (
									<Draggable index={index} key={key} draggableId={key}>
										{(providedDrag) => (
											<TaskItem
												ref={providedDrag.innerRef}
												projectId={projectId}
												task={task}
												key={key}
												onClick={() => onTaskClick(task)}
												{...providedDrag.draggableProps}
												{...providedDrag.dragHandleProps}
											/>
										)}
									</Draggable>
								);
							})}
							{providedDrop.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</Paper>
	);
};

export default Board;

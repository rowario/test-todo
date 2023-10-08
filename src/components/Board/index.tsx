import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FC } from "react";
import { Task } from "../../types";
import Input from "../Input";
import Paper from "../Paper";
import TaskItem from "../TaskItem";

const Board: FC<{ tasks: Task[]; title: string; droppableId: string; onTaskClick: (task: Task) => void }> = ({
	tasks,
	title,
	droppableId,
	onTaskClick,
}) => {
	return (
		<Paper>
			<p className="tasks-title">{title}</p>
			<div className="project-container">
				<Input placeholder="Add task" />
				<Droppable droppableId={droppableId}>
					{(providedDrop) => (
						<div ref={providedDrop.innerRef} {...providedDrop.droppableProps} className={`tasks ${droppableId}`}>
							{tasks.map((task, index) => {
								const key = `drop-` + task.id.toString();
								return (
									<Draggable index={index} key={key} draggableId={key}>
										{(providedDrag) => (
											<TaskItem
												ref={providedDrag.innerRef}
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

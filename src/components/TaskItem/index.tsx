import { forwardRef } from "react";
import { toggleTaskSubtask } from "../../redux/actions";
import { useAppDispatch } from "../../redux/hooks";
import { Task } from "../../types";
import "./task-item.scss";

const TaskItem = forwardRef<HTMLDivElement, { projectId: number; task: Task; onClick?: () => any }>(
	({ projectId, task, ...rest }, ref) => {
		const dispatch = useAppDispatch();

		return (
			<div ref={ref} className="task" {...rest}>
				<p className="title">{task.title}</p>
				{task.subTasks.length > 0 && (
					<div className="sub-tasks">
						{task.subTasks.map((subTask) => (
							<div className="sub-task" key={subTask.id}>
								<input
									onClick={(e) => e.stopPropagation()}
									checked={subTask.done}
									onChange={(e) => {
										e.stopPropagation();
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
								<label onClick={(e) => e.stopPropagation()} htmlFor={`${task.id}-sub-task-${subTask.id}`}>
									{subTask.title}
								</label>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
);

export default TaskItem;

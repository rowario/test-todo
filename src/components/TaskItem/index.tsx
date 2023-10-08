import { forwardRef } from "react";
import { Task } from "../../types";
import "./task-item.scss";

const TaskItem = forwardRef<HTMLDivElement, { task: Task; onClick?: () => any }>(({ task, ...rest }, ref) => {
	return (
		<div ref={ref} className="task" {...rest}>
			<p>{task.title}</p>
			<div className="sub-tasks">
				{task.subTasks.map((subTask) => (
					<div className="sub-task" key={subTask.id}>
						<input onClick={(e) => e.stopPropagation()} id={`${task.id}-sub-task-${subTask.id}`} type="checkbox" />
						<label onClick={(e) => e.stopPropagation()} htmlFor={`${task.id}-sub-task-${subTask.id}`}>
							{subTask.title}
						</label>
					</div>
				))}
			</div>
		</div>
	);
});

export default TaskItem;

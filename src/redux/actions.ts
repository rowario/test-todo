import { Priority, TaskBoard } from "../types";

// Project Actions
type AddProjectAction = { type: "ADD_PROJECT"; payload: { title: string } };
type DeleteProjectAction = { type: "DELETE_PROJECT"; payload: { id: number } };
export type ProjectAction = AddProjectAction | DeleteProjectAction;

const addProject = (payload: { title: string }): AddProjectAction => ({ type: "ADD_PROJECT", payload });
const deleteProject = (payload: { id: number }): DeleteProjectAction => ({ type: "DELETE_PROJECT", payload });

// Task actions
type AddTaskAction = { type: "ADD_TASK"; payload: { projectId: number; board: TaskBoard; title: string } };
type MoveTaskAction = {
	type: "MOVE_TASK";
	payload: { projectId: number; oldBoard: TaskBoard; newBoard: TaskBoard; oldIndex: number; newIndex: number };
};
type DeleteTaskAction = {
	type: "DELETE_TASK";
	payload: { projectId: number; board: TaskBoard; taskId: number };
};
type UpdateTaskPriorityAction = {
	type: "UPDATE_TASK_PRIORITY";
	payload: { projectId: number; board: TaskBoard; taskId: number; priority: Priority };
};
type UpdateTaskTitleAction = {
	type: "UPDATE_TASK_TITLE";
	payload: { projectId: number; board: TaskBoard; taskId: number; title: string };
};
type UpdateTaskDescriptionAction = {
	type: "UPDATE_TASK_DESCRIPTION";
	payload: { projectId: number; board: TaskBoard; taskId: number; description: string };
};
type AddTaskCommentAction = {
	type: "ADD_TASK_COMMENT";
	payload: { projectId: number; board: TaskBoard; taskId: number; comment: string };
};
type AddTaskSubcommentAction = {
	type: "ADD_TASK_SUBCOMMENT";
	payload: { projectId: number; board: TaskBoard; taskId: number; comment: string; commentId: number };
};
type AddTaskSubtaskAction = {
	type: "ADD_TASK_SUBTASK";
	payload: { projectId: number; board: TaskBoard; taskId: number; title: string };
};
type ToggleTaskSubtaskAction = {
	type: "TOGGLE_TASK_SUBTASK";
	payload: { projectId: number; board: TaskBoard; taskId: number; subtaskId: number };
};
type DeleteTaskSubtaskAction = {
	type: "DELETE_TASK_SUBTASK";
	payload: { projectId: number; board: TaskBoard; taskId: number; subtaskId: number };
};
export type TaskAction =
	| AddTaskAction
	| MoveTaskAction
	| DeleteTaskAction
	| UpdateTaskPriorityAction
	| UpdateTaskTitleAction
	| UpdateTaskDescriptionAction
	| AddTaskCommentAction
	| AddTaskSubcommentAction
	| AddTaskSubtaskAction
	| ToggleTaskSubtaskAction
	| DeleteTaskSubtaskAction;

const addTask = (payload: { projectId: number; board: TaskBoard; title: string }): AddTaskAction => ({
	type: "ADD_TASK",
	payload,
});

const moveTask = (payload: {
	projectId: number;
	oldBoard: TaskBoard;
	newBoard: TaskBoard;
	oldIndex: number;
	newIndex: number;
}): MoveTaskAction => ({
	type: "MOVE_TASK",
	payload,
});

const deleteTask = (payload: { projectId: number; board: TaskBoard; taskId: number }): DeleteTaskAction => ({
	type: "DELETE_TASK",
	payload,
});

const updateTaskPriority = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	priority: Priority;
}): UpdateTaskPriorityAction => ({ type: "UPDATE_TASK_PRIORITY", payload });

const updateTaskTitle = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	title: string;
}): UpdateTaskTitleAction => ({ type: "UPDATE_TASK_TITLE", payload });

const updateTaskDescription = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	description: string;
}): UpdateTaskDescriptionAction => ({ type: "UPDATE_TASK_DESCRIPTION", payload });

const addTaskComment = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	comment: string;
}): AddTaskCommentAction => ({ type: "ADD_TASK_COMMENT", payload });

const addTaskSubcomment = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	comment: string;
	commentId: number;
}): AddTaskSubcommentAction => ({ type: "ADD_TASK_SUBCOMMENT", payload });

const addTaskSubtask = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	title: string;
}): AddTaskSubtaskAction => ({ type: "ADD_TASK_SUBTASK", payload });

const toggleTaskSubtask = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	subtaskId: number;
}): ToggleTaskSubtaskAction => ({ type: "TOGGLE_TASK_SUBTASK", payload });

const deleteTaskSubtask = (payload: {
	projectId: number;
	board: TaskBoard;
	taskId: number;
	subtaskId: number;
}): DeleteTaskSubtaskAction => ({ type: "DELETE_TASK_SUBTASK", payload });

export {
	addProject,
	deleteProject,
	addTask,
	moveTask,
	deleteTask,
	updateTaskPriority,
	updateTaskTitle,
	updateTaskDescription,
	addTaskComment,
	addTaskSubcomment,
	addTaskSubtask,
	toggleTaskSubtask,
	deleteTaskSubtask,
};
export type Action = ProjectAction | TaskAction;

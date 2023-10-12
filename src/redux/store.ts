import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore, Reducer } from "redux";
import { Comment, Project, Task } from "../types";
import { Action } from "./actions";
import rootSaga from "./rootSaga";

export type State = {
	lastProjectId: number;
	projects: Project[];
};

const defaultState: State = {
	lastProjectId: 0,
	projects: [],
};

const storageKey = "todo-app-state";

const storageData = localStorage.getItem(storageKey);

const initialState = storageData ? (JSON.parse(storageData) as State) : defaultState;

const appReducer: Reducer<State, Action> = (state = initialState, { type, payload }) => {
	switch (type) {
		case "ADD_PROJECT":
			const id = state.lastProjectId + 1;
			return {
				...state,
				lastProjectId: id,
				projects: [
					{
						id,
						name: payload.title,
						lastTaskId: 0,
						tasks: { queue: [], development: [], done: [] },
						createdAt: new Date(),
					},
					...state.projects,
				],
			};
		case "DELETE_PROJECT":
			return {
				...state,
				projects: state.projects.filter((project) => project.id !== payload.id),
			};
		case "ADD_TASK":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						const id = project.lastTaskId + 1;
						const newTask: Task = {
							id,
							board: payload.board,
							title: payload.title,
							description: "",
							priority: "Low",
							attachedFiles: [],
							lastSubtaskId: 0,
							subTasks: [],
							lastCommentId: 0,
							comments: [],
							createdAt: new Date(),
							startedAt: payload.board !== "queue" ? new Date() : null,
							endedAt: payload.board === "done" ? new Date() : null,
						};
						return {
							...project,
							lastTaskId: id,
							tasks: {
								...project.tasks,
								[payload.board]: [newTask, ...project.tasks[payload.board]],
							},
						};
					}
					return project;
				}),
			};
		case "MOVE_TASK":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						const [task] = project.tasks[payload.oldBoard].splice(payload.oldIndex, 1);
						task.board = payload.newBoard;
						if (payload.newBoard === "queue") {
							task.startedAt = null;
							task.endedAt = null;
						} else if (payload.newBoard === "development") {
							task.startedAt = new Date();
						} else if (payload.newBoard === "done") {
							task.endedAt = new Date();
						}
						project.tasks[payload.newBoard].splice(payload.newIndex, 0, task);

						return project;
					}
					return project;
				}),
			};
		case "UPDATE_TASK_PRIORITY":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									if (task.id === payload.taskId) {
										task.priority = payload.priority;
										return task;
									}
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "UPDATE_TASK_TITLE":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									if (task.id === payload.taskId) {
										task.title = payload.title;
										return task;
									}
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "UPDATE_TASK_DESCRIPTION":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									if (task.id === payload.taskId) {
										task.description = payload.description;
										return task;
									}
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "ADD_TASK_COMMENT":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									const id = task.lastCommentId + 1;
									task.lastCommentId = id;
									task.comments.unshift({
										id,
										author: "User",
										text: payload.comment,
										createdAt: new Date(),
										subcomments: [],
									});
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "ADD_TASK_SUBCOMMENT":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									const id = task.lastCommentId + 1;
									task.lastCommentId = id;
									const recursiveUpdate = (comment: Comment): Comment => {
										if (comment.id === payload.commentId) {
											comment.subcomments.unshift({
												id,
												author: "User",
												text: payload.comment,
												createdAt: new Date(),
												subcomments: [],
											});
										}
										if (comment.subcomments.length > 0) {
											comment.subcomments = comment.subcomments.map(recursiveUpdate);
										}
										return comment;
									};
									task.comments = task.comments.map(recursiveUpdate);
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "ADD_TASK_SUBTASK":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									if (task.id === payload.taskId) {
										const id = task.lastSubtaskId + 1;
										task.lastSubtaskId = id;
										task.subTasks = [
											{ id, title: payload.title, done: false, createdAt: new Date() },
											...task.subTasks,
										];
									}
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "TOGGLE_TASK_SUBTASK":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id !== payload.projectId) return project;

					return {
						...project,
						tasks: {
							...project.tasks,
							[payload.board]: [
								...project.tasks[payload.board].map((task) => {
									if (task.id === payload.taskId) {
										task.subTasks = task.subTasks.map((subtask) => {
											if (subtask.id === payload.subtaskId) {
												subtask.done = !subtask.done;
											}
											return subtask;
										});
									}
									return task;
								}),
							],
						},
					};
				}),
			};
		case "DELETE_TASK_SUBTASK":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									if (task.id === payload.taskId) {
										task.subTasks = task.subTasks.filter((subtask) => subtask.id !== payload.subtaskId);
									}
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "UPLOAD_TASK_FILE_SUCCESS":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									task.attachedFiles.push(payload.fileUrl);
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "DELETE_TASK_FILE":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].map((task) => {
									task.attachedFiles.splice(payload.fileIndex, 1);
									return task;
								}),
							},
						};
					}
					return project;
				}),
			};
		case "DELETE_TASK":
			return {
				...state,
				projects: state.projects.map((project) => {
					if (project.id === payload.projectId) {
						return {
							...project,
							tasks: {
								...project.tasks,
								[payload.board]: project.tasks[payload.board].filter((task) => task.id !== payload.taskId),
							},
						};
					}
					return project;
				}),
			};
		default:
			return state;
	}
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(appReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
	localStorage.setItem(storageKey, JSON.stringify(store.getState()));
});

export type AppDispatch = typeof store.dispatch;

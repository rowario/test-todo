export type SubTask = {
	id: number;
	title: string;
	done: boolean;
	createdAt: Date;
};

export type Comment = {
	id: number;
	author: string;
	text: string;
	subcomments: Comment[];
	createdAt: Date;
};

export type Priority = "High" | "Medium" | "Low";

export type Task = {
	id: number;
	board: TaskBoard;
	title: string;
	description: string;
	priority: Priority;
	attachedFiles: string[];
	lastSubtaskId: number;
	subTasks: SubTask[];
	lastCommentId: number;
	comments: Comment[];
	createdAt: Date;
	startedAt: Date | null;
	endedAt: Date | null;
};

export type Project = {
	id: number;
	name: string;
	createdAt: Date;
	lastTaskId: number;
	tasks: {
		queue: Task[];
		development: Task[];
		done: Task[];
	};
};

export type TaskBoard = keyof Project["tasks"];

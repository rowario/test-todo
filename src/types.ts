export type Task = {
	id: number;
	title: string;
	description: string;
	priority: "High" | "Medium" | "Low";
	attachedFiles: string[];
	subTasks: SubTask[];
	comments: Comment[];
	createdAt: Date;
	startedAt: Date;
	endedAt: Date;
};

export type SubTask = {
	id: number;
	title: string;
	done: boolean;
	createdAt: Date;
};

export type Comment = {
	author: string;
	text: string;
	subcomments?: Comment[];
	createdAt: Date;
};

export type Project = {
	id: number;
	name: string;
	createdAt: Date;
	tasks: {
		queue: Task[];
		development: Task[];
		done: Task[];
	};
};

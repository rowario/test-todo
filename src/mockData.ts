import { Project } from "./types";

export const projects: Project[] = [
	{
		id: 1,
		name: "Project 1",
		createdAt: new Date(),
		tasks: {
			queue: [
				{
					id: 1,
					title: "Task 1",
					description: "Description for Task 1",
					priority: "Low",
					attachedFiles: ["file2.jpg", "file3.pdf"],
					subTasks: [
						{
							id: 1,
							title: "Subtask 1",
							done: false,
							createdAt: new Date(),
						},
						{
							id: 2,
							title: "Subtask 2",
							done: false,
							createdAt: new Date(),
						},
					],
					comments: [
						{
							author: "User1",
							text: "Comment 1",
							createdAt: new Date(),
							subcomments: [
								{
									author: "User2",
									text: "Sub Comment 2",
									createdAt: new Date(),
									subcomments: [
										{
											author: "User3",
											text: "Sub Comment 3",
											createdAt: new Date(),
											subcomments: [],
										},
									],
								},
								{
									author: "User2",
									text: "Sub Comment 2",
									createdAt: new Date(),
									subcomments: [],
								},
							],
						},
					],
					createdAt: new Date(),
					startedAt: new Date(),
					endedAt: new Date(),
				},
				{
					id: 2,
					title: "Task 2",
					description: "Description for Task 2",
					priority: "High",
					attachedFiles: ["file1.pdf"],
					subTasks: [
						{
							id: 1,
							title: "Subtask 1",
							done: false,
							createdAt: new Date(),
						},
					],
					comments: [
						{
							author: "User1",
							text: "Comment 1",
							createdAt: new Date(),
						},
					],
					createdAt: new Date(),
					startedAt: new Date(),
					endedAt: new Date(),
				},
			],
			development: [],
			done: [],
		},
	},
	{
		id: 2,
		name: "Project 2",
		createdAt: new Date(),
		tasks: {
			queue: [],
			development: [],
			done: [],
		},
	},
];

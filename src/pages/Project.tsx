import { FC, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import { projects } from "../mockData";
import "./project.scss";
import { Task, Project as ProjectType } from "../types";
import TaskModal from "../components/TaskModal";
import Board from "../components/Board";
import Button from "../components/Button";
import Input from "../components/Input";

type TaskType = keyof ProjectType["tasks"];
const boards: TaskType[] = ["queue", "development", "done"];

export const Project: FC = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const project = projects.find((x) => x.id === parseInt(projectId ?? ""));
	const [tasks, setTasks] = useState(project!.tasks);
	const [taskModalOpened, setTaskModalOpened] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	const [searchInput, setSearchInput] = useState("");

	const handleTaskClick = (task: Task) => {
		setSelectedTask(task);
		setTaskModalOpened(true);
	};

	if (!project) {
		return null;
	}

	return (
		<>
			<Header>
				<div>
					<Button to="/" as={Link}>
						Back
					</Button>
				</div>
				<div>
					<Input
						fullWidth
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder="Search for task.."
					/>
				</div>
				<div>
					<p>{project.name}</p>
				</div>
			</Header>
			<TaskModal task={selectedTask} opened={taskModalOpened} onClose={() => setTaskModalOpened(false)} />
			<Container>
				<DragDropContext
					onDragEnd={(result) => {
						const { destination, source } = result;

						if (!destination) return;

						const from: TaskType = source.droppableId.replace("tasks-", "") as TaskType;
						const to = destination.droppableId.replace("tasks-", "") as TaskType;

						const tempTasks = { ...tasks };

						const object = tempTasks[from].splice(source.index, 1);
						tempTasks[to].splice(destination.index, 0, object[0]);

						setTasks(tempTasks);
					}}
				>
					<div className="tasks-grid">
						{boards.map((board) => (
							<div className="tasks-column">
								<Board
									tasks={tasks[board]}
									title={board}
									droppableId={`tasks-${board}`}
									onTaskClick={handleTaskClick}
								/>
							</div>
						))}
					</div>
				</DragDropContext>
			</Container>
		</>
	);
};

import { FC, useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import "./project.scss";
import { Task, TaskBoard } from "../types";
import TaskModal from "../components/TaskModal";
import Board from "../components/Board";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteProject, moveTask } from "../redux/actions";
import { selectProject } from "../redux/selectors";

const boards: TaskBoard[] = ["queue", "development", "done"];

export const Project: FC = () => {
	const [taskModalOpened, setTaskModalOpened] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	const [searchInput, setSearchInput] = useState("");

	const params = useParams<{ projectId: string }>();
	const projectId = parseInt(params.projectId ?? "0");

	const project = useAppSelector(selectProject(projectId));
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleTaskClick = (task: Task) => {
		setSelectedTask(task);
		setTaskModalOpened(true);
	};

	const taskFilter = (task: Task) => {
		if (Number.isFinite(parseInt(searchInput))) {
			return task.id === parseInt(searchInput) || task.title.toLowerCase().includes(searchInput.toLowerCase());
		} else {
			return task.title.toLowerCase().includes(searchInput.toLowerCase());
		}
	};

	useEffect(() => {
		if (!project) navigate("/");
	}, [project]);

	if (!project) return null;

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
						placeholder="Title or ID.."
					/>
				</div>
				<div
					style={{
						display: "flex",
						gap: 10,
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<p>{project.name}</p>
					<Button
						color="red"
						onClick={() => {
							navigate("/");
							dispatch(deleteProject({ id: projectId }));
						}}
					>
						Delete
					</Button>
				</div>
			</Header>
			<TaskModal
				projectId={projectId}
				task={selectedTask}
				opened={taskModalOpened}
				onClose={() => setTaskModalOpened(false)}
			/>
			<Container>
				<DragDropContext
					onDragEnd={(result) => {
						const { destination, source } = result;
						if (!destination) return;

						const oldBoard = source.droppableId.replace("tasks-", "") as TaskBoard;
						const newBoard = destination.droppableId.replace("tasks-", "") as TaskBoard;

						dispatch(
							moveTask({ projectId, oldBoard, newBoard, oldIndex: source.index, newIndex: destination.index })
						);
					}}
				>
					<div className="tasks-grid">
						{boards.map((board) => (
							<div key={board} className="tasks-column">
								<Board
									projectId={projectId}
									tasks={project.tasks[board]}
									filter={taskFilter}
									title={board}
									board={board}
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

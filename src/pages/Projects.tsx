import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Paper from "../components/Paper";
import { addProject } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLastProjectId, selectProjects } from "../redux/selectors";
import "./projects.scss";

export const Projects: FC = () => {
	const projects = useAppSelector(selectProjects);
	const lastProjectId = useAppSelector(selectLastProjectId);

	const dispatch = useAppDispatch();

	return (
		<>
			<Header>
				<div />
				<div>
					<p>All projects</p>
				</div>
				<div />
			</Header>
			<Container>
				<div className="projects-list">
					<div
						className="project-item add"
						onClick={() => dispatch(addProject({ title: `Project ${lastProjectId + 1}` }))}
					>
						<Paper>Create project</Paper>
					</div>
					{projects.map((x) => (
						<Link key={x.id} to={`/project/${x.id}`} className="project-item">
							<Paper>{x.name}</Paper>
						</Link>
					))}
				</div>
			</Container>
		</>
	);
};

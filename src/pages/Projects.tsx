import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Paper from "../components/Paper";
import { projects } from "../mockData";
import "./projects.scss";

export const Projects: FC = () => {
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

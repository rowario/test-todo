import "@fontsource/roboto";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Project } from "./pages/Project";
import { Projects } from "./pages/Projects";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Projects />} />
				<Route path="/project/:projectId" element={<Project />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

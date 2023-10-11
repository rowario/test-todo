import "@fontsource/roboto";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Project } from "./pages/Project";
import { Projects } from "./pages/Projects";
import { store } from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Projects />} />
					<Route path="/project/:projectId" element={<Project />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

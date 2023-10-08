import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <>index page</>,
	},
	{
		path: "/projects",
		element: <>projects page</>,
	},
	{
		path: "/project/:projectId",
		element: <>project info page</>,
	},
]);

import { State } from "./store";

export const selectProjects = (state: State) => state.projects;
export const selectLastProjectId = (state: State) => state.lastProjectId;
export const selectProject = (id: number) => (state: State) => state.projects.find((project) => project.id === id);

// export const selectTask = (projectId: number, board,taskId: number) => (state: State) => state.projects.find(x => x.id == projectId)?.tasks.

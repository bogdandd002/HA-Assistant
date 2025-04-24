import { create } from "zustand";
import { ProjectDetails } from "../interfaces";

interface ProjectState {
  project: ProjectDetails;
  setProjectState: (project: ProjectDetails) => void;
}

const useProjectDetails = create<ProjectState>()((set) => ({
  project: {
    project_id: "",
    project_name: "",
    project_number: 0,
  },
  setProjectState: (project: ProjectDetails) =>
    set((state) => ({
      project: project,
    })),
}));

export default  useProjectDetails ;



import { create } from "zustand";
import { ColumnsControl, ProjectDetails } from "../interfaces";
import { persist } from "zustand/middleware";

interface ProjectState {
  project: ProjectDetails;
  setProjectState: (project: ProjectDetails) => void;
}

export const useProjectDetails = create<ProjectState>()(
  persist(
      (set) => ({
  project: {
    project_id: "",
    project_name: "",
    project_number: 0,
  },
  setProjectState: (project: ProjectDetails) =>
    set(() => ({
      project: project,
    })),
}),
{
  name: 'projState'
}
  )
);

interface ColumnsState {
  columnsControl : ColumnsControl;
  setColumnsState: (columnsControl: ColumnsControl) => void;
}

export const useSelectColumns = create<ColumnsState>()(
  persist(
      (set) => ({
        columnsControl : {
          proj_nr_users: false,
          proj_nr_contractors: false,
          wa_name: false,
          wa_contractor: false,
          wa_rev_exp: false,
          user_super: false,
          contracor_nr_users: false,
        },
  setColumnsState: (columnsControl: ColumnsControl) =>
    set(() => ({
  columnsControl: columnsControl
    })),
}),
{
  name: 'columnsControl'
}
  )
);




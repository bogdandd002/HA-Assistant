import { create } from "zustand";
import { ColumnsControl, ProjectDetails } from "../interfaces/cutom_types/custom_types";
import { persist } from "zustand/middleware";

// Set project stated when selected by user - store start below

interface ProjectStateActions {
  project: ProjectDetails;
  setProjectState: (project: ProjectDetails) => void;
  reset: () => void;
}

const projectInitialState: ProjectDetails = {
    project_id: "",
    project_name: "",
    project_number: 0,
}

export const useProjectDetails = create<ProjectDetails & ProjectStateActions>()(
  persist(
      (set) => ({
        ...projectInitialState,
  project: {
    project_id: "",
    project_name: "",
    project_number: 0,
  },
  setProjectState: (project: ProjectDetails) =>
    set(() => ({
      project: project,
    })),
    reset: () => {
      set(projectInitialState)
    },
}),
{
  name: 'projState'
}
  )
);
// end of set project store
// Set which columns to hide based on user role - store start below

interface ColumnsStateActions {
  columnsControl : ColumnsControl;
  setColumnsState: (columnsControl: ColumnsControl) => void;
  reset: () => void
}

const columnsInitialState: ColumnsControl = {
  proj_nr_users: false,
  proj_nr_contractors: false,
  wa_name: false,
  wa_contractor: false,
  wa_rev_exp: false,
  user_super: false,
  contracor_nr_users: false,
}

export const useSelectColumns = create<ColumnsControl & ColumnsStateActions>()(
  persist(
      (set) => ({
        ...columnsInitialState,
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
    reset: () => {
      set(columnsInitialState)
    },
}),
{
  name: 'columnsControl'
}
  )
);
// end of columns select store



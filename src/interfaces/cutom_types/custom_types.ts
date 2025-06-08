import { IProject } from "../data/data";

export type ColumnsControl = {
  proj_nr_users: boolean;
  proj_nr_contractors: boolean;
  wa_name: boolean;
  wa_contractor: boolean;
  wa_rev_exp: boolean;
  user_super: boolean;
  contracor_nr_users: boolean;
};

export type ProjectDetails = {
  project_id?: string;
  project_name?: string;
  project_number?: number;
}


export type UserDetails = {
  id: string | number,
  documentId: string,
  name: string,
  surname: string,
  projects: IProject[],
  email: string,
  user_role: string,
  contractor_documentId: string,
  contractor_id: number,
}

import { Status } from "../cutom_types/custom_types";
import { IUser } from "../user/user";

export interface IContractor {
  id: number;
  documentId: string;
  name: string;
  address: string;
  activity: string;
  contact_person: IContactPerson[];
  project: IProject[];
  start_on_project: Date;
  max_nr_users: number;
  completed_project: boolean;
  work_for: IContractor[];
}

export interface IContactPerson {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: number;
}

export interface IProject {
  id: number;
  documentId: string;
  project_nr: number;
  name: string;
  address: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  contractors: IContractor[];
  work_activity: IWorkActivity[];
  contact_person: IContactPerson[];
}

export interface IWorkActivity {
  id: number;
  documentId: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  approval_status: Status;
  ra_title: string;
  ra_description: string;
  ra_revision: number;
  ra_revision_date: Date;
  ra_approval_status: Status;
  ra_file_url: string;
  ra_file_id: string;
  ms_title: string;
  ms_description: string;
  ms_revision: number;
  ms_revision_date: Date;
  ms_approval_status: Status;
  ms_file_url: string;
  ms_file_id: string;
  contractor: IContractor;
  project: IProject;
  created_by_user: string;
}

export interface ISignSheet {
  id: number;
  documentId: string;
  name: string;
  surname: string;
  trade: string;
  email: string;
  confirmation: boolean;
  signature: string;
  work_activity: IWorkActivity;
  ms_revision: number;
  ra_revision: number;
}

export interface IComment {
  id: number;
  documentId: string;
  general_comment: string; 
  work_activity: IWorkActivity;
  user: IUser;
  wa_comment_type: Comment;
  ra_comment: string;
  ra_comment_type: Comment;
  ms_comment: string;
  ms_comment_type: Comment;
}


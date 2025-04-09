
export interface IContractor {
    documentId: string;
    name: string;
    address: string;
    activity: string;
    contact_person: IContactPerson[];
    project: IProject[]
}

export interface IContactPerson {
    id: number;
    name: string;
    position: string;
    email: string;
    phone: number;
}

export interface IProject {
    documentId: string;
    project_nr: number;
    name: string;
    address: string;
    start_date: Date;
    end_date: Date;
    contractors: IContractor[];
    work_activity: IWorkActivity[];
    contact_person: IContactPerson[];
}

export interface IWorkActivity {
    documentId: string;
    title: string;
    description: string;
    start_date: Date;
    duration: number;
    approval_status: string;
    ra_title: string;
    ra_description: string;
    ra_revision: number;
    ra_revision_date: Date;
    ra_approval_status: string;
    ra_file?: null | { url: string };
    ra_file_url: string;
    ra_file_id: string;
    ms_title: string;
    ms_description: string;
    ms_revision: number;
    ms_revision_date: Date;
    ms_approval_status: string;
    ms_file?: null | { url: string };
    ms_file_url: string;
    ms_file_id: string;
    contractor: IContractor;
    project: IProject;
}

export interface IMethodStatement {
    documentId: string;
    title: string;
    descrition: string;
    revision: number;
    revision_date: Date;
    approval_status: string;
    project: IProject;
    contractor: IContractor;
    work_activity: IWorkActivity;
    files: Buffer;
}

export interface IRiskAssessment {
    documentId: string;
    title: string;
    descrition: string;
    revision: number;
    revision_date: Date;
    approval_status: string;
    project: IProject;
    contractor: IContractor;
    work_activity: IWorkActivity;
    files: Buffer
}

export interface UploadFile {
    name: string;
    url: string;
    size: number;
    uid: string;
    type: string;
  }
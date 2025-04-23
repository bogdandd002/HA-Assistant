
export interface IContractor {
    id: number;
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
    id: number;
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
    id: number;
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
    ra_file_url: string;
    ra_file_id: string;
    ms_title: string;
    ms_description: string;
    ms_revision: number;
    ms_revision_date: Date;
    ms_approval_status: string;
    ms_file_url: string;
    ms_file_id: string;
    contractor: IContractor;
    project: IProject;
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

interface ProjectDetails {
    project_id: string;
    project_name: string;
    project_number: number;
  }
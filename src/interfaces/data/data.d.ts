
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
    contractors: IContractor;
    work_activity: IWorkActivity;
    contact_person: IContactPerson;
}
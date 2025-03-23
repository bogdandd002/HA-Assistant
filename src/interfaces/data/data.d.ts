
export interface IContractor {
    documentId: number;
    name: string;
    address: string;
    activity: string;
    contact_people: IContactPerson[];
    project: IProject
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
    project_nr: number;
    name: string;
    address: string;
    contractors: IContractor[];
    start_date: Date;
    end_date: Date;
}
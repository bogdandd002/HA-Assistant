
import { IProject, IContractor } from "../data/data";


export interface IUser{
    id: number;
    documentId: string;
    name: string;
    surname: string;
    position: string;
    username: string;
    email: string;
    contractor_documentId: string;
    contractor_id: number;
    avatar?: string;
    user_role?: string;
    contractor: IContractor;
    projects: IProject[] ;
    is_superuser: boolean;
    last_logged: Date;

}

export interface IRole{
    id: number;
    documentId: string;
    name: string;
    description: string;
}

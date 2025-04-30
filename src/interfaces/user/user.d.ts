import { IProject } from "../data/data";


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
    projects: string[] ;
    is_superuser: boolean;
    last_logged: Date;

}

export interface IRole{
    id: number;
    documentId: string;
    name: string;
    description: string;
}

interface UserDetails {
    id: string | number,
    username: string,
    email: string,
    user_role: string,
    contractor_documentId: string,
    contractor_id: number
}
import { IContractor } from "../data/data";

export interface IUser{
    id: number;
    documentId: string;
    username: string;
    email: string;
    contractor: IContractor;
    avatar?: string;
    user_role?: string;
}

export interface IUser{
    id: number;
    documentId: string;
    name: string;
    surname: string;
    position: string;
    username: string;
    email: string;
    contractor_documentId: string;
    avatar?: string;
    user_role?: string;
}
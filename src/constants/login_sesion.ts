import { UserDetails } from "../interfaces"

export const userSesion: UserDetails = {
    id: "",
    username: "",
    email: "",
    user_role: "",
    contractor_documentId: "",
    contractor_id: -1,
}

export const setUserSesion = {
    setSesion ( user: UserDetails ) {
        userSesion.id = user.id;
        userSesion.username = user.username;
        userSesion.email = user.email;
        userSesion.user_role = user.user_role;
        userSesion.contractor_documentId = user.contractor_documentId;
        userSesion.contractor_id = user.contractor_id;
    }
}
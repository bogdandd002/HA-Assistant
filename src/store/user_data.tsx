import { create } from "zustand";
import { IUser } from "../interfaces";
import { useGetIdentity } from "@refinedev/core";

interface UserDetails {
        id: string,
        username: string,
        email: string,
        user_role: string,
        contractor_documentId: string,
        contractor_id: number
}

interface UserState {
        user: UserDetails,
        setUserState: (user: UserDetails ) => void
}

const useGetUserIdentity = create<UserState>()((set) => ({
user:{
  id: "",
    username: "",
    email: "",
    user_role: "",
    contractor_documentId: "",
    contractor_id: -1,
},
    
  setUserState: (logeduser: UserDetails) =>
    set((state: any) => ({
      user: logeduser,
     }))
  
})
);

// const useAuth = () => {
//   const { user, login, logout } = useAuthStore();
//   return { user, login, logout };
// };

export default useGetUserIdentity;

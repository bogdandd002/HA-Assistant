import { create } from "zustand";
import { IUser } from "../interfaces";
import { useGetIdentity } from "@refinedev/core";

const useGetUserIdentity = create((set) => ({
  user: {
    contractor_documentId: "",
    contractor_id: null,
    email: "",
    id: null,
    user_role: "",
    username: "",
  },
  getIdentity: (logeduser: any) =>
    set((state: any) => ({
      use: { ...state.user, ...logeduser } ,
     }))
  
})
);

// const useAuth = () => {
//   const { user, login, logout } = useAuthStore();
//   return { user, login, logout };
// };

export default useGetUserIdentity;

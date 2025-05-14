import { create } from "zustand";
import { UserDetails } from "../interfaces/cutom_types/custom_types";
import { persist } from 'zustand/middleware'

interface UserState {
  user: UserDetails;
  setUserState: (user: UserDetails) => void;
}

const useGetUserIdentity = create<UserState>()(
  persist(
(set) => ({
  user: {
    id: "",
    projects: [],
    email: "",
    user_role: "",
    contractor_documentId: "",
    contractor_id: -1,
  },

  setUserState: (logeduser: UserDetails) => 
    set(() => ({
      user: logeduser,
    })),
}),
{
  name: 'user_state',
}

  )
  );

// const useAuth = () => {
//   const { user, login, logout } = useAuthStore();
//   return { user, login, logout };
// };

export default useGetUserIdentity;

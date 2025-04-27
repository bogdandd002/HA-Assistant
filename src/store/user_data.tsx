import { create } from "zustand";
import { UserDetails } from "../interfaces";

interface UserState {
  user: UserDetails;
  setUserState: (user: UserDetails) => void;
}

const useGetUserIdentity = create<UserState>()((set) => ({
  user: {
    id: "",
    username: "",
    email: "",
    user_role: "",
    contractor_documentId: "",
    contractor_id: -1,
  },

  setUserState: (logeduser: UserDetails) =>
    set(() => ({
      user: logeduser,
    })),
}));

// const useAuth = () => {
//   const { user, login, logout } = useAuthStore();
//   return { user, login, logout };
// };

export default useGetUserIdentity;

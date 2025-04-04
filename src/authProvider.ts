import type { AuthProvider } from "@refinedev/core";
import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "./constants";

export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL + "/api");

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, status } = await strapiAuthHelper.login(email, password);
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);

      // set header axios instance
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.jwt}`;

      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("selected_project_name");
    localStorage.removeItem("selected_project_id");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async (): Promise<string> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return "Noroleandnotlogin";
    }
    // fetching user role from strapi by making an extra call - explore for aternative in the future
      const response = await fetch('http://localhost:1337/api/users/me?populate=role', {
      headers: {
          authorization: `Bearer ${token}`,
        }})
      const {role: role} = await response.json();
      const {name: user_role} = role;

      return user_role
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }
    // fetching user role from strapi by making an extra call - explore for aternative in the future
      const response = await fetch('http://localhost:1337/api/users/me?populate=role', {
      headers: {
          authorization: `Bearer ${token}`,
        }})
      const {role: role} = await response.json();
      const {name: user_role} = role;
    
    const { data, status } = await strapiAuthHelper.me(token);
    if (status === 200) {
      const { id, username, email } = data;
      return {
        id,
        name: username,
        email,
        user_role
      };
    }

    return null;
  },
};

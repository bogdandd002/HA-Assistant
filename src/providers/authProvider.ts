import type { AuthProvider, IdentityResponse } from "@refinedev/core";
import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "../constants/constants";
import useGetUserIdentity from "../store/user_data";
import { UserDetails } from "../interfaces/cutom_types/custom_types";
import * as setColumns from "../constants/tables_columns_selection";
import { setUserSesion, userSesion } from "../constants/login_sesion";
import { useProjectDetails, useSelectColumns } from "../store/app_data";

export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL + "/api");
const null_data: UserDetails = userSesion;

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, status } = await strapiAuthHelper.login(email, password);
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);
       authProvider.getIdentity?.();
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
    localStorage.clear();
    useSelectColumns.getInitialState;
    useProjectDetails.getInitialState;
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
    // fetching user role from strapi by making an extra call 
    const response = await fetch(
      "http://localhost:1337/api/users/me?populate=role",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const { role: role } = await response.json();
    const { name: user_role } = role;

    return user_role;
  },

  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null_data;
    }
    // fetching user role from strapi by making an extra call - explore for aternative in the future
    const response = await fetch(
      "http://localhost:1337/api/users/me?populate[0]=role&populate[1]=contractor&populate[2]=projects",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const { role: role, contractor: contractor, projects: projects, documentId, email, name, surname } = await response.json();
    const { name: user_role } = role;
    const { documentId: contractor_documentId, id: contractor_id, max_nr_users} = contractor;

    const { data, status } = await strapiAuthHelper.me(token);
    if (status === 200) {
      const {id, email } = data;
      const user_data: UserDetails = {
        id,
        documentId,
        name, 
        surname,
        projects,
        email,
        user_role,
        contractor_documentId,
        contractor_id,
        
      };

      // set table columns display based on user roles
        switch (user_role) {
        case "Contractor": {
          useSelectColumns.getState().setColumnsState(setColumns.setC)
          break;
        }
        case "Contractor_super": {
          useSelectColumns.getState().setColumnsState(setColumns.setCS)
          break;
        }
        case "Main_contractor_super": {
          useSelectColumns.getState().setColumnsState(setColumns.setMCS)
          break;
        }
        case "Main_contractor": {
          useSelectColumns.getState().setColumnsState(setColumns.setMC)
          break;
        }
        default: {
          useSelectColumns.getState().setColumnsState(setColumns.setAdmin)
          break;
        }
      }
      setUserSesion.setSesion(user_data);
      useGetUserIdentity.getState().setUserState(user_data);
      return user_data;
    } else {
      return null_data;
    }
  },
};

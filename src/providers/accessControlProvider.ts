import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";
import { adapter, model } from "../casbin/accessControl";
import useGetUserIdentity from "../store/user_data";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    const data = await useGetUserIdentity.getState().user;
    const enforcer = await newEnforcer(model, adapter);
    const can = await enforcer.enforce(data.user_role, resource, action);

    return Promise.resolve({
      can,
    });
  },
};

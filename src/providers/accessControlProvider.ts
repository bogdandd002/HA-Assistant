import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";
import { adapter, model } from "../casbin/accessControl";
import { authProvider } from "../authProvider";

export const accessControlProvider = {
    can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
                        const  role  = await authProvider.getIdentity?.();
                        const enforcer = await newEnforcer(model, adapter);
                        const can = await enforcer.enforce(role, resource, action);
                        console.log(role)
                        return Promise.resolve({
                          can,
                        });
                      },
   
};
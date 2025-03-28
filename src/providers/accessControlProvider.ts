import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";
import { adapter, model } from "../casbin/accessControl";

export const accessControlProvider = {
    can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
                        const enforcer = await newEnforcer(model, adapter);
                        const can = await enforcer.enforce("admin", resource, action);
                    
                        return Promise.resolve({
                          can,
                        });
                      },
   
};
// from this file table columns are set to display or hide based on user role. Selection happens in authProvider
// columns status are consumed in relevant files eg: proj - in project list, wa- work activity, user and contractor
// set on true means column is hiden false is shown

import { ColumnsControl } from "../interfaces";

export const setCS: ColumnsControl = {
  proj_nr_users: false,
  proj_nr_contractors: true,
  wa_name: false,
  wa_contractor: true,
  wa_rev_exp: true,
  user_super: true,
  contracor_nr_users: true,
}

export const setC: ColumnsControl = {
  proj_nr_users: true,
  proj_nr_contractors: true,
  wa_name: false,
  wa_contractor: true,
  wa_rev_exp: true,
  user_super: true,
  contracor_nr_users: true,
};

export const setMCS: ColumnsControl = {
  proj_nr_users: true,
  proj_nr_contractors: false,
  wa_name: true,
  wa_contractor: false,
  wa_rev_exp: false,
  user_super: false,
  contracor_nr_users: false,
};

export const setMC: ColumnsControl = {
  proj_nr_users: true,
  proj_nr_contractors: false,
  wa_name: true,
  wa_contractor: false,
  wa_rev_exp: false,
  user_super: true,
  contracor_nr_users: true,
};

export const setAdmin: ColumnsControl = {
  proj_nr_users: false,
  proj_nr_contractors: false,
  wa_name: false,
  wa_contractor: false,
  wa_rev_exp: false,
  user_super: false,
  contracor_nr_users: false,
};
